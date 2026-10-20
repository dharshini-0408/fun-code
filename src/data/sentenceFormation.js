/** Sentence formation scenarios + jumble / fix-the-sentence tests. */

export const SENTENCE_SCENARIOS = [
  {
    id: 'meet',
    title: 'Meeting someone new',
    prompt: 'You meet a new classmate. Introduce yourself politely.',
    sample: 'Hello, my name is Sam. Nice to meet you.',
  },
  {
    id: 'ask-help',
    title: 'Asking for help',
    prompt: 'You cannot open a heavy door. Ask someone for help.',
    sample: 'Excuse me, could you help me open this door?',
  },
  {
    id: 'order-food',
    title: 'Ordering food',
    prompt: 'You are in a café. Order a sandwich and water.',
    sample: 'I would like a sandwich and a glass of water, please.',
  },
  {
    id: 'late',
    title: 'Being late',
    prompt: 'You arrive late to class. Apologise to the teacher.',
    sample: 'I am sorry I am late. The bus was delayed.',
  },
  {
    id: 'invite',
    title: 'Inviting a friend',
    prompt: 'Invite a friend to play chess after school.',
    sample: 'Would you like to play chess with me after school?',
  },
  {
    id: 'weather',
    title: 'Talking about weather',
    prompt: 'Describe today’s weather to a friend.',
    sample: 'It is sunny and warm today.',
  },
]

export const SENTENCE_TESTS = [
  {
    id: 'j1',
    kind: 'jumble',
    prompt: 'Unscramble the words into a correct sentence.',
    words: ['is', 'The', 'on', 'table', 'cat', 'the'],
    answer: 'the cat is on the table',
    tip: 'Subject + verb + place: The cat is on the table.',
  },
  {
    id: 'j2',
    kind: 'jumble',
    prompt: 'Unscramble these words.',
    words: ['to', 'I', 'library', 'the', 'go'],
    answer: 'i go to the library',
    tip: 'I go to the library.',
  },
  {
    id: 'j3',
    kind: 'jumble',
    prompt: 'Make a question.',
    words: ['you', 'Are', 'ready', '?'],
    answer: 'are you ready?',
    tip: 'Are you ready?',
  },
  {
    id: 'c1',
    kind: 'correct',
    prompt: 'Pick the correct sentence.',
    options: [
      'She go to school every day.',
      'She goes to school every day.',
      'She going to school every day.',
      'She gone to school every day.',
    ],
    answer: 1,
    tip: 'He/she/it + verb-s: she goes.',
  },
  {
    id: 'c2',
    kind: 'correct',
    prompt: 'Which sentence is correct?',
    options: [
      'They was happy yesterday.',
      'They were happy yesterday.',
      'They is happy yesterday.',
      'They be happy yesterday.',
    ],
    answer: 1,
    tip: 'They + were (past).',
  },
  {
    id: 'c3',
    kind: 'correct',
    prompt: 'Choose the right sentence.',
    options: [
      'I have a apple.',
      'I have an apple.',
      'I have the apple always wrong.',
      'I have apple an.',
    ],
    answer: 1,
    tip: 'an before a vowel sound.',
  },
  {
    id: 'c4',
    kind: 'correct',
    prompt: 'Fix the word order — which is right?',
    options: [
      'Always she late is.',
      'She is always late.',
      'She always is late never.',
      'Is she always late the.',
    ],
    answer: 1,
    tip: 'Subject + be + adverb: She is always late.',
  },
  {
    id: 'j4',
    kind: 'jumble',
    prompt: 'Unscramble a polite request.',
    words: ['please', 'pass', 'the', 'Can', 'you', 'salt', '?'],
    answer: 'can you pass the salt please?',
    tip: 'Can you pass the salt, please?',
  },
  {
    id: 'c5',
    kind: 'correct',
    prompt: 'Choose the grammatical sentence.',
    options: [
      'There is three books on the desk.',
      'There are three books on the desk.',
      'There be three books on the desk.',
      'There am three books on the desk.',
    ],
    answer: 1,
    tip: 'Plural noun → there are.',
  },
  {
    id: 'j5',
    kind: 'jumble',
    prompt: 'Build the past-tense sentence.',
    words: ['yesterday', 'visited', 'We', 'the', 'museum'],
    answer: 'we visited the museum yesterday',
    tip: 'We visited the museum yesterday.',
  },
]

export function normalizeSentence(s) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[.,!]+$/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+\?/g, '?')
}
