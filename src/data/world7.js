export default {
  id: 'cathedral',
  track: 'react',
  name: 'The Glass Cathedral',
  tagline: 'Fetching, failing, splitting and composing at scale',
  icon: '🏛️',
  rooms: [
    {
      id: 'g1',
      name: 'The Long Well',
      concept: 'Data fetching in effects',
      brief:
        'A bucket lowered into deep water. Sometimes two are lowered at once, and the wrong one comes back last.',
      lesson: [
        { type: 'p', text: 'Fetching in an effect has three problems people meet in order: loading, errors, and races.' },
        {
          type: 'code',
          code: `useEffect(() => {
  let cancelled = false          // the race guard

  setLoading(true)
  fetch(\`/api/rooms/\${id}\`)
    .then((r) => r.json())
    .then((data) => { if (!cancelled) setRoom(data) })
    .catch((e) => { if (!cancelled) setError(e) })
    .finally(() => { if (!cancelled) setLoading(false) })

  return () => { cancelled = true }   // stale responses are ignored
}, [id])`,
        },
        {
          type: 'p',
          text: 'Without that guard: you click room 1, then room 2; if room 1 answers last, it overwrites room 2 on screen. The cleanup marks the old request irrelevant.',
        },
        {
          type: 'note',
          text: 'In real apps use React Query, SWR, or a framework loader. They solve caching, dedupe and races once, properly, so you do not rewrite this in every component.',
        },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'Which failure does the `cancelled` flag actually prevent?',
        options: [
          'The network request being sent twice',
          'An out-of-date response overwriting newer data after you switch rooms',
          'The component rendering before data arrives',
          'The fetch throwing when the server is down',
        ],
        answer: 1,
        explain:
          'The request still goes out, and is not aborted by the flag — it just makes the component ignore the answer when it comes back. That fixes the race where an earlier, slower response lands after a later one. Loading states handle the third, `.catch` the fourth. To genuinely cancel the network call you would pass an `AbortController` signal to `fetch` and abort it in the cleanup.',
        hints: [
          'The flag is read when the response ARRIVES, not when it is sent.',
          'Picture clicking quickly between two rooms with different response times.',
          'It discards results; it does not stop requests.',
        ],
      },
    },
    {
      id: 'g2',
      name: 'The Cracked Pane',
      concept: 'Error boundaries',
      brief:
        'One pane shatters. The cathedral does not come down with it — the frame around it holds.',
      lesson: [
        {
          type: 'p',
          text: 'An uncaught error during render unmounts your whole app — a blank white page. An error boundary catches it and shows a fallback instead.',
        },
        {
          type: 'code',
          code: `class Boundary extends React.Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }        // render the fallback
  }

  componentDidCatch(error, info) {
    log(error, info.componentStack) // report it
  }

  render() {
    return this.state.failed ? <Broken /> : this.props.children
  }
}`,
        },
        {
          type: 'p',
          text: 'Boundaries must be class components — there is no hook version. Wrap them around risky regions, not just the root, so one broken widget does not blank the page.',
        },
        {
          type: 'note',
          text: 'They do NOT catch errors in event handlers, timeouts, or async code. Those are ordinary JavaScript — use try/catch. Boundaries catch errors thrown while rendering.',
        },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'Which of these errors would an error boundary catch?',
        code: `// A
function Room() {
  return <p>{room.name.toUpperCase()}</p>   // room.name is undefined
}

// B
function Room() {
  return <button onClick={() => { throw new Error('boom') }}>go</button>
}

// C
function Room() {
  useEffect(() => { setTimeout(() => { throw new Error('boom') }, 100) }, [])
  return <p>ok</p>
}`,
        options: ['A only', 'B only', 'A and B', 'All three'],
        answer: 0,
        explain:
          'Only A throws during render, which is what boundaries watch. B throws inside a click handler and C inside a timeout — both run outside React’s rendering work, so they escape to the browser as ordinary uncaught errors. Wrap those in try/catch yourself, or route them into state so the next render can show the failure.',
        hints: [
          'Boundaries catch errors thrown while React is rendering.',
          'A click handler runs long after render has finished.',
          'A `setTimeout` callback is not React’s code at all.',
        ],
      },
    },
    {
      id: 'g3',
      name: 'The Side Chapel',
      concept: 'Portals',
      brief:
        'A door in the wall that opens somewhere else entirely — while still belonging to this room.',
      lesson: [
        {
          type: 'p',
          text: 'A portal renders children into a different DOM node, while keeping them in the React tree where you wrote them.',
        },
        {
          type: 'code',
          code: `import { createPortal } from 'react-dom'

function Modal({ children, onClose }) {
  return createPortal(
    <div className="backdrop" onClick={onClose}>
      <div className="modal">{children}</div>
    </div>,
    document.body,          // where it lands in the DOM
  )
}`,
        },
        {
          type: 'p',
          text: 'This exists to escape CSS. A modal inside a container with `overflow: hidden` or a low `z-index` gets clipped; rendered into `document.body` it does not.',
        },
        {
          type: 'note',
          text: 'Events still bubble through the REACT tree, not the DOM tree. A click inside the portal fires handlers on the component that rendered it, even though the node lives elsewhere.',
        },
      ],
      puzzle: {
        kind: 'order',
        prompt: 'Assemble a modal that closes on Escape. Put the pieces in the order they must appear.',
        lines: [
          "function Modal({ onClose, children }) {",
          "  useEffect(() => {",
          "    const onKey = (e) => { if (e.key === 'Escape') onClose() }",
          "    document.addEventListener('keydown', onKey)",
          "    return () => document.removeEventListener('keydown', onKey)",
          "  }, [onClose])",
          "  return createPortal(<div className=\"modal\">{children}</div>, document.body)",
          "}",
        ],
        explain:
          'The effect subscribes to a global event, so it must clean up — otherwise every modal you ever opened keeps listening for Escape. `onClose` belongs in the dependencies; if the parent passes a fresh arrow every render, wrap it in `useCallback` there or the listener re-binds constantly. The portal call is the return value, after the effect is set up.',
        hints: [
          'The component signature comes first, obviously — then what runs on mount.',
          'Anything that adds a global listener must remove it in the cleanup.',
          'The JSX return is always last.',
        ],
      },
    },
    {
      id: 'g4',
      name: 'The Unlit Wing',
      concept: 'Code splitting & Suspense',
      brief:
        'Half the cathedral stays dark until someone walks toward it. Lighting it all at once would take an age.',
      lesson: [
        {
          type: 'p',
          text: '`lazy` defers loading a component’s code until it is actually rendered. `Suspense` says what to show meanwhile.',
        },
        {
          type: 'code',
          code: `import { lazy, Suspense } from 'react'

const Editor = lazy(() => import('./Editor.jsx'))   // its own bundle

function Room() {
  return (
    <Suspense fallback={<p>opening…</p>}>
      {showEditor && <Editor />}
    </Suspense>
  )
}`,
        },
        {
          type: 'p',
          text: 'Split at boundaries where a chunk is genuinely optional: routes, heavy editors, charts, modals. Splitting a small component just adds a network round-trip.',
        },
        {
          type: 'note',
          text: 'The `lazy` call must live OUTSIDE the component. Declared inside, it creates a brand-new lazy component every render, so it reloads forever.',
        },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'This lazy-loaded editor flickers and reloads endlessly. Why?',
        code: `function Room({ showEditor }) {
  const Editor = lazy(() => import('./Editor.jsx'))

  return (
    <Suspense fallback={<p>opening…</p>}>
      {showEditor && <Editor />}
    </Suspense>
  )
}`,
        options: [
          'The `Suspense` fallback is too simple',
          '`lazy` is called inside the component, creating a new component type on every render',
          '`import()` cannot be used with a relative path',
          '`showEditor && <Editor />` should be a ternary',
        ],
        answer: 1,
        explain:
          'Every render calls `lazy` again and produces a different component type. React sees a new type, throws away the old subtree, mounts the new one — which suspends, shows the fallback, resolves, and renders again. Move the `lazy(...)` call to module scope so the component identity is stable.',
        hints: [
          'What is different about `Editor` between two renders?',
          'React decides "same component or new one?" by comparing the type.',
          'The fix is one line moved, not rewritten.',
        ],
      },
    },
    {
      id: 'g5',
      name: 'The Nested Arches',
      concept: 'Composition patterns',
      brief:
        'Arches within arches. None of them knows the whole shape, and yet the shape holds.',
      lesson: [
        {
          type: 'p',
          text: 'When a component grows a dozen configuration props, stop configuring and start composing.',
        },
        {
          type: 'code',
          code: `// configuration — every new need adds a prop
<Card title="Vault" subtitle="…" icon={…} action={…} footer={…} />

// composition — the caller assembles it
<Card>
  <Card.Header>Vault</Card.Header>
  <Card.Body><Relics /></Card.Body>
</Card>`,
        },
        {
          type: 'p',
          text: 'Passing elements as props is the same idea, and it fixes prop drilling without reaching for context:',
        },
        {
          type: 'code',
          code: `function Layout({ sidebar, main }) {
  return <div>{sidebar}{main}</div>
}

<Layout sidebar={<Rooms items={rooms} />} main={<Room id={id} />} />
// Layout never learns what "rooms" or "id" are`,
        },
        {
          type: 'note',
          text: 'A component with more than about five props, or with several booleans that are never true together, is usually asking to be composed instead.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'A compound component tracks which panel is open. Write the pure state logic: `toggle(openIds, id, allowMany)` returns the new list of open ids — adding or removing `id`, and when `allowMany` is false only ever one stays open.',
        fnName: 'toggle',
        starter: `function toggle(openIds, id, allowMany) {
  
}`,
        tests: [
          { args: [[], 'a', true], expected: ['a'] },
          { args: [['a'], 'b', true], expected: ['a', 'b'] },
          { args: [['a', 'b'], 'a', true], expected: ['b'] },
          { args: [['a'], 'b', false], expected: ['b'] },
          { args: [['a'], 'a', false], expected: [] },
          { args: [[], 'a', false], expected: ['a'] },
        ],
        hints: [
          'Closing an already-open panel works the same whether many are allowed or not.',
          'Check "is it already open?" first — that branch is shared.',
          'When opening with allowMany false, the result is just [id].',
        ],
      },
    },
    {
      id: 'g6',
      name: 'The Whole Cathedral',
      concept: 'Putting it together',
      brief:
        'The last room. Everything you have learnt, in one small piece of state logic that a real app would actually contain.',
      lesson: [
        {
          type: 'p',
          text: 'Most real React bugs are not React bugs. They are state-shape bugs wearing a React costume.',
        },
        {
          type: 'code',
          code: `// state that fights you
const [rooms, setRooms] = useState([])
const [selectedRoom, setSelectedRoom] = useState(null)   // a COPY of one room

// state that does not
const [rooms, setRooms] = useState([])
const [selectedId, setSelectedId] = useState(null)
const selected = rooms.find((r) => r.id === selectedId)  // derived`,
        },
        {
          type: 'p',
          text: 'Three rules that prevent most of them: store the minimum, derive the rest during render, and never keep the same fact in two places.',
        },
        {
          type: 'note',
          text: 'If two pieces of state can disagree, one day they will. Keep an id, not a duplicate.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write the selector a real app would use: given rooms, a search string and a `solvedOnly` flag, return the matching room names, sorted alphabetically. Search is case-insensitive and matches anywhere in the name.',
        fnName: 'visibleRooms',
        starter: `function visibleRooms(rooms, query, solvedOnly) {
  // room: { name: 'The Vault', solved: false }
  
}`,
        tests: [
          {
            args: [[{ name: 'The Vault', solved: true }, { name: 'Attic', solved: false }], '', false],
            expected: ['Attic', 'The Vault'],
          },
          {
            args: [[{ name: 'The Vault', solved: true }, { name: 'Attic', solved: false }], '', true],
            expected: ['The Vault'],
          },
          {
            args: [[{ name: 'The Vault', solved: true }, { name: 'Attic', solved: false }], 'at', false],
            expected: ['Attic'],
          },
          {
            args: [[{ name: 'Cellar', solved: true }, { name: 'cellar door', solved: true }], 'CELL', false],
            expected: ['Cellar', 'cellar door'],
          },
          { args: [[], 'x', false], expected: [] },
        ],
        hints: [
          'Filter, then map to names, then sort — in that order.',
          'Lowercase both sides before comparing, so the search is case-insensitive.',
          'Default `.sort()` on strings is alphabetical, which is what is wanted here.',
        ],
      },
    },
  ],
}
