import { useState } from 'react'
import { SUGGESTED_WORDS, lookupWord } from '../data/dictionary.js'

export default function EnglishDictionary({ onBack }) {
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [entry, setEntry] = useState(null)

  async function search(word) {
    const w = (word ?? q).trim()
    if (!w) return
    setQ(w)
    setLoading(true)
    setError('')
    setEntry(null)
    try {
      setEntry(await lookupWord(w))
    } catch (e) {
      setError(e.message || 'Lookup failed.')
    } finally {
      setLoading(false)
    }
  }

  function playAudio() {
    if (!entry?.audio) return
    new Audio(entry.audio).play().catch(() => {})
  }

  return (
    <div className="drill eng-section">
      <button className="btn link" onClick={onBack}>
        ← English
      </button>
      <h2 className="drill-title">Dictionary</h2>
      <p className="tagline">
        Free word meanings via Dictionary API — type any English word.
      </p>

      <form
        className="dict-form"
        onSubmit={(e) => {
          e.preventDefault()
          search()
        }}
      >
        <input
          className="topics-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Look up a word…"
          aria-label="Word to look up"
        />
        <button className="btn primary" type="submit" disabled={loading || !q.trim()}>
          {loading ? '…' : 'Search'}
        </button>
      </form>

      <div className="dict-suggest">
        {SUGGESTED_WORDS.map((w) => (
          <button key={w} type="button" className="btn ghost small" onClick={() => search(w)}>
            {w}
          </button>
        ))}
      </div>

      {error && <p className="fatal">{error}</p>}

      {entry && (
        <article className="dict-card">
          <header className="dict-head">
            <h3>{entry.word}</h3>
            {entry.phonetic && <span className="dict-phonetic">{entry.phonetic}</span>}
            {entry.audio && (
              <button type="button" className="btn ghost small" onClick={playAudio}>
                🔊 Hear
              </button>
            )}
          </header>
          {entry.meanings.map((m, i) => (
            <section key={i} className="dict-meaning">
              <h4>{m.partOfSpeech}</h4>
              <ol>
                {m.definitions.map((d, j) => (
                  <li key={j}>
                    <p>{d.definition}</p>
                    {d.example && <p className="dict-ex">“{d.example}”</p>}
                    {d.synonyms?.length > 0 && (
                      <p className="dict-syn">Synonyms: {d.synonyms.join(', ')}</p>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </article>
      )}
    </div>
  )
}
