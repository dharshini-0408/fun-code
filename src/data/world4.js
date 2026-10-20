export default {
  track: 'react',
  id: 'atrium',
  name: 'The React Atrium',
  tagline: 'Components, props and state',
  icon: '⚛️',
  rooms: [
    {
      id: 'r1',
      name: 'The Blueprint Room',
      concept: 'JSX',
      brief:
        'Drawings pinned to every surface. They look like the building, but they are not the building — not yet.',
      lesson: [
        { type: 'p', text: 'JSX looks like HTML but it is JavaScript. Every tag becomes a function call describing what to draw.' },
        {
          type: 'code',
          code: `const el = <h1 className="title">Hello</h1>

// what the build step turns it into:
const el = React.createElement('h1', { className: 'title' }, 'Hello')`,
        },
        { type: 'p', text: 'The differences from HTML that trip everyone up:' },
        {
          type: 'code',
          code: `class    →  className
for      →  htmlFor
onclick  →  onClick        (camelCase, always)
style="color: red"  →  style={{ color: 'red' }}

<br>  →  <br />           every tag must close`,
        },
        { type: 'p', text: 'Braces drop any JavaScript expression into the markup:' },
        {
          type: 'code',
          code: `<p>You have {torches} torches</p>
<p>{torches > 0 ? 'lit' : 'dark'}</p>
<ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>`,
        },
        {
          type: 'note',
          text: 'Expressions only — no `if` or `for` inside braces. A component must also return ONE root element (or a `<>…</>` fragment).',
        },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'Four blueprints. Exactly one of them compiles and behaves. Which?',
        code: `// A
<div class="room" onclick={enter}>Vault</div>

// B
<div className="room" onClick={enter}>Vault</div>

// C
<div className="room" onClick={enter()}>Vault</div>

// D
<div className="room">Vault<br></div>`,
        options: ['A', 'B', 'C', 'D'],
        answer: 1,
        explain:
          'A uses HTML spellings (`class`, `onclick`) that JSX does not recognise. C calls `enter()` immediately during render and passes its return value as the handler — pass the function itself, not a call. D leaves `<br>` unclosed, which is a syntax error in JSX. B is the correct form.',
        hints: [
          'Two of the wrong answers are about spelling; one is about timing.',
          '`onClick={enter()}` runs `enter` while rendering, not on click.',
          'In JSX every element must be explicitly closed.',
        ],
      },
    },
    {
      id: 'r2',
      name: 'The Mould Gallery',
      concept: 'Components & props',
      brief:
        'One statue, carved once, displayed a dozen times — each with a different plaque beneath it.',
      lesson: [
        { type: 'p', text: 'A component is a function that takes props and returns JSX. Its name must start with a capital letter.' },
        {
          type: 'code',
          code: `function Plaque({ name, year }) {
  return (
    <figcaption>
      {name} — {year}
    </figcaption>
  )
}

<Plaque name="Brass Key" year={1911} />
<Plaque name="Iron Lamp" year={1888} />`,
        },
        {
          type: 'p',
          text: 'Props are read-only. A component may never write to its own props — that is the parent’s data.',
        },
        {
          type: 'code',
          code: `function Bad({ count }) {
  count = count + 1        // never do this
  return <p>{count}</p>
}`,
        },
        { type: 'p', text: 'Anything between the tags arrives as the special `children` prop:' },
        {
          type: 'code',
          code: `function Case({ children }) {
  return <div className="case">{children}</div>
}

<Case><Plaque name="Key" year={1911} /></Case>`,
        },
        { type: 'note', text: 'Data flows one way: down, from parent to child. To send something back up, the parent passes a function.' },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'A component needs its props prepared. Given a raw relic, return the props object the `<Plaque />` wants: `label` (name in Title Case) and `year`. Missing years become the string `"unknown"`.',
        fnName: 'toPlaqueProps',
        starter: `function toPlaqueProps(relic) {
  // relic: { name: 'brass key', year: 1911 }
  
}`,
        tests: [
          { args: [{ name: 'brass key', year: 1911 }], expected: { label: 'Brass key', year: 1911 } },
          { args: [{ name: 'lamp' }], expected: { label: 'Lamp', year: 'unknown' } },
          { args: [{ name: 'IRON DOOR', year: 1888 }], expected: { label: 'Iron door', year: 1888 } },
        ],
        hints: [
          'Title Case again: first character up, the rest down.',
          'Destructure with a default: `const { name, year = "unknown" } = relic`.',
          'Return a brand-new object with exactly the two keys asked for.',
        ],
      },
    },
    {
      id: 'r3',
      name: 'The Memory Chamber',
      concept: 'useState',
      brief:
        'The room remembers what you did last time you were in it. Ask it politely — never rearrange its furniture by hand.',
      lesson: [
        { type: 'p', text: '`useState` gives a component a value that survives re-renders, plus the only legal way to change it.' },
        {
          type: 'code',
          code: `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  //     value   setter        initial

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}`,
        },
        { type: 'p', text: 'Calling the setter schedules a re-render. Assigning to the variable does nothing at all.' },
        {
          type: 'code',
          code: `count = count + 1        // nothing happens, no re-render
setCount(count + 1)      // correct`,
        },
        {
          type: 'p',
          text: 'When the next value depends on the current one, pass a function — it always sees the freshest value.',
        },
        {
          type: 'code',
          code: `setCount(count + 1)
setCount(count + 1)        // both read the SAME stale count → +1 total

setCount((c) => c + 1)
setCount((c) => c + 1)     // → +2, as intended`,
        },
        { type: 'note', text: 'State is per component instance. Two `<Counter />`s each keep their own private count.' },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'The lock counts your knocks. You click the button once. What does the display show?',
        code: `function Knocker() {
  const [knocks, setKnocks] = useState(0)

  function knock() {
    setKnocks(knocks + 1)
    setKnocks(knocks + 1)
    setKnocks(knocks + 1)
  }

  return <button onClick={knock}>{knocks}</button>
}`,
        options: ['3', '1', '0', 'It re-renders three times, ending at 3'],
        answer: 1,
        explain:
          'All three calls read the same `knocks` from this render — 0 — so each schedules "set it to 1". React batches them into one re-render and the result is 1. Using the updater form `setKnocks((k) => k + 1)` three times would give 3, because each call receives the value the previous one produced.',
        hints: [
          '`knocks` is a plain const captured by this render. Does it change mid-function?',
          'All three calls compute the same value.',
          'The updater form is the fix — and would give a different answer.',
        ],
      },
    },
    {
      id: 'r4',
      name: 'The Bell Pull',
      concept: 'Events & lifting state up',
      brief:
        'A rope hangs from the ceiling. Pulling it rings a bell three rooms away — the sound has to travel somewhere.',
      lesson: [
        { type: 'p', text: 'Handlers are props holding functions. Pass the function; do not call it.' },
        {
          type: 'code',
          code: `<button onClick={ring}>ring</button>          // right
<button onClick={ring()}>ring</button>        // wrong — runs on render
<button onClick={() => ring('loud')}>ring</button>  // right, with an argument`,
        },
        {
          type: 'p',
          text: 'A child cannot change a parent’s state directly. The parent hands down a function, and the child calls it. This is "lifting state up".',
        },
        {
          type: 'code',
          code: `function Room() {
  const [rung, setRung] = useState(false)
  return <Rope onPull={() => setRung(true)} rung={rung} />
}

function Rope({ onPull, rung }) {
  return <button onClick={onPull}>{rung ? 'ringing' : 'pull'}</button>
}`,
        },
        {
          type: 'p',
          text: 'When two components need the same state, move it up to their closest common parent and pass it back down.',
        },
        { type: 'note', text: 'Handlers receive the event object: `onChange={(e) => setText(e.target.value)}`.' },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'The bell rings the instant the page loads, before anyone touches the rope. Which line is at fault?',
        code: `function Rope({ onPull }) {
  return (
    <div>
      <button onClick={onPull}>pull</button>          {/* 1 */}
      <button onClick={() => onPull('hard')}>yank</button>  {/* 2 */}
      <button onClick={onPull('soft')}>tug</button>   {/* 3 */}
      <button onClick={() => onPull()}>tap</button>   {/* 4 */}
    </div>
  )
}`,
        options: ['Line 1', 'Line 2', 'Line 3', 'Line 4'],
        answer: 2,
        explain:
          'Line 3 calls `onPull("soft")` during render and hands its return value — probably `undefined` — to `onClick`. So the bell rings immediately, and clicking does nothing. Wrap it in an arrow, as lines 2 and 4 do, to defer the call until the click.',
        hints: [
          'Look for the one that has parentheses but no arrow.',
          'Anything written directly in JSX runs while rendering.',
          'An arrow function delays the call until the event fires.',
        ],
      },
    },
    {
      id: 'r5',
      name: 'The Hall of Keys',
      concept: 'Lists & keys',
      brief:
        'A thousand identical keys on a thousand identical hooks. Move one and the whole wall forgets which was which — unless each carries a tag.',
      lesson: [
        { type: 'p', text: 'Render a list by mapping data to elements. Each one needs a stable `key`.' },
        {
          type: 'code',
          code: `<ul>
  {relics.map((r) => (
    <li key={r.id}>{r.name}</li>
  ))}
</ul>`,
        },
        {
          type: 'p',
          text: 'The key tells React which element is which between renders. Use a stable id from your data.',
        },
        {
          type: 'code',
          code: `key={r.id}       // best — stable, unique, from the data
key={index}      // risky — breaks when the list reorders or shrinks
// no key        // React warns, and reuses elements wrongly`,
        },
        {
          type: 'p',
          text: 'With `key={index}`, deleting the first item shifts every key by one. React thinks item 0 merely changed its text and keeps the old DOM node — along with any state inside it, like what you typed in an input.',
        },
        { type: 'note', text: 'Keys must be unique among siblings only, and they are never readable as a prop inside the child.' },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'The hooks need tags. Given relics that may lack an `id`, return a list of `{ key, name }` — using the relic’s id when present, otherwise `"name-<index>"`.',
        fnName: 'withKeys',
        starter: `function withKeys(relics) {
  // relic: { id: 'k1', name: 'brass key' }  — id may be missing
  
}`,
        tests: [
          {
            args: [[{ id: 'k1', name: 'key' }, { name: 'lamp' }]],
            expected: [{ key: 'k1', name: 'key' }, { key: 'lamp-1', name: 'lamp' }],
          },
          { args: [[{ name: 'rope' }]], expected: [{ key: 'rope-0', name: 'rope' }] },
          { args: [[]], expected: [] },
        ],
        hints: [
          '`map` gives you the index as its second argument: `.map((r, i) => …)`.',
          'Use the id when it exists, otherwise build the fallback string.',
          'Shape: relics.map((r, i) => ({ key: r.id ?? `${r.name}-${i}`, name: r.name }))',
        ],
      },
    },
    {
      id: 'r6',
      name: 'The Shifting Wall',
      concept: 'Conditional rendering & forms',
      brief:
        'A wall that shows a different door depending on what you have written in the ledger beside it.',
      lesson: [
        { type: 'p', text: 'Show or hide with plain JavaScript expressions:' },
        {
          type: 'code',
          code: `{isOpen && <Door />}                    // render, or nothing
{isOpen ? <Door /> : <Wall />}          // one or the other
{items.length === 0 && <p>empty</p>}    // guard clause

// careful: 0 is falsy but still RENDERS as "0"
{items.length && <List />}              // shows a bare 0 when empty`,
        },
        { type: 'p', text: 'Inputs are "controlled": state is the truth, the input merely displays it.' },
        {
          type: 'code',
          code: `function Ledger() {
  const [name, setName] = useState('')

  return (
    <form onSubmit={(e) => { e.preventDefault(); enter(name) }}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button disabled={!name.trim()}>enter</button>
    </form>
  )
}`,
        },
        {
          type: 'note',
          text: 'Set `value` without `onChange` and the input freezes — React keeps resetting it to the same state. Always pair them.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'The ledger validates before the wall shifts. Return an object `{ valid, message }`: a name must be non-empty after trimming and at most 12 characters. Report the first problem found.',
        fnName: 'validate',
        starter: `function validate(raw) {
  
}`,
        tests: [
          { args: ['ada'], expected: { valid: true, message: '' } },
          { args: ['   '], expected: { valid: false, message: 'name required' } },
          { args: [''], expected: { valid: false, message: 'name required' } },
          { args: ['  ada  '], expected: { valid: true, message: '' } },
          { args: ['antidisestablishment'], expected: { valid: false, message: 'name too long' } },
        ],
        hints: [
          'Trim once at the top and work with the trimmed value throughout.',
          'Note that "  ada  " is valid — the trimmed length is what counts.',
          'Check emptiness first, then length, then fall through to the valid case.',
        ],
      },
    },
  ],
}
