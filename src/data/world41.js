export default {
  track: 'javascript',
  id: 'control-codex',
  name: 'The Control Codex',
  tagline: 'switch, loops control, for-in/of, parseInt, bitwise and strict mode',
  icon: '🎛️',
  rooms: [
    {
      id: 'js19',
      name: 'The Switchboard',
      concept: 'switch & ternary',
      brief: 'Many labelled doors from one value — and a one-line choice between two.',
      lesson: [
        { type: 'p', text: '`switch (x) { case …: break; default: }` chooses by equality. Ternary `cond ? a : b` picks an expression.' },
        { type: 'code', code: `switch (house) {
  case "g": return "Gryffindor"
  default: return "Unknown"
}
const label = ok ? "yes" : "no"` },
        { type: 'note', text: 'Always `break` (or return) unless you intend fall-through.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `houseName(code)` using switch: "g"→"Gryffindor", "r"→"Ravenclaw", else "Unknown".',
        fnName: 'houseName',
        starter: `function houseName(code) {\n  \n}`,
        tests: [
          { args: ['g'], expected: 'Gryffindor' },
          { args: ['r'], expected: 'Ravenclaw' },
          { args: ['x'], expected: 'Unknown' },
        ],
        hints: ['switch (code)', 'return in each case', 'default Unknown'],
      },
    },
    {
      id: 'js20',
      name: 'The Early Exit',
      concept: 'break & continue',
      brief: 'Leave a loop early, or skip one turn of it.',
      lesson: [
        { type: 'p', text: '`break` exits the loop. `continue` skips to the next iteration.' },
        { type: 'code', code: `for (const n of nums) {
  if (n < 0) continue
  if (n === 0) break
  use(n)
}` },
        { type: 'note', text: 'Labelled break/continue exist for nested loops — use sparingly.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `firstPositive(nums)` returning the first number > 0, or null if none — implement with a for-loop using break.',
        fnName: 'firstPositive',
        starter: `function firstPositive(nums) {\n  \n}`,
        tests: [
          { args: [[-1, 0, 4, 5]], expected: 4 },
          { args: [[-1, -2]], expected: null },
          { args: [[3]], expected: 3 },
        ],
        hints: ['for…of', 'if n > 0: save and break', 'Return null if never found'],
      },
    },
    {
      id: 'js21',
      name: 'The Two For Doors',
      concept: 'for...in vs for...of',
      brief: 'One door walks keys; the other walks values.',
      lesson: [
        { type: 'p', text: '`for...of` iterates values of iterables (arrays, strings). `for...in` iterates enumerable keys (objects) — avoid on arrays.' },
        { type: 'code', code: `for (const n of [10, 20]) { }
for (const key in { a: 1, b: 2 }) { }` },
        { type: 'note', text: 'for...in can see inherited keys — guard with Object.hasOwn.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `sumValues(obj)` summing numeric values using for...in (own keys only via Object.hasOwn or hasOwnProperty).',
        fnName: 'sumValues',
        starter: `function sumValues(obj) {\n  \n}`,
        tests: [
          { args: [{ a: 1, b: 2 }], expected: 3 },
          { args: [{}], expected: 0 },
          { args: [{ x: 10 }], expected: 10 },
        ],
        hints: ['let total = 0', 'for (const k in obj)', 'Object.hasOwn(obj, k) before adding'],
      },
    },
    {
      id: 'js22',
      name: 'The Parse Bench',
      concept: 'parseInt & Number.isNaN',
      brief: 'Reading numbers out of text — and knowing when the reading failed.',
      lesson: [
        { type: 'p', text: '`parseInt(text, radix)`, `parseFloat`, `Number.isNaN`, `Number.isFinite` are safer than global `isNaN`.' },
        { type: 'code', code: `parseInt("08", 10)      // 8
Number.isNaN(Number("x")) // true
Number.isNaN("x")         // false — not a number type` },
        { type: 'note', text: 'Always pass radix 10 to parseInt.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `parseAge(text)` returning parseInt(text, 10) when finite, otherwise null.',
        fnName: 'parseAge',
        starter: `function parseAge(text) {\n  \n}`,
        tests: [
          { args: ['11'], expected: 11 },
          { args: ['08'], expected: 8 },
          { args: ['nope'], expected: null },
        ],
        hints: ['const n = parseInt(text, 10)', 'Number.isFinite(n)', 'else null'],
      },
    },
    {
      id: 'js23',
      name: 'The Bit Gate',
      concept: 'Bitwise basics',
      brief: 'Flags packed into bits — and, or, xor, shifts.',
      lesson: [
        { type: 'p', text: 'Bitwise `& | ^ ~ << >> >>>` operate on 32-bit integers. Useful for flags and some perf tricks.' },
        { type: 'code', code: `const READ = 1, WRITE = 2
let perms = READ | WRITE
(perms & WRITE) !== 0  // true` },
        { type: 'note', text: '`>>> 0` converts to unsigned 32-bit. Prefer clearer code over clever bits unless needed.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `hasFlag(bitmask, flag)` returning true when `(bitmask & flag) !== 0`.',
        fnName: 'hasFlag',
        starter: `function hasFlag(bitmask, flag) {\n  \n}`,
        tests: [
          { args: [3, 1], expected: true },
          { args: [3, 2], expected: true },
          { args: [1, 2], expected: false },
        ],
        hints: ['Bitwise AND', 'Compare to 0', 'Return boolean'],
      },
    },
    {
      id: 'js24',
      name: 'The Strict Seal',
      concept: 'use strict',
      brief: 'A seal that forbids sloppy habits — undeclared vars, silent failures.',
      lesson: [
        { type: 'p', text: '`"use strict"` enables strict mode: assigning undeclared variables throws; `this` is undefined in plain functions; octal escapes banned.' },
        { type: 'code', code: `"use strict"
// x = 1  // ReferenceError
function f() { return this }  // undefined (not window)` },
        { type: 'note', text: 'ES modules are strict by default. Still useful in classic scripts and teaching.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `isStrictMode()` returning true when running in strict mode (a reliable check: `this` is undefined inside a non-arrow function call as a bare function).',
        fnName: 'isStrictMode',
        starter: `function isStrictMode() {\n  \n}`,
        custom: `// In modules/workers this is typically strict already
const v = isStrictMode()
check(typeof v, 'boolean', 'returns boolean')
check(v, true, 'worker/module is strict')`,
        hints: [
          'function probe() { return this === undefined }',
          'return probe()',
          'Do not use arrow for the probe',
        ],
      },
    },
  ],
}
