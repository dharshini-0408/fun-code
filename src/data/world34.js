export default {
  track: 'python',
  id: 'workshop-bench',
  name: 'The Workshop Bench',
  tagline: 'Dict craft, files, itertools, functools, properties and main',
  icon: '🔧',
  rooms: [
    {
      id: 'p25',
      name: 'The Dictionary Drawer',
      concept: 'Dict methods',
      brief: 'Drawers that default, merge, and pop without KeyError drama.',
      lesson: [
        { type: 'p', text: '`get`, `setdefault`, `pop`, `|` merge (3.9+), and `update` cover everyday dict work.' },
        { type: 'code', code: `d.get("x", 0)
d.setdefault("seen", [])
e = d | {"b": 2}
d.pop("x", None)` },
        { type: 'note', text: '`setdefault` mutates; `get` does not.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `merge_counts(a, b)` returning a new dict with keys from both; values are sums when a key appears in both.',
        fnName: 'merge_counts',
        starter: `def merge_counts(a, b):\n    pass\n`,
        tests: [
          { args: [{ x: 1 }, { x: 2, y: 3 }], expected: { x: 3, y: 3 } },
          { args: [{}, { a: 1 }], expected: { a: 1 } },
          { args: [{ a: 1 }, {}], expected: { a: 1 } },
        ],
        hints: ['Start with a.copy()', 'Add each b key', 'Use get for missing'],
      },
    },
    {
      id: 'p26',
      name: 'The Ink Well',
      concept: 'File-like I/O',
      brief: 'Read and write scrolls — here, string buffers stand in for disk files.',
      lesson: [
        { type: 'p', text: 'Real files use `open` / `pathlib.Path`. The pattern is the same: read text, write text, close (or `with`).' },
        { type: 'code', code: `from io import StringIO
buf = StringIO()
buf.write("hello\\n")
buf.getvalue()  # 'hello\\n'` },
        { type: 'note', text: 'Always use text mode encoding explicitly in real programs (`encoding="utf-8"`).' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `write_lines(lines)` that joins lines with `\\n`, adds a trailing newline if lines is non-empty, and returns the text.',
        fnName: 'write_lines',
        starter: `def write_lines(lines):\n    pass\n`,
        tests: [
          { args: [['a', 'b']], expected: 'a\nb\n' },
          { args: [['only']], expected: 'only\n' },
          { args: [[]], expected: '' },
        ],
        hints: ['If not lines: return ""', '"\\n".join(lines) + "\\n"', 'No extra blank line for empty'],
      },
    },
    {
      id: 'p27',
      name: 'The Infinite Comb',
      concept: 'itertools',
      brief: 'Combs that chain, cycle, and group without hand-written index soup.',
      lesson: [
        { type: 'p', text: '`itertools` has `chain`, `groupby`, `count`, `islice`, `product`, and more.' },
        { type: 'code', code: `from itertools import chain, islice
list(chain([1, 2], [3]))
list(islice(count(), 3))  # 0,1,2` },
        { type: 'note', text: 'itertools returns iterators — wrap in list only when you need random access.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `flatten(rows)` that flattens one level of nested lists using `itertools.chain.from_iterable`.',
        fnName: 'flatten',
        starter: `from itertools import chain\n\ndef flatten(rows):\n    pass\n`,
        tests: [
          { args: [[[1, 2], [3]]], expected: [1, 2, 3] },
          { args: [[[], [1]]], expected: [1] },
          { args: [[]], expected: [] },
        ],
        hints: ['chain.from_iterable(rows)', 'Wrap in list(...)', 'Import chain'],
      },
    },
    {
      id: 'p28',
      name: 'The Cached Charm',
      concept: 'functools',
      brief: 'Remember expensive answers; bind arguments ahead of time.',
      lesson: [
        { type: 'p', text: '`functools.lru_cache`, `partial`, and `reduce` are everyday tools.' },
        { type: 'code', code: `from functools import lru_cache, partial, reduce
@lru_cache(maxsize=128)
def fib(n): ...
add1 = partial(int.__add__, 1)` },
        { type: 'note', text: 'Only cache pure functions with hashable arguments.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `product(nums)` that multiplies all numbers with `functools.reduce`, returning 1 for an empty list.',
        fnName: 'product',
        starter: `from functools import reduce\n\ndef product(nums):\n    pass\n`,
        tests: [
          { args: [[2, 3, 4]], expected: 24 },
          { args: [[5]], expected: 5 },
          { args: [[]], expected: 1 },
        ],
        hints: ['reduce(lambda a,b: a*b, nums, 1)', 'Initializer 1 handles empty', 'Import reduce'],
      },
    },
    {
      id: 'p29',
      name: 'The Guarded Attribute',
      concept: '@property & classmethod',
      brief: 'Attributes that compute themselves, and constructors that build from another shape.',
      lesson: [
        { type: 'p', text: '`@property` makes a method look like a field. `@classmethod` receives the class; `@staticmethod` receives neither.' },
        { type: 'code', code: `class Room:
    def __init__(self, w, h):
        self.w, self.h = w, h
    @property
    def area(self):
        return self.w * self.h
    @classmethod
    def square(cls, n):
        return cls(n, n)` },
        { type: 'note', text: 'Properties keep a stable API when storage changes.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write class `Room` with `w`,`h`, property `area`, and classmethod `square(n)` returning `Room(n,n)`. Then `area_of_square(n)` returns that area.',
        fnName: 'area_of_square',
        starter: `class Room:\n    def __init__(self, w, h):\n        pass\n\n\ndef area_of_square(n):\n    pass\n`,
        tests: [
          { args: [3], expected: 9 },
          { args: [1], expected: 1 },
          { args: [10], expected: 100 },
        ],
        hints: ['Store w and h', '@property area', 'square classmethod + area_of_square uses it'],
      },
    },
    {
      id: 'p30',
      name: 'The Entry Bell',
      concept: '__main__ guard',
      brief: 'A bell that rings only when the file is run directly — not when imported.',
      lesson: [
        { type: 'p', text: 'The pattern `if __name__ == "__main__":` gates scripts. Imports see `__name__` as the module name.' },
        { type: 'code', code: `def main():
    print("run")

if __name__ == "__main__":
    main()` },
        { type: 'note', text: 'Libraries should be import-safe; put CLI code under the guard.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `should_run(name)` returning True only when `name == "__main__"`.',
        fnName: 'should_run',
        starter: `def should_run(name):\n    pass\n`,
        tests: [
          { args: ['__main__'], expected: true },
          { args: ['workshop'], expected: false },
          { args: ['__init__'], expected: false },
        ],
        hints: ['Compare to the string __main__', 'Return a boolean', 'Exact match'],
      },
    },
  ],
}
