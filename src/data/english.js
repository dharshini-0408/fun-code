// Shelves in the English hall — tomes on the library wall, plus quick drills.

import { ENGLISH_TOPICS, topicsByArea, topicsByLevel } from './englishCurriculum.js'

/** Shelf books. `open` = drill id or 'course'. `area` / `level` filter the Spellbook. */
export const ENGLISH_CATEGORIES = [
  {
    id: 'course',
    name: 'Spellbook',
    icon: '📖',
    accent: '#e8b44a',
    blurb: 'Every English charm — beginner to advanced.',
    open: 'course',
    area: null,
    shelf: 0,
  },
  {
    id: 'vocab',
    name: 'Vocabulary',
    icon: '📚',
    accent: '#3d8b6e',
    blurb: 'Words for school, travel, feelings, and more.',
    open: 'course',
    area: 'Vocabulary',
    shelf: 0,
  },
  {
    id: 'idioms',
    name: 'Idioms',
    icon: '🧩',
    accent: '#c45c9a',
    blurb: 'Phrases that mean more than the words alone.',
    open: 'course',
    area: 'Idioms',
    shelf: 0,
  },
  {
    id: 'grammar',
    name: 'Grammar',
    icon: '✨',
    accent: '#c45c26',
    blurb: 'Tenses, articles, and sentence spells — quick drills.',
    open: 'grammar',
    shelf: 0,
  },
  {
    id: 'spelling',
    name: 'Spelling',
    icon: '✏️',
    accent: '#2a6b9e',
    blurb: 'Letters in the right order — no shortcuts.',
    open: 'spelling',
    shelf: 0,
  },
  {
    id: 'listening',
    name: 'Listening',
    icon: '🎧',
    accent: '#6b3fa0',
    blurb: 'Hear a short tale, then answer what you caught.',
    open: 'listening',
    shelf: 0,
  },
  {
    id: 'speaking',
    name: 'Speaking',
    icon: '💬',
    accent: '#d2a017',
    blurb: 'Greetings, opinions, debate — talk it out.',
    open: 'course',
    area: 'Speaking',
    shelf: 1,
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: '🪶',
    accent: '#8b6914',
    blurb: 'Notes, emails, paragraphs, and essays.',
    open: 'course',
    area: 'Writing',
    shelf: 1,
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: '🔎',
    accent: '#4a6fa5',
    blurb: 'Stories, news, and reading skills.',
    open: 'course',
    area: 'Reading',
    shelf: 1,
  },
  {
    id: 'pronunciation',
    name: 'Pronounce',
    icon: '🔊',
    accent: '#9b1c2e',
    blurb: 'Sounds, stress, and clearer speech.',
    open: 'course',
    area: 'Pronunciation',
    shelf: 1,
  },
  {
    id: 'everyday',
    name: 'Everyday',
    icon: '🏠',
    accent: '#1f5c3d',
    blurb: 'Home, shopping, directions, real-life English.',
    open: 'course',
    area: 'Everyday',
    shelf: 1,
  },
  {
    id: 'basics',
    name: 'Basics',
    icon: '🌱',
    accent: '#5c8a3a',
    blurb: 'First-year English — alphabet to simple sentences.',
    open: 'course',
    level: 'beginner',
    shelf: 1,
  },
  {
    id: 'exam',
    name: 'Exam Prep',
    icon: '🎓',
    accent: '#22407a',
    blurb: 'Test strategies and high-value exam words.',
    open: 'course',
    area: 'Exam',
    shelf: 1,
  },
  {
    id: 'vocab-drill',
    name: 'Word Drill',
    icon: '🪄',
    accent: '#2f6f5e',
    blurb: 'Quick vocabulary quiz — pick the right word.',
    open: 'vocabulary',
    shelf: 1,
  },
  {
    id: 'idiom-drill',
    name: 'Idiom Drill',
    icon: '🐱',
    accent: '#a83d7a',
    blurb: 'What does that idiom mean? Quick practice.',
    open: 'idioms-drill',
    shelf: 1,
  },
  {
    id: 'coach',
    name: 'Mend Line',
    icon: '🗣️',
    accent: '#4fc07d',
    blurb: 'Type or speak one line — Kitty fixes it.',
    open: 'coach',
    shelf: 1,
  },
]

