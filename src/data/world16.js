export default {
  track: 'python',
  id: 'alchemist-ledger',
  name: "The Alchemist's Ledger",
  tagline: 'Sets, comprehensions, errors and the standard library',
  icon: '⚗️',
  rooms: [
    {
      id: 'p7',
      name: 'The Twin Phials',
      concept: 'Tuples & sets',
      brief:
        'Two kinds of vessel: one sealed and ordered, one that refuses duplicates and does not care about order.',
      lesson: [
        {
          type: 'p',
          text: 'A tuple is an immutable sequence — often a fixed record. A set is an unordered collection of unique values.',
        },
        {
          type: 'code',
          code: `point = (3, 4)          # tuple
x, y = point            # unpacking

houses = {"g", "r", "h", "s"}
houses.add("g")         # no change — already there
"r" in houses           # True

# set operations
a | b   # union
a & b   # intersection
a - b   # difference`,
        },
        {
          type: 'p',
          text: 'Tuples can be dictionary keys; lists cannot. Sets are perfect for membership tests and deduplication.',
        },
        {
          type: 'note',
          text: 'A trailing comma makes a one-element tuple: `(42,)`. Without it, `(42)` is just a number in brackets.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Sort the phials. Write `unique_sorted(values)` that returns a list of the unique items from `values`, sorted ascending. (Sets help; the answer must be a list.)',
        fnName: 'unique_sorted',
        starter: `def unique_sorted(values):
    pass
`,
        tests: [
          { args: [[3, 1, 2, 1, 3]], expected: [1, 2, 3] },
          { args: [['c', 'a', 'b', 'a']], expected: ['a', 'b', 'c'] },
          { args: [[]], expected: [] },
        ],
        hints: [
          'Build a set from the list to drop duplicates, then sort it.',
          '`sorted(set(values))` already returns a list.',
          'Answer shape: `return sorted(set(values))`',
        ],
      },
    },

    {
      id: 'p8',
      name: 'The Condensed Recipe',
      concept: 'Comprehensions',
      brief:
        'A whole column of calculations written as one tight line — filter, map and collect without the ceremony of a loop.',
      lesson: [
        {
          type: 'p',
          text: 'List, set and dict comprehensions build collections from an expression and an optional filter.',
        },
        {
          type: 'code',
          code: `squares = [n * n for n in range(5)]
evens = [n for n in range(10) if n % 2 == 0]
index = {h: i for i, h in enumerate(["g", "r", "h"])}
unique = {c.lower() for c in "AaBb"}`,
        },
        {
          type: 'p',
          text: 'Keep them short. When the expression needs more than one statement, write a normal loop — clarity wins.',
        },
        {
          type: 'note',
          text: 'A comprehension with a side effect (printing, writing files) is a smell. Comprehensions are for building values.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Condense the recipe. Write `titles(words)` that returns a list of each word uppercased, but only words longer than 3 characters.',
        fnName: 'titles',
        starter: `def titles(words):
    pass
`,
        tests: [
          { args: [['owl', 'broom', 'hat', 'wand']], expected: ['BROOM', 'WAND'] },
          { args: [['a', 'bb', 'ccc', 'dddd']], expected: ['DDDD'] },
          { args: [[]], expected: [] },
        ],
        hints: [
          'Filter with `if len(w) > 3`, map with `w.upper()`.',
          'A list comprehension does both in one pass.',
          'Answer shape: `return [w.upper() for w in words if len(w) > 3]`',
        ],
      },
    },

    {
      id: 'p9',
      name: 'The Safety Net',
      concept: 'Exceptions',
      brief:
        'A shelf that sometimes collapses. Catch the fall, name the fault, and decide whether to recover or raise the alarm again.',
      lesson: [
        {
          type: 'p',
          text: '`try` / `except` catches errors. Prefer catching specific types. `else` runs when nothing failed; `finally` always runs.',
        },
        {
          type: 'code',
          code: `try:
    value = int(text)
except ValueError:
    value = 0
else:
    print("parsed")
finally:
    print("done")`,
        },
        {
          type: 'p',
          text: 'Raise your own with `raise ValueError("reason")`. Bare `except:` swallows everything — including KeyboardInterrupt — and hides bugs.',
        },
        {
          type: 'note',
          text: 'Exceptions are for exceptional cases. Do not use them for ordinary control flow you could express with `if`.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Catch the fall. Write `safe_int(text, default=0)` that returns `int(text)` when that works, and `default` when `ValueError` is raised.',
        fnName: 'safe_int',
        starter: `def safe_int(text, default=0):
    pass
`,
        tests: [
          { args: ['42'], expected: 42 },
          { args: ['nope'], expected: 0 },
          { args: ['nope', -1], expected: -1 },
          { args: ['7', 99], expected: 7 },
        ],
        hints: [
          'Wrap `int(text)` in try/except ValueError.',
          'On success return the int; on failure return default.',
          'Answer shape: try `return int(text)` except ValueError: `return default`',
        ],
      },
    },

    {
      id: 'p10',
      name: 'The Sorting Charm',
      concept: 'Lambdas & sort keys',
      brief:
        'A charm that sorts not by the thing itself, but by a property you whisper — length, last letter, or a field inside a record.',
      lesson: [
        {
          type: 'p',
          text: '`lambda` makes a tiny anonymous function. `sorted(..., key=...)` and `.sort(key=...)` use one to decide order.',
        },
        {
          type: 'code',
          code: `words = ["owl", "broom", "hat"]
sorted(words, key=len)                 # by length
sorted(words, key=lambda w: w[-1])     # by last letter

rows = [{"n": "b", "s": 2}, {"n": "a", "s": 5}]
sorted(rows, key=lambda r: r["s"], reverse=True)`,
        },
        {
          type: 'p',
          text: 'If the function needs a name or more than one expression, write `def` instead. Lambdas are for the key= line.',
        },
        {
          type: 'note',
          text: '`operator.itemgetter` and `attrgetter` replace many lambdas in larger codebases — same idea, clearer intent.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Whisper the key. Write `by_length(words)` that returns the words sorted shortest-first (stable for equal lengths).',
        fnName: 'by_length',
        starter: `def by_length(words):
    pass
`,
        tests: [
          { args: [['broom', 'owl', 'hat']], expected: ['owl', 'hat', 'broom'] },
          { args: [['a', 'ccc', 'bb']], expected: ['a', 'bb', 'ccc'] },
          { args: [[]], expected: [] },
        ],
        hints: [
          'Use `sorted` with `key=len` (or a lambda).',
          'Do not mutate the input unless you mean to — return a new list.',
          'Answer shape: `return sorted(words, key=len)`',
        ],
      },
    },

    {
      id: 'p11',
      name: 'The Standard Shelf',
      concept: 'Standard library',
      brief:
        'Shelves already stocked: maths, dates, and JSON — tools you import rather than invent.',
      lesson: [
        {
          type: 'p',
          text: 'The standard library covers everyday work. Import what you need; do not reinvent square roots or JSON parsers.',
        },
        {
          type: 'code',
          code: `import math
import json
from datetime import date

math.ceil(2.1)          # 3
math.hypot(3, 4)        # 5.0

json.dumps({"a": 1})    # '{"a": 1}'
json.loads('{"a": 1}')  # {'a': 1}

date(1991, 9, 1).isoformat()  # '1991-09-01'`,
        },
        {
          type: 'p',
          text: '`from module import name` brings one name into scope. `import module as m` renames for brevity.',
        },
        {
          type: 'note',
          text: 'In this castle, `math`, `json` and `datetime` are available. Prefer them over hand-rolled equivalents.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Take from the shelf. Write `hypotenuse(a, b)` using `math.hypot`, returning the float length of the hypotenuse.',
        fnName: 'hypotenuse',
        starter: `import math

def hypotenuse(a, b):
    pass
`,
        tests: [
          { args: [3, 4], expected: 5.0 },
          { args: [5, 12], expected: 13.0 },
          { args: [0, 0], expected: 0.0 },
        ],
        hints: [
          '`math.hypot(a, b)` is exactly the function you want.',
          'Remember to import math at the top.',
          'Answer shape: `return math.hypot(a, b)`',
        ],
      },
    },

    {
      id: 'p12',
      name: 'The Message Scroll',
      concept: 'JSON round-trips',
      brief:
        'A scroll that must leave as text and return as a structure — nothing lost, keys intact, nested lists preserved.',
      lesson: [
        {
          type: 'p',
          text: 'JSON is the common text shape for nested data. `json.dumps` turns Python into text; `json.loads` turns text back.',
        },
        {
          type: 'code',
          code: `import json

text = json.dumps({"rooms": [1, 2], "ok": True})
data = json.loads(text)
data["rooms"][0]  # 1`,
        },
        {
          type: 'p',
          text: 'JSON supports objects, arrays, strings, numbers, booleans and null — not tuples, sets or custom classes without help.',
        },
        {
          type: 'note',
          text: '`dumps` / `loads` work on strings. `dump` / `load` work on files. Here you only need the string pair.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Seal and unseal. Write `roundtrip(data)` that `json.dumps` then `json.loads` the value, returning the revived object.',
        fnName: 'roundtrip',
        starter: `import json

def roundtrip(data):
    pass
`,
        tests: [
          { args: [{'a': 1, 'b': [2, 3]}], expected: { a: 1, b: [2, 3] } },
          { args: [[1, 'x', true]], expected: [1, 'x', true] },
          { args: [{}], expected: {} },
        ],
        hints: [
          'dumps then loads — two calls, one return.',
          'Import json at the top of your solution.',
          'Answer shape: `return json.loads(json.dumps(data))`',
        ],
      },
    },
  ],
}
