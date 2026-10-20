import { useState } from 'react'
import {
  SUGGESTED_WORDS,
  buildSynonymQuiz,
  lookupSynonyms,
} from '../data/synonymsData.js'

export default function EnglishSynonyms({ onBack }) {
  const [mode, setMode] = useState('search')
  const [q, setQ] = useState('')
  const [error, setError] = useState('')
  const [entry, setEntry] = useState(null)
  const [quiz, setQuiz] = useState(() => buildSynonymQuiz(10))
  const [ti, setTi] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const test = quiz[ti]

  function runSearch(word) {
    const w = (word ?? q).trim()
    if (!w) return
    setQ(w)
    setError('')
    setEntry(null)
    try {
      setEntry(lookupSynonyms(w))
    } catch (e) {
      setError(e.message || 'Lookup failed.')
    }
  }

  function startQuiz() {
    setMode('quiz')
    setQuiz(buildSynonymQuiz(10))
    setTi(0)
    setPicked(null)
    setScore(0)
    setDone(false)
  }

  function choose(n) {
    if (picked != null || !test) return
    setPicked(n)
    if (n === test.answer) setScore((s) => s + 1)
  }

  function nextTest() {
    if (ti + 1 >= quiz.length) {
      setDone(true)
      return
    }
    setTi((i) => i + 1)
    setPicked(null)
  }

  return (
    <div className="drill eng-section">
      <button className="btn link" onClick={onBack}>
        ← English
      </button>
      <h2 className="drill-title">Synonyms</h2>
      <p className="tagline">
        Free offline synonyms pack — search a word, then quiz similar meanings.
      </p>

      <div className="topic-tabs" role="tablist">
        <button
          type="button"
          className={`topic-tab ${mode === 'search' ? 'on' : ''}`}
          onClick={() => setMode('search')}
        >
          Search
        </button>
        <button
          type="button"
          className={`topic-tab ${mode === 'quiz' ? 'on' : ''}`}
          onClick={startQuiz}
        >
          Quiz
        </button>
      </div>

      {mode === 'search' && (
        <div className="topic-panel">
          <form
            className="dict-form"
            onSubmit={(e) => {
              e.preventDefault()
              runSearch()
            }}
          >
            <input
              className="topics-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Find synonyms for…"
              aria-label="Word for synonyms"
            />
            <button className="btn primary" type="submit" disabled={!q.trim()}>
              Search
            </button>
          </form>

          <div className="dict-suggest">
            {SUGGESTED_WORDS.map((w) => (
              <button key={w} type="button" className="btn ghost small" onClick={() => runSearch(w)}>
                {w}
              </button>
            ))}
          </div>

          {error && <p className="fatal">{error}</p>}

          {entry && (
            <article className="dict-card">
              <header className="dict-head">
                <h3>{entry.word}</h3>
              </header>
              {entry.groups.map((g) => (
                <section key={g.label} className="dict-meaning">
                  <h4>{g.label}</h4>
                  <p className="dict-syn">{g.words.join(', ')}</p>
                </section>
              ))}
            </article>
          )}
        </div>
      )}

      {mode === 'quiz' && (
        <div className="topic-panel">
          {!quiz.length ? (
            <p className="dimmed">Could not build a quiz — try Search instead.</p>
          ) : done ? (
            <div className="drill-result" style={{ paddingTop: 8 }}>
              <h3 className="drill-title">Quiz complete</h3>
              <p className="drill-score">
                {score} / {quiz.length}
              </p>
              <div className="drill-actions">
                <button className="btn primary" onClick={startQuiz}>
                  New quiz
                </button>
                <button className="btn" onClick={() => setMode('search')}>
                  Back to search
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="drill-progress">
                Quiz · {ti + 1} / {quiz.length}
              </p>
              <h3 className="drill-title" style={{ fontSize: 20 }}>
                {test.prompt}
              </h3>
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
                      onClick={() => choose(n)}
                      disabled={picked != null}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {picked != null && (
                <div className="drill-feedback">
                  <p>{picked === test.answer ? 'Correct.' : `Not quite — ${test.tip}`}</p>
                  <button className="btn primary" onClick={nextTest}>
                    {ti + 1 === quiz.length ? 'See score' : 'Next'}
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
