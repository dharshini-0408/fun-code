export default {
  track: 'react',
  id: 'concurrent-wing',
  name: 'The Concurrent Wing',
  tagline: 'Transitions, deferred values, cache keys and forms',
  icon: '⏳',
  rooms: [
    {
      id: 'rx7',
      name: 'The Soft Switch',
      concept: 'useTransition',
      brief:
        'Some doors must open at once. Others may wait a breath so the hallway does not stutter while you decide.',
      lesson: [
        {
          type: 'p',
          text: '`useTransition` marks a state update as non-urgent. React can keep showing the old UI (with `isPending`) while it prepares the heavy new tree.',
        },
        {
          type: 'code',
          code: `const [isPending, startTransition] = useTransition()
const [query, setQuery] = useState('')
const [list, setList] = useState(items)

function onChange(e) {
  setQuery(e.target.value)                    // urgent — the input
  startTransition(() => {
    setList(filterHuge(items, e.target.value)) // deferrable
  })
}`,
        },
        {
          type: 'p',
          text: 'Urgent updates (typing, clicks) stay snappy. Expensive filters and route transitions belong inside `startTransition`.',
        },
        {
          type: 'note',
          text: 'If a faster urgent update arrives, React can abandon outdated transition work. That is the point.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Model the split. Write `splitUpdate(inputValue, listValue)` returning `{ input, list, pending }` where `input`/`list` are those values and `pending` is true only when they differ.',
        fnName: 'splitUpdate',
        starter: `function splitUpdate(inputValue, listValue) {
  
}`,
        tests: [
          { args: ['hi', 'HI'], expected: { input: 'hi', list: 'HI', pending: true } },
          { args: ['same', 'same'], expected: { input: 'same', list: 'same', pending: false } },
          { args: [1, 1], expected: { input: 1, list: 1, pending: false } },
        ],
        hints: [
          'Map the two arguments onto `input` and `list`.',
          '`pending` is `inputValue !== listValue`.',
          'Answer shape: `return { input: inputValue, list: listValue, pending: inputValue !== listValue }`',
        ],
      },
    },

    {
      id: 'rx8',
      name: 'The Lagging Mirror',
      concept: 'useDeferredValue',
      brief:
        'A mirror that shows your face immediately, and the long corridor behind you a moment later.',
      lesson: [
        {
          type: 'p',
          text: '`useDeferredValue(value)` returns a lagging copy of `value`. Pass the deferred copy into expensive children so the urgent value can paint first.',
        },
        {
          type: 'code',
          code: `const deferredQuery = useDeferredValue(query)
const stale = deferredQuery !== query

return (
  <>
    <Input value={query} onChange={…} />
    {stale && <Spinner />}
    <HugeList query={deferredQuery} />
  </>
)`,
        },
        {
          type: 'p',
          text: 'Prefer `useDeferredValue` when you do not control the setter (the value comes from props). Prefer `useTransition` when you wrap the state update yourself.',
        },
        {
          type: 'note',
          text: 'Neither replaces memoisation. They schedule work; `memo` / `useMemo` still cut unnecessary work.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `deferPair(current, deferred)` returning `{ show, isStale }` where `show` is `deferred` and `isStale` is whether `current !== deferred`.',
        fnName: 'deferPair',
        starter: `function deferPair(current, deferred) {
  
}`,
        tests: [
          { args: ['abc', 'ab'], expected: { show: 'ab', isStale: true } },
          { args: ['xyz', 'xyz'], expected: { show: 'xyz', isStale: false } },
          { args: [1, 0], expected: { show: 0, isStale: true } },
        ],
        hints: [
          '`show` is simply the deferred value.',
          '`isStale` is a strict inequality check.',
          'Answer shape: `return { show: deferred, isStale: current !== deferred }`',
        ],
      },
    },

    {
      id: 'rx9',
      name: 'The Optimistic Quill',
      concept: 'Optimistic updates',
      brief:
        'Write the answer on the page before the owl returns — then erase it if the owl brings bad news.',
      lesson: [
        {
          type: 'p',
          text: 'An optimistic update applies the expected result immediately, then reconciles when the server answers.',
        },
        {
          type: 'code',
          code: `async function onLike(id) {
  const prev = likes
  setLikes((l) => l.includes(id) ? l : [...l, id])  // optimistic
  try {
    await api.like(id)
  } catch {
    setLikes(prev)  // roll back
  }
}`,
        },
        {
          type: 'p',
          text: 'React 19’s `useOptimistic` formalises this. Libraries like React Query expose `onMutate` / `onError` for the same pattern.',
        },
        {
          type: 'note',
          text: 'Always keep enough information to roll back. Optimistic UI without a revert path lies to the user when the network fails.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `optimisticToggle(list, id, ok)` — add `id` if missing (or remove if present), then if `ok` is false restore behaviour by returning the original `list` reference unchanged. When `ok` is true return the toggled copy.',
        fnName: 'optimisticToggle',
        starter: `function optimisticToggle(list, id, ok) {
  
}`,
        custom: `const base = [1, 2]
const added = optimisticToggle(base, 3, true)
check(added, [1, 2, 3], 'adds when ok')
check(base, [1, 2], 'does not mutate the original')
const removed = optimisticToggle([1, 2, 3], 2, true)
check(removed, [1, 3], 'removes when present')
const rolled = optimisticToggle(base, 9, false)
check(rolled === base, true, 'failed ok returns the same reference')`,
        hints: [
          'If `!ok`, return `list` immediately.',
          'Otherwise copy with spread and add or filter.',
          '`list.includes(id) ? list.filter(x => x !== id) : [...list, id]`',
        ],
      },
    },

    {
      id: 'rx10',
      name: 'The Indexed Cache',
      concept: 'Query keys & caching',
      brief:
        'Every request leaves a labelled scroll on the shelf. Ask for the same label twice and the shelf answers without sending another owl.',
      lesson: [
        {
          type: 'p',
          text: 'Data libraries (React Query, SWR) cache by a **query key** — an array that uniquely identifies the request.',
        },
        {
          type: 'code',
          code: `['room', roomId]
['rooms', { house: 'g', page: 2 }]

// invalidate everything under rooms
queryClient.invalidateQueries({ queryKey: ['rooms'] })`,
        },
        {
          type: 'p',
          text: 'Stable keys matter. Objects in keys should be serialisable; avoid new object identities that never match.',
        },
        {
          type: 'note',
          text: 'Prefer a library for server state. Redux is a poor cache for remote data unless you reinvent what Query already solved.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `makeKey(resource, params)` returning a query key array `[resource, sortedParamsObject]`. `sortedParamsObject` has the same keys as `params` but key order sorted alphabetically so `{b:1,a:2}` and `{a:2,b:1}` produce equal JSON.',
        fnName: 'makeKey',
        starter: `function makeKey(resource, params) {
  
}`,
        custom: `const a = makeKey('rooms', { b: 1, a: 2 })
const b = makeKey('rooms', { a: 2, b: 1 })
check(a[0], 'rooms', 'resource first')
check(JSON.stringify(a), JSON.stringify(b), 'param order normalised')
check(Object.keys(a[1]), ['a', 'b'], 'keys sorted alphabetically')
check(makeKey('x', {})[1], {}, 'empty params')`,
        hints: [
          'Build a new object by sorting `Object.keys(params)`.',
          'Return `[resource, sorted]`.',
          'Do not mutate the original params object.',
        ],
      },
    },

    {
      id: 'rx11',
      name: 'The Sealed Envelope',
      concept: 'FormData & uncontrolled forms',
      brief:
        'Sometimes you do not track every letter as it is written. You wait for the seal, then open the envelope all at once.',
      lesson: [
        {
          type: 'p',
          text: 'Controlled inputs sync every keystroke into React state. Uncontrolled inputs let the DOM hold the value until submit — often via `FormData`.',
        },
        {
          type: 'code',
          code: `function onSubmit(e) {
  e.preventDefault()
  const data = new FormData(e.target)
  const body = Object.fromEntries(data.entries())
  // { name: '…', house: '…' }
}`,
        },
        {
          type: 'p',
          text: 'React 19 actions and `<form action={fn}>` lean into this model. Use controlled fields when you need live validation or conditional UI per keystroke.',
        },
        {
          type: 'note',
          text: 'Name your inputs. `FormData` only sees fields with a `name` attribute.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `entriesToObject(entries)` where `entries` is an array of `[key, value]` pairs (like `[...formData.entries()]`). Return a plain object. If a key appears more than once, keep an array of all values.',
        fnName: 'entriesToObject',
        starter: `function entriesToObject(entries) {
  
}`,
        tests: [
          {
            args: [
              [
                ['name', 'Ada'],
                ['house', 'r'],
              ],
            ],
            expected: { name: 'Ada', house: 'r' },
          },
          {
            args: [
              [
                ['tag', 'a'],
                ['tag', 'b'],
                ['ok', '1'],
              ],
            ],
            expected: { tag: ['a', 'b'], ok: '1' },
          },
          { args: [[]], expected: {} },
        ],
        hints: [
          'Walk the pairs and assign into an object.',
          'When a key already holds a value, convert to an array (or push).',
          'First duplicate: if existing is not an array, wrap `[existing, value]`.',
        ],
      },
    },

    {
      id: 'rx12',
      name: 'The Toolkit Forge',
      concept: 'Redux Toolkit slices',
      brief:
        'Hand-cut actions and reducers are noble — and tedious. The forge stamps a whole matching set from one mould.',
      lesson: [
        {
          type: 'p',
          text: 'Redux Toolkit’s `createSlice` generates action creators and a reducer from a name, initial state, and a map of case reducers. Immer lets you “mutate” a draft safely.',
        },
        {
          type: 'code',
          code: `const torchesSlice = createSlice({
  name: 'torches',
  initialState: { count: 0 },
  reducers: {
    add(state, action) { state.count += action.payload },
    reset(state) { state.count = 0 },
  },
})

torchesSlice.actions.add(2)   // { type: 'torches/add', payload: 2 }
torchesSlice.reducer`,
        },
        {
          type: 'p',
          text: 'You still think in actions and pure updates — Toolkit removes the stringly-typed boilerplate and accidental mutations.',
        },
        {
          type: 'note',
          text: 'Use Toolkit for new Redux code. Classic hand-written stores are for understanding; Toolkit is for shipping.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Simulate a slice. Write `createSlice({ name, initialState, reducers })` returning `{ actions, reducer }`. Each key in `reducers` becomes an action creator `(payload) => ({ type: name+"/"+key, payload })` and a switch branch in `reducer`. Case fns receive `(state, action)` and must return the next state (no Immer here).',
        fnName: 'createSlice',
        starter: `function createSlice({ name, initialState, reducers }) {
  
}`,
        custom: `const slice = createSlice({
  name: 'torches',
  initialState: { count: 0 },
  reducers: {
    add(state, action) { return { count: state.count + action.payload } },
    reset() { return { count: 0 } },
  },
})
check(slice.actions.add(2), { type: 'torches/add', payload: 2 }, 'action creator')
check(slice.reducer({ count: 1 }, slice.actions.add(3)), { count: 4 }, 'add case')
check(slice.reducer({ count: 9 }, slice.actions.reset()), { count: 0 }, 'reset case')
check(slice.reducer(undefined, { type: '@@init' }), { count: 0 }, 'initial state')
check(slice.reducer({ count: 1 }, { type: 'other' }), { count: 1 }, 'unknown')`,
        hints: [
          'Build `actions` by mapping each reducer key to a creator.',
          'The root `reducer(state = initialState, action)` looks up `action.type` after the `name/` prefix.',
          'If no case matches, return state.',
        ],
      },
    },
  ],
}
