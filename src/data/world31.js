export default {
  track: 'javascript',
  id: 'deep-machinery',
  name: 'The Deep Machinery',
  tagline: 'Symbols, WeakMap, Proxy, BigInt, Intl and dynamic import shape',
  icon: '⚙️',
  rooms: [
    {
      id: 'js7',
      name: 'The Hidden Mark',
      concept: 'Symbol',
      brief: 'A mark that is unique even when two descriptions read the same.',
      lesson: [
        { type: 'p', text: '`Symbol("desc")` creates a unique key. Symbols are skipped by most accidental enumeration; good for meta-fields.' },
        { type: 'code', code: `const id = Symbol('id')
const user = { name: 'Ada', [id]: 1 }
Object.keys(user)  // ['name']` },
        { type: 'note', text: '`Symbol.iterator` is how `for...of` finds an iterable.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `tagWithSymbol(obj, sym, value)` returning a new object that copies `obj` and adds `[sym]: value` without mutating `obj`.',
        fnName: 'tagWithSymbol',
        starter: `function tagWithSymbol(obj, sym, value) {\n  \n}`,
        custom: `const s = Symbol('id')
const o = { a: 1 }
const n = tagWithSymbol(o, s, 9)
check(n.a, 1, 'copies fields')
check(n[s], 9, 'stores symbol key')
check(o[s], undefined, 'no mutate')
check(Object.keys(n), ['a'], 'symbol not in keys')`,
        hints: ['Spread obj into a new object', 'Assign with [sym]', 'Do not touch the original'],
      },
    },
    {
      id: 'js8',
      name: 'The Weak Binding',
      concept: 'WeakMap & WeakSet',
      brief: 'A ledger that forgets an entry when nothing else remembers the key.',
      lesson: [
        { type: 'p', text: '`WeakMap` keys must be objects. Entries do not prevent garbage collection. Useful for private metadata.' },
        { type: 'code', code: `const meta = new WeakMap()
meta.set(el, { opened: true })
meta.get(el)` },
        { type: 'note', text: 'WeakMap is not iterable — by design.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `createMeta()` returning `{ set(obj, value), get(obj), has(obj) }` backed by a WeakMap.',
        fnName: 'createMeta',
        starter: `function createMeta() {\n  \n}`,
        custom: `const m = createMeta()
const o = {}
check(m.has(o), false, 'empty')
m.set(o, 1)
check(m.get(o), 1, 'get')
check(m.has(o), true, 'has')`,
        hints: ['const map = new WeakMap()', 'Return methods that call map.set/get/has', 'Objects as keys only'],
      },
    },
    {
      id: 'js9',
      name: 'The Proxy Mirror',
      concept: 'Proxy',
      brief: 'A mirror that intercepts every get and set — logging, validating, or trapping.',
      lesson: [
        { type: 'p', text: '`new Proxy(target, handler)` intercepts operations. `get`/`set` traps are the most common.' },
        { type: 'code', code: `const p = new Proxy({}, {
  get(t, prop) { return prop in t ? t[prop] : 0 },
  set(t, prop, value) {
    if (typeof value !== 'number') return false
    t[prop] = value
    return true
  },
})` },
        { type: 'note', text: 'Vue’s reactivity and Immer-like libraries use proxies under the hood.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `defaultZero(obj)` returning a Proxy so missing props read as `0`, while real props return normally. Sets should write through to the target.',
        fnName: 'defaultZero',
        starter: `function defaultZero(obj) {\n  \n}`,
        custom: `const p = defaultZero({ a: 2 })
check(p.a, 2, 'existing')
check(p.missing, 0, 'default 0')
p.b = 5
check(p.b, 5, 'set works')`,
        hints: ['get trap: prop in target ? target[prop] : 0', 'set trap assigns and returns true', 'Proxy around obj'],
      },
    },
    {
      id: 'js10',
      name: 'The Vast Integer',
      concept: 'BigInt',
      brief: 'Numbers bigger than Number can hold — with an `n` on the end.',
      lesson: [
        { type: 'p', text: '`BigInt` is for arbitrary integers. You cannot mix BigInt and Number in arithmetic without converting.' },
        { type: 'code', code: `const n = 9007199254740993n
n + 1n
BigInt('123')
Number(1n)  // careful — may lose precision` },
        { type: 'note', text: 'JSON has no BigInt — serialise as strings when needed.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `addBits(a, b)` where a and b are BigInt (or bigint literals in tests as strings you convert). Actually: take two strings of digits and return their sum as a string using BigInt.',
        fnName: 'addBits',
        starter: `function addBits(a, b) {\n  \n}`,
        tests: [
          { args: ['1', '2'], expected: '3' },
          { args: ['9007199254740993', '1'], expected: '9007199254740994' },
          { args: ['0', '0'], expected: '0' },
        ],
        hints: ['BigInt(a) + BigInt(b)', 'Return String(sum)', 'Do not use Number for huge values'],
      },
    },
    {
      id: 'js11',
      name: 'The Locale Desk',
      concept: 'Intl formatting',
      brief: 'Dates and numbers dressed for the visitor’s locale.',
      lesson: [
        { type: 'p', text: '`Intl.NumberFormat` and `Intl.DateTimeFormat` format values without hand-rolled strings.' },
        { type: 'code', code: `new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(12.5)
new Intl.DateTimeFormat('en-GB').format(new Date('1991-09-01'))` },
        { type: 'note', text: 'Pass a locale string explicitly when UI language is not the OS default.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `formatGBP(n)` that returns British-pound currency formatting for `n` using `Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })`.',
        fnName: 'formatGBP',
        starter: `function formatGBP(n) {\n  \n}`,
        custom: `const out = formatGBP(12.5)
check(typeof out, 'string', 'returns string')
check(out.includes('12.50') || out.includes('12.5'), true, 'includes amount')
check(/£|GBP|GB/.test(out.replace(/\\s/g,'')), true, 'looks like GBP')`,
        hints: ['new Intl.NumberFormat(...).format(n)', 'en-GB and GBP', 'Return the format result'],
      },
    },
    {
      id: 'js12',
      name: 'The Deferred Gate',
      concept: 'Dynamic import shape',
      brief: 'A gate that loads a module only when you knock — not at the start of the corridor.',
      lesson: [
        { type: 'p', text: '`import("./mod.js")` returns a Promise of the module namespace. Useful for code splitting.' },
        { type: 'code', code: `const { openDoor } = await import('./doors.js')
openDoor()` },
        { type: 'note', text: 'Bundlers turn dynamic import into separate chunks.' },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `loadFeature(loader)` that calls `loader()` and returns `{ ok: true, mod }` on success or `{ ok: false, error: message }` on throw. (Dynamic `import()` is the async form of this idea.)',
        fnName: 'loadFeature',
        starter: `function loadFeature(loader) {\n  \n}`,
        custom: `const ok = loadFeature(() => ({ x: 1 }))
check(ok, { ok: true, mod: { x: 1 } }, 'success')
const bad = loadFeature(() => { throw new Error('nope') })
check(bad.ok, false, 'failure ok false')
check(bad.error, 'nope', 'error message')`,
        hints: ['try/catch around loader()', 'success shape { ok: true, mod }', 'error.message for the string'],
      },
    },
  ],
}
