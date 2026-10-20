export default {
  track: 'bootstrap',
  id: 'component-gallery',
  name: 'The Component Gallery',
  tagline: 'Buttons, badges, spinners, dropdowns, toasts and carousels',
  icon: '🧩',
  rooms: [
    {
      id: 'bt13',
      name: 'The Button Rack',
      concept: 'Buttons & button groups',
      brief: 'A rack of stamped buttons — primary, outline, and grouped as one control.',
      lesson: [
        { type: 'p', text: '`btn` plus a variant (`btn-primary`, `btn-outline-secondary`). Wrap with `btn-group` for toolbars.' },
        { type: 'code', code: `<button class="btn btn-primary">Save</button>
<button class="btn btn-outline-secondary">Cancel</button>
<div class="btn-group" role="group">
  <button class="btn btn-secondary">Left</button>
  <button class="btn btn-secondary">Right</button>
</div>` },
        { type: 'note', text: 'Use real `<button>` for actions; `<a class="btn">` only for navigation.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `button.btn.btn-primary` **Save**, `button.btn.btn-outline-secondary` **Cancel**, and a `div.btn-group` with two `button.btn.btn-secondary` labelled **Left** and **Right**.',
        starter: `<!-- buttons -->\n`,
        checks: [
          { kind: 'text', sel: 'button.btn-primary', expected: 'Save', describe: 'primary' },
          { kind: 'text', sel: 'button.btn-outline-secondary', expected: 'Cancel', describe: 'outline' },
          { kind: 'count', sel: '.btn-group > button.btn-secondary', expected: 2, describe: 'group of 2' },
          { kind: 'text', sel: '.btn-group > button:first-child', expected: 'Left', describe: 'Left' },
          { kind: 'text', sel: '.btn-group > button:last-child', expected: 'Right', describe: 'Right' },
        ],
        hints: ['Three sections', 'btn-group wraps the pair', 'Class names exact'],
      },
    },
    {
      id: 'bt14',
      name: 'The Badge & Spinner',
      concept: 'Badges & spinners',
      brief: 'A count on a tab, and a spinning seal while the owl is away.',
      lesson: [
        { type: 'p', text: '`badge` colours with `text-bg-*`. Spinners use `spinner-border` or `spinner-grow`.' },
        { type: 'code', code: `<span class="badge text-bg-primary">4</span>
<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>` },
        { type: 'note', text: 'Always include visually-hidden text for spinners.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `span.badge.text-bg-primary` reading **4**, and `div.spinner-border` with `role="status"` containing `span.visually-hidden` **Loading...**.',
        starter: `<!-- badge + spinner -->\n`,
        checks: [
          { kind: 'text', sel: '.badge.text-bg-primary', expected: '4', describe: 'badge' },
          { kind: 'attr', sel: '.spinner-border', name: 'role', expected: 'status', describe: 'role' },
          { kind: 'text', sel: '.spinner-border .visually-hidden', expected: 'Loading...', describe: 'hidden text' },
        ],
        hints: ['badge uses text-bg-primary', 'spinner-border needs role=status', 'visually-hidden child'],
      },
    },
    {
      id: 'bt15',
      name: 'The Dropdown Menu',
      concept: 'Dropdowns',
      brief: 'A button that unfolds a short list of choices.',
      lesson: [
        { type: 'p', text: 'Dropdown markup: `dropdown` → toggle button + `dropdown-menu` of `dropdown-item`s.' },
        { type: 'code', code: `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle">House</button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Gryffindor</a></li>
  </ul>
</div>` },
        { type: 'note', text: 'Toggling needs Bootstrap JS or `data-bs-toggle="dropdown"` in a full page.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Build `.dropdown` with `button.btn.dropdown-toggle` **House** and `ul.dropdown-menu` containing one `a.dropdown-item` **Gryffindor**.',
        starter: `<div class="dropdown">\n\n</div>\n`,
        checks: [
          { kind: 'text', sel: '.dropdown .dropdown-toggle', expected: 'House', describe: 'toggle' },
          { kind: 'exists', sel: '.dropdown .dropdown-menu', describe: 'menu' },
          { kind: 'text', sel: '.dropdown-item', expected: 'Gryffindor', describe: 'item' },
        ],
        hints: ['toggle button inside dropdown', 'ul.dropdown-menu', 'anchor.dropdown-item'],
      },
    },
    {
      id: 'bt16',
      name: 'The Toast Tray',
      concept: 'Toasts',
      brief: 'A brief notice that slides in, then vanishes — confirmation without blocking the desk.',
      lesson: [
        { type: 'p', text: 'Toasts use `toast` → `toast-header` + `toast-body`. A live region announces them.' },
        { type: 'code', code: `<div class="toast" role="status">
  <div class="toast-header"><strong>Saved</strong></div>
  <div class="toast-body">Your draft is safe.</div>
</div>` },
        { type: 'note', text: 'Showing toasts typically needs Bootstrap’s Toast JS.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `.toast` with `role="status"`, a `.toast-header` containing `strong` **Saved**, and `.toast-body` reading **Your draft is safe.**',
        starter: `<div class="toast">\n\n</div>\n`,
        checks: [
          { kind: 'attr', sel: '.toast', name: 'role', expected: 'status', describe: 'role' },
          { kind: 'text', sel: '.toast-header strong', expected: 'Saved', describe: 'header' },
          { kind: 'text', sel: '.toast-body', expected: 'Your draft is safe.', describe: 'body' },
        ],
        hints: ['role on toast', 'strong inside header', 'Exact body text'],
      },
    },
    {
      id: 'bt17',
      name: 'The Sliding Portraits',
      concept: 'Carousel markup',
      brief: 'Portraits that slide past on a rail — indicators optional, items required.',
      lesson: [
        { type: 'p', text: 'Carousel: `carousel` → `carousel-inner` → `carousel-item` (one `active`).' },
        { type: 'code', code: `<div class="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">First</div>
    <div class="carousel-item">Second</div>
  </div>
</div>` },
        { type: 'note', text: 'Controls and indicators are extra markup; the inner/items structure is the core.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Build `.carousel` > `.carousel-inner` with two `.carousel-item`s: first **First** (also `active`), second **Second**.',
        starter: `<div class="carousel">\n\n</div>\n`,
        checks: [
          { kind: 'exists', sel: '.carousel .carousel-inner', describe: 'inner' },
          { kind: 'count', sel: '.carousel-item', expected: 2, describe: 'two items' },
          { kind: 'exists', sel: '.carousel-item.active', describe: 'active item' },
          { kind: 'text', sel: '.carousel-item.active', expected: 'First', describe: 'first text' },
          { kind: 'text', sel: '.carousel-item:not(.active)', expected: 'Second', describe: 'second text' },
        ],
        hints: ['active on the first item only', 'texts First and Second', 'inner wraps items'],
      },
    },
    {
      id: 'bt18',
      name: 'The Trail of Crumbs',
      concept: 'Breadcrumbs, pagination & list group',
      brief: 'Where you are, which page you are on, and a vertical list of choices.',
      lesson: [
        { type: 'p', text: '`breadcrumb`, `pagination`, and `list-group` cover navigation chrome.' },
        { type: 'code', code: `<nav aria-label="breadcrumb"><ol class="breadcrumb">
  <li class="breadcrumb-item"><a href="#">Home</a></li>
  <li class="breadcrumb-item active">Room</li>
</ol></nav>
<ul class="list-group">
  <li class="list-group-item">One</li>
</ul>` },
        { type: 'note', text: 'Mark the current crumb with `active` and omit its link.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `ol.breadcrumb` with `li.breadcrumb-item` link **Home** and `li.breadcrumb-item.active` **Room**, plus `ul.list-group` with one `li.list-group-item` **One**.',
        starter: `<!-- crumb + list -->\n`,
        checks: [
          { kind: 'text', sel: '.breadcrumb-item a', expected: 'Home', describe: 'home link' },
          { kind: 'text', sel: '.breadcrumb-item.active', expected: 'Room', describe: 'active crumb' },
          { kind: 'text', sel: '.list-group-item', expected: 'One', describe: 'list item' },
        ],
        hints: ['ol.breadcrumb', 'active on Room', 'list-group-item text One'],
      },
    },
  ],
}
