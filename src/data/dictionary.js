// Free Dictionary API — https://dictionaryapi.dev (no key, free forever)

const ENDPOINT = 'https://api.dictionaryapi.dev/api/v2/entries/en'

export async function lookupWord(word) {
  const q = word.trim().toLowerCase()
  if (!q) throw new Error('Type a word to look up.')

  let entries
  try {
    // Prefer the small client when available; fall back to fetch.
    const mod = await import('dictionary-api-client').catch(() => null)
    if (mod?.getDefinitionFor) {
      const res = await mod.getDefinitionFor({ word: q })
      if (res?.code === 'api-ok' && res.payload) entries = res.payload
      else throw new Error(res?.message || 'No definition found.')
    } else {
      const r = await fetch(`${ENDPOINT}/${encodeURIComponent(q)}`)
      if (r.status === 404) throw new Error(`No definition found for “${q}”.`)
      if (!r.ok) throw new Error('Dictionary is busy — try again in a moment.')
      entries = await r.json()
    }
  } catch (e) {
    if (e.message?.includes('definition') || e.message?.includes('No ')) throw e
    // Retry with raw fetch if the package failed
    const r = await fetch(`${ENDPOINT}/${encodeURIComponent(q)}`)
    if (r.status === 404) throw new Error(`No definition found for “${q}”.`)
    if (!r.ok) throw new Error('Dictionary is busy — try again in a moment.')
    entries = await r.json()
  }

  const first = Array.isArray(entries) ? entries[0] : entries
  if (!first?.word) throw new Error(`No definition found for “${q}”.`)

  const audio =
    first.phonetics?.find((p) => p.audio)?.audio ||
    first.phonetics?.[0]?.audio ||
    ''

  const meanings = (first.meanings ?? []).map((m) => ({
    partOfSpeech: m.partOfSpeech,
    definitions: (m.definitions ?? []).slice(0, 4).map((d) => ({
      definition: d.definition,
      example: d.example || '',
      synonyms: (d.synonyms ?? []).slice(0, 5),
    })),
  }))

  return {
    word: first.word,
    phonetic: first.phonetic || first.phonetics?.find((p) => p.text)?.text || '',
    audio: audio.startsWith('//') ? `https:${audio}` : audio,
    meanings,
  }
}

export const SUGGESTED_WORDS = [
  'castle',
  'brave',
  'library',
  'whisper',
  'journey',
  'curious',
  'friendship',
  'adventure',
  'knowledge',
  'harmony',
]
