// A completely free, keyless AI tutor: the model runs in your browser via
// WebGPU. Nothing is sent anywhere, there is no account and no cost. The
// trade-off is a one-time download and a small model that can be wrong — so
// the authored lessons and the test runner stay the source of truth, and this
// is only ever an "explain it another way" layer on top.

const MODELS = [
  {
    id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
    label: 'Small',
    size: '~0.9 GB',
    note: 'Fastest to download. Fine for plain-English explanations.',
  },
  {
    id: 'Qwen2.5-Coder-1.5B-Instruct-q4f16_1-MLC',
    label: 'Code (recommended)',
    size: '~1.6 GB',
    note: 'Trained on code. Much better at explaining why your solution failed.',
  },
  {
    id: 'Qwen2.5-Coder-3B-Instruct-q4f16_1-MLC',
    label: 'Code, larger',
    size: '~2.5 GB',
    note: 'Noticeably better answers. Needs a machine with room to spare.',
  },
]

export const TUTOR_MODELS = MODELS
export const DEFAULT_MODEL = MODELS[1].id
const STORED_MODEL = 'funcode.tutor.model'

export function supportsWebGPU() {
  return typeof navigator !== 'undefined' && 'gpu' in navigator
}

export function savedModel() {
  try {
    return localStorage.getItem(STORED_MODEL) ?? DEFAULT_MODEL
  } catch {
    return DEFAULT_MODEL
  }
}

export function rememberModel(id) {
  try {
    localStorage.setItem(STORED_MODEL, id)
  } catch {
    // not important enough to fail over
  }
}

let engine = null
let loadedModel = null
let loading = null

// Downloads (first time) and starts the model. `onProgress` receives 0..1.
export async function loadTutor(modelId, onProgress) {
  if (engine && loadedModel === modelId) return engine
  if (loading) return loading

  loading = (async () => {
    const { CreateMLCEngine } = await import('@mlc-ai/web-llm')
    if (engine) {
      await engine.unload()
      engine = null
    }
    engine = await CreateMLCEngine(modelId, {
      initProgressCallback: (r) => onProgress?.(r.progress ?? 0, r.text ?? ''),
    })
    loadedModel = modelId
    return engine
  })()

  try {
    return await loading
  } finally {
    loading = null
  }
}

export function tutorReady() {
  return engine !== null
}

function systemPrompt(room) {
  const lesson = (room.lesson ?? [])
    .map((b) => (b.type === 'code' ? b.code : b.text))
    .join('\n')

  const subject = room.track === 'react' ? 'React' : 'JavaScript'

  return [
    'You are a patient programming tutor inside a puzzle game.',
    'Explain clearly and briefly, in plain English, for a learner.',
    'Prefer a short example over a long paragraph. Never write more than 150 words.',
    'NEVER give away the full working solution — nudge toward it instead.',
    '',
    `The learner is working on ${subject}, on the topic: ${room.concept}.`,
    room.generated
      ? `This is a generated practice drill at the "${room.levelLabel ?? room.level}" level, so there is no lesson text — answer from the puzzle alone.`
      : 'The room taught them this material:',
    room.generated ? '' : lesson.slice(0, 1500),
    '',
    'The puzzle they must solve:',
    room.puzzle?.prompt ?? '',
  ]
    .filter(Boolean)
    .join('\n')
}

// Streams an answer. `onToken` gets the growing text; resolves with the whole reply.
export async function askTutor({ room, question, code, failure, onToken, signal }) {
  if (!engine) throw new Error('The tutor is not loaded yet.')

  const context = [
    code ? `Their current code:\n\`\`\`js\n${code.slice(0, 1200)}\n\`\`\`` : '',
    failure ? `The tests said: ${failure}` : '',
    question,
  ]
    .filter(Boolean)
    .join('\n\n')

  const stream = await engine.chat.completions.create({
    stream: true,
    temperature: 0.4,
    max_tokens: 400,
    messages: [
      { role: 'system', content: systemPrompt(room) },
      { role: 'user', content: context },
    ],
  })

  let text = ''
  for await (const chunk of stream) {
    if (signal?.aborted) break
    text += chunk.choices?.[0]?.delta?.content ?? ''
    onToken?.(text)
  }
  return text
}

export async function unloadTutor() {
  if (engine) {
    await engine.unload()
    engine = null
    loadedModel = null
  }
}

