// Gold motes drifting across the Sorting, the way dust turns in candlelight.
//
// The positions are a fixed table rather than Math.random(), for two reasons:
// a random layout would reshuffle on every re-render and make the whole sky
// jump, and a hand-placed spread avoids the clumps and bald patches random
// scattering always produces.
//
// Every mote carries a negative animation delay, so on load they are already
// mid-drift at different points instead of all starting together.
//
// Only SOME of them twinkle. A field where every speck blinks is noise; a
// field where none do is dead. The ones that sparkle do it sharply — a quick
// double flash with a long quiet gap — while the rest just glow and drift.

// x%, y%, size px, drift x vw, drift y vh, drift secs, delay, twinkle secs (0 = steady)
const MOTES = [
  [4, 18, 3, 2, -16, 17, -2, 0],
  [11, 62, 2, -1, -13, 21, -9, 3.4],
  [17, 33, 4, 3, -19, 15, -5, 2.6],
  [22, 84, 2, -2, -15, 23, -14, 0],
  [28, 9, 3, 1, -12, 19, -7, 0],
  [33, 51, 5, -3, -21, 14, -11, 2.1],
  [38, 72, 2, 2, -14, 25, -3, 0],
  [43, 24, 3, -1, -17, 18, -16, 4.1],
  [48, 90, 4, 2, -20, 16, -6, 2.9],
  [52, 41, 2, -2, -12, 22, -13, 0],
  [57, 15, 3, 3, -18, 20, -1, 0],
  [62, 67, 5, -1, -22, 13, -10, 2.4],
  [67, 37, 2, 1, -13, 24, -18, 0],
  [71, 79, 3, -3, -16, 17, -4, 3.7],
  [76, 12, 4, 2, -19, 15, -12, 2.2],
  [81, 55, 2, -2, -14, 26, -8, 0],
  [85, 28, 3, 1, -17, 19, -15, 0],
  [89, 71, 4, -2, -20, 16, -2, 3.1],
  [93, 44, 2, 2, -12, 23, -17, 0],
  [96, 20, 3, -1, -18, 21, -6, 0],
  [8, 45, 2, 2, -15, 27, -20, 4.6],
  [64, 5, 3, -2, -16, 18, -19, 0],
]

export default function Glitter() {
  return (
    <div className="glitter" aria-hidden="true">
      {MOTES.map(([x, y, size, dx, dy, dur, delay, tw], i) => (
        <span
          key={i}
          className={`mote ${size >= 4 ? 'bright' : ''} ${tw ? 'twinkles' : ''}`}
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            '--dx': `${dx}vw`,
            '--dy': `${dy}vh`,
            '--dur': `${dur}s`,
            '--delay': `${delay}s`,
            '--tw': `${tw || 0}s`,
          }}
        />
      ))}
    </div>
  )
}
