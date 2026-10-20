import { useMemo, useState } from 'react'
import {
  SENTENCE_SCENARIOS,
  SENTENCE_TESTS,
  normalizeSentence,
} from '../data/sentenceFormation.js'

export default function EnglishSentence({ onBack }) {
  const [mode, setMode] = useState('scenarios') // scenarios | test
  const [si, setSi] = useState(0)
  const [draft, setDraft] = useState('')
  const [ti, setTi] = useState(0)
  const [picked, setPicked] = useState(null)
  const [jumbleOrder, setJumbleOrder] = useState([])
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const scenario = SENTENCE_SCENARIOS[si]
  const test = SENTENCE_TESTS[ti]
  const jumbleWords = useMemo(() => {
    if (!test || test.kind !== 'jumble') return []
    return test.words
  }, [test])

  function startTest() {
    setMode('test')
    setTi(0)
    setPicked(null)
    setScore(0)
    setDone(false)
    setJumbleOrder([])
  }

  function addWord(w, idx) {
    if (picked != null) return
    if (jumbleOrder.includes(idx)) return
    setJumbleOrder((o) => [...o, idx])
  }

  function clearJumble() {
    setJumbleOrder([])
  }

  function checkJumble() {
    const built = jumbleOrder.map((i) => jumbleWords[i]).join(' ')
    const ok = normalizeSentence(built) === normalizeSentence(test.answer)
    setPicked(ok ? 'ok' : 'bad')
    if (ok) setScore((s) => s + 1)
  }

  function chooseCorrect(n) {
    if (picked != null) return
    setPicked(n)
    if (n === test.answer) setScore((s) => s + 1)
  }

  function nextTest() {
    if (ti + 1 >= SENTENCE_TESTS.length) {
      setDone(true)
      return
    }
    setTi((i) => i + 1)
    setPicked(null)
    setJumbleOrder([])
  }

  return (
    <div className="drill eng-section">
      <button className="btn link" onClick={onBack}>
        ← English
      </button>
      <h2 className="drill-title">Sentence Formation</h2>
      <p className="tagline">
        Practise real scenarios, then sit tests: jumble words and fix sentences.
      </p>

      <div className="topic-tabs" role="tablist">
        <button
          type="button"
          className={`topic-tab ${mode === 'scenarios' ? 'on' : ''}`}
          onClick={() => setMode('scenarios')}
        >
          Scenarios
        </button>
        <button
          type="button"
          className={`topic-tab ${mode === 'test' ? 'on' : ''}`}
          onClick={startTest}
        >
          Tests
        </button>
      </div>

      {mode === 'scenarios' && (
        <div className="topic-panel">
          <p className="drill-progress">
            Scenario {si + 1} / {SENTENCE_SCENARIOS.length}
          </p>
          <h3 className="drill-title" style={{ fontSize: 22 }}>
            {scenario.title}
          </h3>
          <p className="drill-sentence">{scenario.prompt}</p>
          <textarea
            className="coach-input"
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write your sentence here…"
          />
          <details className="sent-sample">
            <summary>Show a sample answer</summary>
            <p>{scenario.sample}</p>
          </details>
          <div className="drill-actions">
            <button
              className="btn"
              onClick={() => {
                setSi((i) => (i + 1) % SENTENCE_SCENARIOS.length)
                setDraft('')
              }}
            >
              Next scenario
            </button>
            <button className="btn primary" onClick={startTest}>
              Go to tests →
            </button>
          </div>
        </div>
      )}

      {mode === 'test' && (
        <div className="topic-panel">
          {done ? (
            <div className="drill-result" style={{ paddingTop: 8 }}>
              <h3 className="drill-title">Tests complete</h3>
              <p className="drill-score">
                {score} / {SENTENCE_TESTS.length}
              </p>
              <div className="drill-actions">
                <button className="btn primary" onClick={startTest}>
                  Try again
                </button>
                <button className="btn" onClick={() => setMode('scenarios')}>
                  Back to scenarios
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="drill-progress">
                {test.kind === 'jumble' ? 'Jumble' : 'Correct the sentence'} · {ti + 1} /{' '}
                {SENTENCE_TESTS.length}
              </p>
              <h3 className="drill-title" style={{ fontSize: 20 }}>
                {test.prompt}
              </h3>

              {test.kind === 'jumble' && (
                <>
                  <div className="jumble-bank">
                    {jumbleWords.map((w, idx) => (
                      <button
                        key={`${w}-${idx}`}
                        type="button"
                        className={`jumble-chip ${jumbleOrder.includes(idx) ? 'used' : ''}`}
                        onClick={() => addWord(w, idx)}
                        disabled={picked != null || jumbleOrder.includes(idx)}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                  <p className="jumble-built">
                    {jumbleOrder.length
                      ? jumbleOrder.map((i) => jumbleWords[i]).join(' ')
                      : 'Tap words in order…'}
                  </p>
                  <div className="drill-actions">
                    <button className="btn ghost" onClick={clearJumble} disabled={picked != null}>
                      Clear
                    </button>
                    <button
                      className="btn primary"
                      onClick={checkJumble}
                      disabled={picked != null || jumbleOrder.length === 0}
                    >
                      Check
                    </button>
                  </div>
                </>
              )}

              {test.kind === 'correct' && (
                <div className="drill-options">
                  {test.options.map((opt, n) => {
                    let cls = 'drill-opt'
                    if (picked != null) {
                      if (n === test.answer) cls += ' right'
                      else if (n === picked) cls += ' wrong'
                    }
                    return (
                      <button
                        key={n}
                        type="button"
                        className={cls}
                        onClick={() => chooseCorrect(n)}
                        disabled={picked != null}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              )}

              {picked != null && (
                <div className="drill-feedback">
                  <p>
                    {picked === 'ok' || picked === test.answer
                      ? 'Correct.'
                      : `Not quite — ${test.tip}`}
                  </p>
                  <button className="btn primary" onClick={nextTest}>
                    {ti + 1 === SENTENCE_TESTS.length ? 'See score' : 'Next'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
