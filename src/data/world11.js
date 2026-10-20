export default {
  track: 'python',
  id: 'serpent-vault',
  name: 'The Serpent Vault',
  tagline: 'Python, from the first line',
  icon: '🐍',
  rooms: [
    {
      id: 'p1',
      name: 'The Whispering Coil',
      concept: 'Variables, types & f-strings',
      brief:
        'A serpent of brass coils around a plinth, and it will speak only what you have first taught it to hold. The plinth has a slot and no instructions.',
      lesson: [
        {
          type: 'p',
          text: 'Python needs no keyword to make a variable. You name it and assign, and the type comes from the value.',
        },
        {
          type: 'code',
          code: `torches = 3
door_code = "A17"
lit = True
nothing = None`,
        },
        {
          type: 'p',
          text: 'Names are `snake_case` by convention, not `camelCase`. This matters more in Python than in most languages — the community is unusually consistent about it.',
        },
        { type: 'p', text: 'The everyday types:' },
        {
          type: 'code',
          code: `type(42)        # <class 'int'>
type(3.14)      # <class 'float'>
type("rope")    # <class 'str'>
type(True)      # <class 'bool'>
type(None)      # <class 'NoneType'>`,
        },
        { type: 'p', text: 'Strings are built with f-strings — a leading `f`, and braces around anything to insert:' },
        {
          type: 'code',
          code: `name = "Minerva"
count = 3
print(f"{name} has {count} torches")
print(f"and {count * 2} after doubling")`,
        },
        {
          type: 'note',
          text: 'Python has no braces and no semicolons. A colon opens a block and **indentation** closes it. Four spaces, consistently — the indentation is the syntax, not a style choice.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Teach the coil to speak. Write `describe(value)` returning a string like `rope is a str` — the value, then ` is a `, then its type name. `type(x).__name__` gives you the bare name.',
        fnName: 'describe',
        starter: `def describe(value):
    # type(value).__name__ gives 'str', 'int', 'bool'…
    pass
`,
        tests: [
          { args: ['rope'], expected: 'rope is a str' },
          { args: [42], expected: '42 is a int' },
          { args: [true], expected: 'True is a bool' },
          { args: [3.5], expected: '3.5 is a float' },
        ],
        hints: [
          'An f-string can hold any expression inside its braces, including a function call.',
          '`type(value).__name__` is the piece you need for the second half.',
          'Answer shape: `return f"{value} is a {type(value).__name__}"`',
        ],
      },
    },

    {
      id: 'p2',
      name: 'The Forking Passage',
      concept: 'Conditionals & truthiness',
      brief:
        'The passage splits three ways, and a plate at the junction asks a question about whatever you are carrying. Answer wrongly and it sends you back.',
      lesson: [
        { type: 'p', text: 'A colon opens the block, and the indented lines below it are the block.' },
        {
          type: 'code',
          code: `if torches > 2:
    print("plenty")
elif torches == 1:
    print("one left")
else:
    print("darkness")`,
        },
        {
          type: 'p',
          text: '`elif`, not `else if`. The operators are the familiar ones — `==`, `!=`, `<`, `>=` — and the words `and`, `or`, `not` instead of `&&`, `||`, `!`.',
        },
        { type: 'p', text: 'Python lets you chain comparisons the way mathematics does:' },
        {
          type: 'code',
          code: `if 0 < n <= 10:        # both at once, and n is only evaluated once
    print("in range")`,
        },
        {
          type: 'p',
          text: 'Every value is either truthy or falsy on its own. These are **all** the falsy ones:',
        },
        {
          type: 'code',
          code: `False   None   0   0.0   ""   []   {}   ()   set()`,
        },
        {
          type: 'note',
          text: 'So `if items:` means "if the list has anything in it", and is preferred over `if len(items) > 0`. Comparing to `None` is the exception: always write `is None`, never `== None`.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Answer the plate. Write `grade(score)` returning `"pass"` when the score is 70 or more, `"near"` from 50 up to 69, and `"fail"` below 50. A score of `None` returns `"absent"`.',
        fnName: 'grade',
        starter: `def grade(score):
    pass
`,
        tests: [
          { args: [90], expected: 'pass' },
          { args: [70], expected: 'pass' },
          { args: [69], expected: 'near' },
          { args: [50], expected: 'near' },
          { args: [49], expected: 'fail' },
          { args: [0], expected: 'fail' },
          { args: [null], expected: 'absent' },
        ],
        hints: [
          'Check for `None` first — it cannot be compared with `>=` and will raise if you try.',
          'Use `is None`, not `== None`, and put that branch above the numeric ones.',
          'Answer shape: `if score is None: return "absent"`, then `if score >= 70`, `elif score >= 50`, `else`.',
        ],
      },
    },

    {
      id: 'p3',
      name: 'The Counting Stair',
      concept: 'Loops & ranges',
      brief:
        'Ninety-three steps, and a tally slate at the bottom that must match the count at the top. Nobody has ever climbed it twice and got the same number.',
      lesson: [
        { type: 'p', text: 'Python’s `for` walks over a collection directly. There is no index arithmetic unless you ask for it.' },
        {
          type: 'code',
          code: `for house in ["Gryffindor", "Ravenclaw"]:
    print(house)

for i in range(5):        # 0, 1, 2, 3, 4
    print(i)`,
        },
        {
          type: 'p',
          text: '`range(stop)` starts at zero. `range(start, stop)` and `range(start, stop, step)` do what you would expect, and the stop is always excluded.',
        },
        { type: 'p', text: 'When you need the position as well as the value, ask for both:' },
        {
          type: 'code',
          code: `for i, house in enumerate(houses):
    print(f"{i}: {house}")

for i, house in enumerate(houses, start=1):
    print(f"{i}. {house}")`,
        },
        {
          type: 'p',
          text: 'A comprehension builds a list in one line, and is the idiomatic way to transform or filter:',
        },
        {
          type: 'code',
          code: `shouted = [h.upper() for h in houses]
long_ones = [h for h in houses if len(h) > 9]`,
        },
        {
          type: 'note',
          text: 'If you find yourself writing `result = []` then a loop then `result.append(...)`, a comprehension almost certainly says the same thing in one line.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Keep the tally. Write `evens_squared(n)` returning a list of the squares of every even number from `0` up to but not including `n`. For `n = 7` that is `[0, 4, 16, 36]`.',
        fnName: 'evens_squared',
        starter: `def evens_squared(n):
    pass
`,
        tests: [
          { args: [7], expected: [0, 4, 16, 36] },
          { args: [1], expected: [0] },
          { args: [0], expected: [] },
          { args: [10], expected: [0, 4, 16, 36, 64] },
        ],
        hints: [
          'A number is even when `x % 2 == 0`.',
          'A comprehension can carry both a transform and a filter: `[expr for x in … if cond]`.',
          'Answer shape: `return [x * x for x in range(n) if x % 2 == 0]`',
        ],
      },
    },

    {
      id: 'p4',
      name: 'The Ledger Room',
      concept: 'Lists & dictionaries',
      brief:
        'Shelves of ledgers, each a list of names, and beside them a card index that turns a name into a room number. Both have been dropped, and the pages are loose.',
      lesson: [
        { type: 'p', text: 'A list is ordered and changeable. A dictionary maps keys to values.' },
        {
          type: 'code',
          code: `houses = ["Gryffindor", "Ravenclaw"]
houses.append("Hufflepuff")
houses[0]        # 'Gryffindor'
houses[-1]       # 'Hufflepuff'  — last
houses[0:2]      # a slice: the first two`,
        },
        {
          type: 'code',
          code: `rooms = {"Charms": 302, "Potions": -1}
rooms["Charms"]           # 302
rooms["Herbology"] = 11   # add
rooms.get("Missing", 0)   # 0, instead of raising`,
        },
        {
          type: 'p',
          text: '`rooms["nope"]` raises a `KeyError`. `rooms.get("nope")` returns `None`, and `.get("nope", 0)` returns whatever default you name — usually what you want.',
        },
        { type: 'p', text: 'Walking a dictionary gives you keys; ask for `.items()` to get both:' },
        {
          type: 'code',
          code: `for subject, number in rooms.items():
    print(f"{subject} is in {number}")`,
        },
        {
          type: 'note',
          text: 'There is a dict comprehension too, with the same shape as the list one: `{k: v for k, v in pairs}`. Sets use braces as well — `{1, 2, 3}` — and drop duplicates for you.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Rebuild the index. Write `tally(words)` returning a dictionary mapping each word to how many times it appears. `["a", "b", "a"]` gives `{"a": 2, "b": 1}`.',
        fnName: 'tally',
        starter: `def tally(words):
    pass
`,
        tests: [
          { args: [['a', 'b', 'a']], expected: { a: 2, b: 1 } },
          { args: [[]], expected: {} },
          { args: [['owl']], expected: { owl: 1 } },
          { args: [['x', 'x', 'x']], expected: { x: 3 } },
        ],
        hints: [
          'Start with an empty dict and walk the list, adding one each time.',
          '`counts.get(word, 0)` gives you the running total, or zero the first time you see it.',
          'Answer shape: build `counts = {}`, then `for w in words: counts[w] = counts.get(w, 0) + 1`, then return it.',
        ],
      },
    },

    {
      id: 'p5',
      name: 'The Spellwright’s Desk',
      concept: 'Functions, defaults & unpacking',
      brief:
        'A desk of half-written spells. Each takes ingredients, most have sensible defaults nobody wrote down, and one takes as many as you care to hand it.',
      lesson: [
        { type: 'p', text: 'Parameters may have defaults, and callers may name their arguments.' },
        {
          type: 'code',
          code: `def brew(base, strength=1, fizzy=False):
    return f"{base} x{strength}"

brew("root")                    # uses both defaults
brew("root", 3)                 # by position
brew("root", fizzy=True)        # skip one by naming the next`,
        },
        {
          type: 'p',
          text: 'Named arguments can be given in any order and make a call far easier to read. Defaults must come after the parameters without them.',
        },
        { type: 'p', text: 'A star collects however many positional arguments arrive:' },
        {
          type: 'code',
          code: `def total(*numbers):
    return sum(numbers)

total(1, 2, 3)      # 6
total()             # 0`,
        },
        {
          type: 'p',
          text: 'A function returns `None` if it never says `return`. Several values come back as a tuple, which unpacks on the way out:',
        },
        {
          type: 'code',
          code: `def bounds(xs):
    return min(xs), max(xs)

low, high = bounds([3, 9, 1])`,
        },
        {
          type: 'note',
          text: 'Never use a list or dict as a default — `def f(items=[])` reuses the *same* list on every call, and it keeps whatever the last call put in it. Use `None` and build it inside.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Finish the spell. Write `label(name, prefix="Prof.", shout=False)` returning `"Prof. McGonagall"`, or the whole thing uppercased when `shout` is true.',
        fnName: 'label',
        starter: `def label(name, prefix="Prof.", shout=False):
    pass
`,
        tests: [
          { args: ['McGonagall'], expected: 'Prof. McGonagall' },
          { args: ['Snape', 'Mr'], expected: 'Mr Snape' },
          { args: ['Hagrid', 'Prof.', true], expected: 'PROF. HAGRID' },
          { args: ['Flitwick', 'Dr', true], expected: 'DR FLITWICK' },
        ],
        hints: [
          'Build the joined string first, then decide whether to uppercase it.',
          '`.upper()` on the finished string is simpler than uppercasing the two halves.',
          'Answer shape: `text = f"{prefix} {name}"`, then `return text.upper() if shout else text`',
        ],
      },
    },

    {
      id: 'p6',
      name: 'The Bound Familiar',
      concept: 'Classes & dunder methods',
      brief:
        'A creature of parchment and ink waits to be given a shape: what it knows, what it can do, and what it says when asked to describe itself.',
      lesson: [
        { type: 'p', text: 'A class is a template. `__init__` runs when one is made, and `self` is the instance itself.' },
        {
          type: 'code',
          code: `class Familiar:
    def __init__(self, name, kind="owl"):
        self.name = name
        self.kind = kind

    def call(self):
        return f"{self.name} the {self.kind} arrives"

hedwig = Familiar("Hedwig")
hedwig.call()      # 'Hedwig the owl arrives'`,
        },
        {
          type: 'p',
          text: '`self` is the first parameter of every method and is passed automatically — you never write it at the call site.',
        },
        {
          type: 'p',
          text: 'The double-underscore methods hook into Python’s own syntax. `__repr__` decides what the object looks like when printed:',
        },
        {
          type: 'code',
          code: `    def __repr__(self):
        return f"Familiar({self.name!r})"

    def __eq__(self, other):
        return self.name == other.name

    def __len__(self):
        return len(self.name)`,
        },
        {
          type: 'p',
          text: 'Define `__eq__` and `==` works. Define `__len__` and `len()` works. The language is built out of these.',
        },
        {
          type: 'note',
          text: 'The `!r` in an f-string asks for `repr()` rather than `str()` — quotes included. It is what you almost always want inside a `__repr__`.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Bind the familiar. Write a `Familiar` class taking `name` and an optional `kind` defaulting to `"owl"`, with a `call()` method returning `"Hedwig the owl arrives"`. Then write `summon(name)` returning the result of calling `call()` on a new `Familiar`.',
        fnName: 'summon',
        starter: `class Familiar:
    def __init__(self, name, kind="owl"):
        pass

    def call(self):
        pass


def summon(name):
    pass
`,
        tests: [
          { args: ['Hedwig'], expected: 'Hedwig the owl arrives' },
          { args: ['Errol'], expected: 'Errol the owl arrives' },
          { args: ['Crookshanks'], expected: 'Crookshanks the owl arrives' },
        ],
        hints: [
          '`__init__` must store both values on `self` — `self.name = name` and the same for kind.',
          '`call` reads them back with an f-string: `f"{self.name} the {self.kind} arrives"`.',
          'Answer shape: `summon` builds `Familiar(name)` and returns `.call()` on it.',
        ],
      },
    },
  ],
}
