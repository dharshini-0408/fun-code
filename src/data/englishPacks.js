import { topicById } from './englishCurriculum.js'
import { enrichTopic } from './englishTree.js'

/**
 * Learn + Test packs for each English topic.
 * Missing ids get a solid fallback so every topic is studyable + testable.
 */

const PACKS = {
  'b-be': {
    lesson: [
      {
        type: 'p',
        text: 'The verb **to be** links a subject to what it is. In the present: `I am`, `you/we/they are`, `he/she/it is`.',
      },
      {
        type: 'p',
        text: 'Examples: `I am a student.` · `She is kind.` · `They are ready.`',
      },
      {
        type: 'note',
        text: 'Negatives: `I am not`, `she is not` (isn’t), `they are not` (aren’t).',
      },
    ],
    test: [
      {
        prompt: 'Choose the correct form:',
        sentence: 'She ___ my friend.',
        options: ['am', 'is', 'are', 'be'],
        answer: 1,
        tip: 'She → is.',
      },
      {
        prompt: 'Pick the right sentence:',
        options: ['I are happy.', 'I am happy.', 'I is happy.', 'I be happy.'],
        answer: 1,
        tip: 'I → am.',
      },
      {
        prompt: 'Fill in:',
        sentence: 'They ___ in the library.',
        options: ['is', 'am', 'are', 'be'],
        answer: 2,
        tip: 'They → are.',
      },
    ],
  },
  'e-present-simple': {
    lesson: [
      {
        type: 'p',
        text: 'Present simple talks about habits and facts: `I walk`, `she walks`. Add **-s/-es** for he/she/it.',
      },
      {
        type: 'p',
        text: 'Examples: `I study every day.` · `He plays chess.` · `Water boils at 100°C.`',
      },
      {
        type: 'note',
        text: 'Questions/negatives use do/does: `Does she walk?` · `They do not walk.`',
      },
    ],
    test: [
      {
        prompt: 'Correct form:',
        sentence: 'She ___ to school by bus.',
        options: ['go', 'goes', 'going', 'gone'],
        answer: 1,
        tip: 'He/she/it + verb-s.',
      },
      {
        prompt: 'Which is correct?',
        options: ['He play football.', 'He plays football.', 'He playing football.', 'He played every day usually.'],
        answer: 1,
        tip: 'He + plays.',
      },
      {
        prompt: 'Negatives use:',
        options: ['don’t / doesn’t', 'isn’t only', 'wasn’t', 'will not always'],
        answer: 0,
        tip: 'Present simple negatives: do/does + not.',
      },
    ],
  },
  'e-past-simple': {
    lesson: [
      {
        type: 'p',
        text: 'Past simple tells finished actions: regular verbs add **-ed** (`walked`). Irregular ones change (`go → went`, `see → saw`).',
      },
      {
        type: 'p',
        text: 'Examples: `Yesterday I visited the castle.` · `She wrote a letter.`',
      },
    ],
    test: [
      {
        prompt: 'Past of “write”:',
        options: ['writed', 'wrote', 'written', 'writing'],
        answer: 1,
        tip: 'write → wrote.',
      },
      {
        prompt: 'Correct sentence:',
        options: ['I go home yesterday.', 'I went home yesterday.', 'I goes home yesterday.', 'I going home yesterday.'],
        answer: 1,
        tip: 'Yesterday needs past: went.',
      },
      {
        prompt: 'Regular past of “play”:',
        options: ['plaied', 'played', 'plaid', 'playing'],
        answer: 1,
        tip: 'play → played.',
      },
    ],
  },
  'b-articles': {
    lesson: [
      {
        type: 'p',
        text: '`a` / `an` = one of many (first mention). Use `an` before a vowel sound: `an owl`, `an hour`. `the` = something specific or already known.',
      },
    ],
    test: [
      {
        prompt: 'Choose:',
        sentence: 'I saw ___ owl.',
        options: ['a', 'an', 'the', '—'],
        answer: 1,
        tip: 'Owl starts with a vowel sound → an.',
      },
      {
        prompt: 'Choose:',
        sentence: 'Please close ___ door.',
        options: ['a', 'an', 'the', '—'],
        answer: 2,
        tip: 'A specific door → the.',
      },
      {
        prompt: 'Which is correct?',
        options: ['a apple', 'an apple', 'the apple always', 'apple an'],
        answer: 1,
        tip: 'an + vowel sound.',
      },
    ],
  },
  'e-idioms-body': {
    lesson: [
      {
        type: 'p',
        text: 'Body idioms use body words with special meanings: `lend a hand` = help, `cold feet` = get nervous, `keep an eye on` = watch carefully.',
      },
    ],
    test: [
      {
        prompt: '“Cold feet” means:',
        options: ['winter shoes', 'feeling nervous about doing something', 'walking barefoot', 'a medical test'],
        answer: 1,
        tip: 'Cold feet = sudden doubt or fear.',
      },
      {
        prompt: '“Lend a hand” means:',
        options: ['give someone your hand', 'help someone', 'wave hello', 'borrow gloves'],
        answer: 1,
        tip: 'Lend a hand = offer help.',
      },
      {
        prompt: '“Keep an eye on” means:',
        options: ['sleep', 'watch carefully', 'close one eye', 'draw an eye'],
        answer: 1,
        tip: 'Keep an eye on = monitor / watch.',
      },
    ],
  },
  'i-idioms-animals': {
    lesson: [
      {
        type: 'p',
        text: 'Animal idioms: `a piece of cake` = easy, `let the cat out of the bag` = reveal a secret, `raining cats and dogs` = raining hard.',
      },
    ],
    test: [
      {
        prompt: '“A piece of cake” means:',
        options: ['dessert', 'something easy', 'a birthday', 'expensive food'],
        answer: 1,
        tip: 'Piece of cake = very easy.',
      },
      {
        prompt: '“Let the cat out of the bag” means:',
        options: ['free a pet', 'tell a secret', 'go shopping', 'feed animals'],
        answer: 1,
        tip: 'Reveal a secret.',
      },
      {
        prompt: '“Raining cats and dogs” means:',
        options: ['animals falling', 'heavy rain', 'a pet show', 'sunny weather'],
        answer: 1,
        tip: 'Very heavy rain.',
      },
    ],
  },
  'b-numbers': {
    lesson: [
      {
        type: 'p',
        text: 'Learn numbers for age, phone, and counting: one–twenty, then thirty, forty… `I am twelve.` · `Call me on five-five-five…`',
      },
    ],
    test: [
      {
        prompt: 'How do you say 15?',
        options: ['fifty', 'fifteen', 'five-ten', 'fiveteen'],
        answer: 1,
        tip: '15 = fifteen.',
      },
      {
        prompt: '12 is:',
        options: ['twenty', 'twelve', 'twelf', 'two-one'],
        answer: 1,
        tip: '12 = twelve.',
      },
      {
        prompt: '“I’m ___ years old” (age 8):',
        options: ['eight', 'eighth', 'eighty', 'ate'],
        answer: 0,
        tip: 'Cardinal number for age: eight.',
      },
    ],
  },
  'b-greetings': {
    lesson: [
      {
        type: 'p',
        text: 'Greetings: `Hello` / `Hi`, `Good morning`, `How are you?` → `I’m fine, thanks.` Introduce: `I’m Maya.` · `Nice to meet you.`',
      },
    ],
    test: [
      {
        prompt: 'A polite reply to “How are you?”:',
        options: ['I’m fine, thank you.', 'Who are you?', 'Go away.', 'What?'],
        answer: 0,
        tip: 'I’m fine, thank you — classic reply.',
      },
      {
        prompt: 'To introduce yourself:',
        options: ['I name Maya.', 'I’m Maya.', 'Me Maya.', 'Call Maya I.'],
        answer: 1,
        tip: 'I’m + name.',
      },
      {
        prompt: 'When you meet someone new:',
        options: ['Nice to meet you.', 'Nice to meat you.', 'See you never.', 'Bye forever.'],
        answer: 0,
        tip: 'Nice to meet you.',
      },
    ],
  },
}

