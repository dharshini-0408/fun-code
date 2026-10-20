export default {
  track: 'react',
  id: 'hooks-annex',
  name: 'The Hooks Annex',
  tagline: 'useId, external stores, imperative handles, memo, Strict Mode',
  icon: '🪝',
  rooms: [
    {
      id: 'rx19',
      name: 'The Unique Label',
      concept: 'useId',
      brief: 'A name that stays unique even when two forms appear on one page — and matches on the server.',
      lesson: [
        { type: 'p', text: '`useId()` returns a stable unique id string for accessibility attributes (`htmlFor`, `aria-describedby`).' },
        { type: 'code', code: `const id = useId()
<label htmlFor={id}>Name</label>
<input id={id} />` },
        { type: 'note', text: 'Do not use useId as a list key — keys should come from your data.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `labelPair(prefix, name)` returning `{ id, htmlFor }` where both equal `prefix + "-" + name`.',
        fnName: 'labelPair',
        starter: `function labelPair(prefix, name) {\n  \n}`,
        tests: [
          { args: [':r0:', 'email'], expected: { id: ':r0:-email', htmlFor: ':r0:-email' } },
          { args: ['x', 'n'], expected: { id: 'x-n', htmlFor: 'x-n' } },
        ],
        hints: ['Same string for both fields', 'Join with a hyphen', 'Return an object'],
      },
    },
    {
      id: 'rx20',
      name: 'The External Pulse',
      concept: 'useSyncExternalStore',
      brief: 'Subscribe to a store that lives outside React — and stay correct with concurrent rendering.',
      lesson: [
        { type: 'p', text: '`useSyncExternalStore(subscribe, getSnapshot)` is the safe way to read external stores (Redux, browser APIs).' },
        { type: 'code', code: `const width = useSyncExternalStore(
  (cb) => { window.addEventListener('resize', cb); return () => window.removeEventListener('resize', cb) },
  () => window.innerWidth,
)` },
        { type: 'note', text: 'getSnapshot must return a cached/immutable value when nothing changed — or you loop.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `createStore(initial)` returning `{ subscribe(fn), getSnapshot(), set(v) }`. subscribe returns unsubscribe; set notifies all listeners.',
        fnName: 'createStore',
        starter: `function createStore(initial) {\n  \n}`,
        custom: `const s = createStore(1)
let hits = 0
const off = s.subscribe(() => { hits++ })
check(s.getSnapshot(), 1, 'initial')
s.set(2)
check(s.getSnapshot(), 2, 'updated')
check(hits, 1, 'notified')
off()
s.set(3)
check(hits, 1, 'unsubscribed')`,
        hints: ['Keep listeners in a Set', 'set updates value then forEach', 'unsubscribe deletes from Set'],
      },
    },
    {
      id: 'rx21',
      name: 'The Imperative Latch',
      concept: 'useImperativeHandle',
      brief: 'Expose only the levers you mean to — focus, open, reset — not the whole inner machinery.',
      lesson: [
        { type: 'p', text: '`useImperativeHandle(ref, factory)` customises the instance value exposed to parent refs. Usually paired with `forwardRef`.' },
        { type: 'code', code: `useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus(),
  clear: () => setText(''),
}))` },
        { type: 'note', text: 'Prefer props and state. Imperative handles are for integrating with non-React focus management.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `makeHandle(api)` returning a frozen object with only `focus` and `clear` taken from `api` (ignore other keys).',
        fnName: 'makeHandle',
        starter: `function makeHandle(api) {\n  \n}`,
        custom: `const h = makeHandle({ focus: 1, clear: 2, secret: 3 })
check(h, { focus: 1, clear: 2 }, 'picked fields')
check(h.secret, undefined, 'secret omitted')`,
        hints: ['Pick two keys', 'Return a new object', 'Do not include secret'],
      },
    },
    {
      id: 'rx22',
      name: 'The Memo Cloak',
      concept: 'memo & forwardRef',
      brief: 'A cloak that skips re-rendering when props are unchanged — and a way to pass refs through.',
      lesson: [
        { type: 'p', text: '`memo(Component)` shallow-compares props. `forwardRef` lets a parent attach a ref to a child DOM node or handle.' },
        { type: 'code', code: `const Row = memo(function Row({ item }) { … })
const Field = forwardRef(function Field(props, ref) {
  return <input ref={ref} {...props} />
})` },
        { type: 'note', text: 'memo is a performance tool, not a correctness tool. Measure before wrapping everything.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `propsEqual(a, b)` that shallow-compares two plain objects (same keys, `Object.is` on values).',
        fnName: 'propsEqual',
        starter: `function propsEqual(a, b) {\n  \n}`,
        tests: [
          { args: [{ x: 1 }, { x: 1 }], expected: true },
          { args: [{ x: 1 }, { x: 2 }], expected: false },
          { args: [{ x: 1, y: 2 }, { x: 1 }], expected: false },
          { args: [{ n: NaN }, { n: NaN }], expected: true },
        ],
        hints: ['Compare key lengths first', 'Object.is for each value', 'NaN is equal via Object.is'],
      },
    },
    {
      id: 'rx23',
      name: 'The Optimistic Hook',
      concept: 'useOptimistic',
      brief: 'Show the future state while the request flies — then snap to the truth.',
      lesson: [
        { type: 'p', text: '`useOptimistic(state, updateFn)` returns a temporary UI state React reverts when the underlying state catches up.' },
        { type: 'code', code: `const [optimistic, addOptimistic] = useOptimistic(
  messages,
  (current, newMsg) => [...current, newMsg],
)` },
        { type: 'note', text: 'Works especially well with Actions / form actions in React 19.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `applyOptimistic(current, updateFn, action)` returning `updateFn(current, action)`.',
        fnName: 'applyOptimistic',
        starter: `function applyOptimistic(current, updateFn, action) {\n  \n}`,
        custom: `check(applyOptimistic([1], (c, a) => [...c, a], 2), [1, 2], 'appends')
check(applyOptimistic({ n: 1 }, (c, a) => ({ n: c.n + a }), 3), { n: 4 }, 'object')`,
        hints: ['One call', 'Return updateFn result', 'Do not mutate current yourself'],
      },
    },
    {
      id: 'rx24',
      name: 'The Double Candle',
      concept: 'Strict Mode double effects',
      brief: 'In development, React lights the candle twice to prove you cleaned up — if you did not, you will see double subscriptions.',
      lesson: [
        { type: 'p', text: 'React Strict Mode mounts, unmounts, and remounts in dev to surface missing effect cleanups.' },
        { type: 'code', code: `useEffect(() => {
  const id = subscribe()
  return () => unsubscribe(id)  // required!
}, [])` },
        { type: 'note', text: 'Production mounts once. Fix cleanups rather than disabling Strict Mode.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `runStrictEffect(setup)` that calls `setup()`, then its cleanup, then `setup()` again, returning the second cleanup. Models Strict Mode remounting.',
        fnName: 'runStrictEffect',
        starter: `function runStrictEffect(setup) {\n  \n}`,
        custom: `const log = []
const cleanup = runStrictEffect(() => {
  log.push('in')
  return () => log.push('out')
})
check(log, ['in', 'out', 'in'], 'remount sequence')
cleanup()
check(log, ['in', 'out', 'in', 'out'], 'final cleanup')`,
        hints: ['const c1 = setup(); c1(); const c2 = setup(); return c2', 'Order matters', 'Return the last cleanup'],
      },
    },
  ],
}
