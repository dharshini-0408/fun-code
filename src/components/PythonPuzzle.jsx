import { useState } from 'react'
import CodeEditor from './CodeEditor.jsx'
import { pythonBooted, runPython } from '../engine/python.js'

// The Python examination. Same shape as the JavaScript one, but the first run
// of a session has to boot CPython in a worker — around 13MB and a few
// seconds — so that wait is announced rather than left to look like a hang.
export default function PythonPuzzle({ room, draft, onDraft, onSolved, onAttempt, solved }) {
  const { puzzle } = room
  const [code, setCode] = useState(draft ?? puzzle.starter)
  const [report, setReport] = useState(null)
  const [running, setRunning] = useState(false)
  const [booting, setBooting] = useState(false)

  function update(next) {
    setCode(next)
    onDraft?.(next)
    setReport(null)
  }

  async function run() {
    const cold = !pythonBooted()
    setBooting(cold)
    setRunning(true)

    const result = await runPython({ code, fnName: puzzle.fnName, tests: puzzle.tests })

    setReport(result)
    setRunning(false)
    setBooting(false)

    onAttempt?.({ code, failure: result.ok ? null : firstFailure(result) })
    if (result.ok && !solved) onSolved()
  }

  return (
    <>
      <CodeEditor value={code} onChange={update} />

      <div className="run-row">
        <button className="btn primary" onClick={run} disabled={running}>
          {running ? (booting ? 'waking the interpreter…' : 'casting…') : solved ? 'cast again' : 'cast the spell'}
        </button>
        <button className="btn ghost" onClick={() => update(puzzle.starter)} disabled={running}>
          start over
        </button>
      </div>

      {booting && (
        <p className="boot-note">
          Real Python is starting up inside your browser — about 13MB, once per session. It is
          cached afterwards.
        </p>
      )}

      {report && <PythonReport report={report} />}
    </>
  )
}

function firstFailure(report) {
  if (report.fatal) return report.fatal
  const bad = report.results.find((r) => !r.pass)
  return bad ? `${bad.call} returned ${bad.actual}, but should be ${bad.expected}` : null
}

function PythonReport({ report }) {
  const { fatal, results, logs, ok } = report

  return (
    <div className={`report ${ok ? 'pass' : 'fail'}`}>
      {logs.length > 0 && (
        <div className="logs">
          {logs.map((l, i) => (
            <div key={i} className="log">
              <span>›</span> {l}
            </div>
          ))}
        </div>
      )}

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