const ENGLISH_SYSTEM = [
  'You are a kind English writing coach named Kitty.',
  'The user will give you a sentence (typed or spoken).',
  'Your job: correct grammar, spelling, punctuation, and word choice.',
  '',
  'Always reply in this exact shape (plain text, no markdown):',
  'Corrected: <the fixed sentence>',
  'Why: <one or two short sentences explaining the main fixes>',
  'Tip: <one optional tip to remember next time>',
  '',
  'If the sentence is already fine, say so under Corrected (repeat it) and keep Why brief.',
  'Never invent a different meaning. Keep their intent. Stay under 120 words.',
].join('\n')

/** Prefer the small language model for sentence correction. */
export const ENGLISH_MODEL = MODELS[0].id

// Streams a correction for one English sentence. Reuses the same free WebLLM engine.
export async function askEnglishCoach({ sentence, onToken, signal }) {
  if (!engine) throw new Error('The coach is not loaded yet.')

  const stream = await engine.chat.completions.create({
    stream: true,
    temperature: 0.2,
    max_tokens: 280,
    messages: [
      { role: 'system', content: ENGLISH_SYSTEM },
      {
        role: 'user',
        content: `Please correct this English sentence:\n\n${sentence.slice(0, 800)}`,
      },
    ],
  })

  let text = ''
  for await (const chunk of stream) {
    if (signal?.aborted) break
    text += chunk.choices?.[0]?.delta?.content ?? ''
    onToken?.(text)
  }
  return text
}

function englishGuideSystem({ outline, focusTopic }) {
  const focus = focusTopic
    ? [
        `Right now the learner chose this topic: "${focusTopic.name}" (${focusTopic.area}, ${focusTopic.level}).`,
        `Goal: ${focusTopic.goal}`,
        'Start by welcoming them into that topic, teach one small idea, give 1–2 examples, then ask a short practice question.',
      ].join(' ')
    : 'No topic is locked yet. Greet them warmly, ask what they want to learn today, and suggest 2–4 topics from the syllabus.'

  return [
    'You are “Kitty”, a friendly free English chat tutor inside FunCode.',
    'You talk like a real study buddy: short, warm, clear. Correct their English gently when they write mistakes.',
    'You teach the FULL course: Beginner → Elementary → Intermediate → Upper-Intermediate → Advanced.',
    'Cover grammar, vocabulary, speaking, writing, reading, listening, pronunciation, everyday English, and exam skills.',
    '',
    'How to behave each turn:',
    '1) Reply to what they just said (greetings, questions, answers).',
    '2) Teach or practice one small step — never dump a whole textbook.',
    '3) End with a suggestion or a tiny question so the chat keeps going (e.g. “Want to try a sentence?” or “Shall we pick Grammar or Speaking?”).',
    '4) If they name a topic (grammar, spelling, tenses…), pick a matching syllabus topic and guide them.',
    '5) If they seem lost, suggest the next logical topic for their level.',
    '',
    'Style rules: plain English, under 120 words, no markdown headings, no bullet walls. One short tip is enough.',
    'Never claim you are paid or online. You run free in their browser.',
    '',
    'Syllabus overview (use these names when suggesting):',
    outline,
    '',
    focus,
  ].join('\n')
}

/**
 * Multi-turn English guide chat. `history` is [{role:'user'|'assistant', content}].
 * Keeps the last few turns so Kitty can follow the conversation.
 */
export async function askEnglishGuide({
  history = [],
  message,
  focusTopic = null,
  outline = '',
  onToken,
  signal,
}) {
  if (!engine) throw new Error('Kitty is not loaded yet.')

  const recent = history.slice(-10).map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content).slice(0, 900),
  }))

  const stream = await engine.chat.completions.create({
    stream: true,
    temperature: 0.55,
    max_tokens: 320,
    messages: [
      { role: 'system', content: englishGuideSystem({ outline, focusTopic }) },
      ...recent,
      { role: 'user', content: message.slice(0, 900) },
    ],
  })

  let text = ''
  for await (const chunk of stream) {
    if (signal?.aborted) break
    text += chunk.choices?.[0]?.delta?.content ?? ''
    onToken?.(text)
  }
  return text
}

export const ENGLISH_GUIDE_HELLO =
  "Hey! I'm Kitty, your free English chat buddy. What do you want to learn today — grammar, speaking, writing, or shall I suggest a topic?"

