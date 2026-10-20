export default {
  track: 'javascript',
  id: 'abyss',
  name: 'The Async Abyss',
  tagline: 'Classes, promises and the order things really happen',
  icon: '⏳',
  rooms: [
    {
      id: 'b1',
      name: 'The Hall of Mirrors',
      concept: '`this` & arrow functions',
      brief:
        'Every mirror shows a different room behind you. Which one you are standing in depends entirely on how you walked in.',
      lesson: [
        { type: 'p', text: '`this` is not decided where a function is written. It is decided by how the function is CALLED.' },
        {
          type: 'code',
          code: `const lamp = {
  name: 'oil lamp',
  describe() {
    return this.name      // 'this' = whatever is left of the dot
  },
}

lamp.describe()           // 'oil lamp'

const loose = lamp.describe
loose()                   // undefined — no dot, no owner`,
        },
        {
          type: 'p',
          text: 'Arrow functions have no `this` of their own. They borrow it from the surrounding code, which is usually what you want.',
        },
        {
          type: 'code',
          code: `const timer = {
  ticks: 0,
  start() {
    setTimeout(function () { this.ticks++ }, 10)  // lost — wrong 'this'
    setTimeout(() => { this.ticks++ }, 10)        // works — borrowed 'this'
  },
}`,
        },
        { type: 'note', text: 'Rule of thumb: methods on an object get regular functions; callbacks inside them get arrows.' },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'The mirror shows you this code. What lands in the console?',
        code: `const room = {
  name: 'vault',
  guards: ['ana', 'bo'],
  roll() {
    return this.guards.map(function (g) {
      return g + ' of ' + this.name
    })
  },
}
console.log(room.roll())`,
        options: [
          "['ana of vault', 'bo of vault']",
          'A TypeError, because `this` inside the plain callback is not `room`',
          "['ana of undefined', 'bo of undefined']",
          'An empty array',
        ],
        answer: 1,
        explain:
          'The callback passed to `map` is a plain function, so it gets its own `this` — `undefined` in modules/strict mode. Reading `.name` off `undefined` throws a TypeError. Swap the callback for an arrow function `(g) => …` and it borrows `roll`’s `this`, giving the first answer.',
        hints: [
          'The arrow-function rule is the whole puzzle here.',
          'Ask what `this` is inside a plain function passed to `map`.',
          'Reading a property off `undefined` does not return undefined — it throws.',
        ],
      },
    },
    {
      id: 'b2',
      name: 'The Foundry',
      concept: 'Classes & prototypes',
      brief:
        'Molten metal, a row of moulds. One mould can stamp out a thousand identical keys — and each key can be filed differently after.',
      lesson: [
        { type: 'p', text: 'A class is a mould for objects: shared behaviour in one place, per-object data in the constructor.' },
        {
          type: 'code',
          code: `class Lantern {
  constructor(fuel) {
    this.fuel = fuel        // per-instance data
  }

  burn(hours) {             // shared by every instance
    this.fuel = Math.max(0, this.fuel - hours)
    return this.fuel
  }

  get lit() {               // getter — read like a property
    return this.fuel > 0
  }
}

const l = new Lantern(3)
l.burn(1)   // 2
l.lit       // true`,
        },
        { type: 'p', text: 'Classes can extend one another. `super` calls up to the parent.' },
        {
          type: 'code',
          code: `class Torch extends Lantern {
  constructor(fuel) {
    super(fuel)
    this.smoky = true
  }
}`,
        },
        {
          type: 'note',
          text: 'Under the hood this is prototypes: methods live on `Lantern.prototype`, shared by every instance rather than copied.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Cast a `Vault` class. `new Vault(3)` starts with 3 locks. `pick()` removes one and returns how many remain (never below 0). `isOpen()` is true only when none are left.',
        fnName: 'Vault',
        starter: `class Vault {
  constructor(locks) {
    
  }

  
}`,
        custom: `const v = new Vault(2)
check(v.isOpen(), false, 'a 2-lock vault starts closed')
check(v.pick(), 1, 'first pick leaves 1')
check(v.pick(), 0, 'second pick leaves 0')
check(v.isOpen(), true, 'no locks left means open')
check(v.pick(), 0, 'picking an open vault stays at 0')
check(new Vault(5).isOpen(), false, 'a fresh 5-lock vault is closed')`,
        hints: [
          'The constructor stores the count on `this`.',
          '`pick` must not let the count go negative — clamp it at 0.',
          'Shape: this.locks = locks; pick() { if (this.locks > 0) this.locks--; return this.locks }',
        ],
      },
    },
    {
      id: 'b3',
      name: 'The Waiting Room',
      concept: 'Promises',
      brief:
        'A room with a single ticket machine. It hands you a slip that says: "not yet — but I promise."',
      lesson: [
        { type: 'p', text: 'A Promise is a value that has not arrived yet. It is pending, then either fulfilled or rejected.' },
        {
          type: 'code',
          code: `const ticket = new Promise((resolve, reject) => {
  setTimeout(() => resolve('door open'), 100)
})

ticket
  .then((value) => console.log(value))   // runs on success
  .catch((err) => console.log('failed')) // runs on rejection
  .finally(() => console.log('done'))    // runs either way`,
        },
        { type: 'p', text: '`.then` returns a new promise, so they chain — and returning a promise inside one flattens it.' },
        {
          type: 'code',
          code: `fetchUser()
  .then((user) => fetchPosts(user.id))   // waits for this too
  .then((posts) => posts.length)`,
        },
        { type: 'p', text: 'Running several at once:' },
        {
          type: 'code',
          code: `Promise.all([a, b])        // all results, or the first rejection
Promise.allSettled([a, b]) // every outcome, never rejects
Promise.race([a, b])       // whichever settles first`,
        },
        { type: 'note', text: 'A promise never "pauses" your program. The code after it keeps running immediately.' },
      ],
      puzzle: {
        kind: 'order',
        prompt:
          'The ticket machine prints these four lines, but not in the order they appear in the source. Put them into the true order of appearance.',
        code: `console.log('A: entering')
Promise.resolve().then(() => console.log('B: promise'))
setTimeout(() => console.log('C: timeout'), 0)
console.log('D: leaving')`,
        lines: ['A: entering', 'D: leaving', 'B: promise', 'C: timeout'],
        explain:
          'Synchronous code runs to completion first (A, D). Then the microtask queue drains — that is where `.then` callbacks live (B). Only after that does the event loop pick up macrotasks like `setTimeout` (C). A `setTimeout(fn, 0)` is never truly zero.',
        hints: [
          'Which lines run immediately, with no waiting at all?',
          'Promise callbacks and timeouts sit in two different queues.',
          'Microtasks (promises) always drain before macrotasks (timeouts).',
        ],
      },
    },
    {
      id: 'b4',
      name: 'The Patient Door',
      concept: 'async / await',
      brief:
        'This door opens slowly, and only for someone willing to stand still and wait for it properly.',
      lesson: [
        { type: 'p', text: '`async`/`await` is promise chaining that reads like ordinary top-to-bottom code.' },
        {
          type: 'code',
          code: `// the .then version
function load() {
  return fetchUser().then((u) => fetchPosts(u.id))
}

// the same thing, awaited
async function load() {
  const user = await fetchUser()
  return await fetchPosts(user.id)
}`,
        },
        { type: 'p', text: 'Two rules that catch everyone:' },
        {
          type: 'code',
          code: `// 1. an async function ALWAYS returns a promise
async function four() { return 4 }
four()            // Promise { 4 }, not 4
await four()      // 4

// 2. errors are caught with plain try/catch
async function safe() {
  try {
    return await risky()
  } catch (err) {
    return 'fallback'
  }
}`,
        },
        {
          type: 'note',
          text: 'Awaiting inside a loop runs things one after another. To run them together, build the promises first and `await Promise.all(…)`.',
        },
      ],
      puzzle: {
        kind: 'choice',
        prompt: 'Two versions of the same task. Each fetch takes 1 second. What is the difference?',
        code: `// version 1
for (const id of [1, 2, 3]) {
  await open(id)
}

// version 2
await Promise.all([1, 2, 3].map((id) => open(id)))`,
        options: [
          'No difference — both take about 1 second',
          'Version 1 takes about 3 seconds; version 2 takes about 1',
          'Version 2 takes about 3 seconds; version 1 takes about 1',
          'Version 2 is invalid — you cannot await an array method',
        ],
        answer: 1,
        explain:
          'Version 1 waits for each door before starting the next: 1s + 1s + 1s. Version 2 starts all three immediately (`.map` calls `open` right away, producing three in-flight promises) and then waits for the slowest — about 1s total. Use the sequential form only when a later step genuinely needs the earlier result.',
        hints: [
          'In version 1, when does the second `open` call actually start?',
          '`.map` calls the function for every item straight away.',
          '`Promise.all` waits for the slowest, not for the sum.',
        ],
      },
    },
    {
      id: 'b5',
      name: 'The Trapped Corridor',
      concept: 'Errors & defensive code',
      brief:
        'Pressure plates everywhere. Stepping on one is survivable. Pretending you did not is not.',
      lesson: [
        { type: 'p', text: 'When something goes wrong, throw. Somebody up the call stack catches it.' },
        {
          type: 'code',
          code: `function enter(code) {
  if (!code) throw new Error('no code given')
  return 'welcome'
}

try {
  enter('')
} catch (err) {
  console.log(err.message)   // 'no code given'
} finally {
  console.log('always runs')
}`,
        },
        { type: 'p', text: 'An uncaught throw unwinds everything above it until someone catches — or the program dies.' },
        {
          type: 'code',
          code: `// narrow the catch to what you can actually handle
try {
  JSON.parse(raw)
} catch (err) {
  if (err instanceof SyntaxError) return null
  throw err   // not mine — pass it upward
}`,
        },
        {
          type: 'note',
          text: 'Swallowing every error with an empty `catch {}` turns a loud bug into a silent one. Handle it or rethrow it.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Defuse the corridor. Given a raw JSON string, return the parsed object — but if the text is malformed, return `null` instead of exploding.',
        fnName: 'safeParse',
        starter: `function safeParse(raw) {
  
}`,
        tests: [
          { args: ['{"a":1}'], expected: { a: 1 } },
          { args: ['not json'], expected: null },
          { args: ['[1,2]'], expected: [1, 2] },
          { args: [''], expected: null },
        ],
        hints: [
          '`JSON.parse` throws on bad input — that is the thing to wrap.',
          'Return the parsed value from inside `try`, and `null` from `catch`.',
          'Shape: try { return JSON.parse(raw) } catch { return null }',
        ],
      },
    },
    {
      id: 'b6',
      name: 'The Clockwork Heart',
      concept: 'The event loop',
      brief:
        'A single great pendulum drives the whole machine. It only ever does one thing at a time — which is the secret of it.',
      lesson: [
        {
          type: 'p',
          text: 'JavaScript runs on one thread. One call stack, one thing at a time. Everything "concurrent" is the event loop taking turns.',
        },
        {
          type: 'code',
          code: `// The loop, roughly:
// 1. run the current script to the very end
// 2. drain ALL microtasks   (promise .then, queueMicrotask)
// 3. take ONE macrotask     (setTimeout, click handler, I/O)
// 4. repeat from step 2`,
        },
        {
          type: 'p',
          text: 'This is why a long synchronous loop freezes the page: nothing else — not a click, not a repaint — can happen until it finishes.',
        },
        {
          type: 'code',
          code: `console.log(1)
setTimeout(() => console.log(2), 0)
Promise.resolve().then(() => console.log(3))
console.log(4)

// 1, 4, 3, 2`,
        },
        { type: 'note', text: '`setTimeout(fn, 0)` means "as soon as the stack is clear and microtasks are done", not "now".' },
      ],
      puzzle: {
        kind: 'order',
        prompt: 'The pendulum swings. Put the five logs in the order they actually print.',
        code: `console.log('start')

setTimeout(() => console.log('timeout'), 0)

Promise.resolve()
  .then(() => console.log('then 1'))
  .then(() => console.log('then 2'))

console.log('end')`,
        lines: ['start', 'end', 'then 1', 'then 2', 'timeout'],
        explain:
          'Synchronous first: start, end. Then microtasks drain completely — and a chained `.then` queues a NEW microtask, so "then 2" still beats the timeout. The macrotask queue is only visited once every microtask is gone.',
        hints: [
          'Sync code always finishes first.',
          'A second `.then` in a chain is queued while microtasks are still draining.',
          'The timeout waits for an empty microtask queue, so it goes last.',
        ],
      },
    },
  ],
}
