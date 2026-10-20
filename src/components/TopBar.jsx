import logo from '../assets/logo.png'

// The castle's top bar: the crest on the left, a glass pill of destinations in
// the middle, and one way in on the right.
//
// On the Sorting page no subject has been chosen yet, so the middle four are
// shortcuts that pick a subject on your behalf before opening the room. The
// caller decides which subject that is.
const LINKS = [
  { id: 'subjects', label: 'Subjects' },
  { id: 'english', label: 'English' },
  { id: 'room', label: 'Room of Requirement' },
  { id: 'chess', label: 'Chess' },
]

export default function TopBar({ active = 'subjects', onNavigate, cta }) {
  return (
    <header className="topbar">
      {/* The visible wordmark IS the accessible name, so the crest itself is
          decorative and the button needs no aria-label of its own. */}
      <button
        className="topbar-crest"
        onClick={() => onNavigate('subjects')}
        title="Back to the Sorting"
      >
        <img src={logo} alt="" />
        <span className="topbar-wordmark">FunCode</span>
      </button>

      <nav className="topbar-nav" aria-label="Castle">
        {LINKS.map((l) => (
          <button
            key={l.id}
            className={`topbar-link ${l.id === active ? 'on' : ''}`}
            onClick={() => onNavigate(l.id)}
            aria-current={l.id === active ? 'page' : undefined}
          >
            {l.label}
          </button>
        ))}
      </nav>

      <button className="topbar-cta" onClick={cta.onClick}>
        {cta.label}
        <span aria-hidden="true">→</span>
      </button>
    </header>
  )
}
