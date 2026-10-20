// Renders the teaching half of a room. `code` blocks get inline-code styling
// for anything the author wrapped in backticks inside prose.
export default function Lesson({ blocks }) {
  return (
    <div className="lesson">
      {blocks.map((b, i) => {
        if (b.type === 'code') return <pre key={i} className="snippet">{b.code}</pre>
        if (b.type === 'note')
          return (
            <p key={i} className="note">
              <span className="note-mark">note</span>
              {inline(b.text)}
            </p>
          )
        return <p key={i}>{inline(b.text)}</p>
      })}
    </div>
  )
}

function inline(text) {
  return text.split(/`([^`]+)`/g).map((part, i) =>
    i % 2 ? <code key={i}>{part}</code> : part,
  )
}
