import Glitter from './Glitter.jsx'
import SubjectCarousel from './SubjectCarousel.jsx'
import SubjectMark from './SubjectMark.jsx'
import TopBar from './TopBar.jsx'
import { TRACK_LIST, tracks } from '../data/index.js'

// The Sorting: a fixed, unscrolling title card. The castle sits centred behind
// the ring of subjects, and each card carries nothing but its mark and its
// name — the detail belongs on the subject's own floor, not on the door.
export default function TrackPicker({ solvedSet, onPick, onNavigate, cta }) {
  return (
    <div className="picker">
      <div className="picker-sky" aria-hidden="true">
        <Glitter />
        <img className="flier anglia" src="/anglia.png" alt="" />
      </div>

      <TopBar active="subjects" onNavigate={onNavigate} cta={cta} />

      <SubjectCarousel label="Subjects">
        {TRACK_LIST.map((t) => {
          const path = tracks[t.id].path
          const done = path.filter((r) => solvedSet.has(r.id)).length
          const ready = path.length > 0
          const floors = tracks[t.id].worlds.length
          return (
            <button
              key={t.id}
              className={`gcard ${ready ? '' : 'locked'}`}
              style={{ '--accent': t.accent }}
              onClick={() => ready && onPick(t.id)}
              disabled={!ready}
              title={ready ? `${t.name} — ${path.length} lessons` : `${t.name} — not yet written`}
            >
              {/* The glossy top half, the way a sticker or a toy button catches
                  the light. Purely decorative. */}
              <span className="gcard-gloss" />

              <span className="gcard-badge">{t.level}</span>

              <span className="gcard-art">
                <span className="gcard-blob" />
                <SubjectMark id={t.id} size={72} />
              </span>

              <span className="gcard-plate">
                <span className="gcard-name">{t.name}</span>
              </span>

              <span className="gcard-stars" aria-label={`Tier ${t.tier} of 5`}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <i key={n} className={`star ${n <= t.tier ? 'on' : ''}`} />
                ))}
              </span>

              <span className="gcard-chips">
                <span className="chip">
                  <b>{ready ? path.length : '—'}</b> lessons
                </span>
                <span className="chip">
                  <b>{ready ? floors : '—'}</b> {floors === 1 ? 'floor' : 'floors'}
                </span>
              </span>

              {ready && done > 0 && (
                <span className="gcard-progress">
                  <span className="gcard-bar">
                    <span style={{ width: `${(done / path.length) * 100}%` }} />
                  </span>
                  <span className="gcard-pct">{Math.round((done / path.length) * 100)}%</span>
                </span>
              )}

              {!ready && <span className="gcard-seal">Locked</span>}
            </button>
          )
        })}
      </SubjectCarousel>
    </div>
  )
}
