/** Conversation scenarios for Speaking practice. */

export const SPEAKING_SCENARIOS = [
  {
    id: 'greet',
    title: 'Meeting a classmate',
    setting: 'First day at school',
    prompt: 'Say hello and introduce yourself. Ask their name too.',
    sample: 'Hi! My name is Alex. Nice to meet you. What’s your name?',
    keywords: ['hello', 'hi', 'name', 'meet'],
  },
  {
    id: 'help',
    title: 'Asking for help',
    setting: 'Library',
    prompt: 'Politely ask someone where the English books are.',
    sample: 'Excuse me, could you tell me where the English books are?',
    keywords: ['excuse', 'could', 'where', 'please', 'help'],
  },
  {
    id: 'cafe',
    title: 'Ordering at a café',
    setting: 'Café counter',
    prompt: 'Order a sandwich and a drink politely.',
    sample: 'I’d like a cheese sandwich and a glass of water, please.',
    keywords: ['like', 'please', 'water', 'sandwich', 'coffee', 'tea'],
  },
  {
    id: 'invite',
    title: 'Inviting a friend',
    setting: 'After school',
    prompt: 'Invite a friend to play chess or read together.',
    sample: 'Would you like to play chess with me after school?',
    keywords: ['would', 'like', 'play', 'come', 'together'],
  },
  {
    id: 'opinion',
    title: 'Sharing an opinion',
    setting: 'Book club',
    prompt: 'Say what you think about a story you read.',
    sample: 'I think this story is exciting because the hero is brave.',
    keywords: ['think', 'because', 'like', 'interesting', 'enjoy'],
  },
  {
    id: 'apology',
    title: 'Apologising',
    setting: 'Classroom',
    prompt: 'You are late. Apologise and give a short reason.',
    sample: 'I’m sorry I’m late. The bus was delayed.',
    keywords: ['sorry', 'late', 'apolog'],
  },
  {
    id: 'directions',
    title: 'Giving directions',
    setting: 'Street',
    prompt: 'Tell someone how to get to the school gate.',
    sample: 'Go straight, then turn left. The school gate is next to the park.',
    keywords: ['go', 'turn', 'left', 'right', 'straight'],
  },
  {
    id: 'phone',
    title: 'Phone call',
    setting: 'Calling a friend',
    prompt: 'Start a short phone call and ask if they are free tomorrow.',
    sample: 'Hi Sam, it’s Maya. Are you free tomorrow afternoon?',
    keywords: ['hi', 'hello', 'free', 'tomorrow', 'call'],
  },
]

export function scoreSpeaking(text, keywords = []) {
  const t = String(text).toLowerCase()
  if (!t.trim()) return { ok: false, hits: 0, need: keywords.length }
  const hits = keywords.filter((k) => t.includes(String(k).toLowerCase())).length
  const need = Math.max(1, Math.ceil(keywords.length * 0.4))
  return { ok: hits >= need, hits, need }
}
