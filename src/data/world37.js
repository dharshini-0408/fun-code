export default {
  track: 'css',
  id: 'precision-wing',
  name: 'The Precision Wing',
  tagline: 'Units, combinators, sticky, columns, fonts, supports and grid areas',
  icon: '📐',
  rooms: [
    {
      id: 'c37',
      name: 'The Measuring Rods',
      concept: 'CSS units',
      brief: 'Rods of different lengths: px, rem, em, vh, vw, ch — each for a purpose.',
      lesson: [
        { type: 'p', text: '`px` is absolute on screen CSS pixels. `rem` is root font-size. `em` is parent font-size. `vh`/`vw` are viewport. `ch` is width of “0”.' },
        { type: 'code', code: `html { font-size: 16px; }
p { font-size: 1rem; padding: 1.25em; max-width: 60ch; min-height: 50vh; }` },
        { type: 'note', text: 'Prefer `rem` for type scales; `em` for component-local padding tied to text size.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<p class="prose">Text</p>`,
        prompt: 'Set `.prose` `font-size: 16px`, `max-width: 60ch`, and `padding: 8px`.',
        starter: `.prose {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.prose', prop: 'font-size', expected: '16px', describe: 'font-size' },
          { kind: 'style', sel: '.prose', prop: 'max-width', expected: '480px', describe: 'max-width (60ch → px in exam)' },
          { kind: 'style', sel: '.prose', prop: 'padding', expected: '8px', describe: 'padding' },
        ],
        hints: [
          'Write max-width: 60ch — the exam frame resolves ch to px.',
          'font-size 16px and padding 8px',
          'Three declarations',
        ],
      },
    },
    {
      id: 'c38',
      name: 'The Relation Runes',
      concept: 'Combinators & attribute selectors',
      brief: 'Select by how elements relate — child, sibling — or by an attribute’s shape.',
      lesson: [
        { type: 'p', text: '`div > p` (child), `h2 + p` (adjacent), `h2 ~ p` (siblings). Attributes: `[type="email"]`, `[class^="btn"]`, `[href$=".pdf"]`.' },
        { type: 'code', code: `nav > a { }
h2 + p { margin-top: 0; }
a[href$=".pdf"] { }` },
        { type: 'note', text: 'Child `>` is safer than descendant space when you mean only one level.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="box"><p class="lead">Hi</p><p>Bye</p></div>`,
        prompt: 'Style `.box > .lead` with `font-weight: 700` and `a[href$=".pdf"]` is not needed — also set `.box > p` `margin-top: 0px` for the child paragraphs.',
        starter: `.box > .lead {\n\n}\n.box > p {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.box > .lead', prop: 'font-weight', expected: '700', describe: 'lead bold' },
          { kind: 'style', sel: '.box > p', prop: 'margin-top', expected: '0px', describe: 'child p margin' },
        ],
        hints: ['Child combinator >', '700 weight', 'margin-top 0'],
      },
    },
    {
      id: 'c39',
      name: 'The Sticky Banner',
      concept: 'Sticky positioning',
      brief: 'A banner that scrolls with you until it hits the ceiling, then clings.',
      lesson: [
        { type: 'p', text: '`position: sticky` is relative until a threshold (`top`/`bottom`), then acts fixed within its container.' },
        { type: 'code', code: `.banner {
  position: sticky;
  top: 0;
  z-index: 5;
}` },
        { type: 'note', text: 'A parent with `overflow: hidden` can break sticky. Watch ancestors.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="banner">Sticky</div>`,
        prompt: 'Make `.banner` `position: sticky`, `top: 0px`, and `z-index: 5`.',
        starter: `.banner {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.banner', prop: 'position', expected: 'sticky', describe: 'sticky' },
          { kind: 'style', sel: '.banner', prop: 'top', expected: '0px', describe: 'top 0' },
          { kind: 'style', sel: '.banner', prop: 'z-index', expected: '5', describe: 'z-index' },
        ],
        hints: ['Three declarations', 'top: 0', 'z-index 5'],
      },
    },
    {
      id: 'c40',
      name: 'The Newspaper Columns',
      concept: 'Multi-column layout',
      brief: 'Prose that flows down one column then the next — like a broadsheet.',
      lesson: [
        { type: 'p', text: '`column-count`, `column-gap`, and `column-rule` create multi-column text flow.' },
        { type: 'code', code: `.article {
  column-count: 2;
  column-gap: 2rem;
  column-rule: 1px solid #ccc;
}` },
        { type: 'note', text: 'Use for long prose; avoid for interactive UI chrome.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="article">Long prose…</div>`,
        prompt: 'Set `.article` `column-count: 2` and `column-gap: 24px`.',
        starter: `.article {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.article', prop: 'column-count', expected: '2', describe: 'count' },
          { kind: 'style', sel: '.article', prop: 'column-gap', expected: '24px', describe: 'gap' },
        ],
        hints: ['Two declarations', 'column-count: 2', 'gap 24px'],
      },
    },
    {
      id: 'c41',
      name: 'The Custom Typeface',
      concept: '@font-face',
      brief: 'A typeface summoned by name from a file, not only from the visitor’s machine.',
      lesson: [
        { type: 'p', text: '`@font-face` declares a family name and a `src`. Then `font-family` uses it.' },
        { type: 'code', code: `@font-face {
  font-family: "Castle Serif";
  src: url("/fonts/castle.woff2") format("woff2");
  font-display: swap;
}
body { font-family: "Castle Serif", serif; }` },
        { type: 'note', text: '`font-display: swap` shows fallback text while the font loads.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<p class="serif">Aa</p>`,
        prompt: 'Set `.serif` `font-family: Georgia, serif` and `font-display` is lesson-only — also set `font-weight: 400`.',
        starter: `.serif {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.serif', prop: 'font-family', expected: 'Georgia, serif', describe: 'family' },
          { kind: 'style', sel: '.serif', prop: 'font-weight', expected: '400', describe: 'weight' },
        ],
        hints: ['Georgia, serif', 'font-weight 400', 'Two declarations'],
      },
    },
    {
      id: 'c42',
      name: 'The Feature Gate',
      concept: '@supports & grid areas',
      brief: 'Use a feature only if the browser knows it — and name regions of a grid like rooms on a map.',
      lesson: [
        { type: 'p', text: '`@supports (display: grid)` gates modern CSS. Grid areas: `grid-template-areas` + `grid-area`.' },
        { type: 'code', code: `@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-areas: "nav main" "nav foot";
  }
  .nav { grid-area: nav; }
}` },
        { type: 'note', text: '`auto-fit` + `minmax(min, 1fr)` builds responsive card grids without breakpoints.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="layout"><div class="nav">N</div><div class="main">M</div></div>`,
        prompt: 'Make `.layout` `display: grid` with `grid-template-columns: 120px 1fr`. Give `.nav` `grid-area: nav` is optional — set `.nav` `width: 120px` instead for the exam.',
        starter: `.layout {\n\n}\n.nav {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.layout', prop: 'display', expected: 'grid', describe: 'grid' },
          { kind: 'style', sel: '.layout', prop: 'grid-template-columns', expected: '120px 1fr', describe: 'columns' },
          { kind: 'style', sel: '.nav', prop: 'width', expected: '120px', describe: 'nav width' },
        ],
        hints: ['display grid', '120px 1fr', 'nav width 120px'],
      },
    },
  ],
}
