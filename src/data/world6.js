export default {
  id: 'workshop',
  track: 'javascript',
  name: 'The Iron Workshop',
  tagline: 'The machinery underneath: iterators, maps, proxies, patterns',
  icon: '⚙️',
  rooms: [
    {
      id: 'w1',
      name: 'The Import Dock',
      concept: 'Modules',
      brief:
        'Crates arrive from other buildings. Each is stamped with exactly what it contains, and nothing else escapes.',
      lesson: [
        { type: 'p', text: 'A module is a file. What it does not export stays private to it.' },
        {
          type: 'code',
          code: `// tools.js
export const rope = 'rope'          // named export
export function climb() {}          // named export
export default function main() {}   // default export — one per file
const secret = 42                   // never leaves this file`,
        },
        {
          type: 'code',
          code: `// room.js
import main, { rope, climb } from './tools.js'
import { rope as cord } from './tools.js'   // rename
import * as tools from './tools.js'         // everything as one object`,
        },
        {
          type: 'p',
          text: 'Imports are hoisted and resolved before any code runs, so the order of your import lines does not matter.',
        },
        {
          type: 'note',
          text: 'Named exports survive renaming and autocomplete better than default exports. Most codebases prefer them.',
        },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'Two files. What does the console print?',
        code: `// counter.js
export let count = 0
export function bump() { count++ }

// main.js
import { count, bump } from './counter.js'
bump()
bump()
console.log(count)`,
        options: [
          '0 — imports are copies, so the local `count` never changes',
          '2 — imports are live bindings to the exporting module',
          'A TypeError — you cannot import a `let`',
          'undefined',
        ],
        answer: 1,
        explain:
          'Imports are live bindings, not copies. `count` in main.js points at the same binding inside counter.js, so both `bump()` calls are visible and it prints 2. You still cannot ASSIGN to an imported binding from the outside (`count = 5` throws) — it is read-only from here, but it is not a snapshot.',
        hints: [
          'Ask whether `import` copies the value or points at it.',
          'This is a real difference between ES modules and older CommonJS `require`.',
          'Read-only from the importing side does not mean frozen in time.',
        ],
      },
    },
    {
      id: 'w2',
      name: 'The Endless Belt',
      concept: 'Iterators & generators',
      brief:
        'A conveyor that produces a part only when you reach for one. It could run forever without filling the room.',
      lesson: [
        {
          type: 'p',
          text: 'A generator is a function that can pause. `function*` declares one, `yield` hands a value out and suspends.',
        },
        {
          type: 'code',
          code: `function* counter() {
  let n = 0
  while (true) {   // safe — it only advances when asked
    yield n++
  }
}

const it = counter()
it.next()   // { value: 0, done: false }
it.next()   // { value: 1, done: false }`,
        },
        { type: 'p', text: 'Generators are iterable, so everything that walks a sequence works on them:' },
        {
          type: 'code',
          code: `function* take(n, iterable) {
  let i = 0
  for (const x of iterable) {
    if (i++ >= n) return
    yield x
  }
}

[...take(3, counter())]   // [0, 1, 2]`,
        },
        {
          type: 'note',
          text: 'This is lazy evaluation: nothing is computed until it is pulled. It lets you describe infinite sequences in finite memory.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Build the belt by hand — no generators needed. Return the first `n` Fibonacci numbers, starting 0, 1, 1, 2, 3, 5.',
        fnName: 'fib',
        starter: `function fib(n) {
  
}`,
        tests: [
          { args: [0], expected: [] },
          { args: [1], expected: [0] },
          { args: [2], expected: [0, 1] },
          { args: [6], expected: [0, 1, 1, 2, 3, 5] },
          { args: [10], expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] },
        ],
        hints: [
          'Handle the short cases (0 and 1) before the loop, or the loop will read past the start.',
          'Each new number is the sum of the two before it.',
          'Shape: start with [0, 1], slice to n, then push out[i-1] + out[i-2] until long enough.',
        ],
      },
    },
    {
      id: 'w3',
      name: 'The Keyed Cabinet',
      concept: 'Map & Set',
      brief:
        'Drawers that accept any object as a label — not just words. And a jar that refuses to hold the same thing twice.',
      lesson: [
        { type: 'p', text: 'A plain object only takes string and symbol keys. A `Map` takes anything.' },
        {
          type: 'code',
          code: `const m = new Map()
const key = { id: 1 }

m.set(key, 'a relic')     // an OBJECT as the key
m.get(key)                // 'a relic'
m.has(key)                // true
m.size                    // 1 — a real property, not a method
m.delete(key)

for (const [k, v] of m) { }   // insertion order, guaranteed`,
        },
        { type: 'p', text: 'A `Set` holds unique values — the shortest way to dedupe:' },
        {
          type: 'code',
          code: `const s = new Set([1, 2, 2, 3])
s.size            // 3
s.has(2)          // true
[...new Set(list)]   // deduped array, in one line`,
        },
        {
          type: 'note',
          text: 'Uniqueness is by reference for objects: `new Set([{a:1}, {a:1}])` has size 2 — two different objects that merely look alike.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Group relics by their shelf using a Map, then return it as a plain object of shelf → array of names, so it can be compared.',
        fnName: 'groupByShelf',
        starter: `function groupByShelf(relics) {
  // relic: { name: 'lamp', shelf: 3 }
  
}`,
        tests: [
          {
            args: [[{ name: 'a', shelf: 1 }, { name: 'b', shelf: 2 }, { name: 'c', shelf: 1 }]],
            expected: { 1: ['a', 'c'], 2: ['b'] },
          },
          { args: [[{ name: 'x', shelf: 9 }]], expected: { 9: ['x'] } },
          { args: [[]], expected: {} },
        ],
        hints: [
          'The first relic on a shelf has no array yet — create one before pushing.',
          'You can build it with a Map and convert, or go straight to an object. Both are fine.',
          'Shape: (out[r.shelf] ||= []).push(r.name) — then return out',
        ],
      },
    },
    {
      id: 'w4',
      name: 'The Pattern Room',
      concept: 'Regular expressions',
      brief:
        'Symbols scratched into the floor that match other symbols. Powerful, and easy to overreach with.',
      lesson: [
        { type: 'p', text: 'A regex describes a shape that text either fits or does not.' },
        {
          type: 'code',
          code: `/cat/.test('concatenate')     // true — matches anywhere
/^cat/.test('concatenate')    // false — ^ anchors to the start
/\\d+/                         // one or more digits
/[a-z]+/i                     // letters, i = case-insensitive
/\\s/                          // any whitespace`,
        },
        {
          type: 'code',
          code: `'a1b2'.replace(/\\d/g, '#')      // 'a#b#'   g = every match
'a,b;c'.split(/[,;]/)          // ['a', 'b', 'c']
'room 12'.match(/(\\w+) (\\d+)/) // captures: [full, 'room', '12']`,
        },
        {
          type: 'note',
          text: 'Do not parse HTML, or emails properly, with a regex. Use them for small, well-shaped patterns and reach for a real parser beyond that.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Turn a room name into a URL slug: lowercase, spaces to single hyphens, and every character that is not a letter, digit or hyphen removed. No hyphen may start or end it.',
        fnName: 'slug',
        starter: `function slug(name) {
  
}`,
        tests: [
          { args: ['The Dusty Cellar'], expected: 'the-dusty-cellar' },
          { args: ['  Hall  of   Keys  '], expected: 'hall-of-keys' },
          { args: ['Room #12!'], expected: 'room-12' },
          { args: ['a'], expected: 'a' },
        ],
        hints: [
          'Lowercase and trim first — it makes every later step simpler.',
          'Replace runs of whitespace with one hyphen, then strip whatever is still not allowed.',
          'Shape: .toLowerCase().trim().replace(/\\s+/g, "-").replace(/[^a-z0-9-]/g, "")',
        ],
      },
    },
    {
      id: 'w5',
      name: 'The Frozen Gallery',
      concept: 'Immutability & copying',
      brief:
        'Everything here is behind glass. You may make a new copy of any exhibit, but you may not touch the original.',
      lesson: [
        {
          type: 'p',
          text: 'Objects and arrays are handled by reference. Two names can point at one thing — change it through either and both see it.',
        },
        {
          type: 'code',
          code: `const a = { n: 1 }
const b = a
b.n = 2
a.n            // 2 — same object

const c = { ...a }   // a real copy
c.n = 3
a.n            // 2 — untouched`,
        },
        { type: 'p', text: 'Spread copies ONE level. Anything nested is still shared:' },
        {
          type: 'code',
          code: `const room = { name: 'vault', lock: { picked: false } }
const copy = { ...room }
copy.lock.picked = true
room.lock.picked      // true — the nested object was shared!

structuredClone(room) // a genuine deep copy, built in`,
        },
        {
          type: 'note',
          text: 'This is why React state updates spread at every level you change. Mutating state in place is the most common reason a component "does not re-render".',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Update one relic deep inside a room, without mutating anything. Return a new room where the relic at `index` has its `cursed` flag flipped.',
        fnName: 'flipCurse',
        starter: `function flipCurse(room, index) {
  // room: { name: 'vault', relics: [{ name: 'lamp', cursed: false }] }
  
}`,
        custom: `const room = { name: 'vault', relics: [{ name: 'lamp', cursed: false }, { name: 'key', cursed: true }] }
const next = flipCurse(room, 0)
check(next.relics[0].cursed, true, 'the target relic is flipped')
check(room.relics[0].cursed, false, 'the ORIGINAL relic is untouched')
check(next.relics[1].cursed, true, 'other relics are carried over')
check(next.name, 'vault', 'other room fields are carried over')
check(next !== room, true, 'a new room object is returned')
check(next.relics !== room.relics, true, 'a new relics array is returned')`,
        hints: [
          'Three levels change: the room, the relics array, and the one relic. Each needs a new object.',
          '`map` already gives you a new array — use the index to decide which item to replace.',
          'Shape: { ...room, relics: room.relics.map((r, i) => i === index ? { ...r, cursed: !r.cursed } : r) }',
        ],
      },
    },
    {
      id: 'w6',
      name: 'The Debounced Bell',
      concept: 'Timing patterns',
      brief:
        'A bell that refuses to ring while you are still pulling. It waits until your hands are still.',
      lesson: [
        {
          type: 'p',
          text: 'Debounce waits for a pause before acting — for search boxes, resize handlers, autosave.',
        },
        {
          type: 'code',
          code: `function debounce(fn, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)              // cancel the pending run
    timer = setTimeout(() => fn(...args), ms)
  }
}

const search = debounce(runQuery, 300)
// typing "hello" fires runQuery ONCE, 300ms after the last key`,
        },
        {
          type: 'p',
          text: 'Throttle is its sibling: act at most once per interval, rather than waiting for silence.',
        },
        {
          type: 'code',
          code: `// debounce  → fires after you stop
// throttle  → fires at a steady maximum rate`,
        },
        {
          type: 'note',
          text: 'Everything here is closures again: the timer lives between calls because the returned function keeps its scope alive.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Build `once(fn)` — a wrapper that calls `fn` the first time and, ever after, returns that same first result without calling again.',
        fnName: 'once',
        starter: `function once(fn) {
  
}`,
        custom: `let calls = 0
const setup = once((n) => { calls++; return n * 2 })
check(setup(5), 10, 'the first call runs the function')
check(calls, 1, 'it ran exactly once')
check(setup(99), 10, 'later calls return the FIRST result')
check(setup(1), 10, 'and again')
check(calls, 1, 'the function was never called a second time')
const other = once(() => 'fresh')
check(other(), 'fresh', 'each wrapper is independent')`,
        hints: [
          'You need to remember two things between calls: whether it has run, and what it returned.',
          'Declare both in the closure, outside the returned function.',
          'Shape: let done = false, value; return (...a) => { if (!done) { value = fn(...a); done = true } return value }',
        ],
      },
    },
  ],
}
