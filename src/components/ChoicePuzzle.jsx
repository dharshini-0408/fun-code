import { useState } from 'react'

export default function ChoicePuzzle({ room, onSolved, solved }) {
  const { puzzle } = room
  const [picked, setPicked] = useState(null)
  const [checked, setChecked] = useState(false)

  const correct = checked && picked === puzzle.answer

  function submit() {
    setChecked(true)
    if (picked === puzzle.answer) onSolved()
  }

  return (
    <>
      {puzzle.code && <pre className="snippet">{puzzle.code}</pre>}

      <ul className="options">
        {puzzle.options.map((opt, i) => {
          const state =
            !checked ? '' : i === puzzle.answer ? 'right' : i === picked ? 'wrong' : ''
          return (
            <li key={i}>
              <button
                className={`option ${picked === i ? 'picked' : ''} ${state}`}
                onClick={() => {
                  setPicked(i)
                  setChecked(false)
                }}
              >
                <span className="bullet">{'ABCD'[i]}</span>
                <code>{opt}</code>
              </button>
            </li>
          )
        })}
      </ul>

      <div className="run-row">
        <button className="btn primary" onClick={submit} disabled={picked === null}>
          {solved ? 'answer again' : 'give your answer'}
        </button>
      </div>

      {checked && (
        <div className={`report ${correct ? 'pass' : 'fail'}`}>
          <p className="verdict">
            {correct ? 'Correct. The door unbolts.' : 'No. The door does not stir.'}
          </p>
          {correct && <p className="explain">{puzzle.explain}</p>}
        </div>
      )}
    </>
  )
}
