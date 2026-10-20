// Runs and marks HTML, CSS and Bootstrap.
//
// Markup is not a function you can call, so the JavaScript runner cannot touch
// it. Instead the learner's document is rendered inside a sandboxed iframe and
// then questioned: does this selector match, what does it contain, what colour
// did it actually end up. Assertions run against the real rendered DOM and real
// computed styles, so "it looks right" and "it passes" mean the same thing.
//
// The iframe carries `sandbox="allow-same-origin"` and no `allow-scripts`:
// we need to reach into its document to mark it, but nothing inside it may
// ever execute. That combination is deliberate.

const RENDER_TIMEOUT_MS = 3000

// Bootstrap is served from the app itself rather than a CDN, so the sandbox
// works with no network at all.
const BOOTSTRAP_HREF = '/vendor/bootstrap.min.css'

/**
 * Build the document that goes into the iframe.
 * `html` is the learner's markup, `css` their stylesheet (either may be empty).
 */
export function buildDocument({ html = '', css = '', bootstrap = false }) {
  return `<!doctype html>
<html><head><meta charset="utf-8">
${bootstrap ? `<link rel="stylesheet" href="${BOOTSTRAP_HREF}">` : ''}
<style>
  /* A neutral ground so the learner's own styling is what they see. */
  body { margin: 12px; font-family: system-ui, sans-serif; color: #16130f; background: #fff; }
</style>
<style>${css}</style>
</head><body>${html}</body></html>`
}

/**
 * Render a document off-screen and hand it to `inspect`, which is given the
 * iframe's `document`. Everything is torn down afterwards, pass or throw.
 */
function withRenderedDoc(source, inspect) {
  return new Promise((resolve) => {
    const frame = document.createElement('iframe')
    // No allow-scripts: the document renders and is measured, never runs.
    frame.setAttribute('sandbox', 'allow-same-origin')
    frame.setAttribute('aria-hidden', 'true')
    frame.style.cssText =
      'position:fixed;left:-10000px;top:0;width:900px;height:700px;border:0;visibility:hidden'

    let settled = false
    const finish = (value) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      frame.remove()
      resolve(value)
    }

    const timer = setTimeout(
      () => finish({ ok: false, fatal: 'The page took too long to render.', results: [] }),
      RENDER_TIMEOUT_MS,
    )

    frame.onload = () => {
      try {
        const doc = frame.contentDocument
        if (!doc) {
          finish({ ok: false, fatal: 'The sandbox could not be opened.', results: [] })
          return
        }
        finish(inspect(doc, frame.contentWindow))
      } catch (err) {
        finish({ ok: false, fatal: `${err.name}: ${err.message}`, results: [] })
      }
    }

    document.body.appendChild(frame)
    frame.srcdoc = source
  })
}

/* ---------- the assertion vocabulary a lesson author writes against ---------- */

function textOf(el) {
  return (el.textContent ?? '').replace(/\s+/g, ' ').trim()
}

// Computed colours come back as `rgb(a, b, c)`. Lessons are authored in hex,
// so both sides are normalised before they are compared.
function normaliseColour(v) {
  const s = String(v).trim().toLowerCase()
  const rgb = s.match(/^rgba?\(([^)]+)\)$/)
  if (rgb) {
    const [r, g, b] = rgb[1].split(',').map((n) => parseInt(n, 10))
    return `#${[r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')}`
  }
  const hex = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/)
  if (hex) {
    const h = hex[1]
    return h.length === 3 ? `#${[...h].map((c) => c + c).join('')}` : `#${h}`
  }
  return s
}

// Some properties are only meaningfully comparable once normalised.
const NORMALISERS = {
  color: normaliseColour,
  'background-color': normaliseColour,
  'border-color': normaliseColour,
}

function readStyle(win, el, prop) {
  const raw = win.getComputedStyle(el).getPropertyValue(prop)
  return (NORMALISERS[prop] ?? ((v) => String(v).trim()))(raw)
}

/**
 * Each check is one object in a lesson's `checks` array. The kinds:
 *
 *   exists   { sel, min }                 — the selector matches (at least min)
 *   count    { sel, expected }            — it matches exactly this many
 *   text     { sel, expected }            — its trimmed text is exactly this
 *   contains { sel, expected }            — its text contains this
 *   attr     { sel, name, expected }      — an attribute equals this
 *   style    { sel, prop, expected }      — a *computed* style equals this
 *   nested   { sel, within }              — sel appears inside within
 */
function runCheck(doc, win, c) {
  const label = c.describe
  const all = c.sel ? [...doc.querySelectorAll(c.sel)] : []
  const first = all[0]

  const miss = (actual) => ({ pass: false, call: label, expected: c.expected ?? '—', actual })
  const hit = (actual) => ({ pass: true, call: label, expected: c.expected ?? '—', actual })

  switch (c.kind) {
    case 'exists': {
      const min = c.min ?? 1
      return all.length >= min
        ? hit(`found ${all.length}`)
        : miss(all.length === 0 ? 'nothing matched' : `only found ${all.length}`)
    }
    case 'count':
      return all.length === c.expected ? hit(String(all.length)) : miss(String(all.length))

    case 'text':
      if (!first) return miss('nothing matched')
      return textOf(first) === c.expected ? hit(textOf(first)) : miss(textOf(first) || '(empty)')

    case 'contains':
      if (!first) return miss('nothing matched')
      return textOf(first).includes(c.expected)
        ? hit(textOf(first))
        : miss(textOf(first) || '(empty)')

    case 'attr': {
      if (!first) return miss('nothing matched')
      const got = first.getAttribute(c.name)
      return got === c.expected ? hit(got) : miss(got === null ? '(no such attribute)' : got)
    }
    case 'style': {
      if (!first) return miss('nothing matched')
      const got = readStyle(win, first, c.prop)
      const want = (NORMALISERS[c.prop] ?? ((v) => String(v).trim()))(c.expected)
      return got === want ? hit(got) : miss(got)
    }
    case 'nested': {
      const found = [...doc.querySelectorAll(c.within)].some((p) => p.querySelector(c.sel))
      return found ? hit('nested correctly') : miss('not found inside')
    }
    default:
      return miss(`unknown check "${c.kind}"`)
  }
}

/**
 * Mark a markup examination.
 * `checks` is the lesson's array; `html`/`css` are what the learner wrote.
 */
export function runMarkup({ html, css, bootstrap, checks }) {
  const source = buildDocument({ html, css, bootstrap })

  return withRenderedDoc(source, (doc, win) => {
    const results = checks.map((c) => runCheck(doc, win, c))
    return { ok: results.length > 0 && results.every((r) => r.pass), results, logs: [] }
  })
}

// The playground and the Library's try-it sheets only need the document, not
// a verdict — the preview iframe renders this directly.
export { RENDER_TIMEOUT_MS }
