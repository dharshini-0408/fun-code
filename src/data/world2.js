export default {
  track: 'javascript',
  id: 'archive',
  name: 'The Sunken Archive',
  tagline: 'Arrays, objects and the functions that shape them',
  icon: '📚',
  rooms: [
    {
      id: 'a1',
      name: 'The Index Drawers',
      concept: 'Arrays',
      brief:
        'A hundred narrow drawers, numbered from zero. The archivist was very particular about starting at zero.',
      lesson: [
        { type: 'p', text: 'An array is an ordered list. Positions are counted from 0.' },
        {
          type: 'code',
          code: `const tools = ['rope', 'lamp', 'key']

tools[0]         // 'rope'
tools[2]         // 'key'
tools[9]         // undefined — no error, just nothing
tools.length     // 3
tools[tools.length - 1]  // 'key' — the last one`,
        },
        { type: 'p', text: 'The methods that change the array in place:' },
        {
          type: 'code',
          code: `tools.push('map')     // add to the end
tools.pop()           // remove from the end, returns it
tools.shift()         // remove from the front
tools.unshift('pin')  // add to the front`,
        },
        { type: 'p', text: 'And the ones that hand you something new, leaving the original alone:' },
        {
          type: 'code',
          code: `tools.slice(0, 2)     // a copy of the first two
tools.includes('key') // true
tools.indexOf('key')  // 2  (-1 when missing)
tools.join(' + ')     // 'rope + lamp + key'`,
        },
        { type: 'note', text: 'Confusing `slice` (copies) with `splice` (mutates) is a rite of passage. Prefer `slice`.' },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'The drawer mechanism jams on duplicates. Return a new list with every duplicate removed, keeping the first appearance in its original position.',
        fnName: 'unique',
        starter: `function unique(items) {
  
}`,
        tests: [
          { args: [['a', 'b', 'a', 'c', 'b']], expected: ['a', 'b', 'c'] },
          { args: [[1, 1, 1]], expected: [1] },
          { args: [[]], expected: [] },
          { args: [['x', 'y']], expected: ['x', 'y'] },
        ],
        hints: [
          'Build a fresh array as you go — do not edit the one you were given.',
          '`out.includes(item)` tells you whether you have already kept it.',
          'Shape: const out = []; for (const i of items) { if (!out.includes(i)) out.push(i) } return out',
        ],
      },
    },
    {
      id: 'a2',
      name: 'The Card Catalogue',
      concept: 'Objects',
      brief:
        'Every card describes one artefact — a name, a shelf, a weight. The lock wants a single card, correctly filled in.',
      lesson: [
        { type: 'p', text: 'An object holds named values. Reach for one when "which position is it?" stops making sense.' },
        {
          type: 'code',
          code: `const relic = {
  name: 'brass key',
  shelf: 12,
  cursed: false,
}

relic.name          // 'brass key'
relic['shelf']      // 12 — same thing, useful for dynamic keys
relic.missing       // undefined`,
        },
        {
          type: 'code',
          code: `relic.weight = 4          // add a key
delete relic.cursed       // remove one
'shelf' in relic          // true
Object.keys(relic)        // ['name', 'shelf', 'weight']
Object.values(relic)      // ['brass key', 12, 4]
Object.entries(relic)     // [['name', 'brass key'], …]`,
        },
        {
          type: 'p',
          text: 'When a key might be missing several levels down, `?.` stops the whole thing exploding:',
        },
        {
          type: 'code',
          code: `relic.origin.city    // TypeError if origin is undefined
relic.origin?.city   // undefined, calmly`,
        },
        { type: 'note', text: 'When the variable name matches the key, `{ name: name }` shortens to `{ name }`.' },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Given a list of artefact objects, count how many sit on each shelf. Return an object mapping shelf number to a count.',
        fnName: 'byShelf',
        starter: `function byShelf(relics) {
  // each relic looks like { name: 'lamp', shelf: 3 }
  
}`,
        tests: [
          {
            args: [[{ name: 'a', shelf: 1 }, { name: 'b', shelf: 2 }, { name: 'c', shelf: 1 }]],
            expected: { 1: 2, 2: 1 },
          },
          { args: [[{ name: 'x', shelf: 7 }]], expected: { 7: 1 } },
          { args: [[]], expected: {} },
        ],
        hints: [
          'Start with an empty object and fill it in as you walk the list.',
          'The first time you meet a shelf there is no count yet — treat that as 0.',
          'Shape: counts[r.shelf] = (counts[r.shelf] || 0) + 1',
        ],
      },
    },
    {
      id: 'a3',
      name: 'The Sorting Engine',
      concept: 'map, filter, reduce',
      brief:
        'A brass machine with three funnels: one reshapes, one rejects, one collapses everything to a single result.',
      lesson: [
        { type: 'p', text: 'These three replace most loops you would otherwise write. Each returns something new.' },
        {
          type: 'code',
          code: `const n = [1, 2, 3, 4]

n.map((x) => x * 2)        // [2, 4, 6, 8]   same length, reshaped
n.filter((x) => x > 2)     // [3, 4]         fewer items, unchanged
n.reduce((sum, x) => sum + x, 0)  // 10      one value out`,
        },
        { type: 'p', text: 'They chain, and that is where they earn their keep:' },
        {
          type: 'code',
          code: `relics
  .filter((r) => !r.cursed)
  .map((r) => r.name)
  .join(', ')`,
        },
        { type: 'p', text: 'The rest of the family:' },
        {
          type: 'code',
          code: `n.find((x) => x > 2)      // 3    the first match, or undefined
n.some((x) => x > 3)      // true  any?
n.every((x) => x > 0)     // true  all?
n.sort((a, b) => a - b)   // careful: sorts IN PLACE`,
        },
        {
          type: 'note',
          text: '`reduce` takes a starting value as its second argument. Forgetting it on an empty array throws.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Feed the engine a list of relics. Return the total weight of the ones that are not cursed. Use the funnels rather than a hand-written loop.',
        fnName: 'safeWeight',
        starter: `function safeWeight(relics) {
  // relic: { name: 'lamp', weight: 4, cursed: false }
  
}`,
        tests: [
          {
            args: [[{ weight: 4, cursed: false }, { weight: 10, cursed: true }, { weight: 1, cursed: false }]],
            expected: 5,
          },
          { args: [[{ weight: 3, cursed: true }]], expected: 0 },
          { args: [[]], expected: 0 },
        ],
        hints: [
          'Two steps: drop the cursed ones, then collapse what remains into one number.',
          'filter first, then reduce over the survivors.',
          'Shape: relics.filter((r) => !r.cursed).reduce((sum, r) => sum + r.weight, 0)',
        ],
      },
    },
    {
      id: 'a4',
      name: 'The Unpacking Room',
      concept: 'Destructuring & spread',
      brief:
        'Crates stacked to the ceiling, all sealed. Prying each one open by hand is possible. It is also unnecessary.',
      lesson: [
        { type: 'p', text: 'Destructuring pulls values out by name or position, in one line.' },
        {
          type: 'code',
          code: `const { name, shelf } = relic
const [first, second] = tools

// with a fallback when the key is missing
const { weight = 0 } = relic

// straight in the parameter list — very common in React
function label({ name, shelf }) {
  return \`\${name} (shelf \${shelf})\`
}`,
        },
        { type: 'p', text: 'Spread (`...`) unpacks a thing into a new thing. This is how you copy without mutating.' },
        {
          type: 'code',
          code: `const more = [...tools, 'map']          // new array, tools untouched
const patched = { ...relic, cursed: true } // new object, later key wins
const merged = { ...defaults, ...options }`,
        },
        { type: 'p', text: 'The same dots in a parameter list collect the leftovers instead:' },
        {
          type: 'code',
          code: `function count(first, ...rest) {
  return rest.length
}
count('a', 'b', 'c')   // 2`,
        },
        { type: 'note', text: 'Spread copies one level deep. Nested objects are still shared with the original.' },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Return a NEW relic with one field changed — never touch the original. Given a relic and a shelf number, produce a copy that sits on the new shelf.',
        fnName: 'moveTo',
        starter: `function moveTo(relic, shelf) {
  
}`,
        tests: [
          { args: [{ name: 'lamp', shelf: 1 }, 9], expected: { name: 'lamp', shelf: 9 } },
          { args: [{ name: 'key', shelf: 4, cursed: true }, 2], expected: { name: 'key', shelf: 2, cursed: true } },
        ],
        hints: [
          'Copy everything first, then override the one key.',
          'Order matters — the later key wins.',
          'Shape: return { ...relic, shelf }',
        ],
      },
    },
    {
      id: 'a5',
      name: 'The Sealed Study',
      concept: 'Scope & closures',
      brief:
        'A study with no windows. Whatever is written inside stays inside — yet somehow the desk remembers every visitor.',
      lesson: [
        { type: 'p', text: 'A variable is visible inside the braces it was declared in, and in anything nested deeper.' },
        {
          type: 'code',
          code: `const outer = 'visible everywhere below'

function room() {
  const inner = 'only in here'
  console.log(outer)   // fine
}

console.log(inner)     // ReferenceError`,
        },
        {
          type: 'p',
          text: 'A closure is a function that remembers the variables around it, long after that code has finished running.',
        },
        {
          type: 'code',
          code: `function makeCounter() {
  let count = 0                 // private — nothing outside can touch it
  return function () {
    count += 1
    return count
  }
}

const tick = makeCounter()
tick()   // 1
tick()   // 2   — count survived`,
        },
        {
          type: 'note',
          text: 'Every call to `makeCounter` creates a fresh, independent `count`. This is exactly how React hooks keep state per component.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Build a one-use key. `makeKey()` returns a function; the first call returns `"opened"`, and every call after that returns `"spent"`.',
        fnName: 'makeKey',
        starter: `function makeKey() {
  
}`,
        custom: `const k1 = makeKey()
const k2 = makeKey()
check(k1(), 'opened', 'first use of a fresh key')
check(k1(), 'spent', 'second use of the same key')
check(k1(), 'spent', 'third use of the same key')
check(k2(), 'opened', 'a different key is independent')`,
        hints: [
          'Declare the "used yet?" flag OUTSIDE the returned function, inside makeKey.',
          'The returned function both reads that flag and updates it.',
          'Shape: let used = false; return () => { if (used) return "spent"; used = true; return "opened" }',
        ],
      },
    },
    {
      id: 'a6',
      name: 'The Recursive Stair',
      concept: 'Higher-order functions & recursion',
      brief:
        'A spiral staircase that appears to contain a smaller copy of itself. Looking down is unwise; thinking clearly is not.',
      lesson: [
        { type: 'p', text: 'A higher-order function takes a function, returns one, or both.' },
        {
          type: 'code',
          code: `function twice(fn) {
  return (x) => fn(fn(x))
}

const addTwo = twice((n) => n + 1)
addTwo(5)   // 7`,
        },
        { type: 'p', text: 'Recursion is a function that calls itself on a smaller piece of the problem.' },
        {
          type: 'code',
          code: `function countdown(n) {
  if (n <= 0) return ['liftoff']   // base case — MUST exist
  return [n, ...countdown(n - 1)]  // recursive case, smaller each time
}

countdown(3)   // [3, 2, 1, 'liftoff']`,
        },
        {
          type: 'note',
          text: 'Two rules: a base case that stops, and every recursive call must move toward it. Miss either and the stack overflows.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'The stair holds nested boxes of numbers, folded to any depth. Flatten it all into one flat list, in order.',
        fnName: 'flatten',
        starter: `function flatten(list) {
  // Array.isArray(x) tells you whether x is itself a list
  
}`,
        tests: [
          { args: [[1, [2, 3], 4]], expected: [1, 2, 3, 4] },
          { args: [[1, [2, [3, [4]]]]], expected: [1, 2, 3, 4] },
          { args: [[]], expected: [] },
          { args: [[[], [1]]], expected: [1] },
        ],
        hints: [
          'Walk the list. Each item is either a plain value or another list.',
          'If it is a list, flatten THAT and add all of its results.',
          'Shape: for (const x of list) { Array.isArray(x) ? out.push(...flatten(x)) : out.push(x) }',
        ],
      },
    },
  ],
}
