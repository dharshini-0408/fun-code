import { useMemo, useState } from 'react'
import {
  ALL_IDIOMS,
  SUGGESTED_IDIOMS,
  buildIdiomQuiz,
  lookupIdiom,
  searchIdioms,
} from '../data/idiomsPhrases.js'

export default function EnglishIdioms({ onBack }) {
  const [mode, setMode] = useState('search') // search | study | quiz
  const [q, setQ] = useState('')
  const [error, setError] = useState('')
  const [entry, setEntry] = useState(null)
  const [studyI, setStudyI] = useState(0)
  const [filter, setFilter] = useState('')
  const [quiz, setQuiz] = useState(() => buildIdiomQuiz(12))
  const [ti, setTi] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const studyList = useMemo(() => {
    const f = filter.trim()
    if (!f) return ALL_IDIOMS
    return searchIdioms(f)
  }, [filter])

  const studyCard = studyList[Math.min(studyI, Math.max(0, studyList.length - 1))]
  const test = quiz[ti]

  function runSearch(word) {
    const w = (word ?? q).trim()
    if (!w) return
    setQ(w)
    setError('')
    setEntry(null)
    try {
      setEntry(lookupIdiom(w))
    } catch (e) {
      setError(e.message || 'Lookup failed.')
    }
  }

  function startQuiz() {
    setMode('quiz')
    setQuiz(buildIdiomQuiz(12))
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

  function goStudy(fromIndex = 0) {
    setMode('study')
    setStudyI(fromIndex)
    setFilter('')
  }

  return (
    <div className="drill eng-section">
      <button className="btn link" onClick={onBack}>
        ← English
      </button>
      <h2 className="drill-title">Idioms & Phrases</h2>
      <p className="tagline">
        Free idioms pack ({ALL_IDIOMS.length}) via idioms.js — search any phrase for its meaning.
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
          className={`topic-tab ${mode === 'study' ? 'on' : ''}`}
          onClick={() => goStudy(studyI)}
        >
          Study
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
              placeholder="Search an idiom or phrase…"
              aria-label="Idiom to look up"
            />
            <button className="btn primary" type="submit" disabled={!q.trim()}>
              Search
            </button>
          </form>

          <div className="dict-suggest">
            {SUGGESTED_IDIOMS.map((w) => (
              <button key={w} type="button" className="btn ghost small" onClick={() => runSearch(w)}>
                {w}
              </button>
            ))}
          </div>

          {error && <p className="fatal">{error}</p>}

          {entry && (
            <article className="dict-card">
              <header className="dict-head">
                <h3>{entry.match.idiom}</h3>
              </header>
              <section className="dict-meaning">
                <h4>Meaning</h4>
                <p>{entry.match.meaning}</p>
              </section>
              {entry.related.length > 0 && (
                <section className="dict-meaning">
                  <h4>Related</h4>
                  <ul>
                    {entry.related.map((r) => (
                      <li key={r.id}>
                        <button
                          type="button"
                          className="btn link"
                          style={{ padding: 0 }}
                          onClick={() => runSearch(r.idiom)}
                        >
                          {r.idiom}
                        </button>
                        <p className="dimmed" style={{ margin: '4px 0 10px' }}>
                          {r.meaning}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
          )}
        </div>
      )}

      {mode === 'study' && (
        <div className="topic-panel">
          <form
            className="dict-form"
            onSubmit={(e) => {
              e.preventDefault()
              setStudyI(0)
            }}
          >
            <input
              className="topics-search"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value)
                setStudyI(0)
              }}
              placeholder="Filter while you study…"
              aria-label="Filter idioms"
            />
          </form>

          {studyList.length === 0 ? (
            <p className="dimmed">No matches — try a shorter word.</p>
          ) : (
            <>
              <p className="drill-progress">
                {studyI + 1} / {studyList.length}
              </p>
              <div className="vocab-card">
                <p className="vocab-word">{studyCard.idiom}</p>
                <p className="dimmed">{studyCard.meaning}</p>
              </div>
              <div className="drill-actions">
                <button
                  className="btn"
                  onClick={() => setStudyI((i) => (i - 1 + studyList.length) % studyList.length)}
                >
                  ← Prev
                </button>
                <button
                  className="btn"
                  onClick={() => setStudyI((i) => (i + 1) % studyList.length)}
                >
                  Next →
                </button>
                <button className="btn primary" onClick={startQuiz}>
                  Quiz
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {mode === 'quiz' && (
        <div className="topic-panel">
          {done ? (
            <div className="drill-result" style={{ paddingTop: 8 }}>
              <h3 className="drill-title">Quiz complete</h3>
              <p className="drill-score">
                {score} / {quiz.length}
              </p>
              <div className="drill-actions">
                <button className="btn primary" onClick={startQuiz}>
                  New quiz
                </button>
                <button className="btn" onClick={() => setMode('study')}>
                  Back to study
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