export function categoryCount(c) {
  if (c.open === 'course') {
    if (c.level) return topicsByLevel(c.level).length
    if (c.area) return topicsByArea(c.area).length
    return ENGLISH_TOPICS.length
  }
  if (c.open === 'grammar') return GRAMMAR.length
  if (c.open === 'spelling') return SPELLING.length
  if (c.open === 'listening') return LISTENING.length
  if (c.open === 'vocabulary') return VOCABULARY.length
  if (c.open === 'idioms-drill') return IDIOMS.length
  return 'AI'
}

export const GRAMMAR = [
  {
    id: 'g1',
    prompt: 'Pick the correct verb:',
    sentence: 'She ___ to the library every morning.',
    options: ['go', 'goes', 'going', 'gone'],
    answer: 1,
    tip: 'With he/she/it in the present, add -s: she goes.',
  },
  {
    id: 'g2',
    prompt: 'Which sentence is correct?',
    options: [
      'They was happy.',
      'They were happy.',
      'They is happy.',
      'They be happy.',
    ],
    answer: 1,
    tip: 'They takes were (past) or are (present) — never was/is.',
  },
  {
    id: 'g3',
    prompt: 'Choose the right article:',
    sentence: 'I saw ___ owl on the tower.',
    options: ['a', 'an', 'the', '—'],
    answer: 1,
    tip: 'Use an before a vowel sound: an owl.',
  },
  {
    id: 'g4',
    prompt: 'Pick the plural:',
    sentence: 'One child → many ___',
    options: ['childs', 'childes', 'children', 'child'],
    answer: 2,
    tip: 'Child → children is an irregular plural.',
  },
  {
    id: 'g5',
    prompt: 'Which is a complete sentence?',
    options: [
      'Running down the corridor.',
      'The cat sat on the mat.',
      'Because it was raining.',
      'Very quickly indeed.',
    ],
    answer: 1,
    tip: 'A sentence needs a subject and a finite verb.',
  },
  {
    id: 'g6',
    prompt: 'Past tense of “write”:',
    options: ['writed', 'wrote', 'written', 'writing'],
    answer: 1,
    tip: 'Write → wrote (past). Written is the past participle.',
  },
  {
    id: 'g7',
    prompt: 'Fill in the blank:',
    sentence: 'If it rains, we ___ indoors.',
    options: ['stay', 'stays', 'stayed', 'staying'],
    answer: 0,
    tip: 'First conditional: If + present, will/bare present for result.',
  },
  {
    id: 'g8',
    prompt: 'Choose the comparative:',
    sentence: 'This book is ___ than that one.',
    options: ['good', 'better', 'best', 'more good'],
    answer: 1,
    tip: 'Good → better → best.',
  },
  {
    id: 'g9',
    prompt: 'Which pronoun fits?',
    sentence: 'The broomstick belongs to Hermione. It is ___.',
    options: ['her', 'hers', 'she', 'herself'],
    answer: 1,
    tip: 'Hers is the possessive pronoun (no noun after it).',
  },
  {
    id: 'g10',
    prompt: 'Pick the correct form:',
    sentence: 'There ___ three candlesticks on the table.',
    options: ['is', 'are', 'was', 'be'],
    answer: 1,
    tip: 'Plural subject → are.',
  },
  {
    id: 'g11',
    prompt: 'Which uses a comma correctly?',
    options: [
      'Yes I will come.',
      'Yes, I will come.',
      'Yes I, will come.',
      'Yes I will, come.',
    ],
    answer: 1,
    tip: 'A comma often follows yes/no at the start of a reply.',
  },
  {
    id: 'g12',
    prompt: 'Choose the right preposition:',
    sentence: 'The letter arrived ___ Monday.',
    options: ['in', 'on', 'at', 'by'],
    answer: 1,
    tip: 'Days and dates take on: on Monday.',
  },
]

