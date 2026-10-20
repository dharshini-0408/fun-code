import { useEffect, useRef, useState } from 'react'
import { SPEAKING_SCENARIOS, scoreSpeaking } from '../data/speakingData.js'

function speechSupported() {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

export default function EnglishSpeaking({ onBack }) {
  const [i, setI] = useState(0)
  const [draft, setDraft] = useState('')
  const [result, setResult] = useState(null)
  const [listening, setListening] = useState(false)
  const recognition = useRef(null)
  const scene = SPEAKING_SCENARIOS[i]
  const canSpeak = speechSupported()

  useEffect(
    () => () => {
      try {
        recognition.current?.stop()
      } catch {
        /* ignore */
      }
    },
    [],
  )

  function check(text = draft) {
    setResult(scoreSpeaking(text, scene.keywords))
  }

  function next() {
    setI((n) => (n + 1) % SPEAKING_SCENARIOS.length)
    setDraft('')
    setResult(null)
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
      for (let n = e.resultIndex; n < e.results.length; n++) {
        const chunk = e.results[n][0].transcript
        if (e.results[n].isFinal) finalText += chunk
        else interim += chunk
      }
      setDraft((finalText || interim).trim())
    }
    rec.onerror = () => setListening(false)
    rec.onend = () => {
      setListening(false)
      const text = finalText.trim()
      if (text) {
        setDraft(text)
        check(text)
      }
    }
    setListening(true)
    setResult(null)
    try {
      rec.start()
    } catch {
      setListening(false)
    }
  }

  return (
    <div className="drill eng-section">
      <button className="btn link" onClick={onBack}>
        ← English
      </button>
      <h2 className="drill-title">Speaking / Conversation</h2>
      <p className="tagline">
        Practise real situations — speak into the mic or type your reply.
      </p>

      <p className="drill-progress">
        Scene {i + 1} / {SPEAKING_SCENARIOS.length}
      </p>
      <h3 className="drill-title" style={{ fontSize: 22 }}>
        {scene.title}
      </h3>
      <p className="dimmed">{scene.setting}</p>
      <p className="drill-sentence">{scene.prompt}</p>

      {!canSpeak && (
        <p className="dimmed">Mic needs Chrome/Edge. You can still type your answer.</p>
      )}

      <textarea
        className="coach-input"
        rows={3}
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value)
          setResult(null)
        }}
        placeholder="Say or type your reply…"
        aria-label="Your spoken reply"
      />

      <div className="drill-actions">
        {canSpeak && (
          <button
            type="button"
            className={`btn coach-mic ${listening ? 'on' : ''}`}
            onClick={toggleListen}
          >
            {listening ? 'Listening…' : 'Speak'}
          </button>
        )}
        <button className="btn primary" type="button" onClick={() => check()} disabled={!draft.trim()}>
          Check
        </button>
        <button className="btn" type="button" onClick={next}>
          Next scene
        </button>
      </div>

      <details className="sent-sample">
        <summary>Show a sample answer</summary>
        <p>{scene.sample}</p>
      </details>

      {result && (
        <p className={result.ok ? 'drill-ok' : 'drill-bad'}>
          {result.ok
            ? `Nice — you covered key ideas (${result.hits} useful words).`
            : `Try again — include a few of: ${scene.keywords.slice(0, 4).join(', ')}…`}
        </p>
      )}
    </div>
  )
}
