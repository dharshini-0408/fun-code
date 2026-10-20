export default {
  track: 'bootstrap',
  id: 'form-atelier',
  name: 'The Form Atelier',
  tagline: 'Input groups, floating labels, validation and colour modes',
  icon: '📝',
  rooms: [
    {
      id: 'bt19',
      name: 'The Affixed Field',
      concept: 'Input groups',
      brief: 'A field with a prefix or suffix bolted on — units, @, or a button.',
      lesson: [
        { type: 'p', text: '`input-group` wraps `input-group-text` and form controls.' },
        { type: 'code', code: `<div class="input-group">
  <span class="input-group-text">@</span>
  <input class="form-control" placeholder="username">
</div>` },
        { type: 'note', text: 'Keep labels associated — input groups do not replace `<label>`.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Build `.input-group` with `span.input-group-text` **@** and `input.form-control` with `placeholder="username"`.',
        starter: `<div class="input-group">\n\n</div>\n`,
        checks: [
          { kind: 'text', sel: '.input-group-text', expected: '@', describe: 'prefix' },
          { kind: 'exists', sel: '.input-group input.form-control', describe: 'control' },
          { kind: 'attr', sel: '.input-group input', name: 'placeholder', expected: 'username', describe: 'placeholder' },
        ],
        hints: ['span then input', 'form-control class', 'placeholder username'],
      },
    },
    {
      id: 'bt20',
      name: 'The Floating Label',
      concept: 'Floating labels',
      brief: 'A label that rests inside the field, then lifts when you type.',
      lesson: [
        { type: 'p', text: '`form-floating` wraps an input then a label. The input needs a `placeholder` for the float effect.' },
        { type: 'code', code: `<div class="form-floating">
  <input type="email" class="form-control" id="email" placeholder="name@ex.test">
  <label for="email">Email</label>
</div>` },
        { type: 'note', text: 'Order matters: control first, label second.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Build `.form-floating` with `input#email.form-control` `type="email"` `placeholder="name@ex.test"` and `label[for=email]` **Email**.',
        starter: `<div class="form-floating">\n\n</div>\n`,
        checks: [
          { kind: 'attr', sel: '.form-floating input', name: 'type', expected: 'email', describe: 'type' },
          { kind: 'attr', sel: '.form-floating input', name: 'id', expected: 'email', describe: 'id' },
          { kind: 'attr', sel: '.form-floating input', name: 'placeholder', expected: 'name@ex.test', describe: 'placeholder' },
          { kind: 'attr', sel: '.form-floating label', name: 'for', expected: 'email', describe: 'for' },
          { kind: 'text', sel: '.form-floating label', expected: 'Email', describe: 'label text' },
        ],
        hints: ['input before label', 'matching id/for', 'placeholder required'],
      },
    },
    {
      id: 'bt21',
      name: 'The Validation Seal',
      concept: 'Validation classes',
      brief: 'Green for good, red for wrong — and a message under the field.',
      lesson: [
        { type: 'p', text: '`is-valid` / `is-invalid` on controls; `valid-feedback` / `invalid-feedback` for messages.' },
        { type: 'code', code: `<input class="form-control is-invalid">
<div class="invalid-feedback">Required.</div>` },
        { type: 'note', text: 'Pair with real validation — classes are the visual layer only.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `input.form-control.is-invalid` and `div.invalid-feedback` reading **Required.**',
        starter: `<!-- validation -->\n`,
        checks: [
          { kind: 'exists', sel: 'input.form-control.is-invalid', describe: 'invalid input' },
          { kind: 'text', sel: '.invalid-feedback', expected: 'Required.', describe: 'message' },
        ],
        hints: ['Both classes on input', 'Feedback div after', 'Period in Required.'],
      },
    },
    {
      id: 'bt22',
      name: 'The Offcanvas Door',
      concept: 'Offcanvas',
      brief: 'A panel that slides in from the edge — menus on small screens.',
      lesson: [
        { type: 'p', text: '`offcanvas` + `offcanvas-header` / `offcanvas-body`. Position modifiers: `offcanvas-start`, `end`, `top`, `bottom`.' },
        { type: 'code', code: `<div class="offcanvas offcanvas-start" tabindex="-1">
  <div class="offcanvas-header"><h5 class="offcanvas-title">Menu</h5></div>
  <div class="offcanvas-body">Links…</div>
</div>` },
        { type: 'note', text: 'Showing it needs Bootstrap JS in a full app.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Build `.offcanvas.offcanvas-start` with `.offcanvas-title` **Menu** inside `.offcanvas-header`, and `.offcanvas-body` reading **Links.**',
        starter: `<div class="offcanvas offcanvas-start">\n\n</div>\n`,
        checks: [
          { kind: 'exists', sel: '.offcanvas.offcanvas-start', describe: 'offcanvas start' },
          { kind: 'text', sel: '.offcanvas-title', expected: 'Menu', describe: 'title' },
          { kind: 'text', sel: '.offcanvas-body', expected: 'Links.', describe: 'body' },
        ],
        hints: ['Both offcanvas classes', 'title in header', 'Links. with period'],
      },
    },
    {
      id: 'bt23',
      name: 'The Progress Rail',
      concept: 'Progress bars',
      brief: 'A rail that fills as work completes.',
      lesson: [
        { type: 'p', text: 'Bootstrap progress: `progress` > `progress-bar` with width style or utility.' },
        { type: 'code', code: `<div class="progress" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 40%">40%</div>
</div>` },
        { type: 'note', text: 'Keep ARIA valuemin/max/now in sync with the visible width.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `.progress` with `role="progressbar"` `aria-valuenow="40"` and inner `.progress-bar` text **40%**.',
        starter: `<div class="progress">\n\n</div>\n`,
        checks: [
          { kind: 'attr', sel: '.progress', name: 'role', expected: 'progressbar', describe: 'role' },
          { kind: 'attr', sel: '.progress', name: 'aria-valuenow', expected: '40', describe: 'valuenow' },
          { kind: 'text', sel: '.progress-bar', expected: '40%', describe: 'label' },
        ],
        hints: ['role and aria on outer', 'progress-bar inside', 'Text 40%'],
      },
    },
    {
      id: 'bt24',
      name: 'The Night Mode Seal',
      concept: 'Colour modes',
      brief: 'The whole cupboard flips to night ink with one attribute.',
      lesson: [
        { type: 'p', text: 'Bootstrap 5.3 colour modes: set `data-bs-theme="dark"` (or `light`) on `<html>` or a subtree.' },
        { type: 'code', code: `<div data-bs-theme="dark" class="p-3">
  <div class="card">Dark card</div>
</div>` },
        { type: 'note', text: 'Components inside inherit the theme. Toggle with a small script in real apps.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write a `div` with `data-bs-theme="dark"` and class `p-3` containing `.card` with text **Dark card**.',
        starter: `<!-- colour mode -->\n`,
        checks: [
          { kind: 'attr', sel: '[data-bs-theme="dark"]', name: 'data-bs-theme', expected: 'dark', describe: 'theme' },
          { kind: 'exists', sel: '[data-bs-theme="dark"].p-3', describe: 'p-3' },
          { kind: 'text', sel: '[data-bs-theme="dark"] .card', expected: 'Dark card', describe: 'card text' },
        ],
        hints: ['data-bs-theme on the wrapper', 'p-3 utility', 'card inside'],
      },
    },
  ],
}
