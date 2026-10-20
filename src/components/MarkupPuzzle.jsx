import { useEffect, useMemo, useRef, useState } from 'react'
import CodeEditor from './CodeEditor.jsx'
import { buildDocument, runMarkup } from '../engine/markup.js'

// The markup examination: an editor, a live preview beside it, and a set of
// checks run against the real rendered DOM.
//
// The preview updates as you type — for HTML and CSS, seeing the result IS the
// feedback loop, and making you press a button for it would be the wrong shape.
// Marking still only happens when you ask for it.
export default function MarkupPuzzle({ room, draft, onDraft, onSolved, onAttempt, solved }) {
  const { puzzle } = room
  const [code, setCode] = useState(draft ?? puzzle.starter)
  const [report, setReport] = useState(null)
  const [running, setRunning] = useState(false)
  const frame = useRef(null)

  // Bootstrap lessons get the framework's stylesheet; the others must not, or
  // its reset would silently answer half the CSS examinations.
  const usesBootstrap = room.track === 'bootstrap'

  // CSS lessons write a stylesheet; the rest write markup.
  const isStylesheet = puzzle.surface === 'css'

  const preview = useMemo(
    () =>
      buildDocument({
        html: isStylesheet ? (puzzle.html ?? '') : code,
        css: isStylesheet ? code : (puzzle.css ?? ''),
        bootstrap: usesBootstrap,
      }),
    [code, isStylesheet, puzzle.html, puzzle.css, usesBootstrap],
  )

  useEffect(() => {
    if (frame.current) frame.current.srcdoc = preview
  }, [preview])

  function update(next) {
    setCode(next)
    onDraft?.(next)
    setReport(null)
  }

  async function run() {
    setRunning(true)
    const result = await runMarkup({
      html: isStylesheet ? (puzzle.html ?? '') : code,
      css: isStylesheet ? code : (puzzle.css ?? ''),
      bootstrap: usesBootstrap,
      checks: puzzle.checks,
    })
    setReport(result)
    setRunning(false)

    // The portrait answers far better when it can see what failed.
    onAttempt?.({
      code,
      failure: result.ok ? null : firstFailure(result),
    })
    if (result.ok && !solved) onSolved()
  }

  return (
    <>
      <div className="markup-split">
        <div className="markup-pane">
          <div className="markup-pane-head">
            <span>{isStylesheet ? 'style.css' : 'index.html'}</span>
          </div>
          <CodeEditor value={code} onChange={update} />
        </div>

        <div className="markup-pane">
          <div className="markup-pane-head">
            <span>what it renders</span>
            <span className="markup-live">live</span>
          </div>
          {/* No allow-scripts: the preview renders, it never executes. */}
          <iframe
            ref={frame}
            className="markup-preview"
            title="Live preview"
            sandbox="allow-same-origin"
          />
        </div>
      </div>

      <div className="run-row">
        <button className="btn primary" onClick={run} disabled={running}>
          {running ? 'casting…' : solved ? 'cast again' : 'cast the spell'}
        </button>
        <button className="btn ghost" onClick={() => update(puzzle.starter)} disabled={running}>
          start over
        </button>
      </div>

      {report && <MarkupReport report={report} />}
    </>
  )
}

function firstFailure(report) {
  if (report.fatal) return report.fatal
  const bad = report.results.find((r) => !r.pass)
  return bad ? `${bad.call} — expected ${bad.expected}, got ${bad.actual}` : null
}

function MarkupReport({ report }) {
  const { fatal, results, ok } = report

  return (
    <div className={`report ${ok ? 'pass' : 'fail'}`}>
      <p className="verdict">
        {ok
          ? 'The inscription holds. The door gives.'
          : 'Not yet — the stone refuses some of it.'}
      </p>

      {fatal ? (
        <p className="fatal">{fatal}</p>
      ) : (
        <ul className="checks">
          {results.map((r, i) => (
            <li key={i} className={r.pass ? 'ok' : 'no'}>
              <span className="mark">{r.pass ? '✓' : '✗'}</span>
              <code>{r.call}</code>
              {!r.pass && (
                <span className="detail">
                  expected <b>{r.expected}</b>, got <b>{r.actual}</b>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
