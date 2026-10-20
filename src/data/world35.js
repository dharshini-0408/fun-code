export default {
  track: 'python',
  id: 'advanced-wing',
  name: 'The Advanced Wing',
  tagline: 'Typing, asyncio shape, ABC, testing and packages',
  icon: '🏛️',
  rooms: [
    {
      id: 'p31',
      name: 'The Annotated Scroll',
      concept: 'Type hints',
      brief: 'Notes on the scroll saying what each name should hold — for humans and type-checkers.',
      lesson: [
        { type: 'p', text: 'Annotations like `def f(x: int) -> str` document types. `Optional`, `list[str]`, `TypedDict` refine them.' },
        { type: 'code', code: `from typing import Optional

def greet(name: str, title: Optional[str] = None) -> str:
    return f"{title or 'Mx'} {name}"` },
        { type: 'note', text: 'Hints are not enforced at runtime unless you add a checker or validator.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `greet(name, title=None)` returning `f"{title} {name}"` when title is given, otherwise `f"Mx {name}"`.',
        fnName: 'greet',
        starter: `def greet(name, title=None):\n    pass\n`,
        tests: [
          { args: ['Ada'], expected: 'Mx Ada' },
          { args: ['Ada', 'Dr'], expected: 'Dr Ada' },
          { args: ['Tom', 'Mr'], expected: 'Mr Tom' },
        ],
        hints: ['title or "Mx"', 'f-string', 'Default None'],
      },
    },
    {
      id: 'p32',
      name: 'The Async Owl',
      concept: 'asyncio shape',
      brief: 'Many owls in flight — await each return without blocking the roost.',
      lesson: [
        { type: 'p', text: '`async def` + `await` schedule concurrent I/O. `asyncio.gather` runs many awaitables together.' },
        { type: 'code', code: `async def load(n):
    await asyncio.sleep(0)
    return n

async def main():
    return await asyncio.gather(load(1), load(2))` },
        { type: 'note', text: 'Async helps waiting, not heavy CPU. Use threads/processes for CPU-bound work.' },
      ],
      puzzle: {
        kind: 'python',
        prompt:
          'Model an awaitable chain without the event loop: write `async_steps(values)` that returns a list of `{ "done": True, "value": v * 2 }` for each v — the shape you would get after awaiting many tasks.',
        fnName: 'async_steps',
        starter: `def async_steps(values):\n    pass\n`,
        tests: [
          { args: [[1, 2, 3]], expected: [{ done: true, value: 2 }, { done: true, value: 4 }, { done: true, value: 6 }] },
          { args: [[]], expected: [] },
          { args: [[0]], expected: [{ done: true, value: 0 }] },
        ],
        hints: [
          'List comprehension or a loop building dicts',
          'Keys are done and value',
          'value is v * 2',
        ],
      },
    },
    {
      id: 'p33',
      name: 'The Abstract Blueprint',
      concept: 'ABCs',
      brief: 'A blueprint that cannot be built until subclasses fill in the missing methods.',
      lesson: [
        { type: 'p', text: '`abc.ABC` and `@abstractmethod` force subclasses to implement an API.' },
        { type: 'code', code: `from abc import ABC, abstractmethod

class Door(ABC):
    @abstractmethod
    def open(self): ...

class Oak(Door):
    def open(self):
        return "creak"` },
        { type: 'note', text: 'Instantiating a class with abstract methods left raises TypeError.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Define abstract `Door` with abstract `open(self)`. Define `Oak(Door)` with `open` returning `"creak"`. `open_oak()` returns `Oak().open()`.',
        fnName: 'open_oak',
        starter: `from abc import ABC, abstractmethod\n\nclass Door(ABC):\n    pass\n\n\ndef open_oak():\n    pass\n`,
        tests: [
          { args: [], expected: 'creak' },
        ],
        hints: ['@abstractmethod on open', 'Oak implements open', 'open_oak instantiates Oak'],
      },
    },
    {
      id: 'p34',
      name: 'The Proof Chamber',
      concept: 'Testing basics',
      brief: 'Prove a function with assertions — small, fast, and automated.',
      lesson: [
        { type: 'p', text: '`assert` in pytest-style tests, or `unittest.TestCase`. Test behaviour, not implementation gossip.' },
        { type: 'code', code: `def test_add():
    assert add(1, 2) == 3

import unittest
class T(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(1, 2), 3)` },
        { type: 'note', text: 'One behaviour per test. Names describe the intent.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `assert_equal(a, b)` that returns `True` when `a == b`, otherwise raises `AssertionError` with message `"not equal"`.',
        fnName: 'assert_equal',
        starter: `def assert_equal(a, b):\n    pass\n`,
        tests: [
          { args: [1, 1], expected: true },
          { args: ['a', 'a'], expected: true },
        ],
        hints: ['if a == b: return True', 'raise AssertionError("not equal")', 'Do not return False'],
      },
    },
    {
      id: 'p35',
      name: 'The Package Shelf',
      concept: 'Modules & packages',
      brief: 'Shelves of modules, and a package that groups them under one name.',
      lesson: [
        { type: 'p', text: 'A package is a directory with imports. Relative imports use leading dots. `__init__.py` can re-export.' },
        { type: 'code', code: `# castle/rooms.py
def open(): ...

# castle/__init__.py
from .rooms import open` },
        { type: 'note', text: 'Prefer absolute imports in apps; relative imports inside packages.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `qualname(package, module)` returning `package + "." + module`.',
        fnName: 'qualname',
        starter: `def qualname(package, module):\n    pass\n`,
        tests: [
          { args: ['castle', 'rooms'], expected: 'castle.rooms' },
          { args: ['a', 'b'], expected: 'a.b' },
        ],
        hints: ['Join with a dot', 'f-string or +', 'No extra spaces'],
      },
    },
    {
      id: 'p36',
      name: 'The Sorted Ledger',
      concept: 'Multi-key sorting',
      brief: 'Sort by house, then by name — two keys in one pass.',
      lesson: [
        { type: 'p', text: '`sorted(rows, key=lambda r: (r["house"], r["name"]))` sorts by multiple fields. `operator.itemgetter` is the tidy alternative.' },
        { type: 'code', code: `from operator import itemgetter
sorted(rows, key=itemgetter("house", "name"))` },
        { type: 'note', text: 'Tuples compare left to right — perfect for multi-key order.' },
      ],
      puzzle: {
        kind: 'python',
        prompt: 'Write `sort_students(rows)` sorting dicts by `house` then `name` ascending.',
        fnName: 'sort_students',
        starter: `def sort_students(rows):\n    pass\n`,
        tests: [
          {
            args: [[{ name: 'b', house: 'g' }, { name: 'a', house: 'g' }, { name: 'c', house: 'r' }]],
            expected: [{ name: 'a', house: 'g' }, { name: 'b', house: 'g' }, { name: 'c', house: 'r' }],
          },
          { args: [[]], expected: [] },
        ],
        hints: ['key=lambda r: (r["house"], r["name"])', 'sorted returns a new list', 'Empty stays empty'],
      },
    },
  ],
}
