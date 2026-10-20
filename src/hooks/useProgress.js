import { useCallback, useEffect, useState } from 'react'

const KEY = 'funcode.progress.v1'

const EMPTY = {
  track: null,   // 'javascript' | 'react' — null means "not chosen yet"
  solved: [],    // room ids, in the order they were escaped
  drafts: {},    // roomId -> the code the player last had in the editor
  hintsUsed: {}, // roomId -> how many hints were revealed
  practiceSolved: 0, // generated drills cracked; the drills themselves are not kept
}

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY
  } catch {
    return EMPTY
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(read)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress))
    } catch {
      // private browsing, quota, whatever — the game still works, it just forgets
    }
  }, [progress])

  const solve = useCallback((roomId) => {
    setProgress((p) =>
      p.solved.includes(roomId) ? p : { ...p, solved: [...p.solved, roomId] },
    )
  }, [])

  const saveDraft = useCallback((roomId, code) => {
    setProgress((p) => ({ ...p, drafts: { ...p.drafts, [roomId]: code } }))
  }, [])

  const revealHint = useCallback((roomId, count) => {
    setProgress((p) => ({ ...p, hintsUsed: { ...p.hintsUsed, [roomId]: count } }))
  }, [])

  // Both tracks keep their progress; this only decides which one you are looking
  // at. `null` sends you back to the picker.
  const chooseTrack = useCallback((track) => {
    setProgress((p) => ({ ...p, track }))
  }, [])

  const countPractice = useCallback(() => {
    setProgress((p) => ({ ...p, practiceSolved: p.practiceSolved + 1 }))
  }, [])

  const reset = useCallback(() => setProgress({ ...EMPTY }), [])

  return { progress, solve, saveDraft, revealHint, reset, chooseTrack, countPractice }
}
