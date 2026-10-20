import { useRef, useState } from 'react'
import {
  TUTOR_MODELS,
  askTutor,
  loadTutor,
  rememberModel,
  savedModel,
  supportsWebGPU,
  tutorReady,
} from '../ai/tutor.js'

const SUGGESTIONS = [
  'Explain this room in simpler words',
  'Give me a different example',
  'What am I misunderstanding?',
]

export default function Tutor({ room, code, failure }) {
  const [open, setOpen] = useState(false)
  const [model, setModel] = useState(savedModel)
  const [phase, setPhase] = useState(tutorReady() ? 'ready' : 'idle')
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const abort = useRef(null)

  const webgpu = supportsWebGPU()
  const chosen = TUTOR_MODELS.find((m) => m.id === model) ?? TUTOR_MODELS[1]

  async function start() {
    setPhase('loading')
    setError('')
    try {
      rememberModel(model)
      await loadTutor(model, (p, text) => {
        setProgress(p)
        setStatus(text)
      })
      setPhase('ready')
    } catch (e) {
      setError(e.message || 'The model could not be loaded.')
      setPhase('idle')
    }
  }

  async function ask(q) {
    const text = (q ?? question).trim()
    if (!text || phase === 'asking') return
    setPhase('asking')
    setAnswer('')
    setError('')
    abort.current = new AbortController()
    try {
      await askTutor({
        room,
        question: text,
        code,
        failure,
        signal: abort.current.signal,
        onToken: setAnswer,
      })
    } catch (e) {
      setError(e.message || 'The portrait would not answer.')
    }
    setPhase('ready')
  }

  if (!open) {
    return (
      <button className="btn ghost small tutor-open" onClick={() => setOpen(true)}>
        🖼️ ask the portrait
      </button>
    )
  }

  return (
    <section className="tutor">
      <header className="tutor-head">
        <h3>Tutor</h3>
        <span className="tutor-badge">free · never leaves the castle</span>
        <button className="btn link" onClick={() => setOpen(false)}>
          close
        </button>
      </header>

      {!webgpu && (
        <p className="tutor-note">
          This browser has no WebGPU, so the portrait stays asleep. Chrome or Edge (recent
          versions) support it. Everything else in the game works without it.
        </p>
      )}

      {webgpu && phase === 'idle' && (
        <>
          <p className="tutor-note">
            The portrait is a small AI model that runs entirely inside your browser — no account,
            no API key, no cost, and nothing leaves your machine. It downloads once
            ({chosen.size}) and is cached afterwards.
          </p>
          <div className="model-picker">
            {TUTOR_MODELS.map((m) => (
              <label key={m.id} className={`model ${model === m.id ? 'picked' : ''}`}>
                <input
                  type="radio"
                  name="tutor-model"
                  checked={model === m.id}
                  onChange={() => setModel(m.id)}
                />
                <span className="model-label">
                  {m.label} <span className="model-size">{m.size}</span>
                </span>
                <span className="model-note">{m.note}</span>
              </label>
            ))}
          </div>
          <button className="btn primary" onClick={start}>
            wake the portrait
          </button>
          <p className="tutor-warn">
            It is a small model, so treat it as a study partner rather than an authority — the
            lessons and the tests are what is actually correct here.
          </p>
        </>
      )}

      {phase === 'loading' && (
        <>
          <div className="meter-bar tutor-bar">
            <span style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
          <p className="tutor-note">{status || 'starting…'}</p>
        </>
      )}

      {(phase === 'ready' || phase === 'asking') && (
        <>
          <div className="tutor-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="btn ghost small" onClick={() => ask(s)} disabled={phase === 'asking'}>
                {s}
              </button>
            ))}
            {failure && (
              <button
                className="btn ghost small"
                onClick={() => ask('Why did my code fail that test?')}
                disabled={phase === 'asking'}
              >
                Why did my code fail?
              </button>
            )}
          </div>

          <form
            className="tutor-form"
            onSubmit={(e) => {
              e.preventDefault()
              ask()
            }}
          >
            <input
              className="tutor-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask the portrait anything…"
              disabled={phase === 'asking'}
            />
            <button className="btn primary" disabled={phase === 'asking' || !question.trim()}>
              {phase === 'asking' ? 'thinking…' : 'ask'}
            </button>
          </form>

          {answer && <div className="tutor-answer">{answer}</div>}
        </>
      )}

      {error && <p className="fatal">{error}</p>}
    </section>
  )
}
