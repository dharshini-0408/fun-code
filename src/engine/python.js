// Runs and marks Python.
//
// Real CPython, compiled to WebAssembly, running in a Web Worker via Pyodide.
// The runtime is served from the app itself (`/pyodide/`), so like everything
// else here it needs no network once the page is loaded, no key and no server.
//
// It is a ~13MB download the first time and is then cached by the browser. The
// worker is kept alive between runs — booting the interpreter costs seconds,
// so throwing it away per run the way the JavaScript sandbox does would be
// unusable. The trade-off is that an endless Python loop cannot be killed by a
// timer alone, so the worker is terminated and rebooted instead.

const WORKER_SRC = `
importScripts('/pyodide/pyodide.js')

let pyodide = null

async function boot() {
  if (pyodide) return pyodide
  pyodide = await loadPyodide({ indexURL: '/pyodide/' })
  return pyodide
}

self.onmessage = async (e) => {
  const { id, code, fnName, tests, mode } = e.data
  let py
  try {
    py = await boot()
  } catch (err) {
    self.postMessage({ id, ok: false, fatal: 'Python could not start: ' + err.message, results: [], logs: [] })
    return
  }

  // Everything the learner prints is captured rather than lost to the console.
  const logs = []
  py.setStdout({ batched: (s) => logs.push(s) })
  py.setStderr({ batched: (s) => logs.push(s) })

  // Scratch mode: run it and report what it printed.
  if (mode === 'scratch') {
    try {
      const value = await py.runPythonAsync(code)
      self.postMessage({
        id,
        ok: true,
        logs,
        results: [],
        value: value === undefined || value === null ? undefined : String(value),
      })
    } catch (err) {
      self.postMessage({ id, ok: false, fatal: String(err.message).trim(), logs, results: [] })
    }
    return
  }

  // Examination mode: define the learner's code, then call their function once
  // per test case and compare with Python's own equality, not JavaScript's.
  try {
    await py.runPythonAsync(code)
  } catch (err) {
    self.postMessage({ id, ok: false, fatal: String(err.message).trim(), logs, results: [] })
    return
  }

  const harness = \`
import json as _json

def _funcode_check(_name, _cases_json):
    # The cases arrive as JSON rather than as converted JS objects: it is the
    # only conversion that maps null to a real None, [] to a real list and
    # {} to a real dict. Handing Pyodide the objects directly yields JsNull
    # and JsProxy, which compare wrongly against Python values.
    _cases = _json.loads(_cases_json)
    _fn = globals().get(_name)
    if not callable(_fn):
        return _json.dumps({"fatal": "No function named '" + _name + "' was found."})
    _out = []
    for _c in _cases:
        _args = _c["args"]
        try:
            _actual = _fn(*_args)
            _out.append({
                "pass": _actual == _c["expected"],
                "call": _name + "(" + ", ".join(repr(a) for a in _args) + ")",
                "expected": repr(_c["expected"]),
                "actual": repr(_actual),
            })
        except Exception as _e:
            _out.append({
                "pass": False,
                "call": _name + "(" + ", ".join(repr(a) for a in _args) + ")",
                "expected": repr(_c["expected"]),
                "actual": type(_e).__name__ + ": " + str(_e),
            })
    return _json.dumps(_out)
\`

  try {
    await py.runPythonAsync(harness)
    const check = py.globals.get('_funcode_check')
    const raw = check(fnName, JSON.stringify(tests))
    check.destroy()
    const parsed = JSON.parse(raw)
    if (parsed.fatal) {
      self.postMessage({ id, ok: false, fatal: parsed.fatal, logs, results: [] })
      return
    }
    self.postMessage({
      id,
      ok: parsed.length > 0 && parsed.every((r) => r.pass),
      results: parsed,
      logs,
    })
  } catch (err) {
    self.postMessage({ id, ok: false, fatal: String(err.message).trim(), logs, results: [] })
  }
}
`

const TIMEOUT_MS = 15000 // generous: the first run includes booting CPython

let worker = null
let seq = 0
const pending = new Map()

function ensureWorker() {
  if (worker) return worker
  const url = URL.createObjectURL(new Blob([WORKER_SRC], { type: 'text/javascript' }))
  worker = new Worker(url)
  URL.revokeObjectURL(url)

  worker.onmessage = (e) => {
    const entry = pending.get(e.data.id)
    if (!entry) return
    pending.delete(e.data.id)
    clearTimeout(entry.timer)
    entry.resolve({ results: [], logs: [], ...e.data })
  }

  worker.onerror = (e) => {
    // A worker-level failure kills every run waiting on it.
    for (const [, entry] of pending) {
      clearTimeout(entry.timer)
      entry.resolve({
        ok: false,
        fatal: e.message || 'The Python sandbox crashed.',
        logs: [],
        results: [],
      })
    }
    pending.clear()
    reset()
  }

  return worker
}

// An endless Python loop cannot be interrupted from outside, so the whole
// interpreter is thrown away and the next run boots a fresh one.
function reset() {
  worker?.terminate()
  worker = null
}

function send(payload) {
  const id = ++seq
  const w = ensureWorker()

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      pending.delete(id)
      reset()
      resolve({
        ok: false,
        fatal: 'Your code ran for too long and was stopped. An endless loop, maybe?',
        logs: [],
        results: [],
      })
    }, TIMEOUT_MS)

    pending.set(id, { resolve, timer })
    w.postMessage({ id, ...payload })
  })
}

/** Mark a Python examination: define `code`, then call `fnName` per test. */
export function runPython({ code, fnName, tests }) {
  return send({ code, fnName, tests, mode: 'test' })
}

/** Run free-form Python and report what it printed. */
export function runPythonScratch(code) {
  return send({ code, mode: 'scratch' })
}

/** True once the interpreter has been booted at least once this session. */
export function pythonBooted() {
  return worker !== null
}
