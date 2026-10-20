export default {
  track: 'react',
  id: 'react-complete-wing',
  name: 'The Completion Spire',
  tagline: 'Fragments, layout effects, actions, Link/searchParams, thunks, children',
  icon: '🏁',
  rooms: [
    {
      id: 'rx25',
      name: 'The Invisible Wrapper',
      concept: 'Fragments',
      brief: 'Group children without an extra DOM node — a wrapper that leaves no trace.',
      lesson: [
        { type: 'p', text: '`<></>` or `<Fragment>` groups nodes without a DOM parent. Keyed fragments use `<Fragment key={…}>`.' },
        { type: 'code', code: `return (
  <>
    <dt>{term}</dt>
    <dd>{defn}</dd>
  </>
)` },
        { type: 'note', text: 'Needed when a parent expects multiple children but you refuse an extra div.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `pair(term, defn)` returning an array `[term, defn]` — the data shape a fragment would wrap as two siblings.',
        fnName: 'pair',
        starter: `function pair(term, defn) {\n  \n}`,
        tests: [
          { args: ['HTML', 'markup'], expected: ['HTML', 'markup'] },
          { args: ['a', 'b'], expected: ['a', 'b'] },
        ],
        hints: ['Return an array of two', 'Order term then defn', 'No object wrapper'],
      },
    },
    {
      id: 'rx26',
      name: 'The Layout Pulse',
      concept: 'useLayoutEffect',
      brief: 'Measure and adjust before the paint — so the visitor never sees the wrong size.',
      lesson: [
        { type: 'p', text: '`useLayoutEffect` fires after DOM updates but before the browser paints. Use for measurements and synchronous DOM reads/writes.' },
        { type: 'code', code: `useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect()
  setHeight(height)
}, [])` },
        { type: 'note', text: 'Prefer `useEffect` unless you must avoid flicker. Layout effects block painting.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `pickEffect(kind)` returning `"layout"` for "measure" or "sync-dom", otherwise `"passive"`.',
        fnName: 'pickEffect',
        starter: `function pickEffect(kind) {\n  \n}`,
        tests: [
          { args: ['measure'], expected: 'layout' },
          { args: ['sync-dom'], expected: 'layout' },
          { args: ['fetch'], expected: 'passive' },
          { args: ['log'], expected: 'passive' },
        ],
        hints: ['Check two kinds for layout', 'Default passive', 'Return exact strings'],
      },
    },
    {
      id: 'rx27',
      name: 'The Form Action',
      concept: 'useActionState shape',
      brief: 'A form that posts an action and keeps pending/error state without hand-rolled flags.',
      lesson: [
        { type: 'p', text: 'React 19 `useActionState(action, initial)` returns `[state, formAction, isPending]` for progressive enhancement forms.' },
        { type: 'code', code: `const [state, action, pending] = useActionState(updateName, { ok: true })
<form action={action}>…</form>` },
        { type: 'note', text: 'Works with Server Actions in frameworks; the state machine idea is the same client-side.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `reduceAction(state, payload)` — if payload.error, return `{ ok: false, error: payload.error }`; else `{ ok: true, data: payload.data }`.',
        fnName: 'reduceAction',
        starter: `function reduceAction(state, payload) {\n  \n}`,
        tests: [
          { args: [{}, { data: 1 }], expected: { ok: true, data: 1 } },
          { args: [{}, { error: 'nope' }], expected: { ok: false, error: 'nope' } },
        ],
        hints: ['Branch on payload.error', 'Ignore prior state here', 'Two return shapes'],
      },
    },
    {
      id: 'rx28',
      name: 'The Query Link',
      concept: 'Link & search params',
      brief: 'Walk to another room, optionally with a query string of sealed instructions.',
      lesson: [
        { type: 'p', text: '`<Link to="…">` navigates client-side. `useSearchParams` reads/writes `?key=value`.' },
        { type: 'code', code: `<Link to="/rooms/2">Open</Link>
const [params, setParams] = useSearchParams()
params.get("tab")` },
        { type: 'note', text: 'Prefer search params for shareable UI state; path params for identity.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `withQuery(path, query)` where query is an object of string values, returning path + "?" + encoded pairs (sorted keys). No "?" if query empty.',
        fnName: 'withQuery',
        starter: `function withQuery(path, query) {\n  \n}`,
        tests: [
          { args: ['/rooms', {}], expected: '/rooms' },
          { args: ['/rooms', { tab: 'info' }], expected: '/rooms?tab=info' },
          { args: ['/r', { b: '2', a: '1' }], expected: '/r?a=1&b=2' },
        ],
        hints: ['Sort Object.keys', 'encodeURIComponent optional for these tests', 'Join with &'],
      },
    },
    {
      id: 'rx29',
      name: 'The Async Stamp',
      concept: 'createAsyncThunk shape',
      brief: 'An action that starts a request and stamps pending, fulfilled, or rejected into the ledger.',
      lesson: [
        { type: 'p', text: 'RTK `createAsyncThunk` dispatches pending/fulfilled/rejected actions around an async payload creator.' },
        { type: 'code', code: `const fetchRoom = createAsyncThunk("rooms/fetch", async (id) => {
  const res = await api.get(id)
  return res.data
})` },
        { type: 'note', text: 'extraReducers handle the three action types to update loading flags and data.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `thunkCycle(typePrefix, phase)` returning `${typePrefix}/${phase}` for phase in pending|fulfilled|rejected.',
        fnName: 'thunkCycle',
        starter: `function thunkCycle(typePrefix, phase) {\n  \n}`,
        tests: [
          { args: ['rooms/fetch', 'pending'], expected: 'rooms/fetch/pending' },
          { args: ['rooms/fetch', 'fulfilled'], expected: 'rooms/fetch/fulfilled' },
          { args: ['rooms/fetch', 'rejected'], expected: 'rooms/fetch/rejected' },
        ],
        hints: ['Join with /', 'No extra spaces', 'Simple concatenation'],
      },
    },
    {
      id: 'rx30',
      name: 'The Children Mirror',
      concept: 'React.Children & callback refs',
      brief: 'Count or map children safely — and catch a DOM node when React attaches it.',
      lesson: [
        { type: 'p', text: '`Children.count`, `map`, `toArray` help when receiving opaque `children`. Callback refs: `ref={(node) => …}` fire on attach/detach.' },
        { type: 'code', code: `Children.count(children)
ref={(node) => { input = node }}` },
        { type: 'note', text: 'Prefer composition over deep Children inspection when you can.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `countChildren(children)` where children may be a single value, an array, or null/undefined — return how many child slots (arrays count length; null/undefined → 0; otherwise 1).',
        fnName: 'countChildren',
        starter: `function countChildren(children) {\n  \n}`,
        tests: [
          { args: [null], expected: 0 },
          { args: [undefined], expected: 0 },
          { args: ['x'], expected: 1 },
          { args: [['a', 'b', 'c']], expected: 3 },
        ],
        hints: ['Nullish → 0', 'Array.isArray → length', 'Else 1'],
      },
    },
  ],
}
