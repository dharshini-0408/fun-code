/** Words & short phrases for mic spelling practice. */

export const VOCAB_SPELL = [
  { id: 'v1', display: 'castle', hint: 'a large old building with towers' },
  { id: 'v2', display: 'library', hint: 'a place with many books' },
  { id: 'v3', display: 'friend', hint: 'someone you like and trust' },
  { id: 'v4', display: 'beautiful', hint: 'very pretty' },
  { id: 'v5', display: 'because', hint: 'gives a reason' },
  { id: 'v6', display: 'necessary', hint: 'needed; important' },
  { id: 'v7', display: 'knowledge', hint: 'what you know' },
  { id: 'v8', display: 'adventure', hint: 'an exciting journey' },
  { id: 'v9', display: 'whisper', hint: 'speak very quietly' },
  { id: 'v10', display: 'journey', hint: 'a trip from one place to another' },
  { id: 'v11', display: 'courage', hint: 'bravery' },
  { id: 'v12', display: 'tomorrow', hint: 'the day after today' },
  { id: 'v13', display: 'separate', hint: 'keep apart' },
  { id: 'v14', display: 'receive', hint: 'get something' },
  { id: 'v15', display: 'definitely', hint: 'for sure' },
  { id: 'v16', display: 'thank you', hint: 'polite words when someone helps' },
  { id: 'v17', display: 'good morning', hint: 'greeting before noon' },
  { id: 'v18', display: 'how are you', hint: 'ask about someone’s health' },
]

export function normalizeSpell(s) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
}
