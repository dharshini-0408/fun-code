/** Free idioms dataset via `idioms.js` (MIT) — search + study + quiz. */

import rawIdioms from 'idioms.js'

function titleCasePhrase(s) {
  return String(s)
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function normalizeKey(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s']/g, '')
    .replace(/\s+/g, ' ')
}

function tokens(s) {
  return normalizeKey(s)
    .split(' ')
    .filter((t) => t.length > 1)
}

/** Deduped list: { id, idiom, meaning } */
export const ALL_IDIOMS = (() => {
  const seen = new Set()
  const out = []
  for (const row of rawIdioms ?? []) {
    const idiom = titleCasePhrase(row.idiom || '')
    const meaning = String(row.meaning || '').trim()
    const key = normalizeKey(idiom)
    if (!key || !meaning || seen.has(key)) continue
    seen.add(key)
    out.push({ id: key.replace(/\s+/g, '-'), idiom, meaning })
  }
  return out.sort((a, b) => a.idiom.localeCompare(b.idiom))
})()

export function searchIdioms(query) {
  const q = normalizeKey(query)
  if (!q) return []
  const qTokens = tokens(q)

  const scored = []
  for (const item of ALL_IDIOMS) {
    const key = normalizeKey(item.idiom)
    const mean = normalizeKey(item.meaning)
    let score = 0

    if (key === q) score = 100
    else if (key.startsWith(q)) score = 80
    else if (key.includes(q)) score = 60
    else if (qTokens.length > 1 && qTokens.every((t) => key.includes(t))) score = 55
    else if (qTokens.some((t) => key.split(' ').includes(t))) score = 40
    else if (mean.includes(q)) score = 20
    else if (qTokens.length > 1 && qTokens.every((t) => mean.includes(t))) score = 15

    if (score > 0) scored.push({ item, score })
  }

  scored.sort((a, b) => b.score - a.score || a.item.idiom.localeCompare(b.item.idiom))
  return scored.slice(0, 40).map((s) => s.item)
}

export function lookupIdiom(query) {
  const hits = searchIdioms(query)
  if (!hits.length) {
    throw new Error(`No idiom found for “${query.trim()}”. Try another phrase.`)
  }
  return { match: hits[0], related: hits.slice(1, 8) }
}

/** Pick N quiz items with 3 wrong meanings from the free pack. */
export function buildIdiomQuiz(count = 12) {
  const pool = [...ALL_IDIOMS]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  const picks = pool.slice(0, Math.min(count, pool.length))

  return picks.map((item, idx) => {
    const wrongs = []
    for (const other of pool) {
      if (other.id === item.id) continue
      if (wrongs.includes(other.meaning)) continue
      wrongs.push(other.meaning)
      if (wrongs.length >= 3) break
    }
    const options = [...wrongs, item.meaning]
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }
    return {
      id: `q-${idx}-${item.id}`,
      prompt: `What does “${item.idiom}” mean?`,
      options,
      answer: options.indexOf(item.meaning),
      tip: item.meaning,
    }
  })
}

const WANT_SUGGESTIONS = [
  'a piece of cake',
  'under the weather',
  'spill the beans',
  'hit the books',
  'once in a blue moon',
  'bite the bullet',
  'an arm and a leg',
  'break a leg',
  'on the same page',
  'a blessing in disguise',
]

export const SUGGESTED_IDIOMS = WANT_SUGGESTIONS.map((want) => {
  const hit = ALL_IDIOMS.find((i) => normalizeKey(i.idiom) === normalizeKey(want))
  return hit?.idiom
}).filter(Boolean)

while (SUGGESTED_IDIOMS.length < 8) {
  const next = ALL_IDIOMS[SUGGESTED_IDIOMS.length]
  if (!next || SUGGESTED_IDIOMS.includes(next.idiom)) break
  SUGGESTED_IDIOMS.push(next.idiom)
}
