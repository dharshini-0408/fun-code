/** Synonyms via free `synonyms` npm pack (offline WordNet-style). */

import synonyms from 'synonyms'

export function normalizeWord(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/[^\w'-]/g, '')
}

/** Flatten POS buckets from the package into a unique list. */
export function lookupSynonyms(word) {
  const q = normalizeWord(word)
  if (!q) throw new Error('Type a word to look up.')

  const res = synonyms(q)
  if (!res || typeof res !== 'object') {
    throw new Error(`No synonyms found for “${q}”. Try a simpler word.`)
  }

  const junk = new Set(['n', 'v', 'a', 's', 'r', 'noun', 'verb', 'adjective', 'adverb'])
  const byPos = {}
  const all = new Set()
  for (const [pos, list] of Object.entries(res)) {
    if (!Array.isArray(list)) continue
    const clean = [
      ...new Set(
        list
          .map((w) => String(w).toLowerCase())
          .filter((w) => w && w !== q && w.length > 1 && !junk.has(w) && !/^\d+$/.test(w)),
      ),
    ]
    if (!clean.length) continue
    byPos[pos] = clean
    clean.forEach((w) => all.add(w))
  }

  if (!all.size) throw new Error(`No synonyms found for “${q}”. Try a simpler word.`)

  const posLabel = { n: 'noun', v: 'verb', a: 'adjective', s: 'adjective', r: 'adverb' }

  return {
    word: q,
    synonyms: [...all].sort(),
    groups: Object.entries(byPos).map(([pos, list]) => ({
      label: posLabel[pos] || pos,
      words: list,
    })),
  }
}

/** Curated quiz words that resolve well in the pack. */
export const SYNONYM_QUIZ_SEEDS = [
  'big',
  'small',
  'fast',
  'angry',
  'help',
  'start',
  'finish',
  'important',
  'quiet',
  'strong',
  'cold',
  'hot',
  'kind',
  'easy',
  'hard',
  'quick',
  'slow',
  'bright',
  'dark',
  'rich',
]

export const SUGGESTED_WORDS = [
  'happy',
  'brave',
  'big',
  'smart',
  'quick',
  'kind',
  'loud',
  'careful',
]

export function buildSynonymQuiz(count = 10) {
  const items = []
  const seeds = [...SYNONYM_QUIZ_SEEDS]
  for (let i = seeds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[seeds[i], seeds[j]] = [seeds[j], seeds[i]]
  }

  for (const word of seeds) {
    if (items.length >= count) break
    let entry
    try {
      entry = lookupSynonyms(word)
    } catch {
      continue
    }
    const correct = entry.synonyms[0]
    if (!correct) continue

    const wrongPool = []
    for (const other of SYNONYM_QUIZ_SEEDS) {
      if (other === word) continue
      try {
        const alt = lookupSynonyms(other).synonyms
        for (const w of alt) {
          if (w !== correct && !entry.synonyms.includes(w) && !wrongPool.includes(w)) {
            wrongPool.push(w)
          }
          if (wrongPool.length >= 8) break
        }
      } catch {
        /* skip */
      }
      if (wrongPool.length >= 8) break
    }

    const options = [correct, ...wrongPool.slice(0, 3)]
    if (options.length < 4) continue
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }

    items.push({
      id: `syn-${word}`,
      prompt: `Which word is a synonym of “${word}”?`,
      options,
      answer: options.indexOf(correct),
      tip: `Synonyms of ${word} include: ${entry.synonyms.slice(0, 5).join(', ')}.`,
    })
  }
  return items
}
