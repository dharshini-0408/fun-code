export default {
  track: 'javascript',
  id: 'fundamentals-codex',
  name: 'The Fundamentals Codex',
  tagline: 'Coercion, Math, Date, string/array/object catalogs and control flow',
  icon: '📘',
  rooms: [
    {
      id: 'js13',
      name: 'The Coercion Mirror',
      concept: 'Type coercion',
      brief: 'Values that change costume when compared or added — sometimes helpfully, often not.',
      lesson: [
        { type: 'p', text: 'JavaScript converts types implicitly: `==` coerces, `===` does not. `Number("08")`, `String(1)`, `Boolean(0)` convert explicitly.' },
        { type: 'code', code: `1 + "2"     // "12"
1 == "1"    // true
1 === "1"   // false
Number("")  // 0
Boolean(0)  // false` },
        { type: 'note', text: 'Prefer `===` and explicit conversion. Avoid `==` except for `null` checks you mean.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `toNumber(value)` using `Number(value)`, and `same(a, b)` returning whether `a === b`.',
        fnName: 'toNumber',
        starter: `function toNumber(value) {\n  \n}\n\nfunction same(a, b) {\n  \n}\n`,
        custom: `check(toNumber("42"), 42, 'string to number')
check(toNumber(""), 0, 'empty string')
check(same(1, 1), true, '=== true')
check(same(1, "1"), false, '=== false')`,
        hints: ['Number(value)', '=== for same', 'Define both functions'],
      },
    },
    {
      id: 'js14',
      name: 'The Arithmetic Alcove',
      concept: 'Math object',
      brief: 'A shelf of pure number tools: floor, ceil, max, random, pow.',
      lesson: [
        { type: 'p', text: '`Math` provides `floor`, `ceil`, `round`, `max`, `min`, `abs`, `pow`, `sqrt`, `random`.' },
        { type: 'code', code: `Math.floor(3.9)  // 3
Math.max(1, 7, 3)
Math.pow(2, 10)
Math.random()    // 0..1` },
        { type: 'note', text: '`Math.random()` is not cryptographic. Use Web Crypto for tokens.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `clamp(n, min, max)` returning n limited to [min, max] using Math.min/max.',
        fnName: 'clamp',
        starter: `function clamp(n, min, max) {\n  \n}`,
        tests: [
          { args: [5, 0, 10], expected: 5 },
          { args: [-2, 0, 10], expected: 0 },
          { args: [99, 0, 10], expected: 10 },
        ],
        hints: ['Math.min(max, Math.max(min, n))', 'Order matters', 'Return the number'],
      },
    },
    {
      id: 'js15',
      name: 'The Calendar Stone',
      concept: 'Date object',
      brief: 'Moments carved as dates — create, read parts, compare.',
      lesson: [
        { type: 'p', text: '`new Date(iso)`, `getFullYear`, `getMonth` (0-based), `getDate`, `toISOString`, timestamps via `Date.now()`.' },
        { type: 'code', code: `const d = new Date("1991-09-01T00:00:00.000Z")
d.getUTCFullYear()  // 1991
d.getUTCMonth()     // 8  (September)
Date.now()` },
        { type: 'note', text: 'Prefer ISO strings and UTC getters to avoid timezone traps in lessons and APIs.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `yearOf(iso)` returning the UTC full year of an ISO date string.',
        fnName: 'yearOf',
        starter: `function yearOf(iso) {\n  \n}`,
        tests: [
          { args: ['1991-09-01T00:00:00.000Z'], expected: 1991 },
          { args: ['2000-01-01T00:00:00.000Z'], expected: 2000 },
        ],
        hints: ['new Date(iso)', 'getUTCFullYear()', 'Return the number'],
      },
    },
    {
      id: 'js16',
      name: 'The String Cabinet',
      concept: 'String methods',
      brief: 'Cut, search, pad, and replace — the everyday string toolkit.',
      lesson: [
        { type: 'p', text: '`includes`, `startsWith`, `endsWith`, `slice`, `split`, `trim`, `padStart`, `replaceAll`, `toLowerCase`.' },
        { type: 'code', code: `"castle".includes("ass")
"12".padStart(4, "0")
"a-b-a".replaceAll("a", "x")` },
        { type: 'note', text: 'Strings are immutable; every method returns a new string.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `normalize(name)` that trims, lowercases, and replaces spaces with `-`.',
        fnName: 'normalize',
        starter: `function normalize(name) {\n  \n}`,
        tests: [
          { args: ['  Hello World  '], expected: 'hello-world' },
          { args: ['Ada'], expected: 'ada' },
        ],
        hints: ['trim → toLowerCase', 'replaceAll(" ", "-") or split/join', 'Chain them'],
      },
    },
    {
      id: 'js17',
      name: 'The Array Armoury',
      concept: 'Array find/some/every/flat',
      brief: 'Ask whether any, all, or the first match — then flatten nested shelves.',
      lesson: [
        { type: 'p', text: '`find`, `findIndex`, `some`, `every`, `flat`, `flatMap`, `at`, and `with` extend the array toolkit beyond map/filter/reduce.' },
        { type: 'code', code: `[1, 2, 3].some((n) => n > 2)   // true
[1, 2, 3].every((n) => n > 0)  // true
[1, [2, 3]].flat()             // [1,2,3]
[1, 2, 3].at(-1)               // 3` },
        { type: 'note', text: '`find` returns the element or undefined; `filter` returns a list.' },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `stats(nums)` returning `{ firstEven, allPositive }` using `find` for the first even number and `every` for all > 0.',
        fnName: 'stats',
        starter: `function stats(nums) {\n  \n}`,
        tests: [
          { args: [[1, 2, 3]], expected: { firstEven: 2, allPositive: true } },
          { args: [[1, 3, 5]], expected: { firstEven: undefined, allPositive: true } },
          { args: [[1, -1]], expected: { firstEven: undefined, allPositive: false } },
        ],
        hints: ['find n % 2 === 0', 'every n > 0', 'Return both fields'],
      },
    },
    {
      id: 'js18',
      name: 'The Object Index',
      concept: 'Object keys/values/entries',
      brief: 'Turn an object into lists you can map — keys, values, or pairs.',
      lesson: [
        { type: 'p', text: '`Object.keys`, `values`, `entries`, `fromEntries`, and `assign` are the standard object toolkit.' },
        { type: 'code', code: `Object.entries({ a: 1, b: 2 })
Object.fromEntries([["a", 1]])
Object.assign({}, { a: 1 }, { b: 2 })` },
        { type: 'note', text: 'Spread `{...a, ...b}` often replaces assign for own enumerable props.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `invert(obj)` that swaps keys and values using entries/fromEntries (values must be unique strings/numbers).',
        fnName: 'invert',
        starter: `function invert(obj) {\n  \n}`,
        tests: [
          { args: [{ a: '1', b: '2' }], expected: { 1: 'a', 2: 'b' } },
          { args: [{ x: 'y' }], expected: { y: 'x' } },
        ],
        hints: ['Object.entries', 'map ([k,v]) => [v,k]', 'Object.fromEntries'],
      },
    },
  ],
}
