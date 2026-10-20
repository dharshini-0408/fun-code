export default {
  track: 'python',
  id: 'python-advanced-ii',
  name: 'The Upper Laboratory',
  tagline: 'nonlocal, pathlib, yield from, duck typing, slots and typed sets',
  icon: '🔬',
  rooms: [
    {
      id: 'p43',
      name: 'The Nested Scope',
      concept: 'nonlocal',
      brief: 'A counter closed over in an inner function — rebound with nonlocal.',
      lesson: [
        { type: 'p', text: '`nonlocal` rebinds a name in an enclosing function. `global` rebinds a module name.' },
        { type: 'code', code: `def make_counter():
    n = 0
    def inc():
        nonlocal n
        n += 1
        return n
    return inc` },
        { type: 'note', text: 'Prefer returning values over global/nonlocal when clarity allows.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `make_counter()` returning a zero-arg function that returns 1, then 2, then 3… (nonlocal). `third()` should return the third call result (3).',
        fnName: 'third',
        starter: `def make_counter():\n    pass\n\ndef third():\n    pass\n`,
        tests: [{ args: [], expected: 3 }],
        hints: ['n = 0 then nonlocal n', 'inc returns n after += 1', 'third: c=make_counter(); c(); c(); return c()'],
      },
    },
    {
      id: 'p44',
      name: 'The Path Quill',
      concept: 'pathlib shape',
      brief: 'Paths as objects — join without raw string soup.',
      lesson: [
        { type: 'p', text: '`pathlib.Path` joins with `/`, and exposes `.name`, `.stem`, `.suffix`.' },
        { type: 'code', code: `from pathlib import Path
p = Path("rooms") / "c1.md"
p.suffix  # '.md'` },
        { type: 'note', text: 'Here we model joining as pure string logic matching Path behaviour for simple cases.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `join_path(a, b)` returning a single path with exactly one slash between.',
        fnName: 'join_path',
        starter: `def join_path(a, b):\n    pass\n`,
        tests: [
          { args: ['rooms', 'c1.md'], expected: 'rooms/c1.md' },
          { args: ['rooms/', '/c1.md'], expected: 'rooms/c1.md' },
        ],
        hints: ["a.rstrip('/')", "b.lstrip('/')", 'Join with /'],
      },
    },
    {
      id: 'p45',
      name: 'The Delegating Generator',
      concept: 'yield from',
      brief: 'Hand the stage to another iterable until it finishes.',
      lesson: [
        { type: 'p', text: '`yield from iterable` yields every item from a sub-iterator.' },
        { type: 'code', code: `def both():
    yield from [1, 2]
    yield from [3]` },
        { type: 'note', text: 'Cleaner than nested for-loops that only yield.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `chain_lists(a, b)` returning one list of a’s items then b’s (implement with a generator using yield from, then list it).',
        fnName: 'chain_lists',
        starter: `def chain_lists(a, b):\n    pass\n`,
        tests: [
          { args: [[1, 2], [3]], expected: [1, 2, 3] },
          { args: [[], [1]], expected: [1] },
        ],
        hints: ['def gen(): yield from a; yield from b', 'return list(gen())', 'Or list(a) + list(b)'],
      },
    },
    {
      id: 'p46',
      name: 'The Duck Test',
      concept: 'Duck typing check',
      brief: 'If it has a close() method, treat it as closable — structure over inheritance.',
      lesson: [
        { type: 'p', text: 'Python often uses duck typing. `Protocol` documents it for type-checkers; runtime uses `callable(getattr(...))`.' },
        { type: 'code', code: `def can_close(obj):
    return callable(getattr(obj, "close", None))` },
        { type: 'note', text: 'typing.Protocol is the static form of this idea.' },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Write `can_close(obj)` True when `close` is callable on obj. Write `probe(kind)` returning `can_close` on a tiny class with `close` when kind=="file", otherwise `can_close(0)`.',
        fnName: 'probe',
        starter: `def can_close(obj):\n    pass\n\ndef probe(kind):\n    pass\n`,
        tests: [
          { args: ['file'], expected: true },
          { args: ['nope'], expected: false },
        ],
        hints: [
          'can_close: callable(getattr(obj, "close", None))',
          'probe file: define class with close, instantiate',
          'else can_close(0)',
        ],
      },
    },
    {
      id: 'p47',
      name: 'The Slotted Creature',
      concept: '__slots__',
      brief: 'Fixed attribute names — leaner instances, no surprise fields.',
      lesson: [
        { type: 'p', text: '`__slots__ = ("x", "y")` limits attributes and can save memory.' },
        { type: 'code', code: `class Point:
    __slots__ = ("x", "y")
    def __init__(self, x, y):
        self.x = x
        self.y = y` },
        { type: 'note', text: 'Assigning a new attribute not in slots raises AttributeError.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write slotted `Point` and `make_point(x, y)` returning `[p.x, p.y]`.',
        fnName: 'make_point',
        starter: `class Point:\n    __slots__ = ("x", "y")\n    def __init__(self, x, y):\n        pass\n\ndef make_point(x, y):\n    pass\n`,
        tests: [
          { args: [1, 2], expected: [1, 2] },
          { args: [0, 0], expected: [0, 0] },
        ],
        hints: ['Assign self.x and self.y', 'make_point constructs Point', 'Return a two-element list'],
      },
    },
    {
      id: 'p48',
      name: 'The Guarded Set',
      concept: 'Typed assignment guard',
      brief: 'Refuse to store a value of the wrong kind — a descriptor’s job in miniature.',
      lesson: [
        { type: 'p', text: 'Descriptors run code on attribute set. A tiny version: only accept values of an expected built-in type name.' },
        { type: 'code', code: `def typed_set(store, key, value, kind):
    if kind == "int" and not isinstance(value, int):
        raise TypeError("bad type")
    store[key] = value
    return store` },
        { type: 'note', text: 'Real descriptors use `__set__` on a class attribute.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `typed_set(store, key, value, kind)` where kind is `"int"` or `"str"`. Store when the type matches; otherwise raise TypeError("bad type"). Return store.',
        fnName: 'typed_set',
        starter: `def typed_set(store, key, value, kind):\n    pass\n`,
        tests: [
          { args: [{}, 'n', 1, 'int'], expected: { n: 1 } },
          { args: [{}, 's', 'hi', 'str'], expected: { s: 'hi' } },
        ],
        hints: ['isinstance(value, int) for kind int', 'isinstance(value, str) for str', 'raise TypeError("bad type")'],
      },
    },
  ],
}
