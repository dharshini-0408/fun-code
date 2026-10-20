# FunCode

A castle of lessons, in the manner of a certain school of witchcraft and
wizardry. Sit a lesson, pass its examination, and the next door unbolts itself.
Underneath the robes it is a straight-faced JavaScript and React course.

Everything here is free and runs in the browser. No account, no API key, no
server — including the AI portrait that tutors you.

## The theme

Night-time castle stone, candlelight, and parchment. Every colour in the app
comes from the tokens at the top of `src/index.css`, so the whole castle
re-lights if you change a value there. Headings are set in a classical serif
that ships with the OS, so nothing is fetched and nothing breaks offline. The
four house colours are used sparingly, to tell states and subjects apart rather
than to decorate.

## The two tracks

You choose one at the door, and can switch at any time; progress is kept for
both.

**🟨 JavaScript** — 24 stages, four floors, no experience assumed:

| Floor | | Covers |
| --- | --- | --- |
| The Dusty Cellar | 🔑 | variables, strings, numbers, conditionals, loops, functions |
| The Sunken Archive | 📚 | arrays, objects, map/filter/reduce, destructuring, closures, recursion |
| The Async Abyss | 🌊 | promises, async/await, and the event loop |
| The Iron Workshop | ⚙️ | modules, iterators, generators, Map/Set, proxies, patterns |

**⚛️ React** — 18 stages, three floors, assumes you can read JavaScript:

| Floor | | Covers |
| --- | --- | --- |
| The React Atrium | ⚛️ | JSX, components & props, `useState`, events, lists & keys, forms |
| The Hook Spire | 🗝️ | `useEffect`, `useRef`, `useMemo`, `useReducer`, context, custom hooks |
| The Glass Cathedral | 🏛️ | fetching, error boundaries, code splitting, composition at scale |

Stages unlock one at a time, and progress is saved in `localStorage` — including
whatever you last had in the editor, so you can leave a room half-picked.

## The moving staircase

The path climbs *down the page*. Landings alternate either side of a central
axis, joined by a dotted banister drawn through the very same points, so the
line can never drift off the steps. The stretch you have already climbed keeps
its candlelight; the step you are standing on flickers, and the page scrolls
itself to centre on it when you arrive. Everything past it stays bolted.

Below 620px the staircase straightens into a single column — there is no room
for a nameplate either side of the axis on a phone.

## The Duelling Club — duels that never run out

The club never closes, and never repeats. Pick a level and a drill is
invented on the spot: 50 generators, each of which rewrites its numbers, field
names, data and wording from a fresh seed, so the same generator is a different
puzzle every roll.

| Level | JavaScript | React |
| --- | --- | --- |
| Basics | loops, conditionals, strings, filtering | props & defaults, state copies, keys, derived state |
| Intermediate | map/filter/reduce, grouping, sets, nesting | controlled forms, immutable lists, functional updates |
| Advanced | closures, immutability, recursion, higher-order functions | dependency arrays, memo caches, external stores, cleanup order |
| Expert | iterators, proxies, deep clones, LRU caches | batching, reconciliation by key, `useState` by hand, request de-duplication |

Every generator computes its own expected answers from a reference
implementation, so a drill can never disagree with itself. `npm run drills`
checks that: it generates ~1000 of them, proves the empty starter never passes
and that no drill is degenerate, then solves every one with a reference
solution.

React drills are logic-only — no JSX, no renderer. The parts of React that
actually bite (immutable updates, `Object.is` on deps, functional updaters,
cleanup order, caches) are plain JavaScript underneath, which is exactly what
the sandbox can test.

## The Library — learn one thing on its own

The staircase is the marked path. **🕯️ The Library** is the reference beside it:
every topic in the track, grouped by floor, searchable, and open in any order —
no locks. Each topic shows the same lesson the stage teaches, and every worked
example in it can be opened in a real editor and run, so you can change a line
and see what it does. There is no marking here.

## The Room of Requirement

The room becomes whatever you need — one per language, reachable from the
staircase and remembered in `localStorage`:

- **🟨 JavaScript** — an editor and a console. Runs in the same throwaway Web
  Worker the locks use, so a runaway loop is terminated after two seconds.
- **⚛️ React** — write a component called `App` and it renders live in the pane
  beside it. JSX is compiled in the browser with `@babel/standalone`, and the
  hooks are in scope already, so there is no import line to write. A render
  crash prints instead of blanking the app. This one runs on the page rather
  than in the worker, so an endless loop here does freeze the tab.

## The free AI portrait

Every lesson and every duel has a **🖼️ ask the portrait** button. The model runs
inside your browser on WebGPU via [web-llm](https://github.com/mlc-ai/web-llm):
it downloads once (0.9–2.5 GB, your choice of three), is cached afterwards, and
nothing you type ever leaves the machine. There is no key to get and nothing to
pay.

It is handed the room's lesson, the puzzle, your current code and the test that
failed, and is told to nudge rather than hand over the answer. It is a small
model, so the authored lessons and the test runner stay the source of truth —
the tutor is the "explain it another way" layer on top. Browsers without WebGPU
say so and lose nothing else.

## Getting started

```bash
npm install
npm run dev
```

## The three kinds of lock

- **code** — write a real function in the editor and run it against test cases.
  Your code runs in a throwaway Web Worker, so an accidental `while (true)`
  gets terminated after two seconds instead of freezing the tab.
- **choice** — read a snippet and predict what it does, or find the bug.
- **order** — put shuffled lines into the order they actually execute.

Every lock has hints, revealed one at a time and only when asked for. The last
hint is always close to the answer.

## Structure

```
src/
├── App.jsx              # sorting ↔ staircase ↔ lesson ↔ duel ↔ library ↔ room
├── ai/
│   └── tutor.js         # the portrait's model: loading, prompt, streaming
├── data/
│   ├── index.js         # the worlds, split into tracks and flattened into paths
│   └── world1–7.js      # all lesson content: teaching + examination
├── engine/
│   ├── runner.js        # the Web Worker sandbox, test runner and scratch runner
│   └── practice.js      # the 50 drill generators
├── hooks/
│   └── useProgress.js   # localStorage-backed progress, per track
└── components/
    ├── TrackPicker.jsx  # JavaScript or React
    ├── WorldMap.jsx     # the castle: staircase, floors and the Duelling Club
    ├── StaircaseMap.jsx # the vertical, alternating path of lessons
    ├── TopicLibrary.jsx # the Library — every subject, unlocked, runnable
    ├── TryIt.jsx        # one editable, castable example
    ├── Playground.jsx   # the Room of Requirement, per language
    ├── RoomView.jsx     # briefing → lesson → lock → escape
    ├── Tutor.jsx        # the tutor panel
    ├── CodeEditor.jsx   # textarea that indents like an editor
    └── {Code,Choice,Order}Puzzle.jsx
```

## Adding a room

Drop a new object into any `src/data/worldN.js`; the file's `track` field decides
which path it joins. A code lock needs `fnName`, `starter`, and `tests`
(`{ args, expected }`); if the answer is a function or class rather than a value,
use a `custom` script of `check(actual, expected, description)` calls instead.
`hints` is an array, revealed in order.

## Adding a drill generator

Add an entry to `GENERATORS` in `src/engine/practice.js` with `id`, `track`,
`level`, `concept` and a `make(r)` that draws everything it varies from the
seeded random `r`. Then add a reference solution under the same id in
`.gen-solve.mjs` and run `npm run drills` — an unsolvable or degenerate
generator fails the run.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with oxlint |
| `npm run drills` | Generate and solve ~1000 practice drills as a check |