export const SPELLING = [
  { id: 's1', word: 'necessary', hint: 'one c, two s' },
  { id: 's2', word: 'beautiful', hint: 'beauty + ful' },
  { id: 's3', word: 'because', hint: 'be + cause' },
  { id: 's4', word: 'friend', hint: 'i before e' },
  { id: 's5', word: 'receive', hint: 'e before i after c' },
  { id: 's6', word: 'definitely', hint: 'finite is inside' },
  { id: 's7', word: 'separate', hint: 'a rat hides in separate' },
  { id: 's8', word: 'tomorrow', hint: 'one m, two r' },
  { id: 's9', word: 'library', hint: 'li-bra-ry' },
  { id: 's10', word: 'witch', hint: 'with a t, like stitch' },
  { id: 's11', word: 'castle', hint: 'silent t' },
  { id: 's12', word: 'knowledge', hint: 'know + ledge' },
]

export const VOCABULARY = [
  {
    id: 'v1',
    prompt: 'Which word means a place you borrow books?',
    options: ['bakery', 'library', 'factory', 'station'],
    answer: 1,
    tip: 'A library keeps books for reading and borrowing.',
  },
  {
    id: 'v2',
    prompt: 'Pick the synonym of “happy”:',
    options: ['angry', 'glad', 'tired', 'hungry'],
    answer: 1,
    tip: 'Glad and happy are close in meaning.',
  },
  {
    id: 'v3',
    prompt: '“Luggage” is closest to:',
    options: ['food', 'bags for travel', 'school desk', 'weather'],
    answer: 1,
    tip: 'Luggage = the bags you take on a trip.',
  },
  {
    id: 'v4',
    prompt: 'Someone who teaches is a:',
    options: ['teacher', 'farmer', 'passenger', 'customer'],
    answer: 0,
    tip: 'Teacher — the person who teaches.',
  },
  {
    id: 'v5',
    prompt: 'Which is a feeling?',
    options: ['window', 'nervous', 'pencil', 'airport'],
    answer: 1,
    tip: 'Nervous describes how you feel.',
  },
  {
    id: 'v6',
    prompt: '“Enormous” means:',
    options: ['very small', 'very big', 'very fast', 'very quiet'],
    answer: 1,
    tip: 'Enormous = extremely large.',
  },
  {
    id: 'v7',
    prompt: 'You buy food at a:',
    options: ['museum', 'market', 'hospital', 'forest'],
    answer: 1,
    tip: 'A market (or shop) is where you buy food.',
  },
  {
    id: 'v8',
    prompt: 'Opposite of “cheap”:',
    options: ['expensive', 'empty', 'early', 'easy'],
    answer: 0,
    tip: 'Cheap ↔ expensive.',
  },
  {
    id: 'v9',
    prompt: 'A “schedule” is:',
    options: ['a plan of times', 'a type of shoe', 'a dessert', 'a colour'],
    answer: 0,
    tip: 'Schedule = timetable / plan of when things happen.',
  },
  {
    id: 'v10',
    prompt: '“Polite” means:',
    options: ['rude', 'showing good manners', 'sleepy', 'loud'],
    answer: 1,
    tip: 'Polite people use kind, respectful words.',
  },
  {
    id: 'v11',
    prompt: 'Which word fits travel?',
    options: ['passport', 'pillowcase', 'blackboard', 'recipe'],
    answer: 0,
    tip: 'You need a passport to travel between countries.',
  },
  {
    id: 'v12',
    prompt: '“Curious” means you want to:',
    options: ['sleep', 'learn more', 'argue', 'hide'],
    answer: 1,
    tip: 'Curious = eager to know or learn something.',
  },
]

