import { ENGLISH_TOPICS } from './englishCurriculum.js'

/** Display order for areas on the English hub. */
export const AREA_ORDER = [
  'Basics',
  'Grammar',
  'Vocabulary',
  'Idioms & Phrases',
  'Spelling',
  'Speaking',
  'Listening',
  'Writing',
  'Reading',
  'Pronunciation',
  'Everyday',
  'Exam',
]

const AREA_META = {
  Basics: { icon: '🌱', accent: '#5c8a3a' },
  Grammar: { icon: '✨', accent: '#c45c26' },
  Vocabulary: { icon: '📚', accent: '#3d8b6e' },
  'Idioms & Phrases': { icon: '🧩', accent: '#c45c9a' },
  Spelling: { icon: '✏️', accent: '#2a6b9e' },
  Speaking: { icon: '💬', accent: '#d2a017' },
  Listening: { icon: '🎧', accent: '#6b3fa0' },
  Writing: { icon: '🪶', accent: '#8b6914' },
  Reading: { icon: '🔎', accent: '#4a6fa5' },
  Pronunciation: { icon: '🔊', accent: '#9b1c2e' },
  Everyday: { icon: '🏠', accent: '#1f5c3d' },
  Exam: { icon: '🎓', accent: '#22407a' },
}

/** Map topic id → branch name inside its area (e.g. Grammar → Verbs). */
const BRANCH_BY_ID = {
  'b-alphabet': 'Letters & Sounds',
  'b-be': 'Verbs',
  'b-articles': 'Articles',
  'b-pronouns': 'Pronouns',
  'b-questions': 'Questions',
  'e-present-simple': 'Verbs',
  'e-present-cont': 'Verbs',
  'e-past-simple': 'Verbs',
  'e-future': 'Verbs',
  'e-prepositions': 'Prepositions',
  'e-adjectives': 'Adjectives',
  'e-spelling-core': 'Patterns',
  'i-perfect': 'Verbs',
  'i-perfect-cont': 'Verbs',
  'i-conditionals-1': 'Conditionals',
  'i-modals': 'Modals',
  'i-passives': 'Voice',
  'i-reported': 'Reported Speech',
  'i-relative': 'Clauses',
  'u-conditionals-2': 'Conditionals',
  'u-mixed-cond': 'Conditionals',
  'u-wish': 'Wish & Preference',
  'u-inversion': 'Advanced Structure',
  'u-noun-clauses': 'Clauses',
  'a-discourse': 'Advanced Structure',
  'a-subjunctive': 'Advanced Structure',
  'b-numbers': 'Numbers & Time',
  'b-colours': 'Everyday Words',
  'b-family': 'People',
  'b-vocab-school': 'School',
  'e-food': 'Food & Drink',
  'e-home': 'Home',
  'e-jobs': 'Work',
  'e-vocab-travel': 'Travel',
  'i-vocab-collocations': 'Word Partners',
  'i-vocab-feelings': 'Feelings',
  'u-academic-vocab': 'Academic Words',
  'a-nuance': 'Nuance',
  'u-idioms': 'Common Idioms',
  'e-idioms-body': 'Body Idioms',
  'i-idioms-animals': 'Animal Idioms',
  'i-idioms-time': 'Time & Work Idioms',
  'a-idioms-advanced': 'Proverbs & Advanced',
  'b-greetings': 'Greetings',
  'b-speaking-hello': 'Small Talk',
  'b-classroom': 'Classroom',
  'b-everyday-home': 'At Home',
  'e-shopping': 'Shopping',
  'e-directions': 'Directions',
  'i-speaking-opinion': 'Opinions',
  'u-meetings': 'Meetings',
  'a-rhetoric': 'Persuasion',
  'a-debate': 'Debate',
  'a-culture': 'Culture',
  'i-listening-gist': 'Listening Skills',
  'i-writing-paragraph': 'Paragraphs',
  'i-email': 'Emails',
  'e-writing-notes': 'Notes',
  'u-essay': 'Essays',
  'a-style': 'Style',
  'a-editing': 'Editing',
  'u-summarising': 'Summarising',
  'i-reading-news': 'News',
  'a-literary': 'Literature',
  'e-pronounce-th': 'Tricky Sounds',
  'u-pronunciation': 'Stress & Rhythm',
  'u-exam-vocab': 'Word Banks',
  'a-exam': 'Strategies',
}

function displayArea(area) {
  if (area === 'Idioms') return 'Idioms & Phrases'
  return area
}

export function enrichTopic(topic) {
  const area = displayArea(topic.area)
  const branch = BRANCH_BY_ID[topic.id] ?? 'General'
  return { ...topic, area, branch }
}

/** Full tree: areas → branches → topics (every charm, no duplicate hub cards). */
export function englishTopicTree() {
  const enriched = ENGLISH_TOPICS.map(enrichTopic)
  const byArea = new Map()

  for (const t of enriched) {
    if (!byArea.has(t.area)) byArea.set(t.area, new Map())
    const branches = byArea.get(t.area)
    if (!branches.has(t.branch)) branches.set(t.branch, [])
    branches.get(t.branch).push(t)
  }

  const areas = []
  for (const name of AREA_ORDER) {
    if (!byArea.has(name)) continue
    const branchMap = byArea.get(name)
    const branches = [...branchMap.entries()].map(([branch, topics]) => ({
      name: branch,
      topics,
    }))
    const meta = AREA_META[name] ?? { icon: '📖', accent: '#e8b44a' }
    areas.push({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      icon: meta.icon,
      accent: meta.accent,
      count: branches.reduce((n, b) => n + b.topics.length, 0),
      branches,
    })
    byArea.delete(name)
  }

  // Any leftover areas
  for (const [name, branchMap] of byArea) {
    const branches = [...branchMap.entries()].map(([branch, topics]) => ({
      name: branch,
      topics,
    }))
    const meta = AREA_META[name] ?? { icon: '📖', accent: '#e8b44a' }
    areas.push({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      icon: meta.icon,
      accent: meta.accent,
      count: branches.reduce((n, b) => n + b.topics.length, 0),
      branches,
    })
  }

  return areas
}

export function allEnrichedTopics() {
  return ENGLISH_TOPICS.map(enrichTopic)
}
