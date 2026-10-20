import { categoryCount } from '../data/english.js'

/**
 * Book shelf UI — upright tomes on wooden ledges.
 * Used by Story Book (and any future library section).
 */
export default function BookShelf({ books = [], onOpen, hint = 'Pull a tome from the shelf' }) {
  const rows = groupShelves(books)

  return (
    <div className="spell-shelf-wrap">
      {hint && <p className="spell-shelf-hint">{hint}</p>}
      {rows.map((row, ri) => (
        <div key={ri} className="spell-shelf" role="list">
          <div className="spell-shelf-ledge" aria-hidden="true" />
          {row.map((c, i) => {
            let count = c.count
            if (count == null) {
              try {
                count = categoryCount(c)
              } catch {
                count = ''
              }
            }
            return (
              <button
                key={c.id}
                type="button"
                role="listitem"
                className={`spell-tome tome-${i % 5}`}
                style={{
                  '--accent': c.accent,
                  '--tilt': `${(i % 2 === 0 ? -1 : 1) * (0.8 + (i % 3) * 0.35)}deg`,
                }}
                onClick={() => onOpen?.(c)}
                title={c.blurb || c.fullTitle}
              >
                <span className="tome-band" aria-hidden="true" />
                <span className="tome-icon" aria-hidden="true">
                  {c.icon || '📖'}
                </span>
                <span className="tome-title">{c.name}</span>
                {count !== '' && count != null && <span className="tome-count">{count}</span>}
                {c.blurb && <span className="tome-tip">{c.blurb}</span>}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function groupShelves(books) {
  const hasShelf = books.some((b) => b.shelf != null)
  if (!hasShelf) {
    const rows = []
    for (let i = 0; i < books.length; i += 8) rows.push(books.slice(i, i + 8))
    return rows.length ? rows : [[]]
  }
  const by = new Map()
  for (const b of books) {
    const key = b.shelf ?? 0
    if (!by.has(key)) by.set(key, [])
    by.get(key).push(b)
  }
  return [...by.keys()].sort((a, b) => a - b).map((k) => by.get(k))
}
