import { useEffect, useRef, useState } from 'react'
import {
  ENGLISH_MODEL,
  TUTOR_MODELS,
  askEnglishCoach,
  loadTutor,
  rememberModel,
  savedModel,
  supportsWebGPU,
  tutorReady,
} from '../ai/tutor.js'

function speechSupported() {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

export default function EnglishCoach({ onBack }) {
  const [model, setModel] = useState(() => {
    const saved = savedModel()
    // Prefer the small language model for English; keep a saved code model if already awake.
    return tutorReady() ? saved : ENGLISH_MODEL
  })
  const [phase, setPhase] = useState(tutorReady() ? 'ready' : 'idle')
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const [sentence, setSentence] = useState('')
  const [reply, setReply] = useState('')
  const [error, setError] = useState('')
  const [listening, setListening] = useState(false)
  const abort = useRef(null)
  const recognition = useRef(null)

  const webgpu = supportsWebGPU()
  const canSpeak = speechSupported()
  const chosen = TUTOR_MODELS.find((m) => m.id === model) ?? TUTOR_MODELS[0]

  useEffect(() => {
    return () => {
      abort.current?.abort()
      try {
        recognition.current?.stop()
      } catch {
        /* ignore */
      }
    }
  }, [])

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
      setError(e.message || 'The coach could not wake up.')
      setPhase('idle')
    }
  }

  async function correct(raw) {
    const text = (raw ?? sentence).trim()
    if (!text || phase === 'asking') return
    setPhase('asking')
    setReply('')
    setError('')
    abort.current = new AbortController()
    try {
      await askEnglishCoach({
        sentence: text,
        signal: abort.current.signal,
        onToken: setReply,
      })
    } catch (e) {
      setError(e.message || 'The coach could not answer.')
    }
    setPhase('ready')
  }

  function toggleListen() {
    if (!canSpeak) return
    if (listening) {
      recognition.current?.stop()
      setListening(false)
      return
    }

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SR()
    recognition.current = rec
    rec.lang = 'en-US'
    rec.interimResults = true
    rec.continuous = false

    let finalText = ''
    rec.onresult = (e) => {
      let interim = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const chunk = e.results[i][0].transcript
        if (e.results[i].isFinal) finalText += chunk
        else interim += chunk
      }
      setSentence((finalText || interim).trim())
    }
    rec.onerror = () => setListening(false)
    rec.onend = () => {
      setListening(false)
      const text = finalText.trim()
      if (!text) return
      setSentence(text)
      if (tutorReady()) void correct(text)
    }
    setListening(true)
    setError('')
    try {
      rec.start()
    } catch {
      setListening(false)
      setError('Could not start the microphone. Check browser permission.')
    }
  }

  return (
    <div className="drill coach">
      <button className="btn link" onClick={onBack}>
        ← English shelves
      </button>
      <h2 className="drill-title">Speak & Correct</h2>
      <p className="tagline" style={{ marginBottom: 18 }}>
        Type a sentence or speak into the mic. Kitty runs free in your browser — no account, no API
        key, nothing leaves your machine — and rewrites it correctly.
      </p>

      {!webgpu && (
        <p className="tutor-note">
          This browser has no WebGPU, so the coach stays asleep. Use a recent Chrome or Edge.
          Grammar, spelling, and listening still work without it.
        </p>
      )}

      {webgpu && phase === 'idle' && (
        <>
          <p className="tutor-note">
            First wake downloads the model once ({chosen.size}) and caches it. “Small” is best for
            English correction.
          </p>
          <div className="model-picker">
            {TUTOR_MODELS.map((m) => (
              <label key={m.id} className={`model ${model === m.id ? 'picked' : ''}`}>
                <input
                  type="radio"
                  name="english-coach-model"
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
            wake the coach
          </button>
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
          <form
            className="coach-form"
            onSubmit={(e) => {
              e.preventDefault()
              correct()
            }}
          >
            <textarea
              className="coach-input"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="Type a sentence… e.g. She go to school yesterday"
              rows={3}
              disabled={phase === 'asking'}
              aria-label="Sentence to correct"
            />
            <div className="coach-actions">
              {canSpeak && (
                <button
                  type="button"
                  className={`btn coach-mic ${listening ? 'on' : ''}`}
                  onClick={toggleListen}
                  disabled={phase === 'asking'}
                  aria-pressed={listening}
                >
                  {listening ? 'Stop mic' : 'Speak'}
                </button>
              )}
              <button
                className="btn primary"
                type="submit"
                disabled={phase === 'asking' || !sentence.trim()}
              >
                {phase === 'asking' ? 'correcting…' : 'Correct it'}
              </button>
            </div>
          </form>

          {!canSpeak && (
            <p className="dimmed" style={{ marginTop: 10 }}>
              Speech input needs Chrome/Edge (or Safari). You can still type.
            </p>
          )}

          {reply && (
            <div className="coach-reply">
              <h3 className="coach-reply-title">Kitty</h3>
              <pre className="tutor-answer">{reply}</pre>
            </div>
          )}
        </>
      )}

      {error && <p className="fatal">{error}</p>}
    </div>
  )
}
