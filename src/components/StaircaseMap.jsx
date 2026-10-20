import { useEffect, useRef } from 'react'

// The moving staircase: the path of lessons, climbing down the page.
//
// Landings alternate left and right of a central axis, joined by one SVG
// path drawn through the very same points, so the banister can never drift
// off the steps. Vertical, because a castle staircase is.

const STEP = 128 // vertical gap between landings
const SWING = 21 // how far either side of the axis, in % of the width
const PAD = 76 // breathing room top and bottom

function landingAt(i) {
  return {
    x: 50 + Math.sin(i * 0.85) * SWING, // percent across
    y: PAD + i * STEP,
  }
}

// The banister: a smooth curve through the landings. Coordinates are given in
// the SVG's own 0–100 user space horizontally, stretched to fit by
// preserveAspectRatio="none", so it lines up with the percentage-placed steps.
function banister(points) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const p = points[i]
    const prev = points[i - 1]
    const cy = (prev.y + p.y) / 2
    d += ` C ${prev.x} ${cy}, ${p.x} ${cy}, ${p.x} ${p.y}`
  }
  return d
}

export default function StaircaseMap({ stages, unlockedUpTo, solvedSet, onEnter }) {
  const current = useRef(null)

  // Arriving at the map should show you where you actually stand.
  useEffect(() => {
    current.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [unlockedUpTo])

  const points = stages.map((_, i) => landingAt(i))
  const height = PAD * 2 + (stages.length - 1) * STEP
  const walked = points.slice(0, Math.max(unlockedUpTo + 1, 1))

  return (
    <div className="stair" style={{ height }}>
      <svg
        className="stair-svg"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="stair-rail" d={banister(points)} />
        <path className="stair-rail lit" d={banister(walked)} />
      </svg>

      {stages.map((stage, i) => {
        const { x, y } = points[i]
        const isSolved = solvedSet.has(stage.id)
        const locked = i > unlockedUpTo
        const isCurrent = i === unlockedUpTo && !isSolved
        const state = isSolved ? 'done' : locked ? 'locked' : 'open'

        return (
          <button
            key={stage.id}
            ref={isCurrent ? current : null}
            className={`landing ${state} ${isCurrent ? 'current' : ''} ${x < 50 ? 'left' : 'right'}`}
            style={{ left: `${x}%`, top: y }}
            onClick={() => onEnter(i)}
            disabled={locked}
            title={locked ? 'This door will not open until the last one has' : stage.concept}
          >
            <span className="landing-crest">
              <span className="landing-n">{isSolved ? '✦' : locked ? '🔒' : i + 1}</span>
            </span>
            <span className="landing-plate">
              <span className="landing-name">{stage.name}</span>
              <span className="landing-concept">{stage.concept}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
