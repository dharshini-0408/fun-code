import { useEffect, useRef, useState } from 'react'
import ChoicePuzzle from './ChoicePuzzle.jsx'
import CodePuzzle from './CodePuzzle.jsx'
import Lesson from './Lesson.jsx'
import MarkupPuzzle from './MarkupPuzzle.jsx'
import OrderPuzzle from './OrderPuzzle.jsx'
import PythonPuzzle from './PythonPuzzle.jsx'
import Tutor from './Tutor.jsx'

const PUZZLES = {
  code: CodePuzzle,
  choice: ChoicePuzzle,
  order: OrderPuzzle,
  markup: MarkupPuzzle,
  python: PythonPuzzle,
}

export default function RoomView({
  room,
  index,
  total,
  solved,
  draft,
  hintsUsed,
  onDraft,
  onSolve,
  onHint,
  onNext,
  onMap,
  onReroll,
  isLast,
}) {
  const [justEscaped, setJustEscaped] = useState(false)
  const [attempt, setAttempt] = useState(null)
  const top = useRef(null)
  const Puzzle = PUZZLES[room.puzzle.kind]
  const hints = room.puzzle.hints ?? []
  const shown = hintsUsed ?? 0

  // App re-keys this component per room, so a mount IS an arrival: start at the top.
  useEffect(() => {
    top.current?.scrollIntoView({ block: 'start' })
  }, [])

  function handleSolved() {
    setJustEscaped(true)
    onSolve()
  }

  return (
    <article className="room" ref={top}>
      <header className="room-head">
        <button className="btn link" onClick={onMap}>
          ← the staircase
        </button>
        <span className="room-count">
          {room.generated
            ? `duelling club · ${room.levelLabel ?? room.level}`
            : `lesson ${index + 1} of ${total} · ${room.worldName}`}
        </span>
      </header>

      <h1 className="room-title">
        {room.name}
        {solved && <span className="solved-tag">passed</span>}
      </h1>
      <p className="concept">{room.concept}</p>
      <p className="brief">{room.brief}</p>

      {room.lesson.length > 0 && (
        <section className="panel">
          <h2 className="panel-title">The lesson</h2>
          <Lesson blocks={room.lesson} />
        </section>
      )}

      <section className="panel lock">
        <h2 className="panel-title">The examination</h2>
        <p className="prompt">{room.puzzle.prompt}</p>

        <Puzzle
          room={room}
          draft={draft}
          onDraft={onDraft}
          onSolved={handleSolved}
          onAttempt={setAttempt}
          solved={solved}
        />

        {hints.length > 0 && (
          <div className="hints">
            {hints.slice(0, shown).map((h, i) => (
              <p key={i} className="hint">
                <span className="hint-n">whisper {i + 1}</span>
                {h}
              </p>
            ))}
            {shown < hints.length && (
              <button className="btn ghost small" onClick={() => onHint(shown + 1)}>
                {shown === 0
                  ? 'stuck? ask the portrait'
                  : `another whisper (${hints.length - shown} left)`}
              </button>
            )}
          </div>
        )}

        <Tutor room={room} code={attempt?.code} failure={attempt?.failure} />
      </section>

      {(justEscaped || solved) && (
        <footer className={`escape ${justEscaped ? 'fresh' : ''}`}>
          <p className="escape-line">
            {room.generated
              ? 'Won. Your opponent bows. There is always another.'
              : isLast
                ? 'The last door swings open. The grounds, and daylight.'
                : 'The bolt slides back. The staircase swings round to the next landing.'}
          </p>
          {room.generated ? (
            <button className="btn primary big" onClick={onReroll}>
              duel again →
            </button>
          ) : isLast ? (
            <button className="btn primary big" onClick={onMap}>
              see the whole castle
            </button>
          ) : (
            <button className="btn primary big" onClick={onNext}>
              climb on →
            </button>
          )}
        </footer>
      )}
    </article>
  )
}
