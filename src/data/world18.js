export default {
  track: 'react',
  id: 'redux-armoury',
  name: 'The Redux Armoury',
  tagline: 'Global state: actions, stores, selectors and routes',
  icon: '🛡️',
  rooms: [
    {
      id: 'rx1',
      name: 'The Dispatch Bell',
      concept: 'Redux actions & reducers',
      brief:
        'One bell for every event in the castle. You never reach into the ledger yourself — you ring what happened, and the ledger rewrites itself.',
      lesson: [
        {
          type: 'p',
          text: 'Redux stores app state in one place. You never mutate it directly. You **dispatch an action** (a plain object describing what happened), and a **reducer** returns the next state.',
        },
        {
          type: 'code',
          code: `// action — a fact about the past
{ type: 'torches/add', payload: 1 }

// reducer — (state, action) => nextState
function torchesReducer(state = 0, action) {
  switch (action.type) {
    case 'torches/add':
      return state + action.payload
    default:
      return state
  }
}`,
        },
        {
          type: 'p',
          text: 'Action type strings are often `domain/event`. The reducer must stay pure: no mutation, no random, no fetch.',
        },
        {
          type: 'note',
          text: 'You already met this shape in `useReducer`. Redux is that idea lifted out of one component and shared across the whole tree.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `pointsReducer(state = 0, action)`. Handle `points/add` (add `payload`), `points/reset` (back to 0), and return state unchanged for anything else.',
        fnName: 'pointsReducer',
        starter: `function pointsReducer(state = 0, action) {
  
}`,
        tests: [
          { args: [0, { type: 'points/add', payload: 5 }], expected: 5 },
          { args: [10, { type: 'points/add', payload: 3 }], expected: 13 },
          { args: [10, { type: 'points/reset' }], expected: 0 },
          { args: [10, { type: 'other' }], expected: 10 },
        ],
        custom: `check(pointsReducer(undefined, { type: 'points/add', payload: 5 }), 5, 'default state is 0')`,
        hints: [
          'Default `state` to 0 so the first call with `undefined` still works.',
          'Switch on `action.type`.',
          'Answer shape: add returns `state + action.payload`; reset returns `0`; default returns `state`.',
        ],
      },
    },

    {
      id: 'rx2',
      name: 'The Central Ledger',
      concept: 'createStore',
      brief:
        'A single book on a pedestal. Anyone may read it; anyone may ring the bell; only the book decides how the next page looks.',
      lesson: [
        {
          type: 'p',
          text: 'A Redux store holds state, lets you `dispatch` actions, `getState`, and `subscribe` to changes. The smallest useful store is a few closures around a reducer.',
        },
        {
          type: 'code',
          code: `function createStore(reducer, preloaded) {
  let state = preloaded
  const listeners = new Set()

  return {
    getState: () => state,
    dispatch(action) {
      state = reducer(state, action)
      listeners.forEach((l) => l())
      return action
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}`,
        },
        {
          type: 'p',
          text: 'In real apps you import `configureStore` from Redux Toolkit — same job, with better defaults. The idea underneath does not change.',
        },
        {
          type: 'note',
          text: 'One-way data flow: UI → dispatch(action) → reducer → new state → UI reads getState / subscription.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `createStore(reducer, preloadedState)` returning `{ getState, dispatch }`. `dispatch(action)` runs the reducer, saves the next state, and returns the action. No subscribe needed here.',
        fnName: 'createStore',
        starter: `function createStore(reducer, preloadedState) {
  
}`,
        custom: `const reducer = (state = 0, action) =>
  action.type === 'inc' ? state + (action.payload ?? 1) : state
const store = createStore(reducer, 2)
check(store.getState(), 2, 'starts at preloaded state')
check(store.dispatch({ type: 'inc', payload: 3 }).type, 'inc', 'dispatch returns the action')
check(store.getState(), 5, 'state updates after dispatch')
check(store.dispatch({ type: 'noop' }) && store.getState(), 5, 'unknown actions leave state')`,
        hints: [
          'Keep `state` in a `let` closed over by the returned methods.',
          '`dispatch` must assign `state = reducer(state, action)` before returning.',
          'Answer shape: return an object with `getState: () => state` and a `dispatch` that updates then returns `action`.',
        ],
      },
    },

    {
      id: 'rx3',
      name: 'The Split Tomes',
      concept: 'combineReducers',
      brief:
        'The ledger grew too thick. Split it into tomes — houses, torches, visitors — each with its own scribe, bound under one cover.',
      lesson: [
        {
          type: 'p',
          text: '`combineReducers` builds one root reducer from a map of slice reducers. Each slice only sees its own piece of state and its own actions.',
        },
        {
          type: 'code',
          code: `function combineReducers(slices) {
  return function rootReducer(state = {}, action) {
    const next = {}
    let changed = false
    for (const key of Object.keys(slices)) {
      const prev = state[key]
      const value = slices[key](prev, action)
      next[key] = value
      if (value !== prev) changed = true
    }
    return changed ? next : state
  }
}

// state shape becomes { torches, points }`,
        },
        {
          type: 'p',
          text: 'Redux Toolkit’s `createSlice` writes the action types and reducer cases together so the strings cannot drift apart.',
        },
        {
          type: 'note',
          text: 'A slice should own updating its data. Cross-slice needs belong in middleware or a higher-level thunk — not in a random reducer reaching sideways.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `combineReducers(slices)` returning a root reducer. For each key in `slices`, call that reducer with `state[key]` and the action. Always return a new object with every key filled (even when nothing changed).',
        fnName: 'combineReducers',
        starter: `function combineReducers(slices) {
  
}`,
        custom: `const root = combineReducers({
  a: (s = 0, action) => action.type === 'a/inc' ? s + 1 : s,
  b: (s = '', action) => action.type === 'b/set' ? action.payload : s,
})
const s0 = root(undefined, { type: '@@init' })
check(s0, { a: 0, b: '' }, 'initialises every slice from its default')
const s1 = root(s0, { type: 'a/inc' })
check(s1, { a: 1, b: '' }, 'updates only the matching slice')
const s2 = root(s1, { type: 'b/set', payload: 'ok' })
check(s2, { a: 1, b: 'ok' }, 'other slices still update independently')`,
        hints: [
          'Return a function `(state = {}, action) => { ... }`.',
          'Loop `Object.keys(slices)` and build a fresh `next` object.',
          'Call `slices[key](state[key], action)` for each key.',
        ],
      },
    },

    {
      id: 'rx4',
      name: 'The Reading Glass',
      concept: 'Selectors',
      brief:
        'The ledger is vast. A reading glass pulls out exactly the line you need — and the same glass always shows the same line for the same page.',
      lesson: [
        {
          type: 'p',
          text: 'A selector is a pure function `(state) => derivedValue`. Components and hooks read through selectors instead of digging into the raw tree.',
        },
        {
          type: 'code',
          code: `const selectTorches = (state) => state.torches.count
const selectLit = (state) =>
  state.torches.items.filter((t) => t.lit)

// Reselect-style: memoised from input selectors
function createSelector(input, output) {
  let lastIn, lastOut
  return (state) => {
    const next = input(state)
    if (next !== lastIn) {
      lastIn = next
      lastOut = output(next)
    }
    return lastOut
  }
}`,
        },
        {
          type: 'p',
          text: 'Memoised selectors avoid recomputing expensive filters when their inputs have not changed by reference.',
        },
        {
          type: 'note',
          text: 'In React-Redux, `useSelector(selectLit)` re-renders only when the selected value changes (`===` by default).',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `selectTotal(state)` that sums `state.cart.items[i].price * quantity`. Write `selectCount(state)` that sums quantities. Assume `state.cart.items` is an array of `{ price, quantity }`.',
        fnName: 'selectTotal',
        starter: `function selectTotal(state) {
  
}

function selectCount(state) {
  
}
`,
        custom: `const state = { cart: { items: [
  { price: 10, quantity: 2 },
  { price: 5, quantity: 1 },
] } }
check(selectTotal(state), 25, '10*2 + 5*1')
check(selectCount(state), 3, '2 + 1')
check(selectTotal({ cart: { items: [] } }), 0, 'empty cart totals 0')
check(selectCount({ cart: { items: [] } }), 0, 'empty cart count 0')`,
        hints: [
          'Both are reducers over `state.cart.items`.',
          'Total accumulates `price * quantity`; count accumulates `quantity`.',
          'Start from 0 so empty arrays work.',
        ],
      },
    },

    {
      id: 'rx5',
      name: 'The Side Door',
      concept: 'Middleware',
      brief:
        'Not every event belongs in the ledger. Some must first pass a side door — logging, delaying, or fetching — before the scribe is allowed to write.',
      lesson: [
        {
          type: 'p',
          text: 'Middleware sits between `dispatch` and the reducer. It can peek at actions, delay them, dispatch extras, or block them.',
        },
        {
          type: 'code',
          code: `// ({ getState, dispatch }) => next => action => result
const logger = () => (next) => (action) => {
  console.log('dispatch', action)
  return next(action)
}

// thunk: actions may be functions
const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === 'function') return action(dispatch, getState)
  return next(action)
}`,
        },
        {
          type: 'p',
          text: 'Redux Toolkit includes thunk middleware by default so async work can live in action creators without new concepts.',
        },
        {
          type: 'note',
          text: 'Keep reducers pure. If it touches the network, the clock, or `localStorage`, it belongs in middleware or a thunk — not in the reducer.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `createLogger(log)` returning Redux-style middleware `(next) => (action) => …` that pushes `action.type` onto `log`, then returns `next(action)`.',
        fnName: 'createLogger',
        starter: `function createLogger(log) {
  
}`,
        custom: `const log = []
const mw = createLogger(log)
const next = (action) => ({ handled: action.type })
const run = mw(next)
check(run({ type: 'inc' }), { handled: 'inc' }, 'passes the action through next')
check(log, ['inc'], 'records the type')
check(run({ type: 'dec' }) && log, ['inc', 'dec'], 'records every dispatch')`,
        hints: [
          'Return a function that takes `next` and returns a function that takes `action`.',
          'Inside: `log.push(action.type)` then `return next(action)`.',
          'Answer shape: `return (next) => (action) => { log.push(action.type); return next(action) }`',
        ],
      },
    },

    {
      id: 'rx6',
      name: 'The Signposted Stairs',
      concept: 'React Router matching',
      brief:
        'Corridors labelled with patterns. `/rooms/:id` is not a place — it is a template that fits many doors, and extracts which one you meant.',
      lesson: [
        {
          type: 'p',
          text: 'React Router maps URL paths to screens. Dynamic segments like `:id` capture values into a `params` object.',
        },
        {
          type: 'code',
          code: `// pattern '/rooms/:id'  path '/rooms/12'
// => { id: '12' }

function matchPath(pattern, path) {
  const pParts = pattern.split('/').filter(Boolean)
  const aParts = path.split('/').filter(Boolean)
  if (pParts.length !== aParts.length) return null
  const params = {}
  for (let i = 0; i < pParts.length; i++) {
    if (pParts[i].startsWith(':')) params[pParts[i].slice(1)] = aParts[i]
    else if (pParts[i] !== aParts[i]) return null
  }
  return params
}`,
        },
        {
          type: 'p',
          text: 'Nested routes render parent layouts around child outlets. Loaders and actions (data routers) move fetching next to the route definition.',
        },
        {
          type: 'note',
          text: 'In the app you use `<Routes>`, `<Route>`, `useParams`, `Link`, and `NavLink`. Underneath, it is pattern matching on the pathname.',
        },
      ],
      puzzle: {
        kind: 'code',
        prompt:
          'Write `matchPath(pattern, path)` returning a params object for matching paths, or `null` when the pattern does not fit. Support `:param` segments. Ignore leading/trailing slashes.',
        fnName: 'matchPath',
        starter: `function matchPath(pattern, path) {
  
}`,
        tests: [
          { args: ['/rooms/:id', '/rooms/12'], expected: { id: '12' } },
          { args: ['/rooms/:id/edit', '/rooms/3/edit'], expected: { id: '3' } },
          { args: ['/rooms/:id', '/halls/12'], expected: null },
          { args: ['/about', '/about'], expected: {} },
          { args: ['/a/:x/b/:y', '/a/1/b/2'], expected: { x: '1', y: '2' } },
        ],
        hints: [
          'Split both strings on `/` and drop empty pieces.',
          'Lengths must match; `:name` captures, anything else must be exact.',
          'Return `{}` when it matches with no params; `null` when it fails.',
        ],
      },
    },
  ],
}
