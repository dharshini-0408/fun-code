import { useEffect, useRef, useState } from 'react'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { transform } from '@babel/standalone'
import CodeEditor from './CodeEditor.jsx'
import { buildDocument } from '../engine/markup.js'
import { runPythonScratch, pythonBooted } from '../engine/python.js'
import { runScratch } from '../engine/runner.js'

// Two scratchpads, one per language, kept deliberately separate because they
// run in completely different places:
//
//   JavaScript — the same throwaway Web Worker the locks use, so a runaway
//   loop is terminated after 2s and the tab survives. Output is console.log.
//
//   React — JSX has to become a real component and mount into a real DOM node,
//   so this one runs on the page with React in scope. That means no 2s leash:
//   an infinite loop here does freeze the tab, same as any dev server.
//
//   Markup — HTML/CSS/Bootstrap render into a sandboxed iframe as you type.
//   There is nothing to "run" and no console; the page is the result.
//
//   Python — real CPython in a Web Worker via Pyodide. The first run of a
//   session boots the interpreter, which takes a moment and is announced.

const JS_START = `// Anything you like. console.log shows up below.
const rooms = ['cellar', 'archive', 'workshop']

for (const [i, name] of rooms.entries()) {
  console.log(\`\${i + 1}. \${name}\`)
}

const shouted = rooms.map((r) => r.toUpperCase())
console.log(shouted)
`

const REACT_START = `// A real component, rendered live on the right.
// Whatever you name App is what gets mounted.
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>You clicked {count} times</h2>
      <button onClick={() => setCount(count + 1)}>click me</button>
      <button onClick={() => setCount(0)}>reset</button>
    </div>
  )
}
`

const MARKUP_START = `<!-- Plain HTML and CSS. The page renders as you type. -->
<h1>The Room of Requirement</h1>
<p class="note">It becomes whatever you need it to be.</p>

<style>
  h1 { font-family: Georgia, serif; color: #7a2530; }
  .note { color: #6f5f43; font-style: italic; }
</style>
`

const BOOTSTRAP_START = `<!-- Bootstrap's classes are already loaded. -->
<div class="container py-4">
  <div class="alert alert-warning">A cupboard of ready-made components.</div>
  <button class="btn btn-danger">A button</button>
  <button class="btn btn-outline-secondary">Another</button>
</div>
`

const PYTHON_START = `# Real CPython, running in your browser.
houses = ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"]

for i, name in enumerate(houses, start=1):
    print(f"{i}. {name}")

print(sorted(h for h in houses if len(h) > 9))
`

const STARTERS = {
  javascript: JS_START,
  react: REACT_START,
  html: MARKUP_START,
  css: MARKUP_START,
  bootstrap: BOOTSTRAP_START,
  python: PYTHON_START,
}

const PLAYGROUND_TABS = [
  { id: 'html', name: 'HTML & CSS', icon: '📜' },
  { id: 'bootstrap', name: 'Bootstrap', icon: '🅱️' },
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'react', name: 'React', icon: '🪄' },
  { id: 'python', name: 'Python', icon: '🐍' },
]

const FILENAMES = {
  javascript: 'scratch.js',
  react: 'App.jsx',
  html: 'index.html',
  css: 'index.html',
  bootstrap: 'index.html',
  python: 'scratch.py',
}

const KEY = 'funcode.playground'

function load(lang, fallback) {
  try {
    return localStorage.getItem(`${KEY}.${lang}`) ?? fallback
  } catch {
    return fallback
  }
}

function save(lang, code) {
  try {
    localStorage.setItem(`${KEY}.${lang}`, code)
  } catch {
    /* private mode; the draft just will not survive a reload */
  }
}

