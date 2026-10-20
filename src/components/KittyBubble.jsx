import { useEffect, useRef, useState } from 'react'
import {
  ENGLISH_GUIDE_HELLO,
  ENGLISH_MODEL,
  TUTOR_MODELS,
  askEnglishGuide,
  loadTutor,
  rememberModel,
  savedModel,
  supportsWebGPU,
  tutorReady,
} from '../ai/tutor.js'
import {
  ENGLISH_LEVELS,
  ENGLISH_TOPICS,
  curriculumOutline,
  topicById,
} from '../data/englishCurriculum.js'

function speechSupported() {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

const OUTLINE = curriculumOutline(6)

export default function KittyBubble({
  open,
  onOpen,
  onClose,
  focusTopicId = null,
  hideFab = false,
  seal = false,
}) {
  const focus = topicById(focusTopicId)
  const [model, setModel] = useState(() => (tutorReady() ? savedModel() : ENGLISH_MODEL))
  const [phase, setPhase] = useState(tutorReady() ? 'ready' : 'idle')
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [listening, setListening] = useState(false)
  const [activeTopicId, setActiveTopicId] = useState(focusTopicId)
  const [messages, setMessages] = useState(() => helloMessages(focus))
  const abort = useRef(null)
  const recognition = useRef(null)
  const scroller = useRef(null)
  const prevFocus = useRef(focusTopicId)

  const webgpu = supportsWebGPU()
  const canSpeak = speechSupported()
  const chosen = TUTOR_MODELS.find((m) => m.id === model) ?? TUTOR_MODELS[0]
  const activeTopic = topicById(activeTopicId)

  // When a topic is opened from the Spellbook, refresh the greeting.
  useEffect(() => {
    if (focusTopicId && focusTopicId !== prevFocus.current) {
      prevFocus.current = focusTopicId
      setActiveTopicId(focusTopicId)
      setMessages(helloMessages(topicById(focusTopicId)))
    }
  }, [focusTopicId])

  useEffect(() => {
    if (!open) return
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages, phase, open])

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
      setError(e.message || 'Kitty could not wake up.')
      setPhase('idle')
    }
  }

  async function send(raw) {
    const text = (raw ?? input).trim()
    if (!text || phase === 'asking') return

    const lower = text.toLowerCase()
    const hit =
      ENGLISH_TOPICS.find((t) => lower.includes(t.name.toLowerCase())) ||
      ENGLISH_TOPICS.find((t) => lower.includes(t.area.toLowerCase()) && lower.includes('learn'))
    if (hit) setActiveTopicId(hit.id)

    const history = messages
    setMessages((m) => [...m, { role: 'user', content: text }, { role: 'assistant', content: '' }])
    setInput('')
    setPhase('asking')
    setError('')
    abort.current = new AbortController()

    try {
      const reply = await askEnglishGuide({
        history,
        message: text,
        focusTopic: hit || activeTopic,
        outline: OUTLINE,
        signal: abort.current.signal,
        onToken: (partial) => {
          setMessages((m) => {
            const copy = m.slice()
            copy[copy.length - 1] = { role: 'assistant', content: partial }
            return copy
          })
        },
      })
      if (!reply.trim()) {
        setMessages((m) => {
          const copy = m.slice()
          copy[copy.length - 1] = {
            role: 'assistant',
            content: 'Hmm, I blanked for a second. Try again — or tap a suggestion below.',
          }
          return copy
        })
      }
    } catch (e) {
      setError(e.message || 'Kitty could not answer.')
      setMessages((m) => m.slice(0, -1))
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
      setInput((finalText || interim).trim())
    }
    rec.onerror = () => setListening(false)
    rec.onend = () => {
      setListening(false)
      const text = finalText.trim()
      if (text && tutorReady()) void send(text)
    }
    setListening(true)
    try {
      rec.start()
    } catch {
      setListening(false)
      setError('Microphone could not start.')
    }
  }

  const chips = activeTopic?.starters ?? [
    'Hey Kitty!',
    'I want to learn grammar',
    'Suggest a topic',
  ]

  return (
    <div className={`kitty ${open ? 'open' : ''}`}>
      {open && (
        <div className="kitty-panel" role="dialog" aria-label="Kitty chat">
          <header className="kitty-head">
            <span className="kitty-face" aria-hidden="true">
              🐱
            </span>
            <div className="kitty-titles">
              <strong>Kitty</strong>
              <span>{activeTopic ? activeTopic.name : 'English chat'}</span>
            </div>
            <button type="button" className="kitty-close" onClick={onClose} aria-label="Close Kitty">
              ✕
            </button>
          </header>

          {!webgpu && (
            <p className="kitty-note">Needs Chrome or Edge (WebGPU) to chat.</p>
          )}

          {webgpu && phase === 'idle' && (
            <div className="kitty-wake">
              <p className="kitty-note">
                Free on-device AI ({chosen.size}). Downloads once, then stays with you.
              </p>
              <div className="model-picker kitty-models">
                {TUTOR_MODELS.slice(0, 2).map((m) => (
                  <label key={m.id} className={`model ${model === m.id ? 'picked' : ''}`}>
                    <input
                      type="radio"
                      name="kitty-model"
                      checked={model === m.id}
                      onChange={() => setModel(m.id)}
                    />
                    <span className="model-label">
                      {m.label} <span className="model-size">{m.size}</span>
                    </span>
                  </label>
                ))}
              </div>
              <button className="btn primary" onClick={start}>
                Wake Kitty
              </button>
            </div>
          )}

          {phase === 'loading' && (
            <div className="kitty-wake">
              <div className="meter-bar tutor-bar">
                <span style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
              <p className="kitty-note">{status || 'waking…'}</p>
            </div>
          )}

          {(phase === 'ready' || phase === 'asking') && (
            <>
              <div className="kitty-chat" ref={scroller} role="log" aria-live="polite">
                {messages.map((m, i) => (
                  <div key={i} className={`guide-bubble ${m.role}`}>
                    <span className="guide-who">{m.role === 'assistant' ? 'Kitty' : 'You'}</span>
                    <p>{m.content || (phase === 'asking' && i === messages.length - 1 ? '…' : '')}</p>
                  </div>
                ))}
              </div>

              <div className="kitty-chips">
                {chips.slice(0, 3).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="btn ghost small"
                    disabled={phase === 'asking'}
                    onClick={() => send(c)}
                  >
                    {c}
                  </button>
                ))}
                {!activeTopic &&
                  ENGLISH_LEVELS.slice(0, 2).map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      className="btn ghost small"
                      disabled={phase === 'asking'}
                      onClick={() => send(`I want to learn ${l.name} English. Suggest topics.`)}
                    >
                      {l.name}
                    </button>
                  ))}
              </div>

              <form
                className="kitty-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  send()
                }}
              >
                <input
                  className="tutor-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Kitty…"
                  disabled={phase === 'asking'}
                  aria-label="Message to Kitty"
                />
                {canSpeak && (
                  <button
                    type="button"
                    className={`btn coach-mic ${listening ? 'on' : ''}`}
                    onClick={toggleListen}
                    disabled={phase === 'asking'}
                    aria-label={listening ? 'Stop listening' : 'Speak'}
                  >
                    {listening ? '⏹' : '🎤'}
                  </button>
                )}
                <button
                  className="btn primary"
                  type="submit"
                  disabled={phase === 'asking' || !input.trim()}
                >
                  {phase === 'asking' ? '…' : '↑'}
                </button>
              </form>
            </>
          )}

          {error && <p className="fatal kitty-error">{error}</p>}
        </div>
      )}

      {!hideFab && (
        <button
          type="button"
          className={`kitty-fab ${seal ? 'kitty-seal' : ''} ${open ? 'on' : ''}`}
          onClick={() => (open ? onClose() : onOpen())}
          aria-label={open ? 'Close Kitty chat' : 'Wake Kitty'}
          aria-expanded={open}
        >
          {seal && !open ? (
            <img src="/chamber/door.png" alt="" />
          ) : (
            <span aria-hidden="true">{open ? '✕' : '🐱'}</span>
          )}
        </button>
      )}
    </div>
  )
}

function helloMessages(focus) {
  return [
    {
      role: 'assistant',
      content: focus
        ? `Hey! I'm Kitty 🐱 — let's learn “${focus.name}”. ${focus.goal} Say hi or ask me to start.`
        : ENGLISH_GUIDE_HELLO,
    },
  ]
}
