import { ENGLISH_LEVELS, ENGLISH_TOPICS, topicsByArea, topicsByLevel } from '../data/englishCurriculum.js'

export default function EnglishCourseMap({ onBack, onOpenTopic, area = null, level = null, title }) {
  const heading = title ?? (area || (level ? 'Basics' : 'Spellbook'))
  const filtered = level
    ? topicsByLevel(level)
    : area
      ? topicsByArea(area)
      : ENGLISH_TOPICS
  const levels = ENGLISH_LEVELS.map((lv) => ({
    ...lv,
    topics: topicsByLevel(lv.id).filter((t) => {
      if (level) return t.level === level
      if (area) return t.area === area
      return true
    }),
  })).filter((l) => l.topics.length > 0)

  return (
    <div className="drill course-map">
      <button className="btn link" onClick={onBack}>
        ← back
      </button>
      <h2 className="drill-title">{heading}</h2>
      <p className="tagline" style={{ marginBottom: 18 }}>
        {area || level
          ? `${filtered.length} charms here. Tap one and Kitty teaches it.`
          : 'Every English charm in one book — beginner to advanced. Tap a topic and Kitty teaches it.'}
      </p>

      {levels.map((lv) => (
        <section key={lv.id} className="course-level" style={{ '--accent': lv.accent }}>
          <header className="course-level-head">
            <h3>{lv.name}</h3>
            <p>{lv.blurb}</p>
            <span className="course-level-count">{lv.topics.length} charms</span>
          </header>
          <div className="course-topics">
            {lv.topics.map((t) => (
              <button
                key={t.id}
                type="button"
                className="course-topic"
                onClick={() => onOpenTopic(t.id)}
              >
                <span className="course-topic-area">{t.area}</span>
                <span className="course-topic-name">{t.name}</span>
                <span className="course-topic-goal">{t.goal}</span>
              </button>
            ))}
          </div>
        </section>
      ))}

      <p className="dimmed" style={{ textAlign: 'center', marginTop: 8 }}>
        {filtered.length} charms
        {area ? ` · ${area}` : level ? ' · first year' : ` across ${ENGLISH_LEVELS.length} years`}
      </p>
    </div>
  )
}
