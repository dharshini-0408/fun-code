import { useEffect, useRef, useState } from 'react'
import {
  ENGLISH_MODEL,
  askEnglishCoach,
  loadTutor,
  rememberModel,
  supportsWebGPU,
  tutorReady,
} from '../ai/tutor.js'
import { WRITING_PROMPTS, writingSelfCheck } from '../data/writingData.js'

export default function EnglishWriting({ onBack }) {
  const [i, setI] = useState(0)
  const [draft, setDraft] = useState('')
  const [check, setCheck] = useState(null)
  const [phase, setPhase] = useState(tutorReady() ? 'ready' : 'idle')
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const [reply, setReply] = useState('')
  const [error, setError] = useState('')
  const abort = useRef(null)
  const prompt = WRITING_PROMPTS[i]
  const webgpu = supportsWebGPU()

  useEffect(
    () => () => {
      abort.current?.abort()
    },
    [],
  )

  function runCheck() {
    setCheck(writingSelfCheck(draft))
  }

  function next() {
    setI((n) => (n + 1) % WRITING_PROMPTS.length)
    setDraft('')
    setCheck(null)
    setReply('')
    setError('')
  }

  async function wake() {
    setPhase('loading')
    setError('')
    try {
      rememberModel(ENGLISH_MODEL)
      await loadTutor(ENGLISH_MODEL, (p, text) => {
        setProgress(p)
        setStatus(text)
      })
      setPhase('ready')
    } catch (e) {
      setError(e.message || 'Kitty could not wake up.')
      setPhase('idle')
    }
  }

  async function askKitty() {
    const text = draft.trim()
    if (!text || phase === 'asking') return
    if (!tutorReady()) {
      setError('Wake Kitty first for AI feedback (optional).')
      return
    }
    setPhase('asking')
    setReply('')
    setError('')
    abort.current = new AbortController()
    try {
      await askEnglishCoach({
        sentence: `Writing prompt: ${prompt.prompt}\n\nStudent writing:\n${text}`,
        signal: abort.current.signal,
        onToken: setReply,
      })
    } catch (e) {
      setError(e.message || 'Kitty could not answer.')
    }
    setPhase('ready')
  }

  return (
    <div className="drill eng-section">
      <button className="btn link" onClick={onBack}>
        ← English
      </button>
      <h2 className="drill-title">Writing</h2>
      <p className="tagline">
        Guided prompts with self-check tips — optional free Kitty feedback in your browser.
      </p>

      <p className="drill-progress">
        {prompt.level} · {i + 1} / {WRITING_PROMPTS.length}
      </p>
      <h3 className="drill-title" style={{ fontSize: 22 }}>
        {prompt.title}
      </h3>
      <p className="drill-sentence">{prompt.prompt}</p>

      <ul className="dimmed" style={{ margin: '8px 0 12px', paddingLeft: 18 }}>
        {prompt.tips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <textarea
        className="coach-input"
        rows={6}
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value)
          setCheck(null)
        }}
        placeholder="Write here…"
        aria-label="Your writing"
        disabled={phase === 'asking'}
      />

      <div className="drill-actions">
        <button className="btn primary" type="button" onClick={runCheck} disabled={!draft.trim()}>
          Self-check
        </button>
        <button className="btn" type="button" onClick={next}>
          Next prompt
        </button>
      </div>

      <details className="sent-sample">
        <summary>Show a sample</summary>
        <p style={{ whiteSpace: 'pre-wrap' }}>{prompt.sample}</p>
      </details>

      {check && (
        <div className="dict-card" style={{ marginTop: 14 }}>
          <h4>
            Checklist {check.passed}/{check.total}
          </h4>
          <ul>
            {check.checks.map((c) => (
              <li key={c.id} className={c.ok ? 'drill-ok' : 'drill-bad'}>
                {c.ok ? '✓' : '○'} {c.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <h3 className="drill-title" style={{ fontSize: 18 }}>
          Optional: Kitty feedback
        </h3>
        {!webgpu && (
          <p className="dimmed">WebGPU needed for Kitty. Self-check and samples still work.</p>
        )}
        {webgpu && phase === 'idle' && (
          <button className="btn" type="button" onClick={wake}>
            Wake Kitty
          </button>
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
          <button
            className="btn primary"
            type="button"
            onClick={askKitty}
            disabled={!draft.trim() || phase === 'asking'}
          >
            {phase === 'asking' ? 'Reading…' : 'Ask Kitty to improve it'}
          </button>
        )}
        {reply && (
          <div className="coach-reply" style={{ marginTop: 12 }}>
            <h3 className="coach-reply-title">Kitty</h3>
            <pre className="tutor-answer">{reply}</pre>
          </div>
        )}
        {error && <p className="fatal">{error}</p>}
      </div>
    </div>
  )
}
