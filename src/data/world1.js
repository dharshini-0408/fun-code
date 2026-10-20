export default {
  track: 'javascript',
  id: 'cellar',
  name: 'The Dusty Cellar',
  tagline: 'JavaScript, from the very first line',
  icon: '🔑',
  rooms: [
    {
      id: 'c1',
      name: 'The Labelled Jars',
      concept: 'Variables & types',
      brief:
        'Shelves of glass jars line the cellar walls. Each has a paper label. The door has no handle — only a slot that reads: "name a thing, and hold it".',
      lesson: [
        { type: 'p', text: 'A variable is a labelled box. You put a value in, and later you ask for it by name.' },
        {
          type: 'code',
          code: `let torches = 3       // can be changed later
const doorCode = 'A17' // fixed forever

torches = 2            // fine
// doorCode = 'B22'    // TypeError!`,
        },
        { type: 'p', text: 'Reach for `const` first. Use `let` only when the value genuinely has to change. `var` is the old way — skip it.' },
        {
          type: 'p',
          text: 'Every value has a type. The main ones you will meet down here:',
        },
        {
          type: 'code',
          code: `typeof 42          // 'number'
typeof 'rope'      // 'string'
typeof true        // 'boolean'
typeof undefined   // 'undefined'  (never assigned)
typeof null        // 'object'     (a famous old bug)
typeof [1, 2]      // 'object'
typeof (() => {})  // 'function'`,
        },
        { type: 'note', text: 'JavaScript figures out the type from the value. You never write it yourself.' },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'The slot wants a description of whatever you feed it. Return a string like `"rope is a string"` — the value, the word "is a", then its type.',
        fnName: 'describe',
        starter: `function describe(value) {
  // hint: typeof value gives you the type name
  
}`,
        tests: [
          { args: ['rope'], expected: 'rope is a string' },
          { args: [42], expected: '42 is a number' },
          { args: [true], expected: 'true is a boolean' },
          { args: [undefined], expected: 'undefined is a undefined' },
        ],
        hints: [
          'You can glue strings together with + , or use a template literal: `${a} and ${b}`.',
          'Numbers turn into strings automatically when you add them to a string.',
          'Answer shape: return `${value} is a ${typeof value}`',
        ],
      },
    },
    {
      id: 'c2',
      name: 'The Whispering Wall',
      concept: 'Strings & template literals',
      brief:
        'Letters are carved into the wall, but half of them have crumbled away. A brass plaque asks you to speak a name back to it, properly.',
      lesson: [
        { type: 'p', text: 'Strings hold text. Single or double quotes both work, but backticks are the useful ones.' },
        {
          type: 'code',
          code: `const name = 'ada'

'Hello, ' + name + '!'   // old way, fiddly
\`Hello, \${name}!\`        // template literal — much nicer`,
        },
        { type: 'p', text: 'Strings carry a small toolbox with them:' },
        {
          type: 'code',
          code: `name.length            // 3
name.toUpperCase()     // 'ADA'
name[0]                // 'a'   (first character)
name.slice(1)          // 'da'  (from index 1 onward)
'  hi  '.trim()        // 'hi'
'a,b,c'.split(',')     // ['a', 'b', 'c']`,
        },
        {
          type: 'note',
          text: 'Strings are immutable. `name.toUpperCase()` hands you a NEW string — it does not change `name`.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'The wall only answers to names in Title Case: first letter capital, the rest lowercase. Turn any spelling into that form.',
        fnName: 'titleCase',
        starter: `function titleCase(name) {
  
}`,
        tests: [
          { args: ['ada'], expected: 'Ada' },
          { args: ['GRACE'], expected: 'Grace' },
          { args: ['aLaN'], expected: 'Alan' },
          { args: ['k'], expected: 'K' },
        ],
        hints: [
          'Two pieces: the first character, and everything after it.',
          '`name[0]` is the first character; `name.slice(1)` is the rest.',
          'Uppercase the first, lowercase the rest, then join them together.',
        ],
      },
    },
    {
      id: 'c3',
      name: 'The Counting Steps',
      concept: 'Numbers, operators & comparison',
      brief:
        'A staircase of thirteen steps, each one numbered. The step you stand on lights up only if your arithmetic is honest.',
      lesson: [
        {
          type: 'code',
          code: `7 + 2   // 9
7 - 2   // 5
7 * 2   // 14
7 / 2   // 3.5  — no integer division here
7 % 2   // 1    — remainder, brilliant for "every Nth"
7 ** 2  // 49   — power`,
        },
        { type: 'p', text: 'Comparisons give you a boolean. Always use the three-character ones:' },
        {
          type: 'code',
          code: `1 === 1     // true
1 === '1'   // false — different types
1 == '1'    // true  — == converts first. Avoid it.
3 !== 4     // true
3 < 4       // true`,
        },
        {
          type: 'note',
          text: '`%` is the workhorse of puzzles: `n % 2 === 0` means even, `n % 3 === 0` means divisible by three.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'A step lights up when its number divides evenly into the total. Given a step and a total, say whether the step is a clean divisor.',
        fnName: 'fits',
        starter: `function fits(step, total) {
  
}`,
        tests: [
          { args: [3, 12], expected: true },
          { args: [5, 12], expected: false },
          { args: [1, 7], expected: true },
          { args: [4, 4], expected: true },
          { args: [8, 4], expected: false },
        ],
        hints: [
          '"Divides evenly" means there is nothing left over.',
          'The remainder operator `%` gives you what is left over.',
          'Return the comparison itself — no `if` needed: `total % step === 0`.',
        ],
      },
    },
    {
      id: 'c4',
      name: 'The Forked Corridor',
      concept: 'Conditionals',
      brief:
        'The corridor splits three ways. A sign hangs above: "The wrong door is the one you did not think about."',
      lesson: [
        {
          type: 'code',
          code: `if (torches > 2) {
  console.log('bright')
} else if (torches === 1) {
  console.log('dim')
} else {
  console.log('dark')
}`,
        },
        { type: 'p', text: 'For a simple two-way choice, the ternary is shorter and returns a value:' },
        {
          type: 'code',
          code: `const mood = torches > 0 ? 'safe' : 'terrified'`,
        },
        { type: 'p', text: 'Every value is either truthy or falsy when a condition tests it. Only these are falsy:' },
        {
          type: 'code',
          code: `false, 0, '', null, undefined, NaN
// everything else — including [] and {} — is truthy`,
        },
        { type: 'note', text: 'Order matters. The first matching branch wins and the rest are skipped entirely.' },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Rate the light in the room: 0 torches is `"dark"`, 1 or 2 is `"dim"`, 3 or more is `"bright"`. Anything negative is `"broken"`.',
        fnName: 'lightLevel',
        starter: `function lightLevel(torches) {
  
}`,
        tests: [
          { args: [0], expected: 'dark' },
          { args: [1], expected: 'dim' },
          { args: [2], expected: 'dim' },
          { args: [3], expected: 'bright' },
          { args: [99], expected: 'bright' },
          { args: [-1], expected: 'broken' },
        ],
        hints: [
          'Check the negative case FIRST — otherwise a later branch may catch it by accident.',
          'After the negative check, 0 / 1-2 / 3+ are three plain branches.',
          'Structure: if (t < 0) … else if (t === 0) … else if (t < 3) … else …',
        ],
      },
    },
    {
      id: 'c5',
      name: 'The Turning Gears',
      concept: 'Loops',
      brief:
        'A wall of gears, each needing a precise number of turns. Doing it by hand would take all night — so do not do it by hand.',
      lesson: [
        { type: 'p', text: 'A loop repeats a block until a condition stops being true.' },
        {
          type: 'code',
          code: `for (let i = 0; i < 3; i++) {
  console.log(i)   // 0, 1, 2
}

// walking an array
const tools = ['pick', 'rope']
for (const tool of tools) {
  console.log(tool)
}

let turns = 3
while (turns > 0) {
  turns--
}`,
        },
        {
          type: 'p',
          text: 'A very common shape: start with an accumulator outside the loop, add to it inside, return it after.',
        },
        {
          type: 'code',
          code: `let total = 0
for (const n of [1, 2, 3]) {
  total += n
}
// total === 6`,
        },
        {
          type: 'note',
          text: 'If a `while` loop never changes the thing it tests, it runs forever. The sandbox will stop you after 2 seconds.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Each gear is worth its own number of turns, but the jammed ones (negative numbers) contribute nothing. Add up only the positive turns.',
        fnName: 'totalTurns',
        starter: `function totalTurns(gears) {
  
}`,
        tests: [
          { args: [[1, 2, 3]], expected: 6 },
          { args: [[5, -2, 5]], expected: 10 },
          { args: [[-1, -9]], expected: 0 },
          { args: [[]], expected: 0 },
        ],
        hints: [
          'Declare your running total BEFORE the loop, or it resets on every pass.',
          'Inside the loop, skip anything that is not greater than zero.',
          'Shape: let total = 0; for (const g of gears) { if (g > 0) total += g } return total',
        ],
      },
    },
    {
      id: 'c6',
      name: 'The Locksmith’s Bench',
      concept: 'Functions',
      brief:
        'A workbench covered in half-made keys. To leave, you must forge one key that opens many doors — not many keys.',
      lesson: [
        { type: 'p', text: 'A function is a named, reusable recipe. It takes inputs and hands back a result.' },
        {
          type: 'code',
          code: `function greet(name) {
  return 'Hi, ' + name
}

// arrow function — same thing, shorter
const greet2 = (name) => 'Hi, ' + name

greet('ada')   // 'Hi, ada'`,
        },
        {
          type: 'p',
          text: 'Without `return`, a function hands back `undefined`. That is the single most common early bug.',
        },
        {
          type: 'code',
          code: `function bad(n) { n * 2 }        // returns undefined
function good(n) { return n * 2 } // returns the double
const arrow = (n) => n * 2        // implicit return, no braces`,
        },
        { type: 'note', text: 'Parameters can have defaults: `function pay(amount, tip = 0) { … }`.' },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Forge a master key: given a list of door numbers and a rule (a function that says yes or no), return only the doors the rule accepts.',
        fnName: 'openable',
        starter: `function openable(doors, rule) {
  // rule is a FUNCTION. Call it: rule(door) → true or false
  
}`,
        tests: [
          { args: [[1, 2, 3, 4], { __fn: 'even' }], expected: [2, 4] },
          { args: [[1, 2, 3, 4], { __fn: 'big' }], expected: [3, 4] },
          { args: [[], { __fn: 'even' }], expected: [] },
        ],
        fnArgs: { even: '(n) => n % 2 === 0', big: '(n) => n > 2' },
        hints: [
          'A function can be passed around like any other value, then called with ().',
          'Build an empty array, push the doors that pass, return the array.',
          'Shape: const out = []; for (const d of doors) { if (rule(d)) out.push(d) } return out',
        ],
      },
    },
  ],
}
