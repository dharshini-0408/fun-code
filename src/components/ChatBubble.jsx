import { composeWhatsApp } from '../data/contact.js'

// The lantern in the bottom-right corner. One tap opens WhatsApp already
// addressed to the castle, so the visitor never has to type the number.
const GREETING = 'Hai'

export default function ChatBubble() {
  return (
    <div className="chat">
      <a
        className="chat-fab"
        href={composeWhatsApp({ message: GREETING })}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span aria-hidden="true">💬</span>
      </a>
    </div>
  )
}
