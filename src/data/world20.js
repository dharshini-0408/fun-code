export default {
  track: 'javascript',
  id: 'living-document',
  name: 'The Living Document',
  tagline: 'Modern syntax, JSON, storage, URLs and tree queries',
  icon: '📄',
  rooms: [
    {
      id: 'v1',
      name: 'The Soft Question',
      concept: 'Optional chaining & nullish coalescing',
      brief:
        'Ask gently. If the shelf is missing, do not knock the whole cabinet over — take the default candle instead.',
      lesson: [
        {
          type: 'p',
          text: '`?.` stops an access chain when it hits `null` or `undefined`. `??` picks the right-hand side only for those two values (not for `0` or `""`).',
        },
        {
          type: 'code',
          code: `user?.profile?.name
items?.[0]
fn?.(x)

settings.volume ?? 50     // 0 is kept
settings.title || 'Untitled'  // '' would fall through — different!`,
        },
        {
          type: 'note',
          text: 'Use `??` for defaults. Use `||` only when every falsy value should yield.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `readName(user, fallback)` returning `user.profile.name` when present, otherwise `fallback`. Use safe access — no throw when profile is missing.',
        fnName: 'readName',
        starter: `function readName(user, fallback) {
  
}`,
        tests: [
          { args: [{ profile: { name: 'Ada' } }, 'anon'], expected: 'Ada' },
          { args: [{ profile: {} }, 'anon'], expected: 'anon' },
          { args: [{}, 'anon'], expected: 'anon' },
          { args: [null, 'anon'], expected: 'anon' },
          { args: [{ profile: { name: '' } }, 'anon'], expected: '' },
        ],
        hints: [
          '`user?.profile?.name` may be undefined — then use `?? fallback`.',
          'Do not use `||` or empty string names will be replaced.',
          'Answer shape: `return user?.profile?.name ?? fallback`',
        ],
      },
    },

    {
      id: 'v2',
      name: 'The Encoded Scroll',
      concept: 'JSON',
      brief:
        'A structure folded into a single line of text, sent by owl, then unfolded exactly as it left.',
      lesson: [
        {
          type: 'p',
          text: '`JSON.stringify` turns values into text. `JSON.parse` turns text back. Only JSON-safe types survive (no functions, `undefined`, or `Map`).',
        },
        {
          type: 'code',
          code: `JSON.stringify({ a: 1, b: [true, null] })
JSON.parse('{"a":1}')

JSON.stringify({ x: undefined })  // '{}' — key dropped
JSON.stringify({ d: new Date() }) // ISO string, not a Date object after parse`,
        },
        {
          type: 'note',
          text: 'Wrap `JSON.parse` in try/catch — bad text throws `SyntaxError`.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `cloneJson(value)` that deep-clones a JSON-safe value via stringify/parse. Write `safeParse(text, fallback)` that returns the parsed value or `fallback` when parse throws.',
        fnName: 'cloneJson',
        starter: `function cloneJson(value) {
  
}

function safeParse(text, fallback) {
  
}
`,
        custom: `const o = { a: 1, b: [2, 3] }
const c = cloneJson(o)
check(c, o, 'clone equals')
check(c !== o, true, 'clone is a new object')
check(c.b !== o.b, true, 'nested array is new')
check(safeParse('{"x":1}', null), { x: 1 }, 'parses good json')
check(safeParse('{', 0), 0, 'fallback on bad json')`,
        hints: [
          '`cloneJson`: `return JSON.parse(JSON.stringify(value))`.',
          '`safeParse`: try/catch around `JSON.parse`.',
          'Return `fallback` in the catch block.',
        ],
      },
    },

    {
      id: 'v3',
      name: 'The Persistent Shelf',
      concept: 'Web storage shape',
      brief:
        'A shelf that remembers after the candles are put out — until someone clears the cupboard.',
      lesson: [
        {
          type: 'p',
          text: '`localStorage` stores string keys and string values. You JSON-encode objects. `sessionStorage` is the same API for one tab session.',
        },
        {
          type: 'code',
          code: `localStorage.setItem('theme', 'dark')
localStorage.getItem('theme')      // 'dark'
localStorage.removeItem('theme')

localStorage.setItem('user', JSON.stringify({ id: 1 }))
JSON.parse(localStorage.getItem('user'))`,
        },
        {
          type: 'note',
          text: 'Storage is synchronous and size-limited. Do not put secrets there — any script on the page can read it.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `createStore(map)` where `map` is a plain object used as the backing dictionary. Return `{ get(key, fallback), set(key, value), remove(key) }` that JSON-encodes values on set and JSON-parses on get. Missing keys return `fallback`.',
        fnName: 'createStore',
        starter: `function createStore(map) {
  
}`,
        custom: `const mem = {}
const s = createStore(mem)
s.set('u', { id: 1 })
check(mem.u, '{"id":1}', 'stores JSON text')
check(s.get('u', null), { id: 1 }, 'parses back')
check(s.get('missing', 7), 7, 'fallback')
s.remove('u')
check(s.get('u', null), null, 'removed')
check(Object.keys(mem).includes('u'), false, 'key gone')`,
        hints: [
          '`set` does `map[key] = JSON.stringify(value)`.',
          '`get` reads `map[key]`; if undefined, return fallback; else parse.',
          '`remove` uses `delete map[key]`.',
        ],
      },
    },

    {
      id: 'v4',
      name: 'The Reply Owl',
      concept: 'HTTP response shaping',
      brief:
        'Owls return with a status and a body. 200 means read the scroll; 404 means the room was never there; 500 means the castle apologises.',
      lesson: [
        {
          type: 'p',
          text: '`fetch` resolves even for 404s — you must check `response.ok` or `status`. JSON bodies use `response.json()`.',
        },
        {
          type: 'code',
          code: `const res = await fetch('/api/room/1')
if (!res.ok) throw new Error(res.status + ' ' + res.statusText)
const data = await res.json()`,
        },
        {
          type: 'note',
          text: 'Network failure rejects the promise. HTTP errors do not — unless you throw yourself.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `shapeResponse({ status, body })` returning `{ ok, data, error }`. `ok` is true for status 200–299. On ok, `data` is `body` and `error` is null. Otherwise `data` is null and `error` is `"HTTP " + status`.',
        fnName: 'shapeResponse',
        starter: `function shapeResponse({ status, body }) {
  
}`,
        tests: [
          {
            args: [{ status: 200, body: { id: 1 } }],
            expected: { ok: true, data: { id: 1 }, error: null },
          },
          {
            args: [{ status: 404, body: { miss: true } }],
            expected: { ok: false, data: null, error: 'HTTP 404' },
          },
          {
            args: [{ status: 204, body: null }],
            expected: { ok: true, data: null, error: null },
          },
        ],
        hints: [
          '`ok` when `status >= 200 && status <= 299`.',
          'Branch the return object on that boolean.',
          'Error string is exactly `"HTTP "` plus the number.',
        ],
      },
    },

    {
      id: 'v5',
      name: 'The Tree of Tags',
      concept: 'DOM-like tree queries',
      brief:
        'The page is a tree of nodes. You find them by name, by mark, by id — without walking every corridor by hand.',
      lesson: [
        {
          type: 'p',
          text: 'In the browser: `querySelector`, `querySelectorAll`, `getElementById`, `textContent`, `classList`. Here we practise the same ideas on plain nested objects.',
        },
        {
          type: 'code',
          code: `// node: { tag, id?, children?: node[] }
document.querySelector('ul.rooms li')
element.classList.add('lit')
element.getAttribute('href')`,
        },
        {
          type: 'note',
          text: 'Prefer `querySelector` over old `getElementsBy*` live collections unless you have a reason.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `findById(tree, id)` that depth-first searches a tree `{ id, children? }` and returns the matching node or `null`.',
        fnName: 'findById',
        starter: `function findById(tree, id) {
  
}`,
        tests: [
          {
            args: [
              { id: 'root', children: [{ id: 'a' }, { id: 'b', children: [{ id: 'c' }] }] },
              'c',
            ],
            expected: { id: 'c' },
          },
          {
            args: [{ id: 'root', children: [{ id: 'a' }] }, 'root'],
            expected: { id: 'root', children: [{ id: 'a' }] },
          },
          { args: [{ id: 'root' }, 'nope'], expected: null },
        ],
        hints: [
          'If `tree.id === id`, return tree.',
          'Otherwise loop children and recurse; return the first hit.',
          'Return null when nothing matches.',
        ],
      },
    },

    {
      id: 'v6',
      name: 'The Query String',
      concept: 'URLSearchParams',
      brief:
        'The address after the `?` is a list of names and values. Parse it; build it; never split on `&` by hand again.',
      lesson: [
        {
          type: 'p',
          text: '`URLSearchParams` reads and writes query strings. `URL` parses a full address into parts.',
        },
        {
          type: 'code',
          code: `const q = new URLSearchParams('a=1&b=two')
q.get('a')          // '1'
q.set('c', '3')
q.toString()        // 'a=1&b=two&c=3'

const u = new URL('https://ex.test/r?x=1')
u.pathname          // '/r'
u.searchParams.get('x')`,
        },
        {
          type: 'note',
          text: 'Values are always strings. Encode yourself only if you avoid this API — prefer not to.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `parseQuery(search)` where `search` may include a leading `?`. Return a plain object of string values. If a key repeats, keep the last value. Write `toQuery(obj)` returning a string without a leading `?` (insertion order of `obj` keys).',
        fnName: 'parseQuery',
        starter: `function parseQuery(search) {
  
}

function toQuery(obj) {
  
}
`,
        custom: `check(parseQuery('?a=1&b=two'), { a: '1', b: 'two' }, 'parses with ?')
check(parseQuery('a=1&a=2'), { a: '2' }, 'last wins')
check(parseQuery(''), {}, 'empty')
check(toQuery({ a: '1', b: 'two' }), 'a=1&b=two', 'serialises')
check(parseQuery('?' + toQuery({ x: 'y' })), { x: 'y' }, 'round trip')`,
        hints: [
          'Strip a leading `?`, split on `&`, then each pair on the first `=`.',
          'Decode with `decodeURIComponent` if you like; tests use plain values.',
          '`toQuery`: `Object.entries(obj).map(([k,v]) => k + "=" + v).join("&")`.',
        ],
      },
    },
  ],
}
