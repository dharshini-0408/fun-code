export default {
  track: 'react',
  id: 'router-redux-hall',
  name: 'The Router & Store Hall',
  tagline: 'Router UI patterns, useSelector, useDispatch and RTK Query shape',
  icon: '🗺️',
  rooms: [
    {
      id: 'rx13',
      name: 'The Nested Landing',
      concept: 'Nested routes & outlets',
      brief: 'A parent hallway that always shows, with a changing room slotted inside.',
      lesson: [
        { type: 'p', text: 'Nested routes render a parent layout around child screens. The child appears where `<Outlet />` sits.' },
        { type: 'code', code: `<Route path="/rooms" element={<RoomsLayout />}>
  <Route index element={<RoomList />} />
  <Route path=":id" element={<RoomDetail />} />
</Route>` },
        { type: 'note', text: 'Layouts keep nav mounted while only the outlet swaps.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `childPath(parent, rest)` joining parent route and child segment with `/`, avoiding double slashes. `rest` may be `""` for an index route (return parent).',
        fnName: 'childPath',
        starter: `function childPath(parent, rest) {\n  \n}`,
        tests: [
          { args: ['/rooms', ''], expected: '/rooms' },
          { args: ['/rooms', '12'], expected: '/rooms/12' },
          { args: ['/rooms/', '12'], expected: '/rooms/12' },
        ],
        hints: ['If rest is empty return normalised parent', 'Strip trailing slash on parent', 'Join with /'],
      },
    },
    {
      id: 'rx14',
      name: 'The Active Link',
      concept: 'NavLink matching',
      brief: 'A signpost that lights when you are on its path — or under it.',
      lesson: [
        { type: 'p', text: '`NavLink` knows whether the current location matches. End matching vs prefix matching changes highlighting for nested routes.' },
        { type: 'code', code: `<NavLink to="/rooms" end className={({ isActive }) => isActive ? 'on' : ''}>` },
        { type: 'note', text: '`end` prevents `/rooms` staying active on `/rooms/12` when you do not want that.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `isActive(pathname, to, end)` — if `end`, require exact equality; otherwise true when pathname === to or pathname starts with `to + "/"`.',
        fnName: 'isActive',
        starter: `function isActive(pathname, to, end) {\n  \n}`,
        tests: [
          { args: ['/rooms', '/rooms', true], expected: true },
          { args: ['/rooms/1', '/rooms', true], expected: false },
          { args: ['/rooms/1', '/rooms', false], expected: true },
          { args: ['/hall', '/rooms', false], expected: false },
        ],
        hints: ['Branch on end', 'Prefix check uses to + "/"', 'Exact === for end'],
      },
    },
    {
      id: 'rx15',
      name: 'The Bound Dispatch',
      concept: 'useDispatch & useSelector',
      brief: 'Read a line from the ledger; ring the bell — without prop-drilling either.',
      lesson: [
        { type: 'p', text: '`useSelector(fn)` returns selected state and re-renders on change. `useDispatch()` returns `dispatch`.' },
        { type: 'code', code: `const count = useSelector((s) => s.torches.count)
const dispatch = useDispatch()
dispatch(add(1))` },
        { type: 'note', text: 'Keep selectors small and referentially stable when returning objects — or memoize them.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `selectAndAct(state, selector, action, dispatch)` that returns `{ value: selector(state), run: () => dispatch(action) }`.',
        fnName: 'selectAndAct',
        starter: `function selectAndAct(state, selector, action, dispatch) {\n  \n}`,
        custom: `const calls = []
const out = selectAndAct({ n: 2 }, (s) => s.n, { type: 'inc' }, (a) => calls.push(a))
check(out.value, 2, 'selected')
out.run()
check(calls, [{ type: 'inc' }], 'dispatched')`,
        hints: ['value from selector(state)', 'run closes over dispatch and action', 'Return both'],
      },
    },
    {
      id: 'rx16',
      name: 'The Query Bench',
      concept: 'RTK Query shape',
      brief: 'Endpoints declared once — hooks and cache keys fall out of the definition.',
      lesson: [
        { type: 'p', text: 'RTK Query defines endpoints (`query` / `mutation`). It generates hooks like `useGetRoomQuery(id)` and caches by endpoint + args.' },
        { type: 'code', code: `getRoom: builder.query({
  query: (id) => \`/rooms/\${id}\`,
  providesTags: (r, e, id) => [{ type: 'Room', id }],
})` },
        { type: 'note', text: 'Invalidating tags refetches related queries after a mutation.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `endpointKey(name, arg)` returning a stable string key `name + ":" + JSON.stringify(arg)`.',
        fnName: 'endpointKey',
        starter: `function endpointKey(name, arg) {\n  \n}`,
        tests: [
          { args: ['getRoom', 1], expected: 'getRoom:1' },
          { args: ['list', { p: 1 }], expected: 'list:{"p":1}' },
          { args: ['x', null], expected: 'x:null' },
        ],
        hints: ['JSON.stringify(arg)', 'Colon between name and json', 'No spaces tricks — default stringify'],
      },
    },
    {
      id: 'rx17',
      name: 'The Loader Door',
      concept: 'Route loaders',
      brief: 'Data fetched as you enter the room — before the furniture renders.',
      lesson: [
        { type: 'p', text: 'Data routers attach `loader` functions to routes. Components read with `useLoaderData()`.' },
        { type: 'code', code: `{
  path: '/rooms/:id',
  loader: ({ params }) => fetchRoom(params.id),
  element: <Room />,
}` },
        { type: 'note', text: 'Loaders keep fetching next to the route definition instead of buried in effects.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `runLoader(loader, params)` that returns `loader({ params })` (sync for this exam).',
        fnName: 'runLoader',
        starter: `function runLoader(loader, params) {\n  \n}`,
        custom: `check(runLoader(({ params }) => params.id, { id: '12' }), '12', 'passes params')
check(runLoader(() => ({ ok: true }), {}), { ok: true }, 'no params used')`,
        hints: ['Call loader with `{ params }`', 'Return its result', 'No async required here'],
      },
    },
    {
      id: 'rx18',
      name: 'The Tag Invalidator',
      concept: 'Cache invalidation tags',
      brief: 'Edit one scroll and every shelf labelled with that tag refreshes.',
      lesson: [
        { type: 'p', text: 'RTK Query `providesTags` / `invalidatesTags` link queries and mutations.' },
        { type: 'code', code: `invalidatesTags: (r, e, id) => [{ type: 'Room', id }, 'RoomList']` },
        { type: 'note', text: 'Broad tags refetch more; specific ids refetch less — prefer precise tags.' },
      ],
      puzzle: {
        kind: 'code',
        prompt: 'Write `shouldRefetch(provided, invalidated)` where both are arrays of `{ type, id? }` or string tags. Return true if any invalidated entry matches a provided one (string matches string; objects match on type and id).',
        fnName: 'shouldRefetch',
        starter: `function shouldRefetch(provided, invalidated) {\n  \n}`,
        tests: [
          { args: [[{ type: 'Room', id: 1 }], [{ type: 'Room', id: 1 }]], expected: true },
          { args: [[{ type: 'Room', id: 1 }], [{ type: 'Room', id: 2 }]], expected: false },
          { args: [['RoomList'], ['RoomList']], expected: true },
          { args: [['RoomList'], [{ type: 'Room', id: 1 }]], expected: false },
        ],
        hints: ['Nested some/some', 'typeof string branch', 'Objects: type and id equality'],
      },
    },
  ],
}