export const IDIOMS = [
  {
    id: 'id1',
    prompt: '“Break the ice” means:',
    options: ['smash frozen water', 'start a friendly chat', 'go skating', 'feel cold'],
    answer: 1,
    tip: 'Break the ice = make people feel comfortable at the start.',
  },
  {
    id: 'id2',
    prompt: '“A piece of cake” means:',
    options: ['dessert', 'something easy', 'a birthday', 'a recipe'],
    answer: 1,
    tip: 'Piece of cake = very easy.',
  },
  {
    id: 'id3',
    prompt: '“Cold feet” means:',
    options: ['winter shoes', 'getting nervous and unsure', 'walking barefoot', 'a medical test'],
    answer: 1,
    tip: 'Get cold feet = become too nervous to do something.',
  },
  {
    id: 'id4',
    prompt: '“Call it a day” means:',
    options: ['name the day', 'stop working for now', 'plan a party', 'wake up'],
    answer: 1,
    tip: 'Call it a day = decide to stop work.',
  },
  {
    id: 'id5',
    prompt: '“Let the cat out of the bag” means:',
    options: ['free a pet', 'reveal a secret', 'go shopping', 'clean a room'],
    answer: 1,
    tip: 'Let the cat out of the bag = accidentally tell a secret.',
  },
  {
    id: 'id6',
    prompt: '“Under the weather” means:',
    options: ['outside in rain', 'feeling a bit ill', 'studying weather', 'very lucky'],
    answer: 1,
    tip: 'Under the weather = not feeling well.',
  },
  {
    id: 'id7',
    prompt: '“Hit the books” means:',
    options: ['throw books', 'study hard', 'buy books', 'write a novel'],
    answer: 1,
    tip: 'Hit the books = start studying seriously.',
  },
  {
    id: 'id8',
    prompt: '“In the nick of time” means:',
    options: ['very late', 'just in time', 'next week', 'never'],
    answer: 1,
    tip: 'In the nick of time = at the last useful moment.',
  },
  {
    id: 'id9',
    prompt: '“Cost an arm and a leg” means:',
    options: ['needs surgery', 'is very expensive', 'is free', 'is heavy'],
    answer: 1,
    tip: 'Costs an arm and a leg = very costly.',
  },
  {
    id: 'id10',
    prompt: '“Once in a blue moon” means:',
    options: ['every night', 'very rarely', 'every Monday', 'at noon'],
    answer: 1,
    tip: 'Once in a blue moon = almost never / very rarely.',
  },
  {
    id: 'id11',
    prompt: '“Spill the beans” means:',
    options: ['cook dinner', 'tell a secret', 'drop food', 'plant seeds'],
    answer: 1,
    tip: 'Spill the beans = reveal secret information.',
  },
  {
    id: 'id12',
    prompt: '“Bite your tongue” means:',
    options: ['eat carefully', 'stop yourself from speaking', 'sing loudly', 'tell a joke'],
    answer: 1,
    tip: 'Bite your tongue = hold back words you want to say.',
  },
]

