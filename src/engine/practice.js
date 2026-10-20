// Endless practice. Each generator invents a fresh puzzle from a seed and
// computes its own expected answers with a reference implementation, so a
// generated drill can never disagree with itself.
//
// Every generator is tagged with a track and a level, so the Practice Yard can
// offer "JavaScript · expert" or "React · basics" and never run out of them:
// the numbers, the field names, the data and half the wording come from the
// seed, so the same generator is a different drill every time you roll it.
//
// React drills are deliberately logic-only — no JSX, no renderer. Everything
// that actually bites people in React (immutable updates, dependency
// comparison, functional updaters, cleanup order, memo caches) is plain
// JavaScript underneath, and plain JavaScript is what the sandbox can test.

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const int = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1))
const pick = (r, xs) => xs[int(r, 0, xs.length - 1)]
const sample = (r, xs, n) => Array.from({ length: n }, () => pick(r, xs))

const NAMES = ['lamp', 'rope', 'key', 'chest', 'coin', 'map', 'torch', 'bell', 'mask', 'dagger']
const WORDS = ['vault', 'cellar', 'attic', 'spire', 'crypt', 'gallery', 'landing', 'study']

// Each generator: { id, track, level, concept, make(r) -> puzzle }
const GENERATORS = [
  // ========================================================================
  // JavaScript · basics
  // ========================================================================
  {
    id: 'range-sum',
    track: 'javascript',
    level: 'basics',
    concept: 'Loops & accumulators',
    make(r) {
      const step = pick(r, [2, 3, 5])
      const ref = (n) => {
        let t = 0
        for (let i = 1; i <= n; i++) if (i % step === 0) t += i
        return t
      }
      return {
        prompt: `Add up every number from 1 up to and including \`n\` that divides evenly by ${step}.`,
        fnName: 'sumMultiples',
        starter: `function sumMultiples(n) {\n  \n}`,
        tests: [int(r, 5, 12), int(r, 13, 25), int(r, 26, 60), 1].map((n) => ({
          args: [n],
          expected: ref(n),
        })),
        hints: [
          'Declare the running total before the loop starts.',
          `A number divides evenly by ${step} when \`i % ${step} === 0\`.`,
          `Shape: let t = 0; for (let i = 1; i <= n; i++) if (i % ${step} === 0) t += i; return t`,
        ],
      }
    },
  },
  {
    id: 'threshold',
    track: 'javascript',
    level: 'basics',
    concept: 'Filtering',
    make(r) {
      const limit = int(r, 3, 9)
      const dir = pick(r, ['above', 'below'])
      const ref = (xs) => xs.filter((x) => (dir === 'above' ? x > limit : x < limit))
      const lists = [
        Array.from({ length: int(r, 4, 7) }, () => int(r, 1, 15)),
        Array.from({ length: int(r, 3, 6) }, () => int(r, 1, 15)),
        [],
      ]
      return {
        prompt: `Return only the numbers strictly ${dir} ${limit}, keeping their original order.`,
        fnName: 'keepNumbers',
        starter: `function keepNumbers(numbers) {\n  \n}`,
        tests: lists.map((xs) => ({ args: [xs], expected: ref(xs) })),
        hints: [
          'Build a new array — do not change the one you were given.',
          `"Strictly ${dir}" means ${dir === 'above' ? '>' : '<'}, not ${dir === 'above' ? '>=' : '<='}.`,
          `Shape: numbers.filter((n) => n ${dir === 'above' ? '>' : '<'} ${limit})`,
        ],
      }
    },
  },
  {
    id: 'char-count',
    track: 'javascript',
    level: 'basics',
    concept: 'Strings',
    make(r) {
      const ch = pick(r, ['a', 'e', 'l', 'r', 'o'])
      const ref = (s) => [...s.toLowerCase()].filter((c) => c === ch).length
      const words = [pick(r, WORDS), pick(r, NAMES), `${pick(r, WORDS)} ${pick(r, NAMES)}`, '']
      return {
        prompt: `Count how many times the letter "${ch}" appears in a string, ignoring capitals.`,
        fnName: 'countLetter',
        starter: `function countLetter(text) {\n  \n}`,
        tests: words.map((w) => ({ args: [w], expected: ref(w) })),
        hints: [
          'Lowercase the whole string first, then you only compare against one case.',
          'You can loop with `for (const c of text)` and add to a counter.',
          `Shape: [...text.toLowerCase()].filter((c) => c === '${ch}').length`,
        ],
      }
    },
  },
  {
    id: 'clamp',
    track: 'javascript',
    level: 'basics',
    concept: 'Conditionals',
    make(r) {
      const lo = int(r, 2, 6)
      const hi = lo + int(r, 4, 12)
      const ref = (n) => (n < lo ? lo : n > hi ? hi : n)
      const inputs = [lo - int(r, 1, 5), hi + int(r, 1, 6), int(r, lo, hi), lo, hi]
      return {
        prompt: `Keep a number inside the range ${lo}–${hi}. Anything lower comes back as ${lo}, anything higher comes back as ${hi}, everything else comes back untouched.`,
        fnName: 'clamp',
        starter: `function clamp(n) {\n  \n}`,
        tests: inputs.map((n) => ({ args: [n], expected: ref(n) })),
        hints: [
          'Two questions in a row: is it too small, and is it too big?',
          `The edges themselves (${lo} and ${hi}) are allowed through unchanged.`,
          `Shape: Math.min(${hi}, Math.max(${lo}, n)) — or a plain if / else if / else.`,
        ],
      }
    },
  },
  {
    id: 'rank',
    track: 'javascript',
    level: 'basics',
    concept: 'if / else if / else',
    make(r) {
      const silver = int(r, 60, 75)
      const gold = silver + int(r, 8, 15)
      const ref = (n) => (n >= gold ? 'gold' : n >= silver ? 'silver' : 'rust')
      const inputs = [gold + int(r, 1, 9), gold, gold - 1, silver, silver - 1, 0]
      return {
        prompt: `A score of ${gold} or more earns "gold", ${silver} or more earns "silver", anything less earns "rust". Return the right word.`,
        fnName: 'rank',
        starter: `function rank(score) {\n  \n}`,
        tests: inputs.map((n) => ({ args: [n], expected: ref(n) })),
        hints: [
          'Test the highest band first — otherwise a gold score matches the silver rule on the way past.',
          `"or more" means \`>=\`, so exactly ${gold} is still gold.`,
          `Shape: if (score >= ${gold}) return 'gold'; if (score >= ${silver}) return 'silver'; return 'rust'`,
        ],
      }
    },
  },
  {
    id: 'reverse-words',
    track: 'javascript',
    level: 'basics',
    concept: 'Strings & arrays',
    make(r) {
      const ref = (s) => s.split(' ').reverse().join(' ')
      const lines = [
        `${pick(r, WORDS)} ${pick(r, NAMES)} ${pick(r, WORDS)}`,
        `${pick(r, NAMES)} ${pick(r, NAMES)}`,
        pick(r, WORDS),
      ]
      return {
        prompt:
          'Reverse the ORDER of the words in a sentence, leaving each word spelled exactly as it was. Words are separated by single spaces.',
        fnName: 'reverseWords',
        starter: `function reverseWords(sentence) {\n  \n}`,
        tests: lines.map((s) => ({ args: [s], expected: ref(s) })),
        hints: [
          'Turn the sentence into a list of words, work on the list, then glue it back together.',
          '`split(" ")`, then `reverse()`, then `join(" ")`.',
          'Shape: sentence.split(" ").reverse().join(" ")',
        ],
      }
    },
  },
  {
    id: 'step-list',
    track: 'javascript',
    level: 'basics',
    concept: 'Counting loops',
    make(r) {
      const step = pick(r, [2, 3, 4, 5])
      const ref = (n) => {
        const out = []
        for (let i = n; i >= 1; i -= step) out.push(i)
        return out
      }
      const inputs = [int(r, 8, 20), int(r, 21, 40), 1]
      return {
        prompt: `Count DOWN from \`n\` to 1, taking ${step} off each step. Return the numbers you land on, starting with \`n\` itself. Never go below 1.`,
        fnName: 'countDown',
        starter: `function countDown(n) {\n  \n}`,
        tests: inputs.map((n) => ({ args: [n], expected: ref(n) })),
        hints: [
          'A `for` loop can count downwards: start at `n` and subtract each time.',
          `The loop keeps going while \`i >= 1\`, and each step is \`i -= ${step}\`.`,
          `Shape: const out = []; for (let i = n; i >= 1; i -= ${step}) out.push(i); return out`,
        ],
      }
    },
  },
  {
    id: 'initials',
    track: 'javascript',
    level: 'basics',
    concept: 'map & join',
    make(r) {
      const ref = (s) =>
        s
          .split(' ')
          .filter(Boolean)
          .map((w) => w[0].toUpperCase())
          .join('')
      const lines = [
        `${pick(r, WORDS)} ${pick(r, NAMES)} ${pick(r, WORDS)}`,
        `${pick(r, NAMES)} ${pick(r, WORDS)}`,
        pick(r, NAMES),
        '',
      ]
      return {
        prompt:
          'Take the first letter of every word, uppercase it, and join the letters together. An empty string gives an empty string back.',
        fnName: 'initials',
        starter: `function initials(sentence) {\n  \n}`,
        tests: lines.map((s) => ({ args: [s], expected: ref(s) })),
        hints: [
          'The first letter of a word is just `word[0]`.',
          'Splitting an empty string still gives you one empty word — drop the empties before mapping.',
          'Shape: sentence.split(" ").filter(Boolean).map((w) => w[0].toUpperCase()).join("")',
        ],
      }
    },
  },

  // ========================================================================
  // JavaScript · intermediate
  // ========================================================================
  {
    id: 'pluck',
    track: 'javascript',
    level: 'intermediate',
    concept: 'map & objects',
    make(r) {
      const field = pick(r, ['name', 'shelf', 'weight'])
      const build = (n) =>
        Array.from({ length: n }, () => ({
          name: pick(r, NAMES),
          shelf: int(r, 1, 9),
          weight: int(r, 1, 20),
        }))
      const ref = (xs) => xs.map((x) => x[field])
      const lists = [build(int(r, 2, 4)), build(int(r, 3, 5)), []]
      return {
        prompt: `Each relic is \`{ name, shelf, weight }\`. Return a list of just the \`${field}\` values, in order.`,
        fnName: 'pluck',
        starter: `function pluck(relics) {\n  \n}`,
        tests: lists.map((xs) => ({ args: [xs], expected: ref(xs) })),
        hints: [
          '`map` turns each item into something else, keeping the length.',
          `You want \`relic.${field}\` out of each one.`,
          `Shape: relics.map((r) => r.${field})`,
        ],
      }
    },
  },
  {
    id: 'chunk',
    track: 'javascript',
    level: 'intermediate',
    concept: 'Array building',
    make(r) {
      const size = int(r, 2, 4)
      const ref = (xs) => {
        const out = []
        for (let i = 0; i < xs.length; i += size) out.push(xs.slice(i, i + size))
        return out
      }
      const lists = [
        Array.from({ length: int(r, 5, 9) }, (_, i) => i + 1),
        Array.from({ length: size }, (_, i) => i + 1),
        [],
      ]
      return {
        prompt: `Split a list into groups of ${size}. The final group may be smaller if the numbers do not divide evenly.`,
        fnName: 'chunk',
        starter: `function chunk(items) {\n  \n}`,
        tests: lists.map((xs) => ({ args: [xs], expected: ref(xs) })),
        hints: [
          `Step the loop forward by ${size} each time, rather than by 1.`,
          '`slice(i, i + n)` copies a window and stops safely at the end.',
          `Shape: for (let i = 0; i < items.length; i += ${size}) out.push(items.slice(i, i + ${size}))`,
        ],
      }
    },
  },
  {
    id: 'tally',
    track: 'javascript',
    level: 'intermediate',
    concept: 'Grouping & counting',
    make(r) {
      const ref = (xs) => {
        const out = {}
        for (const x of xs) out[x] = (out[x] || 0) + 1
        return out
      }
      const lists = [sample(r, NAMES.slice(0, 4), int(r, 4, 7)), sample(r, NAMES.slice(0, 2), 3), []]
      return {
        prompt: 'Count how many times each item appears. Return an object of item → count.',
        fnName: 'tally',
        starter: `function tally(items) {\n  \n}`,
        tests: lists.map((xs) => ({ args: [xs], expected: ref(xs) })),
        hints: [
          'Start from an empty object and fill it as you walk the list.',
          'The first time you see an item there is no count yet — treat that as 0.',
          'Shape: out[x] = (out[x] || 0) + 1',
        ],
      }
    },
  },
  {
    id: 'sum-field',
    track: 'javascript',
    level: 'intermediate',
    concept: 'filter + reduce',
    make(r) {
      const limit = int(r, 3, 8)
      const build = (n) =>
        Array.from({ length: n }, () => ({ name: pick(r, NAMES), weight: int(r, 1, 12) }))
      const ref = (xs) => xs.filter((x) => x.weight > limit).reduce((s, x) => s + x.weight, 0)
      const lists = [build(int(r, 3, 5)), build(int(r, 2, 4)), []]
      return {
        prompt: `Add up the \`weight\` of every relic heavier than ${limit}. An empty list totals 0.`,
        fnName: 'heavyTotal',
        starter: `function heavyTotal(relics) {\n  \n}`,
        tests: lists.map((xs) => ({ args: [xs], expected: ref(xs) })),
        hints: [
          'Two steps: drop the light ones, then collapse the rest into a single number.',
          '`reduce` needs a starting value of 0, or an empty list throws.',
          `Shape: relics.filter((r) => r.weight > ${limit}).reduce((s, r) => s + r.weight, 0)`,
        ],
      }
    },
  },
  {
    id: 'unique-sorted',
    track: 'javascript',
    level: 'intermediate',
    concept: 'Sets & sorting',
    make(r) {
      const dir = pick(r, ['ascending', 'descending'])
      const ref = (xs) => [...new Set(xs)].sort((a, b) => (dir === 'ascending' ? a - b : b - a))
      const lists = [
        sample(r, [3, 9, 4, 9, 1, 4, 12, 7], int(r, 5, 8)),
        sample(r, [2, 2, 8, 5], 4),
        [int(r, 1, 30)],
      ]
      return {
        prompt: `Remove the duplicates and return what is left in ${dir} order.`,
        fnName: 'tidy',
        starter: `function tidy(numbers) {\n  \n}`,
        tests: lists.map((xs) => ({ args: [xs], expected: ref(xs) })),
        hints: [
          'A `Set` keeps only the first of each value; spreading it gives you an array again.',
          'The default `sort()` compares numbers as text — 10 lands before 9. Pass a comparator.',
          `Shape: [...new Set(numbers)].sort((a, b) => ${dir === 'ascending' ? 'a - b' : 'b - a'})`,
        ],
      }
    },
  },
  {
    id: 'group-by',
    track: 'javascript',
    level: 'intermediate',
    concept: 'Grouping into buckets',
    make(r) {
      const build = (n) =>
        Array.from({ length: n }, () => ({ name: pick(r, NAMES), shelf: int(r, 1, 3) }))
      const ref = (xs) => {
        const out = {}
        for (const x of xs) (out[x.shelf] ??= []).push(x.name)
        return out
      }
      const lists = [build(int(r, 4, 7)), build(int(r, 2, 4)), []]
      return {
        prompt:
          'Each relic is `{ name, shelf }`. Return an object mapping each shelf to the list of names on it, in the order they appear.',
        fnName: 'byShelf',
        starter: `function byShelf(relics) {\n  \n}`,
        tests: lists.map((xs) => ({ args: [xs], expected: ref(xs) })),
        hints: [
          'The first relic on a shelf has to create that shelf’s array before pushing to it.',
          '`out[key] = out[key] || []` (or `??=`) makes the bucket only when it is missing.',
          'Shape: for (const x of relics) { (out[x.shelf] ??= []).push(x.name) }',
        ],
      }
    },
  },
  {
    id: 'zip',
    track: 'javascript',
    level: 'intermediate',
    concept: 'Walking two lists',
    make(r) {
      const ref = (a, b) => {
        const out = []
        for (let i = 0; i < Math.min(a.length, b.length); i++) out.push([a[i], b[i]])
        return out
      }
      const pairs = [
        [sample(r, NAMES, 3), [int(r, 1, 9), int(r, 1, 9), int(r, 1, 9)]],
        [sample(r, NAMES, 4), [int(r, 1, 9), int(r, 1, 9)]],
        [[], [int(r, 1, 9)]],
      ]
      return {
        prompt:
          'Pair up two lists position by position and return an array of `[a, b]` pairs. Stop as soon as the shorter list runs out.',
        fnName: 'zip',
        starter: `function zip(a, b) {\n  \n}`,
        tests: pairs.map(([a, b]) => ({ args: [a, b], expected: ref(a, b) })),
        hints: [
          'The number of pairs is decided by the SHORTER list.',
          '`Math.min(a.length, b.length)` gives you how far to loop.',
          'Shape: for (let i = 0; i < Math.min(a.length, b.length); i++) out.push([a[i], b[i]])',
        ],
      }
    },
  },
  {
    id: 'flatten-one',
    track: 'javascript',
    level: 'intermediate',
    concept: 'Nested arrays',
    make(r) {
      const ref = (xs) => xs.reduce((o, x) => o.concat(x), [])
      const lists = [
        [[int(r, 1, 9), int(r, 1, 9)], [int(r, 1, 9)], []],
        [[int(r, 1, 9)], [[int(r, 1, 9), int(r, 1, 9)]]],
        [],
      ]
      return {
        prompt:
          'Flatten a list of lists by exactly ONE level: `[[1, 2], [3]]` becomes `[1, 2, 3]`. Anything nested deeper than that stays nested.',
        fnName: 'flattenOne',
        starter: `function flattenOne(lists) {\n  \n}`,
        tests: lists.map((xs) => ({ args: [xs], expected: ref(xs) })),
        hints: [
          '`concat` unpacks an array argument by one level — that is the whole trick.',
          'Start from `[]` and concat each inner list onto the result.',
          'Shape: lists.reduce((out, x) => out.concat(x), []) — or `lists.flat()`.',
        ],
      }
    },
  },
  {
    id: 'best-field',
    track: 'javascript',
    level: 'intermediate',
    concept: 'reduce to one item',
    make(r) {
      const field = pick(r, ['weight', 'shelf'])
      const build = (n) => {
        const pool = [2, 5, 9, 13, 18, 24, 31, 40]
        const used = []
        return Array.from({ length: n }, () => {
          let v = pick(r, pool)
          while (used.includes(v)) v = pick(r, pool)
          used.push(v)
          return { name: pick(r, NAMES), [field]: v }
        })
      }
      const ref = (xs) => xs.reduce((best, x) => (best === null || x[field] > best[field] ? x : best), null)
      const lists = [build(int(r, 3, 5)), build(2), []]
      return {
        prompt: `Each relic is \`{ name, ${field} }\`. Return the relic with the largest \`${field}\`, or \`null\` when the list is empty.`,
        fnName: 'heaviest',
        starter: `function heaviest(relics) {\n  \n}`,
        tests: lists.map((xs) => ({ args: [xs], expected: ref(xs) })),
        hints: [
          'Carry the best-so-far as you walk the list.',
          'Starting the best-so-far at `null` is what makes the empty list answer itself.',
          `Shape: relics.reduce((best, x) => (best === null || x.${field} > best.${field} ? x : best), null)`,
        ],
      }
    },
  },

  // ========================================================================
  // JavaScript · advanced
  // ========================================================================
  {
    id: 'immutable-set',
    track: 'javascript',
    level: 'advanced',
    concept: 'Immutable updates',
    make(r) {
      const field = pick(r, ['shelf', 'weight'])
      const value = int(r, 20, 40)
      return {
        prompt: `Return a NEW relic list where the relic at \`index\` has its \`${field}\` set to ${value}. Nothing you were given may be mutated.`,
        fnName: 'setField',
        starter: `function setField(relics, index) {\n  \n}`,
        custom: `const original = [{ name: 'lamp', ${field}: 1 }, { name: 'key', ${field}: 2 }]
const next = setField(original, 0)
check(next[0].${field}, ${value}, 'the target relic is updated')
check(original[0].${field}, 1, 'the ORIGINAL relic is untouched')
check(next[1].${field}, 2, 'other relics are carried over')
check(next[0].name, 'lamp', 'other fields are carried over')
check(next !== original, true, 'a new array is returned')
check(next[1] === original[1], true, 'untouched relics may be reused by reference')`,
        hints: [
          '`map` gives you a new array for free — use the index to pick the one to replace.',
          'Spread the relic you are changing so the original object is left alone.',
          `Shape: relics.map((r, i) => i === index ? { ...r, ${field}: ${value} } : r)`,
        ],
      }
    },
  },
  {
    id: 'reducer',
    track: 'javascript',
    level: 'advanced',
    concept: 'Reducers',
    make(r) {
      const step = int(r, 2, 5)
      const capped = int(r, 10, 20)
      return {
        prompt: `Write a reducer over \`{ value }\`. \`"add"\` increases value by ${step} but never above ${capped}; \`"clear"\` returns it to 0; anything else returns the state unchanged.`,
        fnName: 'reducer',
        starter: `function reducer(state, action) {\n  \n}`,
        tests: [
          { args: [{ value: 0 }, { type: 'add' }], expected: { value: step } },
          { args: [{ value: capped }, { type: 'add' }], expected: { value: capped } },
          { args: [{ value: capped - 1 }, { type: 'add' }], expected: { value: capped } },
          { args: [{ value: 7 }, { type: 'clear' }], expected: { value: 0 } },
          { args: [{ value: 3 }, { type: 'wobble' }], expected: { value: 3 } },
        ],
        hints: [
          'A `switch` on `action.type` with a `default` returning state is the standard shape.',
          `\`Math.min\` is the tidiest way to stop at ${capped}.`,
          `Shape: case 'add': return { ...state, value: Math.min(${capped}, state.value + ${step}) }`,
        ],
      }
    },
  },
  {
    id: 'memoize',
    track: 'javascript',
    level: 'advanced',
    concept: 'Closures & caching',
    make() {
      return {
        prompt:
          'Write `memoize(fn)`: it returns a wrapped function that calls `fn` once per distinct argument and returns the cached answer thereafter. Assume a single argument that works as an object key.',
        fnName: 'memoize',
        starter: `function memoize(fn) {\n  \n}`,
        custom: `let calls = 0
const slow = memoize((n) => { calls++; return n * 10 })
check(slow(2), 20, 'computes the first time')
check(calls, 1, 'called the underlying function once')
check(slow(2), 20, 'returns the same answer again')
check(calls, 1, 'and did NOT call it a second time')
check(slow(3), 30, 'a new argument computes')
check(calls, 2, 'so the underlying function ran again')
const other = memoize((n) => n + 1)
check(other(2), 3, 'each memoized function has its own cache')`,
        hints: [
          'The cache must live in the closure, outside the returned function.',
          'A Map (or a plain object) keyed by the argument is enough.',
          'Shape: const cache = new Map(); return (n) => { if (!cache.has(n)) cache.set(n, fn(n)); return cache.get(n) }',
        ],
      }
    },
  },
  {
    id: 'deep-get',
    track: 'javascript',
    level: 'advanced',
    concept: 'Optional access & defaults',
    make(r) {
      const relic = pick(r, NAMES)
      return {
        prompt:
          'Write `get(obj, path, fallback)`. The path is a dotted string like `"a.b.c"`. Return the value found there, or `fallback` the moment any step along the way is missing.',
        fnName: 'get',
        starter: `function get(obj, path, fallback) {\n  \n}`,
        custom: `const data = { vault: { shelf: { relic: '${relic}' }, count: 2 }, empty: null }
check(get(data, 'vault.count', 0), 2, 'a shallow path')
check(get(data, 'vault.shelf.relic', 'none'), '${relic}', 'a deep path')
check(get(data, 'vault.missing.relic', 'none'), 'none', 'a missing step gives the fallback')
check(get(data, 'nowhere', 'none'), 'none', 'a missing first step gives the fallback')
check(get(data, 'empty.deep', 'none'), 'none', 'walking into null does not throw')
check(get({ a: { b: 0 } }, 'a.b', 99), 0, 'a real 0 is a value, not a missing key')
check(get({ a: { b: false } }, 'a.b', 99), false, 'a real false is a value too')`,
        hints: [
          'Split the path on "." and walk one step at a time, carrying the current object.',
          'Stop as soon as the current value is null or undefined — do not read a key off it.',
          'Careful: `||` would replace a real 0 or false. Test for `undefined` instead.',
        ],
      }
    },
  },
  {
    id: 'compose',
    track: 'javascript',
    level: 'advanced',
    concept: 'Higher-order functions',
    make(r) {
      const add = int(r, 2, 9)
      const mul = int(r, 2, 5)
      return {
        prompt:
          'Write `compose(...fns)`: it returns a function that feeds its argument through the list from RIGHT to LEFT, like `f(g(h(x)))`. With no functions at all it hands the argument straight back.',
        fnName: 'compose',
        starter: `function compose(...fns) {\n  \n}`,
        custom: `const inc = (n) => n + ${add}
const times = (n) => n * ${mul}
check(compose(times, inc)(1), (1 + ${add}) * ${mul}, 'the rightmost runs first')
check(compose(inc, times)(1), 1 * ${mul} + ${add}, 'order matters the other way round')
check(compose(inc)(0), ${add}, 'one function still works')
check(compose()(7), 7, 'no functions returns the argument unchanged')
check(typeof compose(inc), 'function', 'compose returns a function')`,
        hints: [
          'Return a function — the composing happens when THAT function is called.',
          '`reduceRight` walks the list from the end, which is exactly the order you need.',
          'Shape: return (x) => fns.reduceRight((v, f) => f(v), x)',
        ],
      }
    },
  },
  {
    id: 'make-counter',
    track: 'javascript',
    level: 'advanced',
    concept: 'Closures hold state',
    make(r) {
      const step = int(r, 2, 6)
      return {
        prompt: `Write \`makeCounter(start)\`: it returns a function that gives back \`start\` the first time it is called and ${step} more on every call after. Two counters must never share a number.`,
        fnName: 'makeCounter',
        starter: `function makeCounter(start) {\n  \n}`,
        custom: `const a = makeCounter(1)
check(a(), 1, 'the first call gives the start value')
check(a(), 1 + ${step}, 'the second call has moved on')
check(a(), 1 + ${step} * 2, 'and keeps moving')
const b = makeCounter(100)
check(b(), 100, 'a second counter starts where it was told')
check(a(), 1 + ${step} * 3, 'and did not disturb the first one')`,
        hints: [
          'The number has to live in `makeCounter`, not inside the function you return.',
          'Return the current value first, THEN move it on — the first call must not have stepped yet.',
          `Shape: let n = start; return () => { const out = n; n += ${step}; return out }`,
        ],
      }
    },
  },
  {
    id: 'once',
    track: 'javascript',
    level: 'advanced',
    concept: 'Wrapping functions',
    make() {
      return {
        prompt:
          'Write `once(fn)`: the wrapped function calls `fn` the first time only and returns that same answer forever after. Later arguments are ignored. Arguments to the first call are passed through.',
        fnName: 'once',
        starter: `function once(fn) {\n  \n}`,
        custom: `let calls = 0
const open = once((n) => { calls++; return 'opened ' + n })
check(open(1), 'opened 1', 'the first call runs the function')
check(calls, 1, 'exactly once')
check(open(2), 'opened 1', 'the second call returns the first answer')
check(calls, 1, 'without calling the function again')
const other = once(() => { calls++; return 'other' })
check(other(), 'other', 'each wrapper is independent')
check(calls, 2, 'so a fresh one does call through')
const nullish = once(() => null)
check(nullish(), null, 'a null result still counts as done')`,
        hints: [
          'You need two things in the closure: whether it has run, and what it returned.',
          'Do not test the saved result for truthiness — `null` and `0` are real answers.',
          'Shape: let done = false, value; return (...a) => { if (!done) { done = true; value = fn(...a) } return value }',
        ],
      }
    },
  },
  {
    id: 'flatten-deep',
    track: 'javascript',
    level: 'advanced',
    concept: 'Recursion',
    make(r) {
      const ref = (xs) =>
        xs.reduce((o, x) => (Array.isArray(x) ? o.concat(ref(x)) : o.concat(x)), [])
      const lists = [
        [int(r, 1, 9), [int(r, 1, 9), [int(r, 1, 9), [int(r, 1, 9)]]]],
        [[[int(r, 1, 9)]], int(r, 1, 9)],
        [[], [[]], int(r, 1, 9)],
      ]
      return {
        prompt:
          'Flatten a list to ANY depth: `[1, [2, [3, [4]]]]` becomes `[1, 2, 3, 4]`. Order is preserved.',
        fnName: 'flattenDeep',
        starter: `function flattenDeep(items) {\n  \n}`,
        tests: lists.map((xs) => ({ args: [xs], expected: ref(xs) })),
        hints: [
          'Ask one question per item: is it an array, or is it a value?',
          'If it is an array, the answer for it is the same function called again.',
          'Shape: items.reduce((out, x) => out.concat(Array.isArray(x) ? flattenDeep(x) : x), [])',
        ],
      }
    },
  },

  // ========================================================================
  // JavaScript · expert
  // ========================================================================
  {
    id: 'iterable',
    track: 'javascript',
    level: 'expert',
    concept: 'Symbol.iterator',
    make() {
      return {
        prompt:
          'Write `countTo(n)`: it returns an OBJECT — not an array — that `for…of` and `[...spread]` can walk, yielding 1 up to n. It must be walkable more than once.',
        fnName: 'countTo',
        starter: `function countTo(n) {\n  \n}`,
        custom: `const four = countTo(4)
check([...four], [1, 2, 3, 4], 'it spreads into its numbers')
check(Array.isArray(four), false, 'and it is not simply an array')
check([...four], [1, 2, 3, 4], 'walking it a second time starts over')
const seen = []
for (const n of countTo(2)) seen.push(n)
check(seen, [1, 2], 'for…of works on it')
check([...countTo(0)], [], 'zero yields nothing at all')`,
        hints: [
          'A thing is iterable when it has a method under the key `Symbol.iterator`.',
          'The easiest body for that method is a generator function — `*[Symbol.iterator]() { … }`.',
          'Returning a fresh generator each time is what lets it be walked twice.',
        ],
      }
    },
  },
  {
    id: 'take',
    track: 'javascript',
    level: 'expert',
    concept: 'Lazy sequences',
    make(r) {
      const n = int(r, 2, 4)
      return {
        prompt: `Write \`take(iterable, n)\`: return the first n values of ANY iterable as an array — including a generator that never ends. Taking more than there is returns everything.`,
        fnName: 'take',
        starter: `function take(iterable, n) {\n  \n}`,
        custom: `function* forever() { let i = 0; while (true) yield i++ }
check(take(forever(), ${n}), Array.from({ length: ${n} }, (_, i) => i), 'an endless generator is stopped in time')
check(take([9, 8, 7, 6], 2), [9, 8], 'an array works')
check(take('abc', 2), ['a', 'b'], 'a string is iterable too')
check(take([1], 5), [1], 'asking for more than exists gives what there is')
check(take([1, 2], 0), [], 'zero takes nothing')`,
        hints: [
          'You cannot use `.length` or index into an iterable — you can only walk it with `for…of`.',
          'The whole trick is leaving the loop with `break` the moment you have enough.',
          'Shape: const out = []; for (const v of iterable) { if (out.length >= n) break; out.push(v) } return out',
        ],
      }
    },
  },
  {
    id: 'proxy-default',
    track: 'javascript',
    level: 'expert',
    concept: 'Proxies',
    make(r) {
      const fallback = int(r, 0, 5)
      return {
        prompt: `Write \`withDefault(obj, fallback)\`: reading a key that is not there gives \`fallback\` instead of \`undefined\`. Keys that do exist read normally, writing still works, and \`in\` still tells the truth.`,
        fnName: 'withDefault',
        starter: `function withDefault(obj, fallback) {\n  \n}`,
        custom: `const bag = withDefault({ rope: 2 }, ${fallback})
check(bag.rope, 2, 'an existing key reads normally')
check(bag.lamp, ${fallback}, 'a missing key falls back')
bag.lamp = 7
check(bag.lamp, 7, 'writing a key works')
check('rope' in bag, true, 'in still finds a real key')
check('nothing' in bag, false, 'and still says no to a missing one')
const other = withDefault({}, 'none')
check(other.anything, 'none', 'the fallback can be anything')`,
        hints: [
          'A `Proxy` wraps a target object and lets you intervene on chosen operations.',
          'You only need one trap here: `get`.',
          'Shape: new Proxy(obj, { get: (t, k) => (k in t ? t[k] : fallback) })',
        ],
      }
    },
  },
  {
    id: 'deep-clone',
    track: 'javascript',
    level: 'expert',
    concept: 'Deep copying',
    make() {
      return {
        prompt:
          'Write `deepClone(value)` for plain objects, arrays and primitives. Every nested piece must be a copy — changing the clone must never be visible in the original.',
        fnName: 'deepClone',
        starter: `function deepClone(value) {\n  \n}`,
        custom: `const original = { name: 'vault', tags: ['a', 'b'], inner: { count: 1 } }
const copy = deepClone(original)
check(copy, original, 'the copy looks the same')
check(copy !== original, true, 'but is not the same object')
check(copy.inner !== original.inner, true, 'nested objects are copied too')
check(copy.tags !== original.tags, true, 'nested arrays are copied too')
copy.inner.count = 99
copy.tags.push('c')
check(original.inner.count, 1, 'changing the copy does not touch the original')
check(original.tags.length, 2, 'not even deep inside an array')
check(deepClone(5), 5, 'a primitive is its own copy')
check(deepClone(null), null, 'null is not an object to walk into')
check(Array.isArray(deepClone([1, [2]])), true, 'an array clones as an array')`,
        hints: [
          'Three cases: not an object (return it), an array, an object.',
          '`null` has typeof "object" — check for it before you try to walk it.',
          'Shape: Array.isArray(v) ? v.map(deepClone) : Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deepClone(x)]))',
        ],
      }
    },
  },
  {
    id: 'emitter',
    track: 'javascript',
    level: 'expert',
    concept: 'The observer pattern',
    make(r) {
      const event = pick(r, ['open', 'unlock', 'creak'])
      return {
        prompt: `Write \`createEmitter()\` returning \`{ on, emit }\`. \`on(name, fn)\` registers a listener AND returns a function that removes it. \`emit(name, payload)\` calls every listener for that name, in the order they were added.`,
        fnName: 'createEmitter',
        starter: `function createEmitter() {\n  \n}`,
        custom: `const bus = createEmitter()
const heard = []
const off = bus.on('${event}', (p) => heard.push('a:' + p))
bus.on('${event}', (p) => heard.push('b:' + p))
bus.on('other', () => heard.push('wrong'))
bus.emit('${event}', 1)
check(heard, ['a:1', 'b:1'], 'both listeners fired, in order, and nothing else did')
off()
bus.emit('${event}', 2)
check(heard, ['a:1', 'b:1', 'b:2'], 'the unsubscribed listener stopped hearing')
check(typeof bus.on('${event}', () => {}), 'function', 'on returns an unsubscribe function')
const fresh = createEmitter()
fresh.emit('${event}', 3)
check(heard.length, 3, 'a separate emitter has its own listeners')`,
        hints: [
          'A Map from event name to an array of listeners is all the storage you need.',
          'The unsubscribe function closes over the exact listener it must remove.',
          'Emitting a name nobody listens to must not throw — default to an empty array.',
        ],
      }
    },
  },
  {
    id: 'lru',
    track: 'javascript',
    level: 'expert',
    concept: 'Cache eviction',
    make(r) {
      const limit = int(r, 2, 4)
      return {
        prompt: `Write \`createCache(limit)\` returning \`{ get, set, size }\`. It holds at most \`limit\` entries; when a new one does not fit, the LEAST RECENTLY USED entry is dropped. A \`get\` counts as using an entry. A missing key reads as \`undefined\`.`,
        fnName: 'createCache',
        starter: `function createCache(limit) {\n  \n}`,
        custom: `const cache = createCache(${limit})
for (let i = 0; i < ${limit}; i++) cache.set('k' + i, i)
check(cache.size(), ${limit}, 'it fills up to the limit')
check(cache.get('k0'), 0, 'reading an entry works — and counts as using it')
cache.set('extra', 99)
check(cache.size(), ${limit}, 'it never grows past the limit')
check(cache.get('k0'), 0, 'the recently used entry survived')
check(cache.get('k1'), undefined, 'the least recently used one was evicted')
check(cache.get('extra'), 99, 'the new entry is in')
cache.set('k0', 5)
check(cache.get('k0'), 5, 'setting an existing key overwrites rather than duplicating')
check(cache.size(), ${limit}, 'and does not grow the cache')`,
        hints: [
          'A `Map` remembers insertion order, and `map.keys().next().value` is the oldest key.',
          'To mark an entry as just-used, delete it and set it again — that moves it to the end.',
          'Evict only after inserting, and only while the size is over the limit.',
        ],
      }
    },
  },

  // ========================================================================
  // React · basics
  // ========================================================================
  {
    id: 'props-default',
    track: 'react',
    level: 'basics',
    concept: 'Props & defaults',
    make(r) {
      const fallback = pick(r, ['friend', 'stranger', 'traveller'])
      const ref = (p) => `Hello, ${p.name || fallback}${p.excited ? '!' : '.'}`
      const cases = [
        { name: pick(r, NAMES), excited: true },
        { name: pick(r, NAMES), excited: false },
        { name: '', excited: false },
        {},
      ]
      return {
        prompt: `A component is handed \`{ name, excited }\`. Return the greeting it should render: "Hello, NAME" — but "Hello, ${fallback}" when \`name\` is missing or an empty string — ending in "!" when \`excited\` is true and "." when it is not.`,
        fnName: 'greeting',
        starter: `function greeting(props) {\n  \n}`,
        tests: cases.map((p) => ({ args: [p], expected: ref(p) })),
        hints: [
          'Read the two values off `props` first — destructuring makes the rest read better.',
          `\`props.name || '${fallback}'\` covers both missing AND empty, because "" is falsy.`,
          `Shape: \`Hello, \${name || '${fallback}'}\${excited ? '!' : '.'}\``,
        ],
      }
    },
  },
  {
    id: 'toggle-field',
    track: 'react',
    level: 'basics',
    concept: 'State updates are copies',
    make(r) {
      const field = pick(r, ['open', 'dark', 'muted'])
      return {
        prompt: `State is \`{ ${field}, count }\`. Return NEW state with \`${field}\` flipped and everything else carried across. The state you were handed must come back untouched — React needs a new object to notice the change.`,
        fnName: 'toggle',
        starter: `function toggle(state) {\n  \n}`,
        custom: `const state = { ${field}: false, count: 3 }
const next = toggle(state)
check(next.${field}, true, 'the flag flipped')
check(next.count, 3, 'the rest of the state came along')
check(state.${field}, false, 'the ORIGINAL state was not mutated')
check(next !== state, true, 'a new object is returned')
check(toggle(next).${field}, false, 'flipping again goes back')`,
        hints: [
          'Spread the old state into a new object, then override the one key.',
          '`state.flag = !state.flag` mutates — React would not re-render.',
          `Shape: { ...state, ${field}: !state.${field} }`,
        ],
      }
    },
  },
  {
    id: 'keys',
    track: 'react',
    level: 'basics',
    concept: 'Lists & keys',
    make(r) {
      const ref = (rows) =>
        rows.map((row, i) => ({
          key: row.id === undefined ? `row-${i}` : String(row.id),
          text: row.label,
        }))
      const build = (n) =>
        Array.from({ length: n }, (_, i) => ({ id: int(r, 1, 99) + i * 100, label: pick(r, NAMES) }))
      const withGap = build(2)
      delete withGap[1].id
      return {
        prompt:
          'Each row is `{ id, label }`. Return `[{ key, text }]` where `key` is the id turned into a string and `text` is the label. A row with no id at all falls back to `"row-" + its index`.',
        fnName: 'toRows',
        starter: `function toRows(rows) {\n  \n}`,
        tests: [build(3), withGap, []].map((rows) => ({ args: [rows], expected: ref(rows) })),
        hints: [
          '`map` gives you the index as its second argument.',
          'Check for `undefined` specifically — an id of 0 is a perfectly good key.',
          'Shape: rows.map((row, i) => ({ key: row.id === undefined ? `row-${i}` : String(row.id), text: row.label }))',
        ],
      }
    },
  },
  {
    id: 'class-names',
    track: 'react',
    level: 'basics',
    concept: 'Conditional rendering',
    make(r) {
      const base = pick(r, ['door', 'panel', 'card'])
      const ref = (s) => base + (s.active ? ' open' : '') + (s.disabled ? ' locked' : '')
      const cases = [
        { active: true, disabled: false },
        { active: false, disabled: true },
        { active: true, disabled: true },
        { active: false, disabled: false },
      ]
      return {
        prompt: `Build the \`className\` string for a component. It always starts with "${base}"; add " open" when \`active\` is true; add " locked" when \`disabled\` is true. No trailing spaces, ever.`,
        fnName: 'classNames',
        starter: `function classNames(state) {\n  \n}`,
        tests: cases.map((s) => ({ args: [s], expected: ref(s) })),
        hints: [
          'Collect the parts you want first, then join them — that is what kills the stray spaces.',
          '`[a, b].filter(Boolean).join(" ")` drops the pieces you did not add.',
          `Shape: ['${base}', active && 'open', disabled && 'locked'].filter(Boolean).join(' ')`,
        ],
      }
    },
  },
  {
    id: 'derived-state',
    track: 'react',
    level: 'basics',
    concept: 'Derived state',
    make(r) {
      const ref = (todos) => {
        const done = todos.filter((t) => t.done).length
        return { total: todos.length, done, left: todos.length - done }
      }
      const build = (n, k) =>
        Array.from({ length: n }, (_, i) => ({ text: pick(r, NAMES), done: i < k }))
      const lists = [build(int(r, 4, 6), 2), build(3, 3), build(2, 0), []]
      return {
        prompt:
          'Never store what you can compute. Given a list of `{ text, done }` todos, return `{ total, done, left }` — counted fresh, every render.',
        fnName: 'summarise',
        starter: `function summarise(todos) {\n  \n}`,
        tests: lists.map((xs) => ({ args: [xs], expected: ref(xs) })),
        hints: [
          'All three numbers come out of the one list — none of them needs its own state.',
          '`filter(...).length` counts without building anything you keep.',
          'Shape: const done = todos.filter((t) => t.done).length; return { total: todos.length, done, left: todos.length - done }',
        ],
      }
    },
  },

  // ========================================================================
  // React · intermediate
  // ========================================================================
  {
    id: 'form-field',
    track: 'react',
    level: 'intermediate',
    concept: 'Controlled forms',
    make() {
      return {
        prompt:
          'A controlled form holds `{ name, email }`. Write `onChange(state, field, value)` returning new state with just that one field replaced. A field the form does not have is ignored — return the SAME state object, so React skips the re-render.',
        fnName: 'onChange',
        starter: `function onChange(state, field, value) {\n  \n}`,
        custom: `const state = { name: 'ada', email: 'a@b.c' }
const next = onChange(state, 'name', 'grace')
check(next.name, 'grace', 'the named field changed')
check(next.email, 'a@b.c', 'the other field came along')
check(state.name, 'ada', 'the original state was not mutated')
check(next !== state, true, 'a change returns a new object')
check(onChange(state, 'nickname', 'x') === state, true, 'an unknown field returns the very same object')
check(onChange(state, 'email', '') .email, '', 'clearing a field to empty still counts as a change')`,
        hints: [
          'A computed key — `{ [field]: value }` — is how one handler serves every input.',
          '`field in state` tells you whether the form actually has that field.',
          'Returning `state` itself (not a copy of it) is what makes React bail out of the update.',
        ],
      }
    },
  },
  {
    id: 'list-toggle',
    track: 'react',
    level: 'intermediate',
    concept: 'Immutable list updates',
    make(r) {
      const id = int(r, 1, 9)
      return {
        prompt:
          'Return a NEW todo list with the todo whose `id` matches flipped between done and not done. Nothing you were handed may be mutated, and the todos you did not touch may be reused as they are.',
        fnName: 'toggleTodo',
        starter: `function toggleTodo(todos, id) {\n  \n}`,
        custom: `const todos = [{ id: ${id}, text: 'rope', done: false }, { id: ${id + 1}, text: 'lamp', done: true }]
const next = toggleTodo(todos, ${id})
check(next[0].done, true, 'the matching todo flipped')
check(next[1].done, true, 'the other one is unchanged')
check(todos[0].done, false, 'the ORIGINAL todo was not mutated')
check(next !== todos, true, 'a new array is returned')
check(next[1] === todos[1], true, 'untouched todos are reused by reference')
check(next[0].text, 'rope', 'the rest of the todo survived the copy')
check(toggleTodo(todos, 999).length, 2, 'an id nobody has changes nothing')`,
        hints: [
          '`map` builds the new array; the callback decides copy-or-reuse per item.',
          'Only the matching todo needs spreading — returning `t` unchanged for the rest is correct AND faster.',
          'Shape: todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))',
        ],
      }
    },
  },
  {
    id: 'list-remove',
    track: 'react',
    level: 'intermediate',
    concept: 'Removing without mutating',
    make() {
      return {
        prompt:
          'Return a NEW list with the item at `index` removed. An index that is out of range removes nothing. `splice` mutates, so it is not the answer here.',
        fnName: 'removeAt',
        starter: `function removeAt(items, index) {\n  \n}`,
        custom: `const items = ['rope', 'lamp', 'key']
check(removeAt(items, 1), ['rope', 'key'], 'the middle item is gone')
check(removeAt(items, 0), ['lamp', 'key'], 'the first item is gone')
check(removeAt(items, 2), ['rope', 'lamp'], 'the last item is gone')
check(items, ['rope', 'lamp', 'key'], 'the ORIGINAL list is untouched')
check(removeAt(items, 9), ['rope', 'lamp', 'key'], 'an index past the end removes nothing')
check(removeAt(items, 1) !== items, true, 'a new array comes back')`,
        hints: [
          '`filter` can see the index as its second argument.',
          'Keep every item whose index is not the one you were given.',
          'Shape: items.filter((_, i) => i !== index)',
        ],
      }
    },
  },
  {
    id: 'filter-view',
    track: 'react',
    level: 'intermediate',
    concept: 'Deriving the view',
    make(r) {
      const build = (n, k) =>
        Array.from({ length: n }, (_, i) => ({ text: pick(r, NAMES), done: i < k }))
      const ref = (todos, filter) =>
        filter === 'done'
          ? todos.filter((t) => t.done)
          : filter === 'active'
            ? todos.filter((t) => !t.done)
            : todos
      const list = build(int(r, 4, 6), 2)
      return {
        prompt:
          'One list of todos, three tabs. Given the todos and a filter of `"all"`, `"active"` or `"done"`, return the todos that should be on screen. `"all"` hands back the list it was given, as it is.',
        fnName: 'visible',
        starter: `function visible(todos, filter) {\n  \n}`,
        tests: [
          { args: [list, 'all'], expected: ref(list, 'all') },
          { args: [list, 'done'], expected: ref(list, 'done') },
          { args: [list, 'active'], expected: ref(list, 'active') },
          { args: [[], 'done'], expected: [] },
        ],
        hints: [
          'Three answers, one per filter — a `switch` or a small chain of ifs both read fine.',
          '"active" is the todos that are NOT done.',
          'Shape: if (filter === "done") return todos.filter((t) => t.done); if (filter === "active") return todos.filter((t) => !t.done); return todos',
        ],
      }
    },
  },
  {
    id: 'batched-updates',
    track: 'react',
    level: 'intermediate',
    concept: 'Functional updates',
    make(r) {
      const a = int(r, 2, 6)
      const b = int(r, 2, 4)
      return {
        prompt:
          'This is why `setCount(c => c + 1)` twice adds two, while `setCount(count + 1)` twice adds one. Write `applyUpdates(state, updaters)`: run each updater on the result of the one before, starting from `state`, and return the final value.',
        fnName: 'applyUpdates',
        starter: `function applyUpdates(state, updaters) {\n  \n}`,
        custom: `const inc = (n) => n + ${a}
const times = (n) => n * ${b}
check(applyUpdates(0, [inc, inc]), ${a * 2}, 'each updater sees what the last one returned')
check(applyUpdates(1, [inc, times]), (1 + ${a}) * ${b}, 'they run left to right')
check(applyUpdates(1, [times, inc]), 1 * ${b} + ${a}, 'order matters')
check(applyUpdates(7, []), 7, 'no updaters leaves the state alone')
check(applyUpdates(0, [() => 5, inc]), 5 + ${a}, 'an updater may ignore what it was given')`,
        hints: [
          'The state you carry forward is the answer of the previous updater — not the original.',
          '`reduce` is exactly this: a value carried through a list.',
          'Shape: updaters.reduce((value, fn) => fn(value), state)',
        ],
      }
    },
  },

  // ========================================================================
  // React · advanced
  // ========================================================================
  {
    id: 'deps-changed',
    track: 'react',
    level: 'advanced',
    concept: 'The dependency array',
    make() {
      return {
        prompt:
          'Write `depsChanged(prev, next)` — the check React runs before re-running an effect. `true` when there is no previous list (the very first render). Otherwise `true` when the lists are different lengths, or when any entry differs by `Object.is`. Otherwise `false`.',
        fnName: 'depsChanged',
        starter: `function depsChanged(prev, next) {\n  \n}`,
        custom: `check(depsChanged(null, [1, 2]), true, 'the first render always runs the effect')
check(depsChanged([1, 2], [1, 2]), false, 'identical deps skip the effect')
check(depsChanged([1, 2], [1, 3]), true, 'one changed entry is enough')
check(depsChanged([1], [1, 2]), true, 'different lengths count as changed')
check(depsChanged([], []), false, 'an empty dep list never changes')
const obj = {}
check(depsChanged([obj], [obj]), false, 'the SAME object is unchanged')
check(depsChanged([{}], [{}]), true, 'two equal-looking objects are still different — this is the classic bug')
check(depsChanged([NaN], [NaN]), false, 'Object.is says NaN is NaN, unlike ===')
check(depsChanged([0], [-0]), true, 'and that 0 is not -0, also unlike ===')`,
        hints: [
          'Handle the no-previous-list case before you touch a length or an index.',
          '`===` is wrong twice over here: it splits NaN from itself and joins 0 with -0. `Object.is` is the one React uses.',
          'Shape: if (!prev) return true; if (prev.length !== next.length) return true; return next.some((v, i) => !Object.is(v, prev[i]))',
        ],
      }
    },
  },
  {
    id: 'memo-select',
    track: 'react',
    level: 'advanced',
    concept: 'useMemo, by hand',
    make(r) {
      const mul = int(r, 2, 5)
      return {
        prompt:
          'Write `createMemo(compute)`: it returns a function taking a deps array. It calls `compute(deps)` only when the deps changed since last time (`Object.is`, entry by entry) and otherwise hands back the cached value. This is `useMemo` with the React parts taken out.',
        fnName: 'createMemo',
        starter: `function createMemo(compute) {\n  \n}`,
        custom: `let runs = 0
const memo = createMemo((deps) => { runs++; return deps[0] * ${mul} })
check(memo([2]), ${2 * mul}, 'the first call computes')
check(runs, 1, 'exactly once')
check(memo([2]), ${2 * mul}, 'the same deps read the cache')
check(runs, 1, 'without computing again')
check(memo([3]), ${3 * mul}, 'changed deps recompute')
check(runs, 2, 'so compute ran a second time')
check(memo([3]), ${3 * mul}, 'and the new value is cached in turn')
check(runs, 2, 'still two runs')
const other = createMemo(() => { runs++; return 'x' })
check(other([1]), 'x', 'each memo has its own cache')
check(runs, 3, 'a fresh memo always computes the first time')`,
        hints: [
          'Two things live in the closure: the last deps you saw and the last value you returned.',
          'The first call has no previous deps at all — that must count as changed.',
          'Compare entry by entry with `Object.is`; comparing the arrays themselves always says "different".',
        ],
      }
    },
  },
  {
    id: 'external-store',
    track: 'react',
    level: 'advanced',
    concept: 'External stores',
    make(r) {
      const start = int(r, 0, 5)
      return {
        prompt:
          'Write `createStore(initial)` returning `{ getSnapshot, setState, subscribe }`. `setState` takes a value OR an updater function, and notifies every subscriber. `subscribe(fn)` returns a function that unsubscribes. This is the shape `useSyncExternalStore` expects.',
        fnName: 'createStore',
        starter: `function createStore(initial) {\n  \n}`,
        custom: `const store = createStore(${start})
check(store.getSnapshot(), ${start}, 'it starts where it was told')
let heard = 0
const off = store.subscribe(() => { heard++ })
store.setState(${start} + 1)
check(store.getSnapshot(), ${start + 1}, 'a plain value sets the state')
check(heard, 1, 'the subscriber was notified')
store.setState((n) => n + 10)
check(store.getSnapshot(), ${start + 11}, 'an updater function sees the current state')
check(heard, 2, 'and notifies too')
off()
store.setState(0)
check(heard, 2, 'an unsubscribed listener hears nothing more')
check(store.getSnapshot(), 0, 'but the state still changed')`,
        hints: [
          'The state and the set of listeners both live in the closure `createStore` makes.',
          '`typeof next === "function"` is how you tell an updater from a plain value.',
          'A `Set` of listeners makes `subscribe` return `() => listeners.delete(fn)` in one line.',
        ],
      }
    },
  },
  {
    id: 'effect-cleanup',
    track: 'react',
    level: 'advanced',
    concept: 'Cleanup order',
    make() {
      return {
        prompt:
          'Write `mount(effects)`: run each effect in order and keep whatever cleanup it returns (some return nothing at all). Return an `unmount()` that runs those cleanups in REVERSE order. Calling `unmount()` twice must never run a cleanup twice.',
        fnName: 'mount',
        starter: `function mount(effects) {\n  \n}`,
        custom: `const log = []
const unmount = mount([
  () => { log.push('a'); return () => log.push('~a') },
  () => { log.push('b') },
  () => { log.push('c'); return () => log.push('~c') },
])
check(log, ['a', 'b', 'c'], 'the effects ran in order, at mount')
unmount()
check(log, ['a', 'b', 'c', '~c', '~a'], 'cleanups ran in reverse, and only the real ones')
unmount()
check(log, ['a', 'b', 'c', '~c', '~a'], 'unmounting twice changes nothing')
check(typeof mount([]), 'function', 'no effects still gives an unmount function')`,
        hints: [
          'Collect the return values as you go — but keep only the ones that are functions.',
          'Reverse order means walking your list backwards, or reversing a copy of it.',
          'A flag (or emptying the list) is what makes the second `unmount()` a no-op.',
        ],
      }
    },
  },
  {
    id: 'context-value',
    track: 'react',
    level: 'advanced',
    concept: 'Context defaults',
    make(r) {
      const theme = pick(r, ['dusk', 'lantern', 'slate'])
      return {
        prompt: `Write \`mergeContext(defaults, value)\`. Keys the provider did not set fall back to the defaults — and so does a key it set to \`undefined\`. But \`null\` is a real value a provider may mean, so \`null\` does NOT fall back.`,
        fnName: 'mergeContext',
        starter: `function mergeContext(defaults, value) {\n  \n}`,
        custom: `const defaults = { theme: '${theme}', size: 'md', user: 'anon' }
const merged = mergeContext(defaults, { size: 'lg', theme: undefined, user: null })
check(merged.size, 'lg', 'a provided value wins')
check(merged.theme, '${theme}', 'undefined falls back to the default')
check(merged.user, null, 'null is a real value and stays null')
check(mergeContext(defaults, {}).theme, '${theme}', 'an empty provider is all defaults')
check(mergeContext(defaults, undefined).size, 'md', 'no provider at all is all defaults')
check(defaults.size, 'md', 'the defaults object was not mutated')
check(mergeContext(defaults, { extra: 1 }).extra, 1, 'a provider may add keys of its own')`,
        hints: [
          'Spreading defaults first and the value second gets you most of the way there.',
          'But a key explicitly set to `undefined` still overwrites when you spread — that is the catch.',
          'Drop the undefined entries out of `value` before the spread, and leave `null` alone.',
        ],
      }
    },
  },

  // ========================================================================
  // React · expert
  // ========================================================================
  {
    id: 'batcher',
    track: 'react',
    level: 'expert',
    concept: 'Batching updates',
    make() {
      return {
        prompt:
          'Write `createBatcher(flush)` returning `{ schedule, run }`. `schedule(x)` queues a value. `run(fn)` runs `fn` and then calls `flush(queue)` ONCE with everything queued during it. A `run` nested inside another `run` does not flush on its own — the outermost one flushes for all of them.',
        fnName: 'createBatcher',
        starter: `function createBatcher(flush) {\n  \n}`,
        custom: `const flushed = []
const b = createBatcher((queue) => flushed.push(queue))
b.run(() => { b.schedule(1); b.schedule(2) })
check(flushed, [[1, 2]], 'one flush, with everything queued inside the run')
b.run(() => { b.schedule(3) })
check(flushed, [[1, 2], [3]], 'the queue starts empty for the next run')
b.run(() => {
  b.schedule(4)
  b.run(() => { b.schedule(5) })
  b.schedule(6)
})
check(flushed, [[1, 2], [3], [4, 5, 6]], 'a nested run does not flush by itself')
b.run(() => {})
check(flushed.length, 3, 'an empty run does not flush at all')`,
        hints: [
          'Keep a queue and a depth counter in the closure.',
          '`run` raises the depth, calls `fn`, lowers it — and only flushes when the depth is back to 0.',
          'Empty the queue BEFORE calling flush, or anything scheduled by flush lands in the wrong batch.',
        ],
      }
    },
  },
  {
    id: 'reconcile',
    track: 'react',
    level: 'expert',
    concept: 'Reconciliation by key',
    make(r) {
      const ref = (prev, next) => ({
        mounted: next.filter((k) => !prev.includes(k)),
        unmounted: prev.filter((k) => !next.includes(k)),
        kept: next.filter((k) => prev.includes(k)),
      })
      const a = sample(r, NAMES.slice(0, 5), 3)
      const pairs = [
        [['a', 'b', 'c'], ['b', 'c', 'd']],
        [[...new Set(a)], []],
        [[], ['x', 'y']],
        [['a', 'b'], ['b', 'a']],
      ]
      return {
        prompt:
          'React matches children between renders by key. Given the previous keys and the next keys, return `{ mounted, unmounted, kept }`: keys that are new in `next`, keys that have gone, and keys in both — the last two in the order they appear in `prev` and `next` respectively.',
        fnName: 'reconcile',
        starter: `function reconcile(prev, next) {\n  \n}`,
        tests: pairs.map(([p, n]) => ({ args: [p, n], expected: ref(p, n) })),
        hints: [
          'Three filters over the two lists is all this is.',
          '`mounted` and `kept` walk `next`; `unmounted` walks `prev`.',
          'Shape: { mounted: next.filter((k) => !prev.includes(k)), unmounted: prev.filter((k) => !next.includes(k)), kept: next.filter((k) => prev.includes(k)) }',
        ],
      }
    },
  },
  {
    id: 'lazy-state',
    track: 'react',
    level: 'expert',
    concept: 'useState, by hand',
    make(r) {
      const start = int(r, 1, 9)
      return {
        prompt:
          'Write `useStateSim(initial)` returning `[get, set]`. A function passed as `initial` is the lazy initialiser — call it once, at setup. `set` takes a value or an updater. Setting a value that is already there (by `Object.is`) is not a change: `set` returns `false` then, and `true` when it really changed.',
        fnName: 'useStateSim',
        starter: `function useStateSim(initial) {\n  \n}`,
        custom: `let inits = 0
const [get, set] = useStateSim(() => { inits++; return ${start} })
check(get(), ${start}, 'the lazy initialiser gave the first value')
check(inits, 1, 'and was called exactly once')
check(get(), ${start}, 'reading again does not re-initialise')
check(inits, 1, 'still one')
check(set(${start + 1}), true, 'a real change reports true')
check(get(), ${start + 1}, 'and took effect')
check(set(${start + 1}), false, 'setting the same value again is not a change')
check(set((n) => n + 2), true, 'an updater sees the current value')
check(get(), ${start + 3}, 'and its result is the new state')
const [g2] = useStateSim(${start})
check(g2(), ${start}, 'a plain value is used as-is, not called')`,
        hints: [
          'Only call `initial` when `typeof initial === "function"` — otherwise it IS the value.',
          'The same test tells `set` whether it got an updater or a value.',
          'Compare with `Object.is` before storing, and return whether it differed.',
        ],
      }
    },
  },
  {
    id: 'resource-cache',
    track: 'react',
    level: 'expert',
    concept: 'Request de-duplication',
    make() {
      return {
        prompt:
          'Write `createResource(load)` returning `{ read, invalidate }`. `read(key)` returns the value for a key, calling `load(key)` at most once per key however often it is read — this is how a data library stops three components fetching the same thing. `invalidate(key)` forgets exactly one key.',
        fnName: 'createResource',
        starter: `function createResource(load) {\n  \n}`,
        custom: `const asked = []
const res = createResource((key) => { asked.push(key); return key.toUpperCase() })
check(res.read('rope'), 'ROPE', 'the first read loads')
check(res.read('rope'), 'ROPE', 'the second read is cached')
check(asked, ['rope'], 'so load ran once')
check(res.read('lamp'), 'LAMP', 'a different key loads on its own')
check(asked, ['rope', 'lamp'], 'once each')
res.invalidate('rope')
check(res.read('rope'), 'ROPE', 'an invalidated key loads again')
check(asked, ['rope', 'lamp', 'rope'], 'that is the third load')
check(res.read('lamp'), 'LAMP', 'the other key stayed cached')
check(asked.length, 3, 'and did not reload')`,
        hints: [
          'A `Map` from key to loaded value is the cache.',
          'Use `has` rather than testing the value — a legitimately cached `undefined` would reload forever.',
          '`invalidate` is one `delete`, not a whole clear.',
        ],
      }
    },
  },
]

