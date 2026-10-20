export default {
  track: 'python',
  id: 'rune-laboratory',
  name: 'The Rune Laboratory',
  tagline: 'Strings, zip, regex, match/case, enums and counters',
  icon: '🔬',
  rooms: [
    {
      id: 'p19',
      name: 'The Sliced Rune',
      concept: 'String methods & slicing',
      brief: 'Cut a word, turn its case, strip its edges — strings are immutable, so every change returns a new one.',
      lesson: [
        {
          type: 'p',
          text: 'Slicing uses `s[start:stop:step]`. Methods like `strip`, `split`, `replace`, `startswith`, and `upper` return new strings.',
        },
        {
          type: 'code',
          code: `s = "  Alohomora  "
s.strip()            # 'Alohomora'
s[2:5]               # characters from index 2 up to 5
"wing".upper()       # 'WING'
"a-b-c".split("-")   # ['a', 'b', 'c']`,
        },
        {
          type: 'note',
          text: 'Negative indices count from the end: `s[-1]` is the last character.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Write `initials(name)` that takes a full name like `"Albus Dumbledore"`, strips it, splits on spaces, and returns the uppercase initials joined with no separator (`"AD"`).',
        fnName: 'initials',
        starter: `def initials(name):
    pass
`,
        tests: [
          { args: ['Albus Dumbledore'], expected: 'AD' },
          { args: ['  hermione  granger  '], expected: 'HG' },
          { args: ['Harry'], expected: 'H' },
        ],
        hints: [
          'strip, split, take `[0]` of each part, upper, join.',
          'A list comprehension works well here.',
          'Answer shape: `"".join(p[0].upper() for p in name.strip().split())`',
        ],
      },
    },

    {
      id: 'p20',
      name: 'The Paired Columns',
      concept: 'enumerate & zip',
      brief: 'Two ledgers read side by side, and a counter that knows which line you are on.',
      lesson: [
        {
          type: 'p',
          text: '`enumerate(iterable, start=0)` yields `(index, item)`. `zip(a, b)` yields pairs until the shortest input ends.',
        },
        {
          type: 'code',
          code: `for i, house in enumerate(["g", "r"], start=1):
    ...

list(zip([1, 2], ["a", "b"]))  # [(1, "a"), (2, "b")]`,
        },
        {
          type: 'note',
          text: '`zip(*rows)` is the neat way to transpose a matrix.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Write `label_rows(rows)` that takes a list of strings and returns a list like `["1. alpha", "2. beta"]` using enumerate starting at 1.',
        fnName: 'label_rows',
        starter: `def label_rows(rows):
    pass
`,
        tests: [
          { args: [['alpha', 'beta']], expected: ['1. alpha', '2. beta'] },
          { args: [['only']], expected: ['1. only'] },
          { args: [[]], expected: [] },
        ],
        hints: [
          'enumerate(rows, start=1)',
          'Format with an f-string: `f"{i}. {row}"`',
          'Return a list comprehension.',
        ],
      },
    },

    {
      id: 'p21',
      name: 'The Pattern Match',
      concept: 'Regular expressions',
      brief: 'A stencil held over text — only the shapes that fit the stencil show through.',
      lesson: [
        {
          type: 'p',
          text: 'The `re` module searches and replaces with patterns. Raw strings `r"..."` avoid double-escaping backslashes.',
        },
        {
          type: 'code',
          code: `import re
re.findall(r"\\d+", "room 12 and 3")  # ['12', '3']
re.sub(r"\\s+", "-", "a   b")         # 'a-b'
re.match(r"The", "The castle")       # match from start
re.search(r"cast", "The castle")     # match anywhere`,
        },
        {
          type: 'note',
          text: 'Compile once with `re.compile` when the same pattern runs in a hot loop.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Write `digits(text)` that returns a list of all digit-runs in `text` using `re.findall`.',
        fnName: 'digits',
        starter: `import re

def digits(text):
    pass
`,
        tests: [
          { args: ['room 12 and 3'], expected: ['12', '3'] },
          { args: ['nope'], expected: [] },
          { args: ['4'], expected: ['4'] },
        ],
        hints: [
          'Pattern `r"\\d+"` finds one or more digits.',
          'Return the findall list directly.',
          'Import re at the top.',
        ],
      },
    },

    {
      id: 'p22',
      name: 'The Branching Sigil',
      concept: 'match / case',
      brief: 'A sigil that branches on shape — not only on equality, but on structure.',
      lesson: [
        {
          type: 'p',
          text: 'Structural pattern matching (`match` / `case`) compares values and can unpack sequences and mappings.',
        },
        {
          type: 'code',
          code: `match command:
    case ["move", direction]:
        go(direction)
    case ["take", item]:
        grab(item)
    case {"op": "add", "n": n}:
        total += n
    case _:
        unknown()`,
        },
        {
          type: 'note',
          text: '`case _` is the default. Patterns are tried top to bottom.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Write `handle(cmd)` using match/case: `["ping"]` → `"pong"`; `["echo", text]` → `text`; anything else → `"unknown"`.',
        fnName: 'handle',
        starter: `def handle(cmd):
    pass
`,
        tests: [
          { args: [['ping']], expected: 'pong' },
          { args: [['echo', 'hi']], expected: 'hi' },
          { args: [['echo', 'yo']], expected: 'yo' },
          { args: [['nope']], expected: 'unknown' },
          { args: [[]], expected: 'unknown' },
        ],
        hints: [
          'match cmd: with three cases.',
          'case ["ping"]: return "pong"',
          'case ["echo", text]: return text; case _: return "unknown"',
        ],
      },
    },

    {
      id: 'p23',
      name: 'The Named Constants',
      concept: 'Enumerations',
      brief: 'Houses as named constants — not magic strings scattered through the code.',
      lesson: [
        {
          type: 'p',
          text: '`enum.Enum` (and `StrEnum` / `IntEnum`) groups related constants with names and values.',
        },
        {
          type: 'code',
          code: `from enum import Enum

class House(Enum):
    GRYFFINDOR = "g"
    RAVENCLAW = "r"

House.GRYFFINDOR.value  # 'g'
House["RAVENCLAW"]
House("g")              # House.GRYFFINDOR`,
        },
        {
          type: 'note',
          text: 'Comparing enum members with `is` / `==` is preferred over comparing `.value` strings everywhere.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Define `class House(Enum)` with `GRYFFINDOR = "g"` and `RAVENCLAW = "r"`. Write `code(name)` that returns `House[name].value` for a member name string.',
        fnName: 'code',
        starter: `from enum import Enum

class House(Enum):
    pass


def code(name):
    pass
`,
        tests: [
          { args: ['GRYFFINDOR'], expected: 'g' },
          { args: ['RAVENCLAW'], expected: 'r' },
        ],
        hints: [
          'Two members inside the class body.',
          'House[name] looks up by member name.',
          'Return `.value` from that member.',
        ],
      },
    },

    {
      id: 'p24',
      name: 'The Tally Stone',
      concept: 'Counter',
      brief: 'A stone that counts how often each rune appears — without you writing the dictionary loop again.',
      lesson: [
        {
          type: 'p',
          text: '`collections.Counter` tallies hashable items. `most_common(n)` returns the leaders.',
        },
        {
          type: 'code',
          code: `from collections import Counter
c = Counter("abracadabra")
c["a"]                 # 5
c.most_common(2)       # [('a', 5), ('b', 2)]
c.update("aa")         # add more`,
        },
        {
          type: 'note',
          text: 'Counter is a dict subclass. Missing keys read as 0 instead of raising.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Write `top_letter(text)` that returns the most common alphabetic character (lowercase). If tied, return the one `most_common` lists first. Ignore non-letters.',
        fnName: 'top_letter',
        starter: `from collections import Counter

def top_letter(text):
    pass
`,
        tests: [
          { args: ['abracadabra'], expected: 'a' },
          { args: ['xyz'], expected: 'x' },
          { args: ['BbbAA'], expected: 'b' },
        ],
        hints: [
          'Filter with `c.isalpha()`, lowercase, then Counter.',
          '`most_common(1)[0][0]` is the winning letter.',
          'Ignore spaces and punctuation.',
        ],
      },
    },
  ],
}