export const LISTENING = [
  {
    id: 'l1',
    title: 'The Lost Owl',
    story:
      'Every evening, a grey owl named Nestie flew from the tower to the village. One night a storm blew Nestie off course. She landed in a baker’s garden. The baker fed her crumbs and kept her warm until morning. At sunrise Nestie flew home, and the baker waved goodbye.',
    questions: [
      {
        prompt: 'What was the owl’s name?',
        options: ['Hedwig', 'Nestie', 'Errol', 'Pig'],
        answer: 1,
      },
      {
        prompt: 'Where did Nestie land?',
        options: ['A lake', 'A baker’s garden', 'A classroom', 'A forest'],
        answer: 1,
      },
      {
        prompt: 'What did the baker give Nestie?',
        options: ['Milk', 'Seeds', 'Fish', 'Crumbs'],
        answer: 3,
      },
    ],
  },
  {
    id: 'l2',
    title: 'The Quiet Corridor',
    story:
      'Maya walked down a quiet corridor after supper. She heard soft footsteps behind her, but when she turned, nobody was there. A candle flickered. Then a ginger cat stepped out from behind a suit of armour and meowed. Maya laughed, picked up the cat, and carried it back to the kitchens.',
    questions: [
      {
        prompt: 'When did Maya walk the corridor?',
        options: ['At dawn', 'After supper', 'At noon', 'At midnight'],
        answer: 1,
      },
      {
        prompt: 'What colour was the cat?',
        options: ['Black', 'White', 'Ginger', 'Grey'],
        answer: 2,
      },
      {
        prompt: 'Where did Maya take the cat?',
        options: ['The library', 'The kitchens', 'The tower', 'Outside'],
        answer: 1,
      },
    ],
  },
  {
    id: 'l3',
    title: 'Three Keys',
    story:
      'A locked chest sat under the stairs. Beside it lay three keys: gold, silver, and bronze. The gold key was too big. The silver key stuck halfway. The bronze key turned with a click. Inside, Leo found a map of the garden and a note that said, “Dig by the old oak.”',
    questions: [
      {
        prompt: 'Which key opened the chest?',
        options: ['Gold', 'Silver', 'Bronze', 'None'],
        answer: 2,
      },
      {
        prompt: 'What was inside?',
        options: ['Coins', 'A map and a note', 'A wand', 'Books'],
        answer: 1,
      },
      {
        prompt: 'Where should Leo dig?',
        options: ['By the lake', 'By the old oak', 'Under the stairs', 'In the tower'],
        answer: 1,
      },
    ],
  },
  {
    id: 'l4',
    title: 'Rainy Match',
    story:
      'The flying practice was cancelled because of heavy rain. Instead, the students sat in the hall and played board games. Sam taught Priya how to castle in chess. Priya won her first game. Outside, thunder rolled, but inside everyone cheered.',
    questions: [
      {
        prompt: 'Why was flying cancelled?',
        options: ['Snow', 'Heavy rain', 'Fog', 'Wind'],
        answer: 1,
      },
      {
        prompt: 'What did Sam teach Priya?',
        options: ['How to fly', 'How to castle', 'How to cook', 'How to spell'],
        answer: 1,
      },
      {
        prompt: 'Who won a first game?',
        options: ['Sam', 'Priya', 'The teacher', 'Nobody'],
        answer: 1,
      },
    ],
  },
  {
    id: 'l5',
    title: 'The Shared Spellbook',
    story:
      'Two friends, Ana and Ben, shared one spellbook. Ana read on Mondays and Wednesdays. Ben read on Tuesdays and Thursdays. On Friday they studied together and practised saying new words aloud. By Saturday, both could spell “necessary” without looking.',
    questions: [
      {
        prompt: 'Who read on Mondays?',
        options: ['Ben', 'Ana', 'Both', 'Neither'],
        answer: 1,
      },
      {
        prompt: 'When did they study together?',
        options: ['Monday', 'Thursday', 'Friday', 'Sunday'],
        answer: 2,
      },
      {
        prompt: 'Which word could both spell by Saturday?',
        options: ['beautiful', 'necessary', 'castle', 'friend'],
        answer: 1,
      },
    ],
  },
  {
    id: 'l6',
    title: 'The Green Door',
    story:
      'Behind a green door was a tiny room full of plants. Water dripped from a cracked pot. Ravi fixed the pot with tape, watered the ferns, and opened a window. Sunlight filled the room. A small sign on the wall said, “Thank you for caring.”',
    questions: [
      {
        prompt: 'What colour was the door?',
        options: ['Red', 'Blue', 'Green', 'Brown'],
        answer: 2,
      },
      {
        prompt: 'What was wrong with the pot?',
        options: ['It was empty', 'It was cracked', 'It was missing', 'It was locked'],
        answer: 1,
      },
      {
        prompt: 'What did Ravi open?',
        options: ['A chest', 'A window', 'A book', 'A gate'],
        answer: 1,
      },
    ],
  },
]
