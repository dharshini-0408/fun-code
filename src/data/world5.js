export default {
  track: 'react',
  id: 'spire',
  name: 'The Hook Spire',
  tagline: 'Effects, refs, reducers and hooks of your own',
  icon: '🗝️',
  rooms: [
    {
      id: 's1',
      name: 'The Tide Room',
      concept: 'useEffect',
      brief:
        'Water rises and falls with something outside the room entirely. Whatever you start here, you must remember to stop.',
      lesson: [
        {
          type: 'p',
          text: '`useEffect` is for syncing with things outside React — subscriptions, timers, the document title. Not for computing values.',
        },
        {
          type: 'code',
          code: `useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)   // cleanup — runs before the next effect
}, [])                             // dependency array`,
        },
        { type: 'p', text: 'The dependency array decides when it runs again:' },
        {
          type: 'code',
          code: `useEffect(fn)           // after EVERY render — almost always a mistake
useEffect(fn, [])       // once, on mount
useEffect(fn, [roomId]) // on mount, and whenever roomId changes`,
        },
        {
          type: 'p',
          text: 'The cleanup runs before each re-run and once on unmount. Without it, an effect that changes with `roomId` leaves a live subscription behind for every room you visited.',
        },
        {
          type: 'note',
          text: 'If you can compute a value during render, do that instead. An effect that only sets state from props is a render away from being unnecessary.',
        },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'This component subscribes to a room’s sensors. What actually goes wrong?',
        code: `function Sensors({ roomId }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const sub = subscribe(roomId, setData)
    return () => sub.close()
  }, [])

  return <Readout data={data} />
}`,
        options: [
          'Nothing — this is correct',
          'It leaks: the cleanup never runs',
          'It runs on every render, creating endless subscriptions',
          'It keeps showing the first room’s data, because it never re-subscribes when roomId changes',
        ],
        answer: 3,
        explain:
          'The cleanup is fine and does run on unmount. The bug is the empty dependency array: `roomId` is used inside but not listed, so navigating to another room never re-subscribes and the readout stays stuck on the first room. The fix is `}, [roomId])` — then the cleanup closes the old subscription before the new one opens.',
        hints: [
          'The cleanup function is present and correct. Look at the array.',
          'What happens when the `roomId` prop changes?',
          'Every value from render that an effect uses belongs in its dependencies.',
        ],
      },
    },
    {
      id: 's2',
      name: 'The Still Room',
      concept: 'useRef',
      brief:
        'A box you can write in without the room noticing. Nothing you put here will ever redraw the walls.',
      lesson: [
        { type: 'p', text: '`useRef` gives you a mutable box that survives renders — and changing it never triggers one.' },
        {
          type: 'code',
          code: `const timerId = useRef(null)

timerId.current = setInterval(tick, 1000)   // no re-render
clearInterval(timerId.current)`,
        },
        { type: 'p', text: 'Its other job is reaching a real DOM node:' },
        {
          type: 'code',
          code: `const input = useRef(null)

useEffect(() => {
  input.current.focus()     // after the DOM exists
}, [])

return <input ref={input} />`,
        },
        { type: 'p', text: 'Choosing between them:' },
        {
          type: 'code',
          code: `// state: the UI must redraw when it changes
const [count, setCount] = useState(0)

// ref: you need to remember it, but nothing on screen depends on it
const renders = useRef(0)
renders.current++`,
        },
        { type: 'note', text: 'Never read or write `ref.current` during render — it makes rendering impure. Do it in effects and handlers.' },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'Which of these belongs in a ref rather than in state?',
        code: `// A — the text shown in the header
// B — the id returned by setInterval, so it can be cleared later
// C — whether a modal is open
// D — the filtered list rendered below`,
        options: ['A', 'B', 'C', 'D'],
        answer: 1,
        explain:
          'A, C and D all decide what appears on screen, so they must be state — changing them has to trigger a re-render. The interval id is bookkeeping: nothing renders it, and you only need it later inside the cleanup. Putting it in state would cause a pointless extra render every time the timer restarts. (D is really derived data — better computed during render than stored at all.)',
        hints: [
          'Ask of each: if this changed, would the screen need to redraw?',
          'A ref is for things you must remember but never display.',
          'One of these is pure bookkeeping for a cleanup function.',
        ],
      },
    },
    {
      id: 's3',
      name: 'The Weighing Room',
      concept: 'useMemo & useCallback',
      brief:
        'A scale that takes a full minute to settle. Weighing the same stone twice is a minute you will not get back.',
      lesson: [
        { type: 'p', text: '`useMemo` caches a computed value between renders. `useCallback` caches a function.' },
        {
          type: 'code',
          code: `// recomputed only when relics or query change
const visible = useMemo(
  () => relics.filter((r) => r.name.includes(query)),
  [relics, query],
)

// same function identity across renders
const onPick = useCallback((id) => setPicked(id), [])`,
        },
        {
          type: 'p',
          text: 'The point of `useCallback` is identity. A fresh function every render breaks `React.memo` on the child and re-triggers effects that depend on it.',
        },
        {
          type: 'code',
          code: `const Row = React.memo(function Row({ onPick }) { … })

// without useCallback, onPick is a NEW function every render,
// so React.memo compares props, sees a difference, and re-renders anyway`,
        },
        {
          type: 'note',
          text: 'Both cost memory and a comparison. Reach for them when you have measured a real problem — not by default.',
        },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'Someone wrapped everything in `useMemo` and the app got no faster. Which use is actually justified?',
        code: `// A
const total = useMemo(() => a + b, [a, b])

// B
const sorted = useMemo(() => hugeList.sort(byName), [hugeList])

// C
const label = useMemo(() => 'Room ' + id, [id])

// D
const style = useMemo(() => ({ color: 'red' }), [])`,
        options: ['A', 'B', 'C', 'D'],
        answer: 1,
        explain:
          'A and C are single cheap operations — the memo bookkeeping costs more than just doing the work. D is a constant that could simply live outside the component. B is the real case: sorting a large list every render is genuinely expensive, and the result changes only when the list does. (Though `.sort` mutates — `[...hugeList].sort(byName)` would be safer.)',
        hints: [
          'Memoising something cheaper than the memo itself is a net loss.',
          'One option would be better as a plain constant outside the component.',
          'Look for the one whose work actually scales with data size.',
        ],
      },
    },
    {
      id: 's4',
      name: 'The Lever Bank',
      concept: 'useReducer',
      brief:
        'Nine levers, and pulling one changes what the others do. Wiring them individually would be madness; give them a single mind.',
      lesson: [
        {
          type: 'p',
          text: 'When several pieces of state change together, one reducer beats five `useState`s. You describe WHAT happened, and the reducer decides the next state.',
        },
        {
          type: 'code',
          code: `function reducer(state, action) {
  switch (action.type) {
    case 'pull':
      return { ...state, pulled: state.pulled + 1 }
    case 'reset':
      return { pulled: 0, jammed: false }
    default:
      return state
  }
}

const [state, dispatch] = useReducer(reducer, { pulled: 0, jammed: false })

dispatch({ type: 'pull' })`,
        },
        {
          type: 'p',
          text: 'A reducer must be a pure function: same inputs, same output, no mutation, no side effects. Always return a NEW object.',
        },
        {
          type: 'code',
          code: `state.pulled++      // wrong — mutates, React sees no change
return state        // wrong — same reference, no re-render
return { ...state, pulled: state.pulled + 1 }   // right`,
        },
        { type: 'note', text: 'A reducer is plain JavaScript — which is why you can test it without rendering anything at all.' },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write the lever bank’s reducer. `pull` adds one to `pulled`, but does nothing at all once `jammed` is true. `jam` sets `jammed`. `reset` returns to `{ pulled: 0, jammed: false }`. Unknown actions return the state untouched.',
        fnName: 'reducer',
        starter: `function reducer(state, action) {
  // state: { pulled: 0, jammed: false }
  
}`,
        tests: [
          { args: [{ pulled: 0, jammed: false }, { type: 'pull' }], expected: { pulled: 1, jammed: false } },
          { args: [{ pulled: 3, jammed: true }, { type: 'pull' }], expected: { pulled: 3, jammed: true } },
          { args: [{ pulled: 2, jammed: false }, { type: 'jam' }], expected: { pulled: 2, jammed: true } },
          { args: [{ pulled: 9, jammed: true }, { type: 'reset' }], expected: { pulled: 0, jammed: false } },
          { args: [{ pulled: 1, jammed: false }, { type: 'wiggle' }], expected: { pulled: 1, jammed: false } },
        ],
        hints: [
          'A `switch` on `action.type` with a `default` that returns state is the standard shape.',
          'In the `pull` case, check `state.jammed` before doing anything.',
          'Every branch that changes something must spread into a new object.',
        ],
      },
    },
    {
      id: 's5',
      name: 'The Whispering Gallery',
      concept: 'Context',
      brief:
        'Speak at one end and you are heard at the other — without the sound passing through any of the rooms between.',
      lesson: [
        {
          type: 'p',
          text: 'Context carries a value down the tree without threading it through every component in between ("prop drilling").',
        },
        {
          type: 'code',
          code: `const ThemeContext = createContext('dark')

function App() {
  return (
    <ThemeContext.Provider value="lantern">
      <Corridor />   {/* knows nothing about theme */}
    </ThemeContext.Provider>
  )
}

function Door() {
  const theme = useContext(ThemeContext)   // reaches up, however deep
  return <div className={theme} />
}`,
        },
        {
          type: 'p',
          text: 'Every consumer re-renders when the provider’s value changes — and an inline object is a new value every single render:',
        },
        {
          type: 'code',
          code: `<Ctx.Provider value={{ user, login }}>       // new object each render
<Ctx.Provider value={useMemo(() => ({ user, login }), [user, login])}>`,
        },
        {
          type: 'note',
          text: 'Context is for genuinely global-ish things: theme, current user, language. It is not a state manager, and it is not for data that changes many times a second.',
        },
      ],
      puzzle: {
        kind: 'order',
        prompt:
          'Assemble the context, top to bottom: the pieces below belong in one file, in the order they must appear.',
        lines: [
          "const RoomContext = createContext(null)",
          "function RoomProvider({ children }) {",
          "  const [room, setRoom] = useState('cellar')",
          "  const value = useMemo(() => ({ room, setRoom }), [room])",
          "  return <RoomContext.Provider value={value}>{children}</RoomContext.Provider>",
          "}",
          "function useRoom() { return useContext(RoomContext) }",
        ],
        explain:
          'The context object is created once at module level. The provider owns the state, memoises the value object so consumers do not re-render on every parent render, and wraps its children. The small `useRoom` hook at the bottom hides `useContext` from callers — a convention worth adopting, since it also gives you one place to throw a helpful error when the hook is used outside its provider.',
        hints: [
          'What must exist before anything can reference it?',
          'The provider needs its state before it can build the value.',
          'The convenience hook comes last — it depends on the context existing.',
        ],
      },
    },
    {
      id: 's6',
      name: 'The Keymaker’s Vault',
      concept: 'Custom hooks',
      brief:
        'The final room. Every lock you have picked, every rule you have learnt — now make the key that makes keys.',
      lesson: [
        {
          type: 'p',
          text: 'A custom hook is just a function whose name starts with `use` and which calls other hooks. That is the entire idea.',
        },
        {
          type: 'code',
          code: `function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = useCallback(() => setOn((v) => !v), [])
  return [on, toggle]
}

// in a component
const [open, toggleOpen] = useToggle()`,
        },
        { type: 'p', text: 'What is shared is the LOGIC, not the state. Two components calling `useToggle` get two independent values.' },
        {
          type: 'code',
          code: `function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initial
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}`,
        },
        {
          type: 'note',
          text: 'The rules of hooks: call them only at the top level of a component or another hook — never inside a condition, loop or nested function.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'The last lock wants the pure logic behind a `useHistory` hook — no React needed. `makeHistory(initial)` returns an object with `push(value)`, `undo()` and `current()`. Undoing past the beginning simply stays at the first value.',
        fnName: 'makeHistory',
        starter: `function makeHistory(initial) {
  
}`,
        custom: `const h = makeHistory('cellar')
check(h.current(), 'cellar', 'starts at the initial value')
h.push('archive')
check(h.current(), 'archive', 'push moves forward')
h.push('abyss')
check(h.current(), 'abyss', 'push again')
check(h.undo(), 'archive', 'undo returns the previous value')
check(h.current(), 'archive', 'and current follows it')
h.undo()
check(h.current(), 'cellar', 'undo back to the start')
h.undo()
check(h.current(), 'cellar', 'undoing past the start stays put')
const other = makeHistory('spire')
check(other.current(), 'spire', 'each history is independent')`,
        hints: [
          'Keep an array of everything visited plus an index pointing at the current spot.',
          'Both live in the closure — `push` and `undo` share them, nothing outside can reach them.',
          '`undo` moves the index back only when it is above 0, then returns the current value.',
        ],
      },
    },
  ],
}
