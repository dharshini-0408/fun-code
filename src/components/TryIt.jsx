import { useEffect, useRef, useState } from 'react'
import CodeEditor from './CodeEditor.jsx'
import { buildDocument } from '../engine/markup.js'
import { runPythonScratch } from '../engine/python.js'
import { runScratch } from '../engine/runner.js'

// An example you can edit and run, W3Schools-style: the snippet from the
// lesson, dropped into a real editor with a Run button under it. Nothing here
// is graded — it exists purely so you can poke at the example and see what
// changes. `console.log` is captured; the last expression's value is shown too.
export default function TryIt({ code, label = 'Try the spell', engine = 'js', bootstrap = false }) {
  const [open, setOpen] = useState(false)
  const [source, setSource] = useState(code)
  const [out, setOut] = useState(null)
  const [busy, setBusy] = useState(false)
  const frame = useRef(null)

  const isMarkup = engine === 'markup'

  // Markup has no console — the render IS the result, so it updates as you type.
  useEffect(() => {
    if (!isMarkup || !open || !frame.current) return
    frame.current.srcdoc = buildDocument({ html: source, bootstrap })
  }, [isMarkup, open, source, bootstrap])

  async function run() {
    setBusy(true)
    setOut(await (engine === 'python' ? runPythonScratch(source) : runScratch(source)))
    setBusy(false)
  }

  if (!open) {
    return (
      <button className="btn ghost small tryit-open" onClick={() => setOpen(true)}>
        ▶ {label}
      </button>
    )
  }

  return (
    <div className="tryit">
      <div className="tryit-head">
        <span className="tryit-title">{label}</span>
        <button
          className="btn link small"
          onClick={() => {
            setSource(code)
            setOut(null)
          }}
        >
          reset
        </button>
        <button className="btn link small" onClick={() => setOpen(false)}>
          close
        </button>
      </div>

      <CodeEditor value={source} onChange={setSource} />

      {isMarkup ? (
        <iframe
          ref={frame}
          className="markup-preview tryit-preview"
          title="Live preview"
          sandbox="allow-same-origin"
        />
      ) : (
        <button className="btn primary small" onClick={run} disabled={busy}>
          {busy ? 'casting…' : 'cast ▸'}
        </button>
      )}

      {out && (
        <div className={`tryit-out ${out.fatal ? 'bad' : ''}`}>
          {out.fatal ? (
            <p className="out-line err">{out.fatal}</p>
          ) : (
            <>
              {out.logs.map((l, i) => (
                <p key={i} className="out-line">
                  {l}
                </p>
              ))}
              {out.value !== undefined && (
                <p className="out-line val">
                  <span className="out-mark">⇒</span>
                  {out.value}
                </p>
              )}
              {out.logs.length === 0 && out.value === undefined && (
                <p className="out-line dimmed">
                  The spell held, but said nothing. Add a `console.log(…)`.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
