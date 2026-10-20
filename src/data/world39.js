export default {
  track: 'bootstrap',
  id: 'utility-vault',
  name: 'The Utility Vault',
  tagline: 'Breakpoints, checks, tabs, placeholders, tooltips and helpers',
  icon: '🧰',
  rooms: [
    {
      id: 'bt25',
      name: 'The Breakpoint Ruler',
      concept: 'Containers & breakpoints',
      brief: 'Widths that snap at known marks: sm, md, lg, xl, xxl.',
      lesson: [
        { type: 'p', text: '`container`, `container-fluid`, and `container-{breakpoint}` centre content. Breakpoints drive grid and utilities.' },
        { type: 'code', code: `<div class="container">…</div>
<div class="container-md">…</div>
<div class="d-none d-lg-block">Large only</div>` },
        { type: 'note', text: 'Default breakpoints: 576, 768, 992, 1200, 1400px.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `div.container` containing **Centered**, and `div.container-fluid` containing **Full**.',
        starter: `<!-- containers -->\n`,
        checks: [
          { kind: 'text', sel: 'div.container', expected: 'Centered', describe: 'container' },
          { kind: 'text', sel: 'div.container-fluid', expected: 'Full', describe: 'fluid' },
        ],
        hints: ['Two divs', 'Exact text', 'container vs container-fluid'],
      },
    },
    {
      id: 'bt26',
      name: 'The Check & Switch',
      concept: 'Checks, radios & switches',
      brief: 'Ticks, circles, and a sliding switch — Bootstrap’s form checks.',
      lesson: [
        { type: 'p', text: '`form-check` wraps checkbox/radio. Add `form-switch` for a switch look.' },
        { type: 'code', code: `<div class="form-check">
  <input class="form-check-input" type="checkbox" id="a">
  <label class="form-check-label" for="a">Accept</label>
</div>
<div class="form-check form-switch">…</div>` },
        { type: 'note', text: 'Radios share a `name` so only one can be chosen.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Build `.form-check` with `input#a.form-check-input` `type="checkbox"` and `label.form-check-label[for=a]` **Accept**.',
        starter: `<div class="form-check">\n\n</div>\n`,
        checks: [
          { kind: 'attr', sel: '.form-check-input', name: 'type', expected: 'checkbox', describe: 'type' },
          { kind: 'attr', sel: '.form-check-input', name: 'id', expected: 'a', describe: 'id' },
          { kind: 'attr', sel: '.form-check-label', name: 'for', expected: 'a', describe: 'for' },
          { kind: 'text', sel: '.form-check-label', expected: 'Accept', describe: 'label' },
        ],
        hints: ['input then label', 'matching id/for', 'form-check-input class'],
      },
    },
    {
      id: 'bt27',
      name: 'The Tabbed Ledger',
      concept: 'Nav tabs',
      brief: 'Pages of a ledger selected by tabs along the top.',
      lesson: [
        { type: 'p', text: '`nav nav-tabs` (or `nav-pills`) with `nav-link` items; one `active`.' },
        { type: 'code', code: `<ul class="nav nav-tabs">
  <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Profile</a></li>
</ul>` },
        { type: 'note', text: 'Tab panes need Bootstrap JS or your own show/hide logic.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Build `ul.nav.nav-tabs` with two links: **Home** (active) and **Profile**.',
        starter: `<ul class="nav nav-tabs">\n\n</ul>\n`,
        checks: [
          { kind: 'exists', sel: 'ul.nav.nav-tabs', describe: 'nav-tabs' },
          { kind: 'text', sel: '.nav-link.active', expected: 'Home', describe: 'active' },
          { kind: 'count', sel: '.nav-link', expected: 2, describe: 'two links' },
          { kind: 'text', sel: '.nav-item:last-child .nav-link', expected: 'Profile', describe: 'profile' },
        ],
        hints: ['nav-item > nav-link', 'active on Home', 'Profile second'],
      },
    },
    {
      id: 'bt28',
      name: 'The Ghost Placeholder',
      concept: 'Placeholders',
      brief: 'Grey blocks that stand in for content while it loads.',
      lesson: [
        { type: 'p', text: '`placeholder` and `placeholder-glow` draw loading skeletons.' },
        { type: 'code', code: `<p class="placeholder-glow">
  <span class="placeholder col-6"></span>
</p>` },
        { type: 'note', text: 'Match approximate final layout so the page does not jump.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `p.placeholder-glow` containing `span.placeholder.col-6`.',
        starter: `<!-- placeholder -->\n`,
        checks: [
          { kind: 'exists', sel: 'p.placeholder-glow', describe: 'glow' },
          { kind: 'exists', sel: 'p.placeholder-glow span.placeholder.col-6', describe: 'span' },
        ],
        hints: ['glow on p', 'placeholder + col-6 on span', 'Nest span inside p'],
      },
    },
    {
      id: 'bt29',
      name: 'The Hover Hint',
      concept: 'Tooltips & popovers markup',
      brief: 'A whisper on hover, or a richer card on click — attributes ready for Bootstrap JS.',
      lesson: [
        { type: 'p', text: 'Tooltips/popovers use `data-bs-toggle` and `title` / `data-bs-content`.' },
        { type: 'code', code: `<button type="button" class="btn btn-secondary"
  data-bs-toggle="tooltip" title="Send the owl">
  Owl
</button>` },
        { type: 'note', text: 'Must be initialised with Bootstrap’s JS in a real page.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `button.btn.btn-secondary` with `data-bs-toggle="tooltip"` `title="Send the owl"` reading **Owl**.',
        starter: `<!-- tooltip button -->\n`,
        checks: [
          { kind: 'attr', sel: 'button.btn-secondary', name: 'data-bs-toggle', expected: 'tooltip', describe: 'toggle' },
          { kind: 'attr', sel: 'button.btn-secondary', name: 'title', expected: 'Send the owl', describe: 'title' },
          { kind: 'text', sel: 'button.btn-secondary', expected: 'Owl', describe: 'text' },
        ],
        hints: ['btn btn-secondary', 'data-bs-toggle tooltip', 'title attribute'],
      },
    },
    {
      id: 'bt30',
      name: 'The Ratio Frame',
      concept: 'Helpers: ratio, shadow, stretched link',
      brief: 'Keep a 16:9 frame, lift a card with shadow, stretch a link over a whole block.',
      lesson: [
        { type: 'p', text: 'Helpers include `ratio ratio-16x9`, `shadow`, `shadow-lg`, and `stretched-link`.' },
        { type: 'code', code: `<div class="ratio ratio-16x9">
  <iframe src="…"></iframe>
</div>
<div class="card shadow">
  <a href="#" class="stretched-link">Open</a>
</div>` },
        { type: 'note', text: '`stretched-link` needs a positioned parent (cards are).' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `div.ratio.ratio-16x9` and `div.card.shadow` containing `a.stretched-link` **Open**.',
        starter: `<!-- helpers -->\n`,
        checks: [
          { kind: 'exists', sel: 'div.ratio.ratio-16x9', describe: 'ratio' },
          { kind: 'exists', sel: 'div.card.shadow', describe: 'shadow card' },
          { kind: 'text', sel: '.stretched-link', expected: 'Open', describe: 'link' },
        ],
        hints: ['Both ratio classes', 'card + shadow', 'stretched-link text Open'],
      },
    },
  ],
}
