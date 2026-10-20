export default {
  track: 'python',
  id: 'deep-archive',
  name: 'The Deep Archive',
  tagline: 'Inheritance, generators, decorators and context',
  icon: '📜',
  rooms: [
    {
      id: 'p13',
      name: 'The Inherited Key',
      concept: 'Inheritance',
      brief:
        'A key cut from an older key — it opens everything the parent opened, and one new door besides.',
      lesson: [
        {
          type: 'p',
          text: 'A subclass inherits methods and attributes from a base class. Override what changes; call `super()` to reuse the parent’s work.',
        },
        {
          type: 'code',
          code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Owl(Animal):
    def speak(self):
        return f"{self.name} hoots"

Owl("Hedwig").speak()  # 'Hedwig hoots'`,
        },
        {
          type: 'p',
          text: '`isinstance(obj, Animal)` is true for subclasses too. Prefer it over comparing `type(obj)` when you care about behaviour.',
        },
        {
          type: 'note',
          text: 'Inheritance models “is-a”. If you only need shared behaviour, a plain function or composition may be clearer.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Cut the key. Write a base `Creature` with `__init__(self, name)` storing `name`, and subclass `Owl(Creature)` with `speak(self)` returning `f"{self.name} hoots"`. Then `greet(name)` returns `Owl(name).speak()`.',
        fnName: 'greet',
        starter: `class Creature:
    def __init__(self, name):
        pass


class Owl(Creature):
    def speak(self):
        pass


def greet(name):
    pass
`,
        tests: [
          { args: ['Hedwig'], expected: 'Hedwig hoots' },
          { args: ['Errol'], expected: 'Errol hoots' },
          { args: ['Pigwidgeon'], expected: 'Pigwidgeon hoots' },
        ],
        hints: [
          'Creature stores `self.name = name`. Owl does not need its own `__init__` if that is enough.',
          '`greet` builds an Owl and calls speak.',
          'Answer shape: `return Owl(name).speak()`',
        ],
      },
    },

    {
      id: 'p14',
      name: 'The Endless Corridor',
      concept: 'Generators',
      brief:
        'A corridor that yields one door at a time — never building the whole hallway in memory before you take the first step.',
      lesson: [
        {
          type: 'p',
          text: 'A generator function uses `yield` instead of `return`. Each next() call resumes where it left off.',
        },
        {
          type: 'code',
          code: `def countdown(n):
    while n > 0:
        yield n
        n -= 1

list(countdown(3))  # [3, 2, 1]

# generator expression
squares = (x * x for x in range(5))`,
        },
        {
          type: 'p',
          text: 'Generators are lazy: they compute values on demand. That matters for large streams and infinite sequences.',
        },
        {
          type: 'note',
          text: 'You can iterate a generator once. To reuse the values, wrap with `list(...)` or call the function again.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Yield the doors. Write a generator `doors(n)` that yields `1, 2, ..., n`, then `count_up(n)` that returns `list(doors(n))`.',
        fnName: 'count_up',
        starter: `def doors(n):
    pass


def count_up(n):
    pass
`,
        tests: [
          { args: [3], expected: [1, 2, 3] },
          { args: [1], expected: [1] },
          { args: [0], expected: [] },
        ],
        hints: [
          'Inside `doors`, loop `range(1, n + 1)` and `yield` each value.',
          '`count_up` should only wrap: `return list(doors(n))`.',
          'Answer shape: yield in `doors`; `count_up` returns `list(doors(n))`',
        ],
      },
    },

    {
      id: 'p15',
      name: 'The Wrapped Spell',
      concept: 'Decorators',
      brief:
        'A spell wrapped in another spell — the outer one runs before and after, without rewriting the inner chant.',
      lesson: [
        {
          type: 'p',
          text: 'A decorator is a function that takes a function and returns a new one. The `@name` syntax applies it above a `def`.',
        },
        {
          type: 'code',
          code: `def twice(fn):
    def wrapper(x):
        return fn(fn(x))
    return wrapper

@twice
def inc(n):
    return n + 1

inc(3)  # 5`,
        },
        {
          type: 'p',
          text: 'Real decorators often use `functools.wraps` to preserve the original name and docstring.',
        },
        {
          type: 'note',
          text: 'Decorators are how `@property`, `@staticmethod` and many frameworks hook behaviour onto functions and methods.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Wrap the spell. Write `shout(fn)` that returns a wrapper taking one string and returning `fn(text).upper()`. Then define `label` with `@shout` so `label("owl")` returns `"OWL HOUSE"` when label returns `"owl house"`. Provide `mark(text)` that calls the decorated `label`.',
        fnName: 'mark',
        starter: `def shout(fn):
    def wrapper(text):
        pass
    return wrapper


@shout
def label(text):
    return text + " house"


def mark(text):
    pass
`,
        tests: [
          { args: ['owl'], expected: 'OWL HOUSE' },
          { args: ['hat'], expected: 'HAT HOUSE' },
          { args: ['tea'], expected: 'TEA HOUSE' },
        ],
        hints: [
          'wrapper should `return fn(text).upper()`.',
          '`mark` simply returns `label(text)` — the decorator already uppercases.',
          'Answer shape: wrapper returns `fn(text).upper()`; `mark` returns `label(text)`',
        ],
      },
    },

    {
      id: 'p16',
      name: 'The Closing Gate',
      concept: 'Context managers',
      brief:
        'A gate that always shuts behind you — whether the errand succeeded or an alarm sounded halfway through.',
      lesson: [
        {
          type: 'p',
          text: '`with` runs setup, yields a value, then guarantees cleanup. Files are the classic example; the pattern works for locks, connections and timers too.',
        },
        {
          type: 'code',
          code: `with open("notes.txt") as f:
    text = f.read()
# file is closed even if read() raised

from contextlib import contextmanager

@contextmanager
def tag(name):
    print(f"<{name}>")
    yield
    print(f"</{name}>")`,
        },
        {
          type: 'p',
          text: 'A class becomes a context manager with `__enter__` and `__exit__`. `__exit__` receives exception info and can suppress it by returning True.',
        },
        {
          type: 'note',
          text: 'In this browser vault you may not touch the real disk — practice the pattern with objects that record enter/exit instead.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Shut the gate. Write a `Gate` class: `__enter__` appends `"in"` to `self.log` and returns self; `__exit__` appends `"out"` and returns None. `walk(log)` uses `with Gate(log) as g` and appends `"walk"` to `g.log`, then returns the log.',
        fnName: 'walk',
        starter: `class Gate:
    def __init__(self, log):
        self.log = log

    def __enter__(self):
        pass

    def __exit__(self, exc_type, exc, tb):
        pass


def walk(log):
    pass
`,
        tests: [
          { args: [[]], expected: ['in', 'walk', 'out'] },
          { args: [['start']], expected: ['start', 'in', 'walk', 'out'] },
        ],
        hints: [
          '`__enter__` should mutate the log, then `return self`.',
          '`__exit__` appends `"out"`; it can ignore the exception args.',
          'Answer shape: inside `walk`, `with Gate(log) as g: g.log.append("walk")` then `return log`',
        ],
      },
    },

    {
      id: 'p17',
      name: 'The Record Card',
      concept: 'Dataclasses',
      brief:
        'A card that writes its own `__init__`, `__repr__` and comparisons from a short list of fields.',
      lesson: [
        {
          type: 'p',
          text: '`@dataclass` turns annotated fields into a boilerplate-free class for storing data.',
        },
        {
          type: 'code',
          code: `from dataclasses import dataclass

@dataclass
class Room:
    name: str
    level: int = 1

Room("Cellar", 0)
# Room(name='Cellar', level=0)`,
        },
        {
          type: 'p',
          text: 'Add `order=True` for comparison operators, or `frozen=True` for immutability. Defaults must follow non-default fields.',
        },
        {
          type: 'note',
          text: 'Dataclasses are for records. Behaviour-heavy objects can still use them, but a plain class is fine when you write `__init__` yourself anyway.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Stamp the card. Define a `@dataclass` `Room` with fields `name: str` and `level: int = 1`. Write `describe(name)` that returns `f"{Room(name).name}:{Room(name).level}"` — or build one instance and format it.',
        fnName: 'describe',
        starter: `from dataclasses import dataclass

@dataclass
class Room:
    pass


def describe(name):
    pass
`,
        tests: [
          { args: ['Cellar'], expected: 'Cellar:1' },
          { args: ['Spire'], expected: 'Spire:1' },
          { args: ['Archive'], expected: 'Archive:1' },
        ],
        hints: [
          'Fields: `name: str` and `level: int = 1` inside the class body.',
          'Build `Room(name)` once, then format name and level.',
          'Answer shape: `r = Room(name); return f"{r.name}:{r.level}"`',
        ],
      },
    },

    {
      id: 'p18',
      name: 'The Open Ledger',
      concept: '*args & **kwargs',
      brief:
        'A ledger that accepts any number of lines, and any named annotations in the margin — without rewriting the heading each time.',
      lesson: [
        {
          type: 'p',
          text: '`*args` gathers extra positional arguments into a tuple. `**kwargs` gathers extra keyword arguments into a dict.',
        },
        {
          type: 'code',
          code: `def label(prefix, *parts, **opts):
    body = " ".join(parts)
    shout = opts.get("shout", False)
    text = f"{prefix} {body}".strip()
    return text.upper() if shout else text

label("Room", "of", "Requirement", shout=True)
# 'ROOM OF REQUIREMENT'`,
        },
        {
          type: 'p',
          text: 'When calling, `*` unpacks a sequence into positionals and `**` unpacks a mapping into keywords.',
        },
        {
          type: 'note',
          text: 'Put `*args` before `**kwargs`. Keyword-only parameters can sit after `*` for clarity.',
        },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Open the ledger. Write `join_words(*words, sep=" ")` that joins the words with `sep` and returns the string.',
        fnName: 'join_words',
        starter: `def join_words(*words, sep=" "):
    pass
`,
        tests: [
          { args: ['a', 'b', 'c'], expected: 'a b c' },
          { args: ['one', 'two'], expected: 'one two' },
          { args: [], expected: '' },
        ],
        hints: [
          '`sep.join(words)` — words is already a tuple of strings.',
          'The tests call with plain positionals; sep stays at its default.',
          'Answer shape: `return sep.join(words)`',
        ],
      },
    },
  ],
}
