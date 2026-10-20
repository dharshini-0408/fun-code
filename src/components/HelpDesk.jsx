import { useState } from 'react'
import ChatBubble from './ChatBubble.jsx'
import { LOOKS_LIKE_EMAIL, OWLERY, sendLetter } from '../data/contact.js'

// The Owlery: how to reach the person behind the castle. Contact cards on the
// left, a letter on the right, and an owl waiting in the corner for anyone who
// cannot be bothered with either.
export default function HelpDesk({ onBack }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState('')

  async function copy(what, value) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(what)
      setTimeout(() => setCopied(''), 1600)
    } catch {
      setCopied('')
    }
  }

  async function send(e) {
    e.preventDefault()
    if (sending) return
    if (!name.trim()) return setError('An owl needs a name to carry back.')
    if (!LOOKS_LIKE_EMAIL.test(email.trim())) return setError('That address does not look right.')
    if (!message.trim()) return setError('The parchment is still blank.')
    setError('')
    setSending(true)
    try {
      await sendLetter({ name, email, message })
      setSent(true)
    } catch {
      setError('The owl got lost. Try again in a moment.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="help">
      <header className="help-head">
        <button className="btn link" onClick={onBack}>
          ← the Sorting
        </button>
        <h1 className="brand">
          The <span>Owlery</span>
        </h1>
        <p className="tagline">
          Stuck on a spell, found a crack in the castle wall, or just want to say hello? Send an
          owl — it lands in a real inbox, and it is answered.
        </p>
      </header>

      <div className="help-body">
        <aside className="help-cards">
          <a className="help-card" href={OWLERY.tel}>
            <span className="help-card-icon" aria-hidden="true">
              ☎
            </span>
            <span className="help-card-text">
              <span className="help-card-label">Mobile</span>
              <span className="help-card-value">{OWLERY.phonePretty}</span>
            </span>
          </a>
          <button
            className="help-copy"
            onClick={() => copy('phone', OWLERY.phone)}
            aria-label="Copy the phone number"
          >
            {copied === 'phone' ? 'copied ✓' : 'copy number'}
          </button>

          <a className="help-card" href={`mailto:${OWLERY.email}`}>
            <span className="help-card-icon" aria-hidden="true">
              ✉
            </span>
            <span className="help-card-text">
              <span className="help-card-label">Email</span>
              <span className="help-card-value">{OWLERY.email}</span>
            </span>
          </a>
          <button
            className="help-copy"
            onClick={() => copy('email', OWLERY.email)}
            aria-label="Copy the email address"
          >
            {copied === 'email' ? 'copied ✓' : 'copy address'}
          </button>

          <p className="help-hours">
            Owls fly daily. Expect an answer within a day — sooner if the candles are still lit.
          </p>
        </aside>

        <form className="help-form" onSubmit={send} noValidate>
          <h2 className="help-form-title">Write a letter</h2>

          <label className="help-field">
            <span>Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Hermione Granger"
              autoComplete="name"
            />
          </label>

          <label className="help-field">
            <span>Your email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className="help-field">
            <span>Your message</span>
            <textarea
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me what you are stuck on…"
            />
          </label>

          {error && (
            <p className="help-note bad" role="alert">
              {error}
            </p>
          )}
          {sent && !error && (
            <p className="help-note good" role="status">
              Sealed and sent to {OWLERY.email}. A reply will come to {email.trim()}.
            </p>
          )}

          <div className="help-actions">
            <button className="btn primary big" type="submit" disabled={sending}>
              {sending ? 'Sending the owl…' : 'Send the owl'}
            </button>
            <span className="help-fineprint">Sends an email to {OWLERY.email}.</span>
          </div>
        </form>
      </div>

      <ChatBubble />
    </div>
  )
}
