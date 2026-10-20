export default {
  track: 'html',
  id: 'entrance-hall',
  name: 'The Entrance Hall',
  tagline: 'HTML, from the first tag',
  icon: '📜',
  rooms: [
    {
      id: 'h1',
      name: 'The First Inscription',
      concept: 'Elements & tags',
      brief:
        'The great oak doors are shut. Carved into the stone above them is half a sentence, and a chisel rests on the ledge. The rest, it seems, is yours to cut.',
      lesson: [
        {
          type: 'p',
          text: 'HTML marks up text to say what it *means*. You wrap content in a tag, and the tag gives it a job.',
        },
        {
          type: 'code',
          code: `<h1>The Entrance Hall</h1>
<p>A paragraph of ordinary prose.</p>`,
        },
        {
          type: 'p',
          text: 'Almost every element has an opening tag, some content, and a closing tag with a slash. `<h1>` opens, `</h1>` closes.',
        },
        {
          type: 'p',
          text: 'Headings run from `<h1>` down to `<h6>`. `<h1>` is the title of the page — use exactly one. The rest are subheadings, and you do not skip levels for looks.',
        },
        {
          type: 'code',
          code: `<h1>The castle</h1>
<h2>The ground floor</h2>
<h3>The Entrance Hall</h3>`,
        },
        {
          type: 'note',
          text: 'A tag describes meaning, never appearance. `<h1>` does not mean "big text" — it means "this is the title". How it looks is CSS’s job, and you will meet that on the next floor.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Cut the inscription. Write an `<h1>` reading exactly **The Entrance Hall**, and under it a `<p>` reading exactly **Mind the staircases.**',
        starter: `<!-- your inscription goes here -->
`,
        checks: [
          { kind: 'exists', sel: 'h1', describe: 'there is an <h1>' },
          { kind: 'text', sel: 'h1', expected: 'The Entrance Hall', describe: 'the <h1> reads correctly' },
          { kind: 'exists', sel: 'p', describe: 'there is a <p>' },
          { kind: 'text', sel: 'p', expected: 'Mind the staircases.', describe: 'the <p> reads correctly' },
        ],
        hints: [
          'An element is written `<tag>content</tag>` — the closing tag repeats the name with a slash in front.',
          'You need two elements, one after the other, each on its own line.',
          'Answer shape: `<h1>The Entrance Hall</h1>` then `<p>Mind the staircases.</p>`',
        ],
      },
    },

    {
      id: 'h2',
      name: 'The Nesting Doors',
      concept: 'Nesting & structure',
      brief:
        'A door inside a door inside a door. Each fits neatly within the last. One of them has been hung crooked, straddling its neighbour, and the whole frame has jammed.',
      lesson: [
        {
          type: 'p',
          text: 'Elements go *inside* other elements. An element that contains another is its parent; the one inside is its child.',
        },
        {
          type: 'code',
          code: `<div>
  <h2>A section</h2>
  <p>Some prose inside the same box.</p>
</div>`,
        },
        {
          type: 'p',
          text: 'Nesting must be **properly closed**: the tag you opened last is the tag you close first. Overlapping them is not allowed.',
        },
        {
          type: 'code',
          code: `<p>Perfectly <strong>fine</strong> here.</p>

<!-- wrong: <strong> is closed after the </p> that contains it -->
<p>Quite <strong>broken</p></strong>`,
        },
        {
          type: 'p',
          text: '`<div>` is a plain box with no meaning of its own — a grouping tool. `<span>` is the same idea for a run of text inside a line.',
        },
        {
          type: 'note',
          text: 'Indent every level by two spaces. Nothing enforces it, but nesting you cannot see is nesting you will get wrong.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Hang the doors properly. Make a `<div>` that contains an `<h2>` reading **Chamber of Secrets** and a `<p>` reading **It is not, in fact, a secret.** Both must be *inside* the div.',
        starter: `<div>

</div>
`,
        checks: [
          { kind: 'exists', sel: 'div', describe: 'there is a <div>' },
          { kind: 'nested', sel: 'h2', within: 'div', describe: 'the <h2> is inside the <div>' },
          { kind: 'nested', sel: 'p', within: 'div', describe: 'the <p> is inside the <div>' },
          { kind: 'text', sel: 'div h2', expected: 'Chamber of Secrets', describe: 'the heading reads correctly' },
          {
            kind: 'text',
            sel: 'div p',
            expected: 'It is not, in fact, a secret.',
            describe: 'the paragraph reads correctly',
          },
        ],
        hints: [
          'Write the two elements between the `<div>` and the `</div>` that are already there.',
          'The selector `div h2` means "an h2 somewhere inside a div" — that is what is being checked.',
          'Answer shape: the div contains `<h2>Chamber of Secrets</h2>` and then `<p>It is not, in fact, a secret.</p>`',
        ],
      },
    },

    {
      id: 'h3',
      name: 'The Portrait Frames',
      concept: 'Attributes, links & images',
      brief:
        'Every portrait in the hall has a small brass plate: who it is, and where the sitter went. The plates are blank, and the portraits will not speak until they are filled in.',
      lesson: [
        {
          type: 'p',
          text: 'Attributes are extra information written *inside* the opening tag, as `name="value"`.',
        },
        {
          type: 'code',
          code: `<a href="https://example.com">Visit the village</a>`,
        },
        {
          type: 'p',
          text: 'That is an anchor — a link. `href` is where it goes; the content between the tags is what you click.',
        },
        {
          type: 'p',
          text: 'Some elements have no content at all, so they never close. `<img>` is the common one:',
        },
        {
          type: 'code',
          code: `<img src="owl.png" alt="A barn owl carrying a letter">`,
        },
        {
          type: 'p',
          text: '`src` is the file. `alt` is what the image *says*, for a reader who cannot see it — a screen reader, or a browser that failed to load it. It is not optional.',
        },
        {
          type: 'note',
          text: 'Values go in quotes. `id` must be unique on the page; `class` may be shared by as many elements as you like. Both matter enormously once CSS arrives.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Fill in the plate. Write a link whose `href` is exactly `/great-hall` and whose text is **To the Great Hall**, then an image with `src` of `owl.png` and an `alt` of **An owl with a letter**.',
        starter: `<!-- the link, then the image -->
`,
        checks: [
          { kind: 'exists', sel: 'a', describe: 'there is a link' },
          { kind: 'attr', sel: 'a', name: 'href', expected: '/great-hall', describe: 'the link points to /great-hall' },
          { kind: 'text', sel: 'a', expected: 'To the Great Hall', describe: 'the link text reads correctly' },
          { kind: 'exists', sel: 'img', describe: 'there is an image' },
          { kind: 'attr', sel: 'img', name: 'src', expected: 'owl.png', describe: 'the image src is owl.png' },
          {
            kind: 'attr',
            sel: 'img',
            name: 'alt',
            expected: 'An owl with a letter',
            describe: 'the image has proper alt text',
          },
        ],
        hints: [
          'A link is `<a href="…">text</a>`. The href is an attribute; the text sits between the tags.',
          '`<img>` has no closing tag and no content — everything it needs is an attribute.',
          'Answer shape: `<a href="/great-hall">To the Great Hall</a>` and `<img src="owl.png" alt="An owl with a letter">`',
        ],
      },
    },

    {
      id: 'h4',
      name: 'The Roll of Names',
      concept: 'Lists',
      brief:
        'A long parchment hangs by the stairs, listing every student in the year. Someone has written them as one unbroken smear of prose, and nobody can find their own name.',
      lesson: [
        { type: 'p', text: 'There are two everyday lists, and the difference is whether order matters.' },
        {
          type: 'code',
          code: `<ul>
  <li>Bats</li>
  <li>Cauldrons</li>
</ul>`,
        },
        {
          type: 'p',
          text: '`<ul>` is *unordered* — a bag of things, rendered with bullets. Use it when shuffling the items would change nothing.',
        },
        {
          type: 'code',
          code: `<ol>
  <li>Light the fire</li>
  <li>Add the water</li>
  <li>Stir, twice</li>
</ol>`,
        },
        {
          type: 'p',
          text: '`<ol>` is *ordered* — a sequence, numbered automatically. Use it when step two only makes sense after step one.',
        },
        {
          type: 'p',
          text: 'Either way, every item is an `<li>`, and an `<li>` only ever lives directly inside a `<ul>` or an `<ol>`.',
        },
        {
          type: 'note',
          text: 'You never type the bullets or the numbers. The browser draws them, and CSS can change them to anything you like later.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Rewrite the roll. Make an **unordered** list with exactly three items: **Gryffindor**, **Ravenclaw** and **Hufflepuff**, in that order.',
        starter: `<ul>

</ul>
`,
        checks: [
          { kind: 'exists', sel: 'ul', describe: 'there is a <ul>' },
          { kind: 'count', sel: 'ul li', expected: 3, describe: 'it has exactly three items' },
          { kind: 'text', sel: 'ul li:nth-child(1)', expected: 'Gryffindor', describe: 'the first item' },
          { kind: 'text', sel: 'ul li:nth-child(2)', expected: 'Ravenclaw', describe: 'the second item' },
          { kind: 'text', sel: 'ul li:nth-child(3)', expected: 'Hufflepuff', describe: 'the third item' },
        ],
        hints: [
          'Each name needs wrapping in its own `<li>` … `</li>`.',
          'Three items means three `<li>` elements, between the `<ul>` and `</ul>` already written for you.',
          'Answer shape: `<li>Gryffindor</li>`, then the same for Ravenclaw, then Hufflepuff.',
        ],
      },
    },

    {
      id: 'h5',
      name: 'The Sorting Form',
      concept: 'Forms & inputs',
      brief:
        'A lectern holds a form for new arrivals: name, house, and whether they brought an owl. Every field has been torn out, and the quill is tapping impatiently.',
      lesson: [
        {
          type: 'p',
          text: 'A form collects answers. `<input>` is the workhorse, and its `type` decides what kind of field you get.',
        },
        {
          type: 'code',
          code: `<form>
  <input type="text" name="student">
  <input type="email" name="owl_address">
  <input type="checkbox" name="has_owl">
  <button type="submit">Send</button>
</form>`,
        },
        {
          type: 'p',
          text: '`name` is what the answer is called when the form is sent. Without it, the field is collected but nameless — and therefore useless.',
        },
        {
          type: 'p',
          text: 'Every field needs a label, and the label must be *tied* to it. Give the input an `id`, and point the label at it with `for`:',
        },
        {
          type: 'code',
          code: `<label for="student">Your name</label>
<input type="text" id="student" name="student">`,
        },
        {
          type: 'note',
          text: 'A tied label is not decoration. Clicking it focuses the field, and a screen reader reads it aloud when the field is reached. An untied field is one a great many people simply cannot fill in.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Rebuild the field. Inside a `<form>`, put a `<label>` reading **Your name** tied to a text input whose `id` and `name` are both `student`, and a submit button reading **Sort me**.',
        starter: `<form>

</form>
`,
        checks: [
          { kind: 'exists', sel: 'form', describe: 'there is a <form>' },
          { kind: 'exists', sel: 'form label', describe: 'the form has a <label>' },
          { kind: 'text', sel: 'form label', expected: 'Your name', describe: 'the label reads correctly' },
          { kind: 'attr', sel: 'form label', name: 'for', expected: 'student', describe: 'the label is tied with for="student"' },
          { kind: 'attr', sel: 'form input', name: 'type', expected: 'text', describe: 'the input is a text field' },
          { kind: 'attr', sel: 'form input', name: 'id', expected: 'student', describe: 'the input has id="student"' },
          { kind: 'attr', sel: 'form input', name: 'name', expected: 'student', describe: 'the input has name="student"' },
          { kind: 'text', sel: 'form button', expected: 'Sort me', describe: 'the button reads correctly' },
        ],
        hints: [
          'Three elements go inside the form: a label, an input, and a button.',
          'The label’s `for` and the input’s `id` must be the same word — that is what ties them together.',
          'Answer shape: `<label for="student">Your name</label>`, `<input type="text" id="student" name="student">`, `<button type="submit">Sort me</button>`',
        ],
      },
    },

    {
      id: 'h6',
      name: 'The Timetable',
      concept: 'Semantic HTML & tables',
      brief:
        'The week’s timetable is pinned to the wall, drawn entirely with dividers and spacing. It looks like a table to you. To anyone who cannot see it, it is gibberish.',
      lesson: [
        {
          type: 'p',
          text: 'A `<div>` says nothing. Semantic elements say what a region *is*, and browsers, search engines and screen readers all act on that.',
        },
        {
          type: 'code',
          code: `<header>  the top of the page or a section
<nav>     a set of navigation links
<main>    the main content — one per page
<section> a thematic grouping
<article> something that stands alone
<footer>  the bottom matter`,
        },
        {
          type: 'p',
          text: 'Reach for these before `<div>`. Use `<div>` when there is genuinely no meaning to express — only grouping.',
        },
        { type: 'p', text: 'Real tabular data belongs in a real table:' },
        {
          type: 'code',
          code: `<table>
  <thead>
    <tr><th>Day</th><th>Class</th></tr>
  </thead>
  <tbody>
    <tr><td>Monday</td><td>Charms</td></tr>
  </tbody>
</table>`,
        },
        {
          type: 'p',
          text: '`<tr>` is a row. `<th>` is a heading cell, `<td>` an ordinary one. `<thead>` and `<tbody>` separate the headings from the data.',
        },
        {
          type: 'note',
          text: 'Never lay out a page with a table, and never fake a table with divs. Both were common once, and both make a page unreadable to anyone not looking at it with their eyes.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Draw the timetable properly. Inside a `<main>`, build a `<table>` with a `<thead>` row of two `<th>` cells — **Day** and **Class** — and a `<tbody>` row of two `<td>` cells: **Monday** and **Charms**.',
        starter: `<main>
  <table>

  </table>
</main>
`,
        checks: [
          { kind: 'exists', sel: 'main', describe: 'there is a <main>' },
          { kind: 'nested', sel: 'table', within: 'main', describe: 'the table is inside <main>' },
          { kind: 'count', sel: 'thead th', expected: 2, describe: 'the head row has two <th> cells' },
          { kind: 'text', sel: 'thead th:nth-child(1)', expected: 'Day', describe: 'the first heading' },
          { kind: 'text', sel: 'thead th:nth-child(2)', expected: 'Class', describe: 'the second heading' },
          { kind: 'count', sel: 'tbody td', expected: 2, describe: 'the body row has two <td> cells' },
          { kind: 'text', sel: 'tbody td:nth-child(1)', expected: 'Monday', describe: 'the first cell' },
          { kind: 'text', sel: 'tbody td:nth-child(2)', expected: 'Charms', describe: 'the second cell' },
        ],
        hints: [
          'The table needs a `<thead>` and a `<tbody>`, and each of those needs a `<tr>` inside it.',
          'Heading cells are `<th>`; ordinary cells are `<td>`. Two of each, in one row each.',
          'Answer shape: `<thead><tr><th>Day</th><th>Class</th></tr></thead>` then `<tbody><tr><td>Monday</td><td>Charms</td></tr></tbody>`',
        ],
      },
    },
  ],
}
