import { useEffect, useRef, useState } from 'react'
import { VOCAB_SPELL, normalizeSpell } from '../data/vocabSpell.js'

function speechSupported() {
  return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

export default function EnglishVocabulary({ onBack }) {
  const [i, setI] = useState(0)
  const [heard, setHeard] = useState('')
  const [result, setResult] = useState(null) // null | true | false
  const [listening, setListening] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const recognition = useRef(null)
  const item = VOCAB_SPELL[i]
  const canSpeak = speechSupported()

  useEffect(() => () => {
    try {
      recognition.current?.stop()
    } catch {
      /* ignore */
    }
  }, [])

  function next() {
    if (i + 1 >= VOCAB_SPELL.length) {
      setDone(true)
      return
    }
    setI((x) => x + 1)
    setHeard('')
    setResult(null)
  }

  function check(text) {
    const ok = normalizeSpell(text) === normalizeSpell(item.display)
    setResult(ok)
    if (ok) setScore((s) => s + 1)
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

  if (done) {
    return (
      <div className="drill eng-section">
        <button className="btn link" onClick={onBack}>
          ← English
        </button>
        <div className="drill-result">
          <h2 className="drill-title">Vocabulary complete</h2>
          <p className="drill-score">
            {score} / {VOCAB_SPELL.length}
          </p>
          <div className="drill-actions">
            <button
              className="btn primary"
              onClick={() => {
                setI(0)
                setScore(0)
                setDone(false)
                setHeard('')
                setResult(null)
              }}
            >
              Try again
            </button>
            <button className="btn" onClick={onBack}>
              Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="drill eng-section">
      <button className="btn link" onClick={onBack}>
        ← English
      </button>
      <h2 className="drill-title">Vocabulary</h2>
      <p className="tagline">
        Read the word (or phrase), then spell it aloud into the mic — or type it.
      </p>

      <p className="drill-progress">
        {i + 1} / {VOCAB_SPELL.length}
      </p>

      <div className="vocab-card">
        <p className="vocab-word">{item.display}</p>
        <p className="dimmed">{item.hint}</p>
      </div>

      {!canSpeak && (
        <p className="dimmed">Mic needs Chrome/Edge. You can still type the spelling below.</p>
      )}

      <div className="drill-actions">
        {canSpeak && (
          <button
            type="button"
            className={`btn coach-mic ${listening ? 'on' : ''}`}
            onClick={toggleListen}
            disabled={result === true}
          >
            {listening ? 'Listening…' : 'Speak spelling'}
          </button>
        )}
      </div>

      <form
        className="dict-form"
        onSubmit={(e) => {
          e.preventDefault()
          if (result == null) check(heard)
          else next()
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
          aria-label="Spelling attempt"
        />
        <button className="btn primary" type="submit" disabled={!heard.trim() && result == null}>
          {result == null ? 'Check' : i + 1 === VOCAB_SPELL.length ? 'Finish' : 'Next'}
        </button>
      </form>

      {result === true && <p className="drill-ok">Correct!</p>}
      {result === false && (
        <p className="drill-bad">
          Not yet. Target: <strong>{item.display}</strong>
        </p>
      )}
    </div>
  )
}
