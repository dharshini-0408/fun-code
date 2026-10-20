import { useMemo, useState } from 'react'
import EnglishTopicRoom from './EnglishTopicRoom.jsx'
import { englishTopicTree } from '../data/englishTree.js'

/** Full Grammar path only — every branch/topic with Learn + Test. */
export default function EnglishGrammar({ onBack, onAskKitty }) {
  const grammar = useMemo(
    () => englishTopicTree().find((a) => a.name === 'Grammar'),
    [],
  )
  const [topicId, setTopicId] = useState(null)
  const [q, setQ] = useState('')

  if (!grammar) {
    return (
      <div className="drill">
        <button className="btn link" onClick={onBack}>
          ← English
        </button>
        <p className="dimmed">Grammar topics are missing.</p>
      </div>
    )
  }

  if (topicId) {
    return (
      <EnglishTopicRoom
        topicId={topicId}
        onBack={() => setTopicId(null)}
        onAskKitty={onAskKitty}
      />
    )
  }

  const needle = q.trim().toLowerCase()
  const branches = grammar.branches
    .map((br) => ({
      ...br,
      topics: br.topics.filter(
        (t) =>
          !needle ||
          t.name.toLowerCase().includes(needle) ||
          br.name.toLowerCase().includes(needle),
      ),
    }))
    .filter((br) => br.topics.length > 0)

  return (
    <div className="drill eng-section">
      <button className="btn link" onClick={onBack}>
        ← English
      </button>
      <h2 className="drill-title">Grammar</h2>
      <p className="tagline">
        Complete topics from basic to advanced. Open any topic to learn, then attend its test.
      </p>

      <input
        className="topics-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Find verbs, articles, conditionals…"
        aria-label="Search grammar topics"
        style={{ marginBottom: 16, maxWidth: 420 }}
      />

      <p className="topics-total" style={{ marginBottom: 12 }}>
        {grammar.count} topics
      </p>

      {branches.map((br) => (
        <div key={br.name} className="topics-branch">
          <h3 className="topics-branch-name">{br.name}</h3>
          <ul className="topics-list">
            {br.topics.map((t) => (
              <li key={t.id}>
                <button type="button" className="topics-item" onClick={() => setTopicId(t.id)}>
                  <span className="topics-item-name">{t.name}</span>
                  <span className="topics-item-goal">{t.goal}</span>
                  <span className="topics-item-go">Learn · Test →</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
