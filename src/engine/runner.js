// Runs the player's code inside a throwaway Web Worker.
// A worker means an accidental `while (true)` locks up nothing but itself —
// we just terminate it when the timer runs out.

const WORKER_SRC = `
function stringify(v, depth) {
  depth = depth || 0
  if (v === null) return 'null'
  if (v === undefined) return 'undefined'
  if (typeof v === 'string') return depth === 0 ? v : JSON.stringify(v)
  if (typeof v === 'function') return v.name ? 'ƒ ' + v.name : 'ƒ'
  if (typeof v !== 'object') return String(v)
  if (depth > 3) return '…'
  if (Array.isArray(v)) return '[' + v.map(function (x) { return stringify(x, depth + 1) }).join(', ') + ']'
  var keys = Object.keys(v)
  if (!keys.length) return '{}'
  return '{ ' + keys.map(function (k) { return k + ': ' + stringify(v[k], depth + 1) }).join(', ') + ' }'
}

function same(a, b) {
  if (Object.is(a, b)) return true
  if (typeof a !== typeof b) return false
  if (a === null || b === null || typeof a !== 'object') return false
  if (Array.isArray(a) !== Array.isArray(b)) return false
  var ka = Object.keys(a), kb = Object.keys(b)
  if (ka.length !== kb.length) return false
  return ka.every(function (k) { return same(a[k], b[k]) })
}

self.onmessage = function (e) {
  var code = e.data.code
  var fnName = e.data.fnName
  var tests = e.data.tests || []
  var custom = e.data.custom
  var fnArgs = e.data.fnArgs || {}
  var logs = []

  // Some puzzles hand the player a helper function as an argument. It travels
  // over postMessage as { __fn: 'name' } and is rebuilt from source here.
  function hydrate(a) {
    return a && typeof a === 'object' && a.__fn ? new Function('return (' + fnArgs[a.__fn] + ')')() : a
  }
  function label(a) {
    return a && typeof a === 'object' && a.__fn ? fnArgs[a.__fn] : stringify(a, 1)
  }

  self.console = {
    log: function () {
      logs.push(Array.prototype.map.call(arguments, function (a) { return stringify(a) }).join(' '))
    },
  }
  self.console.info = self.console.warn = self.console.error = self.console.log

  // Scratch mode: no function to find and nothing to assert. Just run the
  // thing and hand back whatever it logged, plus its final value.
  if (e.data.mode === 'scratch') {
    try {
      var value = new Function(code)()
      self.postMessage({
        ok: true,
        logs: logs,
        results: [],
        value: value === undefined ? undefined : stringify(value),
      })
    } catch (err) {
      self.postMessage({ ok: false, fatal: err.name + ': ' + err.message, logs: logs, results: [] })
    }
    return
  }

  var target
  try {
    var factory = new Function(code + '\\n;return typeof ' + fnName + ' === "function" ? ' + fnName + ' : undefined')
    target = factory()
  } catch (err) {
    self.postMessage({ ok: false, fatal: err.name + ': ' + err.message, logs: logs })
    return
  }

  if (typeof target !== 'function') {
    self.postMessage({
      ok: false,
      fatal: 'No function named "' + fnName + '" was found. Did you rename it or forget to define it?',
      logs: logs,
    })
    return
  }

  if (custom) {
    var checks = []
    var check = function (actual, expected, desc) {
      checks.push({
        pass: same(actual, expected),
        call: desc,
        expected: stringify(expected, 1),
        actual: stringify(actual, 1),
      })
    }
    try {
      new Function('check', code + '\\n;' + custom)(check)
    } catch (err) {
      self.postMessage({ ok: false, fatal: err.name + ': ' + err.message, logs: logs, results: checks })
      return
    }
    self.postMessage({
      ok: checks.length > 0 && checks.every(function (c) { return c.pass }),
      results: checks,
      logs: logs,
    })
    return
  }

  var results = tests.map(function (t) {
    var args = t.args.map(hydrate)
    var shown = t.args.map(label).join(', ')
    try {
      var actual = target.apply(null, args)
      return {
        pass: same(actual, t.expected),
        call: fnName + '(' + shown + ')',
        expected: stringify(t.expected, 1),
        actual: stringify(actual, 1),
      }
    } catch (err) {
      return {
        pass: false,
        call: fnName + '(' + shown + ')',
        expected: stringify(t.expected, 1),
        actual: err.name + ': ' + err.message,
      }
    }
  })

  self.postMessage({
    ok: results.every(function (r) { return r.pass }),
    results: results,
    logs: logs,
  })
}
`

const TIMEOUT_MS = 2000

export function runTests({ code, fnName, tests, fnArgs, custom }) {
  return spawn({ code, fnName, tests, fnArgs, custom })
}

// Free-form code with no lock attached — the playground and the "try it"
// editors in the topic library. Same throwaway worker, same 2s leash.
export function runScratch(code) {
  return spawn({ code, mode: 'scratch' })
}

function spawn(payload) {
  return new Promise((resolve) => {
    let url
    let worker
    let settled = false

    const finish = (value) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      worker?.terminate()
      URL.revokeObjectURL(url)
      resolve(value)
    }

    const timer = setTimeout(() => {
      finish({
        ok: false,
        fatal: 'Your code ran for too long and was stopped. An endless loop, maybe?',
        logs: [],
        results: [],
      })
    }, TIMEOUT_MS)

    try {
      url = URL.createObjectURL(new Blob([WORKER_SRC], { type: 'text/javascript' }))
      worker = new Worker(url)
      worker.onmessage = (e) => finish({ results: [], logs: [], ...e.data })
      worker.onerror = (e) =>
        finish({ ok: false, fatal: e.message || 'The code crashed.', logs: [], results: [] })
      worker.postMessage(payload)
    } catch {
      finish({ ok: false, fatal: 'Could not start the sandbox.', logs: [], results: [] })
    }
  })
}
