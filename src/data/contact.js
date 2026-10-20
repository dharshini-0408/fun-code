// Where the owls go. One place, so the letter form, the chat bubble and the
// contact cards can never drift apart.
export const OWLERY = {
  phone: '7904811491',
  phonePretty: '+91 79048 11491',
  tel: 'tel:+917904811491',
  email: 'pdpriya04@gmail.com',
  // International digits only — WhatsApp's click-to-chat URL rejects +, spaces, and dashes.
  whatsapp: 'https://wa.me/917904811491',
}

export const LOOKS_LIKE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// The letter is posted to FormSubmit, which delivers it to OWLERY.email.
// The visitor's address is the reply-to, so a reply goes straight back to them.
// After you deploy, activate FormSubmit once from the live URL (or switch to Web3Forms).
export async function sendLetter({ name, email, message }) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(OWLERY.email)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      _subject: name.trim() ? `FunCode — a note from ${name.trim()}` : 'FunCode — a note',
      _replyto: email.trim(),
      _captcha: 'false',
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === false || data.success === 'false') {
    throw new Error(data.message || 'The owl could not find its way.')
  }
}

export function composeWhatsApp({ name = '', email = '', message = '' } = {}) {
  const from = [name.trim(), email.trim()].filter(Boolean).join(' · ')
  const text = [message.trim(), from ? `—\n${from}` : ''].filter(Boolean).join('\n\n')
  return text ? `${OWLERY.whatsapp}?text=${encodeURIComponent(text)}` : OWLERY.whatsapp
}
