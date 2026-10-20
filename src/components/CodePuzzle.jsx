import { useState } from 'react'
import { runTests } from '../engine/runner.js'
import CodeEditor from './CodeEditor.jsx'

export default function CodePuzzle({ room, draft, onDraft, onSolved, onAttempt, solved }) {
  const { puzzle } = room
  const [code, setCode] = useState(draft ?? puzzle.starter)
  const [report, setReport] = useState(null)
  const [running, setRunning] = useState(false)

  function update(next) {
    setCode(next)
    onDraft(next)
  }

  async function run() {
    setRunning(true)
    setReport(null)
    const result = await runTests({
      code,
      fnName: puzzle.fnName,
      tests: puzzle.tests,
      fnArgs: puzzle.fnArgs,
      custom: puzzle.custom,
    })
    setReport(result)
    setRunning(false)
    // The tutor answers much better when it can see what you wrote and what
    // broke, so every run is handed up — and cleared again once it passes.
    onAttempt?.({ code, failure: result.ok ? null : describe(result) })
    if (result.ok) onSolved()
  }

  return (
    <>
      <CodeEditor value={code} onChange={update} />

      <div className="run-row">
        <button className="btn primary" onClick={run} disabled={running}>
          {running ? 'casting…' : solved ? 'cast again' : 'cast the spell'}
        </button>
        <button className="btn ghost" onClick={() => update(puzzle.starter)} disabled={running}>
          start over
        </button>
      </div>

      {report && <Report report={report} />}
    </>
  )
}

// One line the tutor can act on: the crash, or the first failing case.
function describe({ fatal, results }) {
  if (fatal) return fatal
  const bad = results.find((r) => !r.pass)
  return bad ? `${bad.call} returned ${bad.actual}, but should be ${bad.expected}` : null
}

function Report({ report }) {
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
