import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

// A horizontal carousel whose cards wrap *toward* the viewer, like a panoramic
// screen: the card in the middle sits furthest away and faces you square on,
// and the ones to either side bring their outer edges forward, curving around
// you rather than bulging out at you.
//
// It also loops. `active` is unbounded — it simply keeps counting up or down —
// and every card works out which copy of itself is nearest to that position,
// so the ring has no first card, no last card and no dead end to hit.

const ANGLE = 20 // degrees of turn per card away from centre
const DEPTH = 90 // px each card away from centre comes forward
const FADE = 0.2 // opacity lost per card away from centre
const REACH = 2.6 // cards past this are parked, not turned ever further
const EDGE = Math.ceil(REACH) // ±3: last visible step — slides off screen here

export default function SubjectCarousel({ children, label = 'Subjects' }) {
  const items = Children.toArray(children)
  const count = items.length

  // Unbounded: on a ring of six, seat 7 is seat 1 one lap along.
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(0)
  const trackRef = useRef(null)
  const drag = useRef({})
  const offsetsRef = useRef(null)
  const prevActiveRef = useRef(0)

  // Measure the real step between cards, so the arithmetic cannot drift out of
  // sync with the CSS when the card size changes at a breakpoint.
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      const cell = track.children[0]
      if (!cell) return
      // Cells are stacked on the centre line and placed by transform, so the
      // step is the card's own width plus the gap the CSS declares.
      const w = cell.getBoundingClientRect().width
      const gap = parseFloat(getComputedStyle(track).getPropertyValue('--cell-gap')) || 0
      setStep(w + gap)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    return () => ro.disconnect()
  }, [count])

  const go = useCallback((next) => setActive(next), [])

  function onKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(active - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(active + 1)
    }
  }

  // A trackpad's horizontal swipe turns the ring; a vertical one is left alone.
  function onWheel(e) {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    const now = Date.now()
    if (now - (drag.current.wheelAt ?? 0) < 260) return
    drag.current.wheelAt = now
    go(active + (e.deltaX > 0 ? 1 : -1))
  }

  // A press is not a drag until it has travelled far enough to mean one. The
  // pointer is captured only at THAT moment, never on pointerdown — capturing
  // early retargets the eventual `click` to the capturing element, so the card
  // underneath never receives it and cannot be chosen at all.
  const DRAG_THRESHOLD = 10 // px

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current.x = e.clientX
    drag.current.from = active
    drag.current.moved = false
    drag.current.id = e.pointerId
  }

  function onPointerMove(e) {
    const d = drag.current
    if (d.x == null || !step) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      d.moved = true
      e.currentTarget.setPointerCapture?.(e.pointerId)
    }
    if (d.moved) go(d.from - Math.round(dx / step))
  }

  function onPointerUp(e) {
    if (drag.current.moved) e.currentTarget.releasePointerCapture?.(e.pointerId)
    drag.current.x = null
  }

  // A card you dragged past is not a card you clicked.
  function onClickCapture(e) {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  // Tabbing to a card brings it round the shortest way, so focus never sends
  // the ring spinning the long way about.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onFocusIn = (e) => {
      const cell = e.target.closest('.carousel-cell')
      if (!cell) return
      const i = [...track.children].indexOf(cell)
      if (i < 0) return
      go(active + wrap(i - active, count))
    }
    track.addEventListener('focusin', onFocusIn)
    return () => track.removeEventListener('focusin', onFocusIn)
  }, [go, active, count])

  const centred = ((active % count) + count) % count

  // Cards slide to ±EDGE on the front arc, then hide when they pass behind the ring.
  const folded = new Set()
  if (!offsetsRef.current || offsetsRef.current.length !== count) {
    offsetsRef.current = Array.from({ length: count }, (_, i) => wrap(i - active, count))
    prevActiveRef.current = active
  } else {
    const delta = active - prevActiveRef.current
    if (delta !== 0) {
      offsetsRef.current = offsetsRef.current.map((d, i) => {
        let next = d - delta
        let didFold = false
        while (next < -EDGE) {
          next += count
          didFold = true
        }
        while (next > EDGE) {
          next -= count
          didFold = true
        }
        if (didFold) {
          folded.add(i)
          next = wrap(i - active, count)
        }
        return next
      })
      prevActiveRef.current = active
    }
  }
  const offsets = offsetsRef.current

  return (
    <div className="carousel" role="group" aria-roledescription="carousel" aria-label={label}>
      <div
        className="carousel-stage"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        onClickCapture={onClickCapture}
      >
        {/* Every cell is stacked on the centre line and positioned by transform
            alone. That is what makes looping possible: a card can cross from
            one end of the row to the other without the layout knowing. */}
        <div className="carousel-track" ref={trackRef}>
          {items.map((child, i) => {
            const d = offsets[i]
            const far = Math.min(Math.abs(d), REACH)
            const dir = Math.sign(d) || 1
            const hidden = folded.has(i)
            return (
              <div
                key={i}
                className={`carousel-cell ${d === 0 ? 'centre' : ''} ${hidden ? 'snap' : ''}`}
                style={{
                  transform: `translateX(${d * step}px) translateZ(${far * DEPTH}px) rotateY(${
                    -dir * far * ANGLE
                  }deg)`,
                  opacity: hidden ? 0 : Math.max(0.28, 1 - far * FADE),
                  visibility: hidden ? 'hidden' : 'visible',
                  zIndex: hidden ? 0 : count - Math.abs(d) - (d < 0 ? 1 : 0),
                }}
                aria-hidden={hidden || undefined}
              >
                {child}
              </div>
            )
          })}
        </div>
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-arrow"
          onClick={() => go(active - 1)}
          aria-label="Previous subject"
        >
          ←
        </button>

        <div
          className="carousel-rail"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={count}
          aria-valuenow={centred + 1}
          aria-label={`Subject ${centred + 1} of ${count}`}
        >
          <span
            className="carousel-rail-fill"
            style={{ width: `${100 / count}%`, left: `${(centred * 100) / count}%` }}
          />
        </div>

        <button
          className="carousel-arrow"
          onClick={() => go(active + 1)}
          aria-label="Next subject"
        >
          →
        </button>
      </div>
    </div>
  )
}

// The shortest signed distance around a ring of `n`. On six cards an offset of
// 5 is really -1: one seat the other way, not five the long way.
function wrap(delta, n) {
  const half = n / 2
  let d = ((delta % n) + n) % n
  if (d > half) d -= n
  return d
}
