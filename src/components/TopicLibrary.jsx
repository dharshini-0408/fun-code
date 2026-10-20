import { useMemo, useState } from 'react'
import Lesson from './Lesson.jsx'
import TryIt from './TryIt.jsx'
import { TRACKS, engineFor, worldsFor } from '../data/index.js'

// The reference half of the app: every topic in the track, listed by segment,
// free to read in any order. No locks here — the stage path is where you earn
// your way forward, and this is where you come to look something up or learn a
// single topic on its own. Each worked example in a lesson is runnable.
export default function TopicLibrary({ trackId, solvedSet, onBack, onPractice }) {
  const worlds = worldsFor(trackId)
  const track = TRACKS[trackId]
  const [openId, setOpenId] = useState(worlds[0]?.rooms[0]?.id)
  const [q, setQ] = useState('')

  const segments = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return worlds
    return worlds
      .map((w) => ({
        ...w,
        rooms: w.rooms.filter((r) =>
          `${r.name} ${r.concept}`.toLowerCase().includes(needle),
        ),
      }))
      .filter((w) => w.rooms.length > 0)
  }, [worlds, q])

  const topic = useMemo(
    () => worlds.flatMap((w) => w.rooms).find((r) => r.id === openId),
    [worlds, openId],
  )

  const examples = topic?.lesson.filter((b) => b.type === 'code') ?? []

  return (
    <div className="library">
      <header className="lib-head">
        <button className="btn link" onClick={onBack}>
          ← the staircase
        </button>
        <h1 className="brand">
          {track.icon} The Library · {track.name}
        </h1>
        <p className="tagline">
          Every subject on its shelf, in any order you please — no pass required. Read it, then
          take the examples down and try the spells yourself.
        </p>
      </header>

      <div className="lib-body">
        <aside className="lib-nav">
          <input
            className="lib-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="summon a subject…"
            aria-label="Search topics"
          />

          {segments.map((w) => (
            <div key={w.id} className="lib-seg">
              <h3 className="lib-seg-name">
                <span>{w.icon}</span> {w.name}
              </h3>
              <ul>
                {w.rooms.map((r) => (
                  <li key={r.id}>
                    <button
                      className={`lib-link ${r.id === openId ? 'on' : ''}`}
                      onClick={() => setOpenId(r.id)}
                    >
                      <span className="lib-link-name">{r.concept}</span>
                      {solvedSet.has(r.id) && <span className="lib-star">★</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {segments.length === 0 && (
            <p className="dimmed">Nothing on the shelves matches "{q}".</p>
          )}
        </aside>

        <article className="lib-main">
          {topic ? (
            <>
              <p className="lib-crumb">{topic.concept}</p>
              <h2 className="lib-title">{topic.name}</h2>

              <Lesson blocks={topic.lesson} />

              {examples.length > 0 && (
                <section className="panel">
                  <h3 className="panel-title">Practise the spell</h3>
                  <p className="dimmed">
                    The examples above, but live. Change anything and cast it — nothing in the
                    Library is ever marked.
                  </p>
                  {examples.map((b, i) => (
                    <TryIt
                      key={i}
                      code={b.code}
                      engine={engineFor(trackId)}
                      bootstrap={trackId === 'bootstrap'}
                      label={examples.length > 1 ? `Spell ${i + 1}` : 'Try the spell'}
                    />
                  ))}
                </section>
              )}

              <section className="panel">
                <h3 className="panel-title">Sit the examination</h3>
                <p className="prompt">{topic.puzzle.prompt}</p>
                <p className="dimmed">
                  The marked version waits on the staircase, where passing it unbolts the next
                  door.
                </p>
                <button className="btn ghost small" onClick={() => onPractice()}>
                  step into the Duelling Club →
                </button>
              </section>
            </>
          ) : (
            <p className="dimmed">Take something down from the shelf on the left.</p>
          )}
        </article>
      </div>
    </div>
  )
}
