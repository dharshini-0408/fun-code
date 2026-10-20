export default {
  track: 'bootstrap',
  id: 'supply-cupboard',
  name: 'The Supply Cupboard',
  tagline: 'Bootstrap, and the shelves it comes on',
  icon: '🅱️',
  rooms: [
    {
      id: 'b1',
      name: 'The Ready-Made Shelf',
      concept: 'Utility classes',
      brief:
        'A cupboard of things already made: buttons, badges, boxes. Every one is labelled with the words that summon it, and you have been handing them out from scratch all term.',
      lesson: [
        {
          type: 'p',
          text: 'Bootstrap is a stylesheet of ready-made classes. You write no CSS at all — you name the classes on the element and the styling arrives.',
        },
        {
          type: 'code',
          code: `<button class="btn btn-primary">Save</button>
<button class="btn btn-danger">Delete</button>
<span class="badge bg-warning">New</span>`,
        },
        {
          type: 'p',
          text: 'The pattern repeats everywhere: a **base** class says what the thing is, a **modifier** says which variety. `btn` makes a button; `btn-danger` makes it the red one.',
        },
        { type: 'p', text: 'The colour names are fixed, and used by every component:' },
        {
          type: 'code',
          code: `primary  secondary  success
danger   warning    info
light    dark`,
        },
        {
          type: 'note',
          text: 'Bootstrap is already loaded in this room — there is no `<link>` to write. Everything you name here is real, and renders live beside you.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Take three things off the shelf: a **primary** button reading **Save**, a **danger** button reading **Delete**, and a `<span>` badge with a **warning** background reading **New**.',
        starter: `<!-- base class first, then the modifier -->
`,
        checks: [
          { kind: 'exists', sel: 'button.btn.btn-primary', describe: 'there is a primary button' },
          { kind: 'text', sel: 'button.btn.btn-primary', expected: 'Save', describe: 'it reads Save' },
          { kind: 'exists', sel: 'button.btn.btn-danger', describe: 'there is a danger button' },
          { kind: 'text', sel: 'button.btn.btn-danger', expected: 'Delete', describe: 'it reads Delete' },
          { kind: 'exists', sel: 'span.badge.bg-warning', describe: 'there is a warning badge' },
          { kind: 'text', sel: 'span.badge.bg-warning', expected: 'New', describe: 'it reads New' },
        ],
        hints: [
          'Every button needs *two* classes: `btn` and then its colour, e.g. `btn-primary`.',
          'The badge is a `<span>` with `badge` and `bg-warning`.',
          'Answer shape: `<button class="btn btn-primary">Save</button>`, the same with `btn-danger`, then `<span class="badge bg-warning">New</span>`',
        ],
      },
    },

    {
      id: 'b2',
      name: 'The Twelve Columns',
      concept: 'The grid system',
      brief:
        'The cupboard floor is ruled into twelve narrow strips. Anything you set down must be measured in strips, and anything that adds to more than twelve falls off the edge.',
      lesson: [
        {
          type: 'p',
          text: 'Bootstrap divides every row into **twelve** columns. You say how many each child should span, and they add up to twelve.',
        },
        {
          type: 'code',
          code: `<div class="container">
  <div class="row">
    <div class="col-6">Half</div>
    <div class="col-6">Half</div>
  </div>
</div>`,
        },
        {
          type: 'p',
          text: 'The nesting is fixed and you cannot skip a level: a `container` holds `row`s, and a `row` holds `col`s. Columns go nowhere else.',
        },
        {
          type: 'code',
          code: `col-4  col-4  col-4     /* thirds     */
col-8  col-4            /* two thirds, one third */
col-12                  /* full width */`,
        },
        {
          type: 'p',
          text: 'A breakpoint letter makes it responsive: `col-md-6` means *half, once the screen is medium or wider* — and full width below that.',
        },
        {
          type: 'note',
          text: 'The breakpoints are `sm`, `md`, `lg`, `xl`, `xxl`. `col-12 col-md-6` is the single most common pairing there is: stacked on a phone, side by side on a laptop.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Rule the floor. Inside a `container` and a `row`, place two columns that are **full width on small screens and half width from medium up** — so each carries both `col-12` and `col-md-6`.',
        starter: `<div class="container">
  <div class="row">

  </div>
</div>
`,
        checks: [
          { kind: 'exists', sel: '.container', describe: 'there is a container' },
          { kind: 'nested', sel: '.row', within: '.container', describe: 'the row is inside the container' },
          { kind: 'count', sel: '.row > .col-12.col-md-6', expected: 2, describe: 'there are two col-12 col-md-6 columns' },
        ],
        hints: [
          'Two `<div>` elements go inside the row, each carrying two classes.',
          'The classes are `col-12` and `col-md-6`, both on the same element.',
          'Answer shape: `<div class="col-12 col-md-6">…</div>`, twice.',
        ],
      },
    },

    {
      id: 'b3',
      name: 'The Measured Spaces',
      concept: 'Spacing utilities',
      brief:
        'Everything on the shelves is jammed edge to edge. There is a ruler nailed to the door with six notches on it, and no space anywhere else.',
      lesson: [
        {
          type: 'p',
          text: 'Bootstrap has a shorthand for margin and padding, so you almost never write CSS for spacing.',
        },
        {
          type: 'code',
          code: `m = margin      p = padding

t = top    b = bottom
s = start  e = end
x = left+right     y = top+bottom
(none) = all four sides`,
        },
        { type: 'p', text: 'Then a number from 0 to 5 for how much:' },
        {
          type: 'code',
          code: `<div class="p-3">padding, all sides</div>
<div class="mt-4">margin on top only</div>
<div class="px-2 py-4">padding: narrow sides, tall ends</div>
<div class="m-0">no margin at all</div>`,
        },
        {
          type: 'p',
          text: 'The scale is not pixels — it is steps. `3` is the everyday one, `0` removes spacing a component came with.',
        },
        {
          type: 'note',
          text: '`s` and `e` mean *start* and *end*, not left and right. In a right-to-left language they swap, which is exactly what you want and why `ms-auto` pushes something to the far side correctly in every language.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Measure the shelf. Make a `<div>` with the classes for **padding 3 on all sides** and **margin-top 4**, containing the text **Room to breathe.**',
        starter: `<!-- one div, two spacing classes -->
`,
        checks: [
          { kind: 'exists', sel: 'div.p-3.mt-4', describe: 'a div carries both p-3 and mt-4' },
          { kind: 'text', sel: 'div.p-3.mt-4', expected: 'Room to breathe.', describe: 'it reads correctly' },
        ],
        hints: [
          'Padding on all sides needs no side letter at all — just the property and the number.',
          'Margin on top is `m`, then `t`, then the number.',
          'Answer shape: `<div class="p-3 mt-4">Room to breathe.</div>`',
        ],
      },
    },

    {
      id: 'b4',
      name: 'The Card Index',
      concept: 'Components',
      brief:
        'A drawer of index cards, each one a heading, a note and a way onward. Every card in the drawer is blank, and the drawer will not shut until one is filled.',
      lesson: [
        {
          type: 'p',
          text: 'Components are several classes working together in a fixed arrangement. The card is the one you will reach for most.',
        },
        {
          type: 'code',
          code: `<div class="card">
  <div class="card-body">
    <h5 class="card-title">Charms</h5>
    <p class="card-text">Thursday, third floor.</p>
    <a href="#" class="btn btn-primary">Timetable</a>
  </div>
</div>`,
        },
        {
          type: 'p',
          text: 'The nesting matters. `card` is the frame and `card-body` supplies the padding; the title, text and button live inside the body, not the frame.',
        },
        { type: 'p', text: 'The alert is the other everyday one, and much simpler:' },
        {
          type: 'code',
          code: `<div class="alert alert-success">It worked.</div>
<div class="alert alert-danger">It did not.</div>`,
        },
        {
          type: 'note',
          text: 'Components that pop, slide or dismiss also need Bootstrap’s JavaScript. Cards, alerts and the grid are pure CSS, which is why they work here with nothing loaded but the stylesheet.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Fill in a card. Build a `card` with a `card-body` inside it, holding an `h5.card-title` reading **Charms** and a `p.card-text` reading **Thursday, third floor.**',
        starter: `<div class="card">

</div>
`,
        checks: [
          { kind: 'exists', sel: '.card', describe: 'there is a card' },
          { kind: 'nested', sel: '.card-body', within: '.card', describe: 'the card-body is inside the card' },
          { kind: 'exists', sel: '.card-body h5.card-title', describe: 'the title is inside the body' },
          { kind: 'text', sel: '.card-title', expected: 'Charms', describe: 'the title reads Charms' },
          { kind: 'exists', sel: '.card-body p.card-text', describe: 'the text is inside the body' },
          { kind: 'text', sel: '.card-text', expected: 'Thursday, third floor.', describe: 'the text reads correctly' },
        ],
        hints: [
          'The `card-body` div goes inside the card, and everything else goes inside the body.',
          'The heading must be an `<h5>` carrying the class `card-title`.',
          'Answer shape: `<div class="card-body"><h5 class="card-title">Charms</h5><p class="card-text">Thursday, third floor.</p></div>`',
        ],
      },
    },

    {
      id: 'b5',
      name: 'The Enrolment Slip',
      concept: 'Forms',
      brief:
        'A stack of enrolment slips, all of them unruled — the fields run into the labels and nobody can tell which box wants what.',
      lesson: [
        {
          type: 'p',
          text: 'Bootstrap does not change how a form *works* — the HTML you learned still applies. It supplies the classes that make it legible.',
        },
        {
          type: 'code',
          code: `<div class="mb-3">
  <label for="name" class="form-label">Your name</label>
  <input type="text" class="form-control" id="name">
</div>`,
        },
        {
          type: 'p',
          text: '`form-label` on the label, `form-control` on the input. The `mb-3` wrapper is what puts a gap between one field and the next.',
        },
        { type: 'p', text: 'The other controls follow the same idea:' },
        {
          type: 'code',
          code: `<select class="form-select">…</select>
<textarea class="form-control"></textarea>
<input type="checkbox" class="form-check-input">`,
        },
        {
          type: 'note',
          text: 'The `for` and `id` pairing from the HTML floor still matters, and Bootstrap will not do it for you. A pretty field nobody can use with a screen reader is still a broken field.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Rule the slip. Inside a `<form>`, make a `mb-3` wrapper holding a `form-label` reading **Your name** tied to a `form-control` text input with `id="name"`.',
        starter: `<form>

</form>
`,
        checks: [
          { kind: 'exists', sel: 'form .mb-3', describe: 'there is an mb-3 wrapper' },
          { kind: 'exists', sel: '.mb-3 label.form-label', describe: 'the label is inside it' },
          { kind: 'text', sel: 'label.form-label', expected: 'Your name', describe: 'the label reads correctly' },
          { kind: 'attr', sel: 'label.form-label', name: 'for', expected: 'name', describe: 'the label is tied with for="name"' },
          { kind: 'exists', sel: '.mb-3 input.form-control', describe: 'the input is inside it' },
          { kind: 'attr', sel: 'input.form-control', name: 'id', expected: 'name', describe: 'the input has id="name"' },
        ],
        hints: [
          'The wrapper `<div class="mb-3">` goes inside the form, and both the label and input go inside it.',
          'The label needs `class="form-label"` and `for="name"`; the input needs `class="form-control"` and `id="name"`.',
          'Answer shape: `<div class="mb-3"><label for="name" class="form-label">Your name</label><input type="text" class="form-control" id="name"></div>`',
        ],
      },
    },

    {
      id: 'b6',
      name: 'The Long Corridor',
      concept: 'Navigation & layout',
      brief:
        'The corridor out of the cupboard has doors on both sides and no signs on any of them. Somewhere there is a bar that names them all, if it can be assembled.',
      lesson: [
        {
          type: 'p',
          text: 'The navbar is the largest component you will meet, and it is only nesting: a bar, a brand, and a list of links.',
        },
        {
          type: 'code',
          code: `<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Hogwarts</a>
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#">Timetable</a>
      </li>
    </ul>
  </div>
</nav>`,
        },
        {
          type: 'p',
          text: '`navbar-expand-lg` is the responsive part: laid out as a row from large screens up, collapsed below. Every link is an `<a class="nav-link">` inside an `<li class="nav-item">`.',
        },
        {
          type: 'p',
          text: 'Two containers exist, and the difference matters: `container` stops at a maximum width and centres; `container-fluid` runs the whole way across.',
        },
        {
          type: 'note',
          text: 'Underneath, it is the semantic HTML from the first floor — a `<nav>` holding a `<ul>` of links. Bootstrap only supplies the paint. Get the structure right and the classes are decoration.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Sign the corridor. Build a `nav.navbar` containing a `container-fluid`, an `a.navbar-brand` reading **Hogwarts**, and a `ul.navbar-nav` with one `li.nav-item` holding an `a.nav-link` reading **Timetable**.',
        starter: `<nav class="navbar bg-light">

</nav>
`,
        checks: [
          { kind: 'exists', sel: 'nav.navbar', describe: 'there is a navbar' },
          { kind: 'nested', sel: '.container-fluid', within: 'nav.navbar', describe: 'it holds a container-fluid' },
          { kind: 'text', sel: 'a.navbar-brand', expected: 'Hogwarts', describe: 'the brand reads Hogwarts' },
          { kind: 'exists', sel: 'ul.navbar-nav li.nav-item', describe: 'there is a nav-item in the nav list' },
          { kind: 'text', sel: 'li.nav-item a.nav-link', expected: 'Timetable', describe: 'the link reads Timetable' },
        ],
        hints: [
          'Everything goes inside the `container-fluid`, which itself goes inside the nav.',
          'The link is nested three deep: `ul.navbar-nav` → `li.nav-item` → `a.nav-link`.',
          'Answer shape: `<div class="container-fluid"><a class="navbar-brand" href="#">Hogwarts</a><ul class="navbar-nav"><li class="nav-item"><a class="nav-link" href="#">Timetable</a></li></ul></div>`',
        ],
      },
    },
  ],
}
