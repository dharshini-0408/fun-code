import { useEffect, useRef, useState } from 'react'
import {
  ALL_PHONICS,
  PHONICS_GROUPS,
  checkPronunciation,
  speakText,
} from '../data/phonicsData.js'

function speechSupported() {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

export default function EnglishPhonics({ onBack }) {
  const [groupId, setGroupId] = useState(PHONICS_GROUPS[0].id)
  const [i, setI] = useState(0)
  const [heard, setHeard] = useState('')
  const [result, setResult] = useState(null)
  const [listening, setListening] = useState(false)
  const recognition = useRef(null)

  const group = PHONICS_GROUPS.find((g) => g.id === groupId) ?? PHONICS_GROUPS[0]
  const item = group.items[Math.min(i, group.items.length - 1)]
  const canSpeak = speechSupported()
  const canHear = typeof window !== 'undefined' && !!window.speechSynthesis

  useEffect(
    () => () => {
      try {
        recognition.current?.stop()
      } catch {
        /* ignore */
      }
      window.speechSynthesis?.cancel()
    },
    [],
  )

  function selectGroup(id) {
    setGroupId(id)
    setI(0)
    setHeard('')
    setResult(null)
  }

  function next() {
    setI((n) => (n + 1) % group.items.length)
    setHeard('')
    setResult(null)
  }

  function check(text = heard) {
    setResult(checkPronunciation(text, item.say))
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
      setHeard((finalText || interim).trim())
    }
    rec.onerror = () => setListening(false)
    rec.onend = () => {
      setListening(false)
      const text = finalText.trim()
      if (text) {
        setHeard(text)
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
      <h2 className="drill-title">Pronunciation / Phonics</h2>
      <p className="tagline">
        Hear the sound, say the word — {ALL_PHONICS.length} practice cards across vowels, digraphs,
        and pairs.
      </p>

      <div className="topic-tabs" role="tablist">
        {PHONICS_GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            className={`topic-tab ${groupId === g.id ? 'on' : ''}`}
            onClick={() => selectGroup(g.id)}
          >
            {g.name}
          </button>
        ))}
      </div>

      <p className="drill-progress">
        {group.name} · {i + 1} / {group.items.length}
      </p>

      <div className="vocab-card">
        <p className="vocab-word">{item.symbol}</p>
        <p className="dimmed">{item.label}</p>
        <p style={{ marginTop: 10, fontSize: 22 }}>
          Say: <strong>{item.say}</strong>
        </p>
      </div>
      <p className="dimmed">{item.tip}</p>

      <div className="drill-actions">
        {canHear && (
          <button type="button" className="btn" onClick={() => speakText(item.say)}>
            🔊 Hear
          </button>
        )}
        {canSpeak && (
          <button
            type="button"
            className={`btn coach-mic ${listening ? 'on' : ''}`}
            onClick={toggleListen}
          >
            {listening ? 'Listening…' : 'Speak'}
          </button>
        )}
        <button className="btn" type="button" onClick={next}>
          Next
        </button>
      </div>

      {!canSpeak && (
        <p className="dimmed">Mic needs Chrome/Edge. You can still hear and type below.</p>
      )}

      <form
        className="dict-form"
        onSubmit={(e) => {
          e.preventDefault()
          check()
        }}
      >
        <input
          className="topics-search"
          value={heard}
          onChange={(e) => {
            setHeard(e.target.value)
            setResult(null)
          }}
          placeholder="Type what you said…"
          aria-label="Pronunciation attempt"
        />
        <button className="btn primary" type="submit" disabled={!heard.trim()}>
          Check
        </button>
      </form>

      {result === true && <p className="drill-ok">Sounds good!</p>}
      {result === false && (
        <p className="drill-bad">
          Not yet — try saying <strong>{item.say}</strong> clearly.
        </p>
      )}
    </div>
  )
}