// Four rungs, the same on both tracks. The wording is what the Practice Yard
// shows on the button, so it has to say who each rung is for.
export const LEVELS = [
  {
    id: 'basics',
    label: 'Basics',
    blurb: 'Variables, conditions, loops, strings. Nothing assumed.',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    blurb: 'Arrays and objects, and the methods that reshape them.',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    blurb: 'Closures, immutability, recursion, higher-order functions.',
  },
  {
    id: 'expert',
    label: 'Expert',
    blurb: 'Iterators, proxies, caches, schedulers — the machinery itself.',
  },
]

export const LEVEL_IDS = LEVELS.map((l) => l.id)

const poolFor = (track, level) =>
  GENERATORS.filter((g) => g.track === track && g.level === level)

// How many distinct generators sit behind each button — each one of which is a
// different drill on every seed.
export function levelsFor(track) {
  return LEVELS.map((l) => ({ ...l, count: poolFor(track, l.id).length })).filter(
    (l) => l.count > 0,
  )
}

// The concepts a level covers, for the blurb under the button.
export function conceptsFor(track, level) {
  return [...new Set(poolFor(track, level).map((g) => g.concept))]
}

// A drill whose tests all expect the same answer is worthless — returning that
// constant would pass it. Random data lands there occasionally, so reroll.
function degenerate(made) {
  if (!made.tests) return false
  return new Set(made.tests.map((t) => JSON.stringify(t.expected))).size < 2
}

export function generatePractice(track, level, seed = Date.now()) {
  const pool = poolFor(track, level)
  if (!pool.length) throw new Error(`No practice drills for ${track} · ${level}`)

  const gen = pool[Math.floor(rng(seed)() * pool.length)]

  let made
  let attempt = 0
  do {
    made = gen.make(rng(seed + attempt * 104729))
    attempt++
  } while (degenerate(made) && attempt < 25)

  const levelLabel = LEVELS.find((l) => l.id === level)?.label ?? level

  return {
    id: `practice-${gen.id}-${seed}`,
    name: 'Practice Drill',
    concept: made.concept ?? gen.concept,
    generated: true,
    seed,
    track,
    level,
    levelLabel,
    worldName: 'Practice Yard',
    brief: 'A drill spun up just now. Solve it, or roll another — there is no end to them.',
    lesson: [],
    puzzle: { kind: 'code', ...made },
  }
}

export const practiceCount = GENERATORS.length
