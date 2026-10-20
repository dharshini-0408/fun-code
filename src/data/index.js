import world1 from './world1.js'
import world2 from './world2.js'
import world3 from './world3.js'
import world4 from './world4.js'
import world5 from './world5.js'
import world6 from './world6.js'
import world7 from './world7.js'
import world8 from './world8.js'
import world9 from './world9.js'
import world10 from './world10.js'
import world11 from './world11.js'
import world12 from './world12.js'
import world13 from './world13.js'
import world14 from './world14.js'
import world15 from './world15.js'
import world16 from './world16.js'
import world17 from './world17.js'
import world18 from './world18.js'
import world19 from './world19.js'
import world20 from './world20.js'
import world21 from './world21.js'
import world22 from './world22.js'
import world23 from './world23.js'
import world24 from './world24.js'
import world25 from './world25.js'
import world26 from './world26.js'
import world27 from './world27.js'
import world28 from './world28.js'
import world29 from './world29.js'
import world30 from './world30.js'
import world31 from './world31.js'
import world32 from './world32.js'
import world33 from './world33.js'
import world34 from './world34.js'
import world35 from './world35.js'
import world36 from './world36.js'
import world37 from './world37.js'
import world38 from './world38.js'
import world39 from './world39.js'
import world40 from './world40.js'
import world41 from './world41.js'
import world42 from './world42.js'
import world43 from './world43.js'
import world44 from './world44.js'

const worlds = [
  world1, world2, world3, world4, world5, world6, world7,
  world8, world9, world10, world11, world12, world13, world14,
  world15, world16, world17, world18, world19, world20, world21,
  world22, world23, world24, world25, world26, world27, world28,
  world29, world30, world31, world32, world33, world34, world35,
  world36, world37, world38, world39, world40, world41, world42, world43, world44,
]

// `accent` is the technology's own colour, used to light its card; `tier` is
// how far into the castle it sits, out of five.
//
// `engine` decides which sandbox marks the subject's examinations:
//   js     — a JavaScript function, run in a throwaway Web Worker
//   markup — HTML/CSS rendered in a sandboxed iframe, then inspected
//   python — real CPython in a Web Worker, via Pyodide
//
// `order` is the order they hang on the wall at the Sorting.
export const TRACKS = {
  html: {
    id: 'html',
    accent: '#e34f26',
    tier: 1,
    level: 'Core',
    name: 'HTML',
    icon: '📜',
    engine: 'markup',
    order: 1,
    blurb: 'The bones of every page: structure, meaning, media, forms and living markup.',
    start: 'The place to begin. Nothing at all is assumed.',
  },
  css: {
    id: 'css',
    accent: '#33a9dc',
    tier: 2,
    level: 'Core',
    name: 'CSS',
    icon: '🎨',
    engine: 'markup',
    order: 2,
    blurb: 'From colour and layout through motion, filters and modern selectors.',
    start: 'Assumes you can write HTML. Sit that subject first.',
  },
  bootstrap: {
    id: 'bootstrap',
    accent: '#a074e8',
    tier: 2,
    level: 'Intermediate',
    name: 'Bootstrap',
    icon: '🅱️',
    engine: 'markup',
    order: 3,
    blurb: 'Ready-made components, grid, utilities, tables, modals and accordions.',
    start: 'Assumes HTML, and enough CSS to know what it is saving you.',
  },
  javascript: {
    id: 'javascript',
    accent: '#f7df1e',
    tier: 3,
    level: 'Core',
    name: 'JavaScript',
    icon: '🟨',
    engine: 'js',
    order: 4,
    blurb: 'The language itself, from your first variable to JSON, storage shapes and generators.',
    start: 'No experience needed. Start at the foot of the stairs.',
  },
  react: {
    id: 'react',
    accent: '#61dafb',
    tier: 5,
    level: 'Advanced',
    name: 'React',
    icon: '⚛️',
    engine: 'js',
    order: 5,
    blurb: 'Components, hooks, Redux, routing and the patterns real apps are built from.',
    start: 'Assumes you can read JavaScript. Sit that subject first if you cannot.',
  },
  python: {
    id: 'python',
    accent: '#ffd43b',
    tier: 2,
    level: 'Core',
    name: 'Python',
    icon: '🐍',
    engine: 'python',
    order: 6,
    blurb: 'From first variables through classes, regex, match/case, enums and dataclasses.',
    start: 'No experience needed. Real CPython runs in your browser.',
  },
}

// Ordered for display; the registry itself is keyed for lookup.
export const TRACK_LIST = Object.values(TRACKS).sort((a, b) => a.order - b.order)

function buildTrack(trackId) {
  const inTrack = worlds.filter((w) => w.track === trackId)
  const path = inTrack.flatMap((world) =>
    world.rooms.map((room) => ({
      ...room,
      track: trackId,
      worldId: world.id,
      worldName: world.name,
    })),
  )
  return { worlds: inTrack, path }
}

export const tracks = Object.fromEntries(
  Object.keys(TRACKS).map((id) => [id, buildTrack(id)]),
)

/** Which sandbox marks this subject. */
export function engineFor(trackId) {
  return TRACKS[trackId]?.engine ?? 'js'
}

/** A subject with no lessons written yet still appears, but says so. */
export function isReady(trackId) {
  return (tracks[trackId]?.path.length ?? 0) > 0
}

export function pathFor(trackId) {
  return tracks[trackId]?.path ?? []
}

export function worldsFor(trackId) {
  return tracks[trackId]?.worlds ?? []
}

// Every lesson in the castle, regardless of subject — used by the portrait
// and by search.
export const allRooms = Object.values(tracks).flatMap((t) => t.path)
