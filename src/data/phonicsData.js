/** Pronunciation & phonics study cards — hear with speechSynthesis, practise with mic. */

export const PHONICS_GROUPS = [
  {
    id: 'short-vowels',
    name: 'Short vowels',
    items: [
      { id: 'a', symbol: '/æ/', label: 'a as in cat', say: 'cat', tip: 'Mouth open, short “a”.' },
      { id: 'e', symbol: '/e/', label: 'e as in bed', say: 'bed', tip: 'Short “eh” sound.' },
      { id: 'i', symbol: '/ɪ/', label: 'i as in sit', say: 'sit', tip: 'Short “ih”, not “eye”.' },
      { id: 'o', symbol: '/ɒ/', label: 'o as in hot', say: 'hot', tip: 'Short rounded “o”.' },
      { id: 'u', symbol: '/ʌ/', label: 'u as in cup', say: 'cup', tip: 'Relaxed “uh”.' },
    ],
  },
  {
    id: 'long-vowels',
    name: 'Long vowels',
    items: [
      { id: 'ay', symbol: '/eɪ/', label: 'a_e / ay as in cake', say: 'cake', tip: 'Says its letter name “A”.' },
      { id: 'ee', symbol: '/iː/', label: 'ee as in tree', say: 'tree', tip: 'Smile for a long “ee”.' },
      { id: 'igh', symbol: '/aɪ/', label: 'i_e / igh as in light', say: 'light', tip: 'Sounds like “eye”.' },
      { id: 'oa', symbol: '/oʊ/', label: 'o_e / oa as in boat', say: 'boat', tip: 'Long “oh”.' },
      { id: 'oo', symbol: '/uː/', label: 'oo as in moon', say: 'moon', tip: 'Round lips for “oo”.' },
    ],
  },
  {
    id: 'digraphs',
    name: 'Consonant digraphs',
    items: [
      { id: 'sh', symbol: '/ʃ/', label: 'sh as in ship', say: 'ship', tip: 'Quiet “shhh”.' },
      { id: 'ch', symbol: '/tʃ/', label: 'ch as in chip', say: 'chip', tip: 'Burst of air: “ch”.' },
      { id: 'th', symbol: '/θ/', label: 'th as in thin', say: 'thin', tip: 'Tongue between teeth.' },
      { id: 'thv', symbol: '/ð/', label: 'th as in this', say: 'this', tip: 'Voiced th — soft vibration.' },
      { id: 'ng', symbol: '/ŋ/', label: 'ng as in sing', say: 'sing', tip: 'Back of the tongue, nasal.' },
    ],
  },
  {
    id: 'pairs',
    name: 'Minimal pairs',
    items: [
      { id: 'ship-sheep', symbol: '/ɪ/ vs /iː/', label: 'ship / sheep', say: 'ship sheep', tip: 'Short ih vs long ee.' },
      { id: 'full-fool', symbol: '/ʊ/ vs /uː/', label: 'full / fool', say: 'full fool', tip: 'Short vs long oo.' },
      { id: 'bat-bad', symbol: '/t/ vs /d/', label: 'bat / bad', say: 'bat bad', tip: 'Unvoiced t vs voiced d.' },
      { id: 'rice-rise', symbol: '/s/ vs /z/', label: 'rice / rise', say: 'rice rise', tip: 'Hiss s vs buzz z.' },
    ],
  },
]

export const ALL_PHONICS = PHONICS_GROUPS.flatMap((g) =>
  g.items.map((item) => ({ ...item, group: g.name, groupId: g.id })),
)

export function normalizeSpeech(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
}

export function checkPronunciation(heard, target) {
  const a = normalizeSpeech(heard)
  const b = normalizeSpeech(target)
  if (!a) return false
  if (a === b) return true
  // Allow either word from a minimal-pair target
  const parts = b.split(' ')
  return parts.some((p) => a === p || a.includes(p))
}

export function speakText(text, { rate = 0.85 } = {}) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  u.rate = rate
  window.speechSynthesis.speak(u)
  return true
}
