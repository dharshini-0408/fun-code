import { useState } from 'react'
import Lesson from './Lesson.jsx'
import { getTopicPack } from '../data/englishPacks.js'

export default function EnglishTopicRoom({ topicId, onBack, onAskKitty }) {
  const pack = getTopicPack(topicId)
  const [tab, setTab] = useState('learn') // learn | test
  const [qi, setQi] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (!pack) {
    return (
      <div className="drill">
        <button className="btn link" onClick={onBack}>
          ← all topics
        </button>
        <p className="dimmed">That topic could not be opened.</p>
      </div>
    )
  }

  const { topic, lesson, test } = pack
  const q = test[qi]

  function choose(n) {
    if (picked != null || done) return
    setPicked(n)
    if (n === q.answer) setScore((s) => s + 1)
  }

  function nextQ() {
    if (qi + 1 >= test.length) {
      setDone(true)
      return
    }
    setQi((i) => i + 1)
    setPicked(null)
  }

  function resetTest() {
    setQi(0)
    setPicked(null)
    setScore(0)
    setDone(false)
  }

  return (
    <div className="topic-room">
      <button className="btn link" onClick={onBack}>
        ← all topics
      </button>

      <header className="topic-room-head">
        <p className="topic-room-path">
          {topic.area} · {topic.branch}
        </p>
        <h2 className="drill-title">{topic.name}</h2>
        <p className="tagline" style={{ marginBottom: 0 }}>
          {topic.goal}
        </p>
      </header>

      <div className="topic-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'learn'}
          className={`topic-tab ${tab === 'learn' ? 'on' : ''}`}
          onClick={() => setTab('learn')}
        >
          Learn
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'test'}
          className={`topic-tab ${tab === 'test' ? 'on' : ''}`}
          onClick={() => {
            setTab('test')
          }}
        >
          Test
        </button>
      </div>

      {tab === 'learn' && (
        <div className="topic-panel parchment-panel">
          <Lesson blocks={lesson} />
          <div className="topic-learn-actions">
            <button
              type="button"
              className="btn"
              onClick={() => onAskKitty?.(topic.id, topic.starters[0] ?? `Teach me ${topic.name}`)}
            >
              Ask Kitty to teach →
            </button>
            <button type="button" className="btn primary" onClick={() => setTab('test')}>
              Attend the test →
            </button>
          </div>
        </div>
      )}

      {tab === 'test' && (
        <div className="topic-panel">
          {done ? (
            <div className="drill-result" style={{ paddingTop: 12 }}>
              <h3 className="drill-title">Test complete</h3>
              <p className="drill-score">
                {score} / {test.length}
              </p>
              <div className="drill-actions">
                <button className="btn primary" onClick={resetTest}>
                  Try again
                </button>
                <button className="btn" onClick={() => setTab('learn')}>
                  Back to learn
                </button>
                <button className="btn" onClick={onBack}>
                  All topics
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="drill-progress">
                Question {qi + 1} / {test.length}
              </p>
              <h3 className="drill-title" style={{ fontSize: 22 }}>
                {q.prompt}
              </h3>
              {q.sentence && <p className="drill-sentence">{q.sentence}</p>}
              <div className="drill-options">
                {q.options.map((opt, n) => {
                  let cls = 'drill-opt'
                  if (picked != null) {
                    if (n === q.answer) cls += ' right'
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
                  <p>{picked === q.answer ? 'Correct.' : `Not quite — ${q.tip}`}</p>
                  <button className="btn primary" onClick={nextQ}>
                    {qi + 1 === test.length ? 'See score' : 'Next'}
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
