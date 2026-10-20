export default {
  track: 'bootstrap',
  id: 'upper-cupboard',
  name: 'The Upper Cupboard',
  tagline: 'Alerts, tables, modals, flex and display utilities',
  icon: '🗄️',
  rooms: [
    {
      id: 'bt7',
      name: 'The Warning Banner',
      concept: 'Alerts',
      brief: 'A strip of colour across the top of the noticeboard — success, danger, or quiet information.',
      lesson: [
        {
          type: 'p',
          text: 'Bootstrap alerts are a `div` with `alert` plus a colour modifier like `alert-warning`.',
        },
        {
          type: 'code',
          code: `<div class="alert alert-success" role="alert">
  Saved.
</div>
<div class="alert alert-danger">Gone wrong.</div>`,
        },
        {
          type: 'note',
          text: 'Add `role="alert"` so assistive tech announces the message.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Hang two banners: a `div.alert.alert-success` with `role="alert"` reading **Saved.** and a `div.alert.alert-danger` reading **Try again.**',
        starter: `<!-- two alerts -->
`,
        checks: [
          { kind: 'exists', sel: '.alert.alert-success', describe: 'success alert exists' },
          { kind: 'attr', sel: '.alert.alert-success', name: 'role', expected: 'alert', describe: 'role=alert' },
          { kind: 'text', sel: '.alert.alert-success', expected: 'Saved.', describe: 'success text' },
          { kind: 'exists', sel: '.alert.alert-danger', describe: 'danger alert exists' },
          { kind: 'text', sel: '.alert.alert-danger', expected: 'Try again.', describe: 'danger text' },
        ],
        hints: [
          'Each alert needs both `alert` and a colour class.',
          'Success first, danger second.',
          'Answer shape: two divs with the classes and text from the prompt.',
        ],
      },
    },

    {
      id: 'bt8',
      name: 'The Ruled Ledger',
      concept: 'Tables',
      brief: 'Rows and columns, already striped and bordered if you name the right classes.',
      lesson: [
        {
          type: 'p',
          text: 'Put `table` on the `<table>`, then modifiers: `table-striped`, `table-bordered`, `table-hover`, `table-sm`.',
        },
        {
          type: 'code',
          code: `<table class="table table-striped">
  <thead><tr><th>House</th><th>Points</th></tr></thead>
  <tbody><tr><td>Gryffindor</td><td>120</td></tr></tbody>
</table>`,
        },
        {
          type: 'note',
          text: 'Wrap in `.table-responsive` for horizontal scroll on small screens.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Build a `table.table.table-striped` with a header row **House** / **Points** and one body row **Ravenclaw** / **98**.',
        starter: `<table class="table table-striped">

</table>
`,
        checks: [
          { kind: 'exists', sel: 'table.table.table-striped', describe: 'striped table' },
          { kind: 'text', sel: 'thead th:first-child', expected: 'House', describe: 'first heading' },
          { kind: 'text', sel: 'thead th:last-child', expected: 'Points', describe: 'second heading' },
          { kind: 'text', sel: 'tbody td:first-child', expected: 'Ravenclaw', describe: 'house cell' },
          { kind: 'text', sel: 'tbody td:last-child', expected: '98', describe: 'points cell' },
        ],
        hints: [
          'Use thead/tbody with tr and th/td.',
          'Two columns in each row.',
          'Classes stay on the table element.',
        ],
      },
    },

    {
      id: 'bt9',
      name: 'The Modal Arch',
      concept: 'Modal markup',
      brief: 'A doorway that opens in front of everything — title, body, and feet with buttons.',
      lesson: [
        {
          type: 'p',
          text: 'A Bootstrap modal is nested markup: `modal` → `modal-dialog` → `modal-content` → header / body / footer.',
        },
        {
          type: 'code',
          code: `<div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Confirm</h5></div>
      <div class="modal-body"><p>Proceed?</p></div>
      <div class="modal-footer"><button class="btn btn-primary">Yes</button></div>
    </div>
  </div>
</div>`,
        },
        {
          type: 'note',
          text: 'Showing it usually needs the Bootstrap JS bundle or data attributes. Here you only build the structure.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Build a modal shell: `.modal` > `.modal-dialog` > `.modal-content` with `.modal-header` containing `h5.modal-title` reading **Confirm**, and `.modal-body` with a `p` reading **Proceed?**',
        starter: `<div class="modal">

</div>
`,
        checks: [
          { kind: 'exists', sel: '.modal .modal-dialog .modal-content', describe: 'nested shell' },
          { kind: 'text', sel: '.modal-title', expected: 'Confirm', describe: 'title text' },
          { kind: 'exists', sel: '.modal-header .modal-title', describe: 'title in header' },
          { kind: 'text', sel: '.modal-body p', expected: 'Proceed?', describe: 'body text' },
        ],
        hints: [
          'Three nested wrappers before header/body.',
          'modal-title is an h5 inside modal-header.',
          'Follow the class names in the prompt exactly.',
        ],
      },
    },

    {
      id: 'bt10',
      name: 'The Flex Pegs',
      concept: 'Flex utilities',
      brief: 'Pegs and rails arranged with utility classes — no custom CSS required.',
      lesson: [
        {
          type: 'p',
          text: 'Bootstrap flex utilities: `d-flex`, `justify-content-between`, `align-items-center`, `gap-2`, `flex-column`.',
        },
        {
          type: 'code',
          code: `<div class="d-flex justify-content-between align-items-center gap-2">
  <span>Left</span><span>Right</span>
</div>`,
        },
        {
          type: 'note',
          text: 'These map straight onto flexbox properties you already know from CSS.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Make a `div` with classes `d-flex`, `justify-content-between`, `align-items-center`, and `gap-2`, containing spans **Left** and **Right**.',
        starter: `<div>

</div>
`,
        checks: [
          { kind: 'exists', sel: 'div.d-flex.justify-content-between.align-items-center.gap-2', describe: 'flex utilities present' },
          { kind: 'count', sel: 'div.d-flex > span', expected: 2, describe: 'two spans' },
          { kind: 'text', sel: 'div.d-flex > span:first-child', expected: 'Left', describe: 'first span' },
          { kind: 'text', sel: 'div.d-flex > span:last-child', expected: 'Right', describe: 'second span' },
        ],
        hints: [
          'All four classes go on the same div.',
          'Two span children with the given text.',
          'Class order does not matter.',
        ],
      },
    },

    {
      id: 'bt11',
      name: 'The Vanishing Ink',
      concept: 'Display utilities',
      brief: 'Ink that shows on wide desks and hides on narrow ones — or the other way around.',
      lesson: [
        {
          type: 'p',
          text: '`d-none` hides. `d-md-block` shows as block from the `md` breakpoint up. Pair them for responsive visibility.',
        },
        {
          type: 'code',
          code: `<p class="d-none d-md-block">Only on medium and up.</p>
<span class="d-inline d-md-none">Only on small screens.</span>`,
        },
        {
          type: 'note',
          text: 'Breakpoints: sm, md, lg, xl, xxl — same scale as the grid.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Write a `p` with classes `d-none` and `d-md-block` reading **Wide desk only.** and a `span` with `d-md-none` reading **Pocket scroll.**',
        starter: `<!-- responsive visibility -->
`,
        checks: [
          { kind: 'exists', sel: 'p.d-none.d-md-block', describe: 'paragraph utilities' },
          { kind: 'text', sel: 'p.d-none.d-md-block', expected: 'Wide desk only.', describe: 'p text' },
          { kind: 'exists', sel: 'span.d-md-none', describe: 'span utility' },
          { kind: 'text', sel: 'span.d-md-none', expected: 'Pocket scroll.', describe: 'span text' },
        ],
        hints: [
          'Paragraph gets both d-none and d-md-block.',
          'Span only needs d-md-none.',
          'Match the text exactly, including the period.',
        ],
      },
    },

    {
      id: 'bt12',
      name: 'The Accordion Fold',
      concept: 'Accordion markup',
      brief: 'A stack of folds — open one heading and its panel shows; the structure is what Bootstrap’s script expects.',
      lesson: [
        {
          type: 'p',
          text: 'Accordions nest `accordion` → `accordion-item` → `accordion-header` + `accordion-collapse` / `accordion-body`.',
        },
        {
          type: 'code',
          code: `<div class="accordion" id="topics">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button">Charms</button>
    </h2>
    <div class="accordion-collapse collapse show">
      <div class="accordion-body">Wingardium.</div>
    </div>
  </div>
</div>`,
        },
        {
          type: 'note',
          text: 'Buttons usually carry `data-bs-toggle="collapse"` in real pages. Structure first.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Build `.accordion` > `.accordion-item` with `h2.accordion-header` containing `button.accordion-button` reading **Charms**, and `.accordion-body` reading **Wingardium.**',
        starter: `<div class="accordion">

</div>
`,
        checks: [
          { kind: 'exists', sel: '.accordion > .accordion-item', describe: 'item inside accordion' },
          { kind: 'text', sel: '.accordion-button', expected: 'Charms', describe: 'button text' },
          { kind: 'exists', sel: '.accordion-header .accordion-button', describe: 'button in header' },
          { kind: 'text', sel: '.accordion-body', expected: 'Wingardium.', describe: 'body text' },
        ],
        hints: [
          'accordion-item wraps header and body sections.',
          'The button lives inside the h2.accordion-header.',
          'accordion-body holds the paragraph text.',
        ],
      },
    },
  ],
}