function fallbackLesson(topic) {
  const t = enrichTopic(topic)
  return [
    {
      type: 'p',
      text: `${t.name} is part of **${t.area}** → **${t.branch}**.`,
    },
    {
      type: 'p',
      text: `Goal: ${t.goal}`,
    },
    {
      type: 'p',
      text: `Try these with Kitty: ${t.starters.map((s) => `“${s}”`).join(' · ')}`,
    },
    {
      type: 'note',
      text: 'Read the goal, practise with Kitty, then sit the test below when you feel ready.',
    },
  ]
}

function fallbackTest(topic) {
  const t = enrichTopic(topic)
  const name = t.name
  return [
    {
      prompt: `What is the main goal of “${name}”?`,
      options: [t.goal, 'Learn only spelling rules', 'Memorise random numbers', 'Ignore grammar forever'],
      answer: 0,
      tip: 'The goal is written on the topic card.',
    },
    {
      prompt: `“${name}” belongs to which area?`,
      options: [t.area, 'Chemistry', 'Cooking only', 'Silent films'],
      answer: 0,
      tip: `It sits under ${t.area}.`,
    },
    {
      prompt: `Which branch holds “${name}”?`,
      options: [t.branch, 'Astronomy', 'Gardening', 'None'],
      answer: 0,
      tip: `Branch: ${t.branch}.`,
    },
    {
      prompt: 'Best next step after learning?',
      options: ['Sit the test', 'Delete the app', 'Never practise', 'Skip forever'],
      answer: 0,
      tip: 'Learn, then test.',
    },
  ]
}

/** Normalize lesson text: allow **bold** as plain for Lesson component (uses `code`). */
function toLessonBlocks(blocks) {
  return blocks.map((b) => {
    if (b.type === 'p' || b.type === 'note') {
      return { ...b, text: String(b.text).replace(/\*\*([^*]+)\*\*/g, '`$1`') }
    }
    return b
  })
}

export function getTopicPack(topicOrId) {
  const raw = typeof topicOrId === 'string' ? topicById(topicOrId) : topicOrId
  if (!raw) return null
  const topic = enrichTopic(raw)
  const custom = PACKS[topic.id]
  return {
    topic,
    lesson: toLessonBlocks(custom?.lesson ?? fallbackLesson(topic)),
    test: custom?.test ?? fallbackTest(topic),
  }
}
