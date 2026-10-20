import { TRACKS, worldsFor } from '../data/index.js'
import { conceptsFor, levelsFor } from '../engine/practice.js'
import StaircaseMap from './StaircaseMap.jsx'

export default function WorldMap({
  trackId,
  path,
  solvedSet,
  practiceSolved,
  onEnter,
  onReset,
  onPractice,
  onSwitchTrack,
  onTopics,
  onPlayground,
}) {
  const worlds = worldsFor(trackId)
  const track = TRACKS[trackId]
  // Progress is kept for both tracks at once, so only count this track's rooms.
  const done = path.filter((r) => solvedSet.has(r.id)).length
  const total = path.length
  // The next unsolved room on the path — everything beyond it stays locked.
  const frontier = path.findIndex((r) => !solvedSet.has(r.id))
  const unlockedUpTo = frontier === -1 ? total - 1 : frontier

  return (
    <div className="map">
      <header className="map-head">
        <button className="btn link" onClick={onSwitchTrack}>
          ← back to the Sorting
        </button>
        <h1 className="brand">
          {track.icon} {track.name}
        </h1>
        <p className="tagline">
          {path.length} lessons up the moving staircase. Sit the lesson, pass the examination, and
          the next door unbolts itself.
        </p>

        <div className="meter">
          <div className="meter-bar">
            <span style={{ width: `${(done / total) * 100}%` }} />
          </div>
          <span className="meter-text">
            {done} of {total} passed
          </span>
        </div>

        <button className="btn primary big" onClick={() => onEnter(unlockedUpTo)}>
          {done === 0
            ? 'begin your first lesson'
            : done === total
              ? 'wander the castle'
              : 'back to your lesson'}
        </button>

        <nav className="map-shortcuts">
          <button className="shortcut" onClick={onTopics}>
            <span className="shortcut-icon">🕯️</span>
            <span className="shortcut-name">The Library</span>
            <span className="shortcut-blurb">every subject, no pass required</span>
          </button>
          <button className="shortcut" onClick={() => onPlayground(trackId)}>
            <span className="shortcut-icon">🪄</span>
            <span className="shortcut-name">Room of Requirement</span>
            <span className="shortcut-blurb">a blank page for {track.name}</span>
          </button>
        </nav>
      </header>

      <StaircaseMap
        stages={path}
        unlockedUpTo={unlockedUpTo}
        solvedSet={solvedSet}
        onEnter={onEnter}
      />

      {worlds.map((world) => {
        const rooms = path.map((r, i) => ({ ...r, i })).filter((r) => r.worldId === world.id)
        const cleared = rooms.filter((r) => solvedSet.has(r.id)).length
        const open = rooms[0].i <= unlockedUpTo

        return (
          <section key={world.id} className={`world ${open ? '' : 'shut'}`}>
            <div className="world-head">
              <span className="world-icon">{world.icon}</span>
              <div>
                <h2>{world.name}</h2>
                <p>{world.tagline}</p>
              </div>
              <span className="world-count">
                {cleared}/{rooms.length}
              </span>
            </div>

            <div className="world-bar">
              <span className="world-bar-fill" style={{ width: `${(cleared / rooms.length) * 100}%` }} />
            </div>
          </section>
        )
      })}

      {/* Never locked. However far along the rooms you are, the yard is open. */}
      <section className="world practice-block">
        <div className="world-head">
          <span className="world-icon">⚔️</span>
          <div>
            <h2>The Duelling Club</h2>
            <p>
              Endless {track.name} duels, conjured on the spot. Pick a year — no two are ever the
              same, and the club never closes.
            </p>
          </div>
          {practiceSolved > 0 && <span className="world-count">{practiceSolved} won</span>}
        </div>

        <div className="level-cards">
          {levelsFor(trackId).map((level) => (
            <button key={level.id} className="level-card" onClick={() => onPractice(level.id)}>
              <span className="level-name">{level.label}</span>
              <span className="level-blurb">{level.blurb}</span>
              <span className="level-concepts">{conceptsFor(trackId, level.id).join(' · ')}</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="map-foot">
        <button className="btn ghost small" onClick={onReset}>
          obliviate — forget everything and start again
        </button>
      </footer>
    </div>
  )
}