export default function Playground({ lang, engine, onBack, onSwitchLang }) {
  const isReact = lang === 'react'
  const isMarkup = engine === 'markup'
  const isPython = engine === 'python'
  const fallback = STARTERS[lang] ?? JS_START
  const [code, setCode] = useState(() => load(lang, fallback))
  const [out, setOut] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  const [booting, setBooting] = useState(false)
  const host = useRef(null)
  const root = useRef(null)
  const frame = useRef(null)

  // Markup has nothing to "run": the render is the result, live as you type.
  useEffect(() => {
    if (!isMarkup || !frame.current) return
    frame.current.srcdoc = buildDocument({ html: code, bootstrap: lang === 'bootstrap' })
  }, [isMarkup, code, lang])

  useEffect(() => {
    save(lang, code)
  }, [lang, code])

  // One React root for the preview pane, torn down when we leave.
  useEffect(() => {
    if (!isReact) return
    const r = createRoot(host.current)
    root.current = r
    return () => {
      root.current = null
      // React forbids unmounting during its own render pass, so defer it.
      setTimeout(() => r.unmount(), 0)
    }
  }, [isReact])

  async function runJs() {
    setBusy(true)
    setOut(await runScratch(code))
    setBusy(false)
  }

  async function runPy() {
    const cold = !pythonBooted()
    setBooting(cold)
    setBusy(true)
    setOut(await runPythonScratch(code))
    setBusy(false)
    setBooting(false)
  }

  function runReact() {
    setError(null)
    const run = attempt + 1
    setAttempt(run)
    try {
      const { code: js } = transform(code, {
        presets: [['react', { runtime: 'classic' }]],
      })
      // The hooks are handed in as bare names so playground code reads the way
      // it would in a real file, minus the import line.
      const hooks = [
        'useState',
        'useEffect',
        'useMemo',
        'useRef',
        'useReducer',
        'useCallback',
        'useContext',
        'createContext',
        'memo',
        'Fragment',
      ]
      const factory = new Function(
        'React',
        ...hooks,
        `${js}\n;return typeof App === 'function' ? App : undefined`,
      )
      const App = factory(React, ...hooks.map((h) => React[h]))
      if (typeof App !== 'function') {
        setError('No component named `App` was found. Name your component App.')
        return
      }
      // Keying the boundary by attempt gives every run a clean one, so a crash
      // on one render never sticks to the next.
      root.current?.render(
        React.createElement(
          Boundary,
          { key: run, onError: setError },
          React.createElement(App),
        ),
      )
    } catch (err) {
      setError(`${err.name}: ${err.message}`)
    }
  }

  return (
    <div className="playground">
      <header className="pg-head">
        <button className="btn link" onClick={onBack}>
          ← the staircase
        </button>
        <h1 className="brand">The Room of Requirement</h1>
        <p className="tagline">
          {isMarkup
            ? 'The room becomes whatever you need. Write markup and it appears, alive, beside you.'
            : isReact
              ? 'The room becomes whatever you need. Write a component called App and it appears, alive, on the right.'
              : isPython
                ? 'The room becomes whatever you need. Real Python, running in your own browser.'
                : 'The room becomes whatever you need. A blank scroll, and somewhere for your incantations to answer.'}
        </p>
        <div className="pg-tabs">
          {PLAYGROUND_TABS.map((t) => (
            <button
              key={t.id}
              className={`pg-tab ${lang === t.id ? 'on' : ''}`}
              onClick={() => onSwitchLang(t.id)}
            >
              {t.icon} {t.name}
            </button>
          ))}
        </div>
      </header>

      <div className={`pg-body ${isReact || isMarkup ? 'split' : ''}`}>
        <div className="pg-pane">
          <div className="pg-pane-head">
            <span>{FILENAMES[lang] ?? 'scratch.js'}</span>
            <button
              className="btn link small"
              onClick={() => setCode(fallback)}
            >
              reset
            </button>
          </div>
          <CodeEditor value={code} onChange={setCode} />
          {/* Markup needs no button: it is already rendering. */}
          {!isMarkup && (
            <button
              className="btn primary"
              onClick={isReact ? runReact : isPython ? runPy : runJs}
              disabled={busy}
            >
              {busy ? (booting ? 'waking the interpreter…' : 'casting…') : 'cast ▸'}
            </button>
          )}

          {booting && (
            <p className="boot-note">
              Real Python is starting up inside your browser — about 13MB, once per session.
            </p>
          )}
          {isReact && (
            <p className="pg-warn">
              React is cast on the page itself, not behind the wards — an endless loop here will
              freeze the tab.
            </p>
          )}
        </div>

        <div className="pg-pane">
          <div className="pg-pane-head">
            <span>{isReact || isMarkup ? 'what appeared' : 'what answered'}</span>
          </div>

          {isMarkup ? (
            <iframe
              ref={frame}
              className="markup-preview"
              title="Live preview"
              sandbox="allow-same-origin"
            />
          ) : isReact ? (
            <>
              <div className="pg-preview" ref={host} />
              {error && <p className="out-line err">{error}</p>}
            </>
          ) : (
            <div className="pg-console">
              {!out && <p className="out-line dimmed">The room is empty. Cast something.</p>}
              {out?.fatal && <p className="out-line err">{out.fatal}</p>}
              {out?.logs.map((l, i) => (
                <p key={i} className="out-line">
                  {l}
                </p>
              ))}
              {out?.value !== undefined && (
                <p className="out-line val">
                  <span className="out-mark">⇒</span>
                  {out.value}
                </p>
              )}
              {out && !out.fatal && out.logs.length === 0 && out.value === undefined && (
                <p className="out-line dimmed">The spell held, but said nothing. Try `console.log(…)`.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// A render-time crash in playground code should print, not blank the whole app.
class Boundary extends React.Component {
  static getDerivedStateFromError() {
    return { crashed: true }
  }

  state = { crashed: false }

  componentDidCatch(err) {
    this.props.onError(`${err.name}: ${err.message}`)
  }

  render() {
    return this.state.crashed ? null : this.props.children
  }
}
