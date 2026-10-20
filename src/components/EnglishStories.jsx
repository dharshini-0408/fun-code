import { useEffect, useState } from 'react'
import BookShelf from './BookShelf.jsx'
import { fetchBookText, fetchStoryBooks } from '../data/stories.js'

export default function EnglishStories({ onBack }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('fairy tales')
  const [reading, setReading] = useState(null)
  const [text, setText] = useState('')
  const [textLoading, setTextLoading] = useState(false)

  async function load(q = search) {
    setLoading(true)
    setError('')
    try {
      setBooks(await fetchStoryBooks({ search: q || 'children' }))
    } catch (e) {
      setError(e.message || 'Could not load books.')
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load('fairy tales')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function openBook(book) {
    setReading(book)
    setText('')
    setTextLoading(true)
    try {
      setText(await fetchBookText(book.textUrl))
    } catch (e) {
      setText('')
      setError(e.message || 'Could not open book.')
    } finally {
      setTextLoading(false)
    }
  }

  if (reading) {
    return (
      <div className="drill eng-section story-reader">
        <button
          className="btn link"
          onClick={() => {
            setReading(null)
            setError('')
          }}
        >
          ← shelf
        </button>
        <h2 className="drill-title">{reading.fullTitle || reading.name}</h2>
        <p className="dimmed">{reading.author}</p>
        {textLoading && <p className="tutor-note">Opening pages…</p>}
        {error && !text && <p className="fatal">{error}</p>}
        {text && <pre className="story-text">{text}</pre>}
      </div>
    )
  }

  return (
    <div className="english-hall-drill eng-stories">
      <div className="drill eng-section" style={{ maxWidth: 980, paddingBottom: 0 }}>
        <button className="btn link" onClick={onBack}>
          ← English
        </button>
        <h2 className="drill-title">Story Book</h2>
        <p className="tagline">
          Free public-domain books from Project Gutenberg (Gutendex). Pull a tome and read.
        </p>

        <form
          className="dict-form"
          onSubmit={(e) => {
            e.preventDefault()
            load(search)
          }}
        >
          <input
            className="topics-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stories… alice, robinson, fairy…"
            aria-label="Search storybooks"
          />
          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? '…' : 'Find'}
          </button>
        </form>
        {error && <p className="fatal">{error}</p>}
      </div>

      {loading && <p className="tutor-note" style={{ textAlign: 'center' }}>Fetching the shelf…</p>}

      {!loading && books.length > 0 && (
        <BookShelf
          books={books}
          onOpen={openBook}
          hint="Pull a story from the shelf"
        />
      )}

      {!loading && books.length === 0 && !error && (
        <p className="dimmed" style={{ textAlign: 'center' }}>
          No books matched. Try another search.
        </p>
      )}
    </div>
  )
}
