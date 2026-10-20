import { useState } from 'react'

// Deterministic shuffle, so the puzzle looks the same each visit — and a guard
// so the starting order is never accidentally the answer.
function scramble(lines) {
  const out = lines.map((line, i) => ({ line, i }))
  for (let i = out.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  if (out.every((o, i) => o.i === i)) out.reverse()
  return out
}

export default function OrderPuzzle({ room, onSolved, solved }) {
  const { puzzle } = room
  const [items, setItems] = useState(() => scramble(puzzle.lines))
  const [checked, setChecked] = useState(false)

  const correct = items.every((it, i) => it.i === i)

  function move(from, to) {
    if (to < 0 || to >= items.length) return
    const next = [...items]
    ;[next[from], next[to]] = [next[to], next[from]]
    setItems(next)
    setChecked(false)
  }

  function submit() {
    setChecked(true)
    if (correct) onSolved()
  }

  return (
    <>
      {puzzle.code && <pre className="snippet">{puzzle.code}</pre>}

      <ol className="order-list">
        {items.map((it, i) => (
          <li
            key={it.i}
            className={checked ? (it.i === i ? 'right' : 'wrong') : ''}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', String(i))}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const from = Number(e.dataTransfer.getData('text/plain'))
              if (Number.isInteger(from) && from !== i) {
                const next = [...items]
                const [moved] = next.splice(from, 1)
                next.splice(i, 0, moved)
                setItems(next)
                setChecked(false)
              }
            }}
          >
            <span className="step">{i + 1}</span>
            <code>{it.line}</code>
            <span className="nudge">
              <button onClick={() => move(i, i - 1)} disabled={i === 0} aria-label="move up">
                ↑
              </button>
              <button
                onClick={() => move(i, i + 1)}
                disabled={i === items.length - 1}
                aria-label="move down"
              >
                ↓
              </button>
            </span>
          </li>
        ))}
      </ol>

      <div className="run-row">
        <button className="btn primary" onClick={submit}>
          {solved ? 'check again' : 'set the incantation'}
        </button>
      </div>

      {checked && (
        <div className={`report ${correct ? 'pass' : 'fail'}`}>
          <p className="verdict">
            {correct
              ? 'The incantation runs true.'
              : 'It falters. Some lines are out of order.'}
          </p>
          {correct && <p className="explain">{puzzle.explain}</p>}
        </div>
      )}
    </>
  )
}
