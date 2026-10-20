export default {
  track: 'javascript',
  id: 'dom-workshop',
  name: 'The DOM Workshop',
  tagline: 'Elements, events, classList, dataset and fetch',
  icon: '🛠️',
  rooms: [
    {
      id: 'js1',
      name: 'The Element Forge',
      concept: 'Creating DOM nodes',
      brief: 'Stamp a tag, set its text, hang it on a parent — the page grows under your hand.',
      lesson: [
        { type: 'p', text: 'In the browser: `document.createElement`, `textContent`, `append`. Here we model nodes as plain objects.' },
        { type: 'code', code: `const el = document.createElement('p')
el.textContent = 'Hello'
el.className = 'note'
parent.append(el)` },
        { type: 'note', text: 'Prefer `textContent` over `innerHTML` when the text is not trusted markup.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `createNode(tag, text, className)` returning `{ tag, text, className, children: [] }`.',
        fnName: 'createNode',
        starter: `function createNode(tag, text, className) {\n  \n}`,
        tests: [
          { args: ['p', 'Hello', 'note'], expected: { tag: 'p', text: 'Hello', className: 'note', children: [] } },
          { args: ['div', '', ''], expected: { tag: 'div', text: '', className: '', children: [] } },
        ],
        hints: ['Return a plain object', 'Always include children: []', 'Map the three args to fields'],
      },
    },
    {
      id: 'js2',
      name: 'The Listening Door',
      concept: 'Events & delegation',
      brief: 'One ear on the hallway hears every knock on every door — delegation.',
      lesson: [
        { type: 'p', text: '`addEventListener(type, handler)`. Delegation: listen on a parent, use `event.target` to see which child was hit.' },
        { type: 'code', code: `list.addEventListener('click', (e) => {
  const li = e.target.closest('li')
  if (!li || !list.contains(li)) return
  // handle li
})` },
        { type: 'note', text: 'Delegation works for items added later — you need not re-bind each child.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `matchDelegate(targetPath, selector)` where `targetPath` is an array of tag names from event target up to root (e.g. `["span","li","ul"]`). Return the first entry equal to `selector`, or `null`.',
        fnName: 'matchDelegate',
        starter: `function matchDelegate(targetPath, selector) {\n  \n}`,
        tests: [
          { args: [['span', 'li', 'ul'], 'li'], expected: 'li' },
          { args: [['span', 'li', 'ul'], 'button'], expected: null },
          { args: [['button'], 'button'], expected: 'button' },
        ],
        hints: ['Walk the array in order', 'Return the matching string', 'null if none'],
      },
    },
    {
      id: 'js3',
      name: 'The Class Ledger',
      concept: 'classList & dataset',
      brief: 'Marks on an element you can add, remove, or toggle — and data-* notes folded into dataset.',
      lesson: [
        { type: 'p', text: '`classList.add/remove/toggle/contains`. `dataset.house` reads `data-house`.' },
        { type: 'code', code: `el.classList.add('lit')
el.classList.toggle('open')
el.dataset.house = 'g'  // data-house="g"` },
        { type: 'note', text: 'dataset keys are camelCase for hyphenated attributes.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `toggleClass(classes, name)` where `classes` is an array of class strings. If `name` is present, remove it; otherwise add it. Return the new array (do not mutate the input).',
        fnName: 'toggleClass',
        starter: `function toggleClass(classes, name) {\n  \n}`,
        custom: `const a = ['a', 'b']
check(toggleClass(a, 'c'), ['a', 'b', 'c'], 'adds')
check(a, ['a', 'b'], 'no mutate')
check(toggleClass(['a', 'b'], 'a'), ['b'], 'removes')
check(toggleClass([], 'x'), ['x'], 'empty')`,
        hints: ['Copy with spread first', 'includes ? filter : append', 'Return a new array'],
      },
    },
    {
      id: 'js4',
      name: 'The Fetching Owl',
      concept: 'fetch pipeline',
      brief: 'Send the owl, check the seal, unfold the JSON — or throw if the seal is wrong.',
      lesson: [
        { type: 'p', text: 'A solid fetch helper checks `res.ok`, then parses JSON, and surfaces errors clearly.' },
        { type: 'code', code: `async function getJson(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return res.json()
}` },
        { type: 'note', text: 'In this room you implement the pure decision logic without a real network.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `parseFetch(res)` where `res` is `{ ok, status, body }`. If `ok`, return `{ data: body }`. Else return `{ error: "HTTP " + status }`.',
        fnName: 'parseFetch',
        starter: `function parseFetch(res) {\n  \n}`,
        tests: [
          { args: [{ ok: true, status: 200, body: { a: 1 } }], expected: { data: { a: 1 } } },
          { args: [{ ok: false, status: 500, body: null }], expected: { error: 'HTTP 500' } },
          { args: [{ ok: false, status: 404, body: {} }], expected: { error: 'HTTP 404' } },
        ],
        hints: ['Branch on res.ok', 'data vs error keys', 'HTTP space status'],
      },
    },
    {
      id: 'js5',
      name: 'The Throttled Bell',
      concept: 'Throttle',
      brief: 'A bell that will ring at most once per span of time — even if you keep pulling.',
      lesson: [
        { type: 'p', text: 'Throttle invokes at most once per interval. Debounce waits for silence. Both are closures over a timestamp or timer.' },
        { type: 'code', code: `function throttle(fn, ms) {
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now - last >= ms) {
      last = now
      return fn(...args)
    }
  }
}` },
        { type: 'note', text: 'Use throttle for scroll/resize; debounce for search inputs.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `shouldRun(lastTime, now, ms)` returning true when `now - lastTime >= ms` (the throttle gate).',
        fnName: 'shouldRun',
        starter: `function shouldRun(lastTime, now, ms) {\n  \n}`,
        tests: [
          { args: [0, 100, 100], expected: true },
          { args: [0, 99, 100], expected: false },
          { args: [50, 150, 100], expected: true },
        ],
        hints: ['Subtract last from now', 'Compare to ms', 'Return a boolean'],
      },
    },
    {
      id: 'js6',
      name: 'The History Trail',
      concept: 'History & location shape',
      brief: 'The trail of rooms you walked — push a new one, or replace the current footprint.',
      lesson: [
        { type: 'p', text: '`history.pushState` / `replaceState` change the URL without a full reload. `location.pathname` and `search` describe where you are.' },
        { type: 'code', code: `history.pushState({ page: 2 }, '', '/rooms/2')
location.pathname  // '/rooms/2'` },
        { type: 'note', text: 'SPA routers wrap these APIs. Popstate fires on back/forward.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `joinPath(base, segment)` that joins URL path parts with exactly one slash between, no trailing slash unless base is `/`.',
        fnName: 'joinPath',
        starter: `function joinPath(base, segment) {\n  \n}`,
        tests: [
          { args: ['/rooms', '12'], expected: '/rooms/12' },
          { args: ['/rooms/', '12'], expected: '/rooms/12' },
          { args: ['/', 'about'], expected: '/about' },
        ],
        hints: ['Strip trailing slash from base', 'Strip leading slash from segment', 'Join with /'],
      },
    },
  ],
}
