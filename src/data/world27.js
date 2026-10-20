export default {
  track: 'css',
  id: 'modern-atelier',
  name: 'The Modern Atelier',
  tagline: 'Container queries, nesting, preferences, logical props and clip-path',
  icon: '🧵',
  rooms: [
    {
      id: 'c31',
      name: 'The Nested Rulebook',
      concept: 'CSS nesting',
      brief: 'Rules written inside rules — the stylesheet mirrors the tree.',
      lesson: [
        { type: 'p', text: 'Native CSS nesting lets you write selectors inside selectors. `&` means the parent.' },
        { type: 'code', code: `.card {
  padding: 12px;
  & h2 { margin: 0; }
  &:hover { border-color: #7a2530; }
}` },
        { type: 'note', text: 'Nested rules still compile to flat selectors. Keep depth shallow.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="card"><h2>Title</h2></div>`,
        prompt: 'Give `.card` `padding: 12px` and `.card h2` `margin-top: 0px` (nesting optional — checks watch the result).',
        starter: `.card {\n\n}\n.card h2 {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.card', prop: 'padding', expected: '12px', describe: 'padding' },
          { kind: 'style', sel: '.card h2', prop: 'margin-top', expected: '0px', describe: 'h2 margin-top' },
        ],
        hints: ['padding on .card', 'margin-top: 0 on the heading', '0 computes as 0px'],
      },
    },
    {
      id: 'c32',
      name: 'The Contained Hall',
      concept: 'Container queries',
      brief: 'Style a card by the width of its shelf, not the whole window.',
      lesson: [
        { type: 'p', text: '`container-type` on a parent enables `@container` queries against that parent’s size.' },
        { type: 'code', code: `.shelf { container-type: inline-size; }
@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 1fr 1fr; }
}` },
        { type: 'note', text: 'Use when a component appears in sidebars and main columns at different widths.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="shelf"><div class="card">A</div></div>`,
        prompt: 'Set `.shelf` `container-type: inline-size` and `.card` `padding: 10px`.',
        starter: `.shelf {\n\n}\n.card {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.shelf', prop: 'container-type', expected: 'inline-size', describe: 'container-type' },
          { kind: 'style', sel: '.card', prop: 'padding', expected: '10px', describe: 'padding' },
        ],
        hints: ['container-type on the parent', 'padding on the card', 'inline-size exactly'],
      },
    },
    {
      id: 'c33',
      name: 'The Quiet Preference',
      concept: 'prefers-reduced-motion & colour scheme',
      brief: 'The castle listens to the visitor’s system: less motion, or dark ink on dark walls.',
      lesson: [
        { type: 'p', text: '`prefers-reduced-motion` and `prefers-color-scheme` media features adapt to user settings.' },
        { type: 'code', code: `@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
@media (prefers-color-scheme: dark) {
  :root { color-scheme: dark; }
}` },
        { type: 'note', text: 'Respecting these is part of accessibility, not decoration.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="stage">Stage</div>`,
        prompt: 'Give `.stage` `color-scheme: dark` and `background-color: #12100e`.',
        starter: `.stage {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.stage', prop: 'color-scheme', expected: 'dark', describe: 'color-scheme' },
          { kind: 'style', sel: '.stage', prop: 'background-color', expected: '#12100e', describe: 'bg' },
        ],
        hints: ['Two declarations', 'color-scheme: dark', 'Match hex'],
      },
    },
    {
      id: 'c34',
      name: 'The Logical Margins',
      concept: 'Logical properties',
      brief: 'Margins that follow writing direction — start and end, not left and right.',
      lesson: [
        { type: 'p', text: '`margin-inline`, `padding-block`, `inset-inline-start` map to physical sides based on writing mode.' },
        { type: 'code', code: `.column {
  margin-inline: auto;
  padding-block: 1rem;
  padding-inline: 1.25rem;
}` },
        { type: 'note', text: 'Prefer logical properties for international layouts.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="column">Text</div>`,
        prompt: 'Set `.column` `margin-left: auto`, `margin-right: auto`, and `padding-top: 16px` (stand-ins for margin-inline / padding-block that every engine resolves).',
        starter: `.column {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.column', prop: 'margin-left', expected: 'auto', describe: 'ml auto' },
          { kind: 'style', sel: '.column', prop: 'margin-right', expected: 'auto', describe: 'mr auto' },
          { kind: 'style', sel: '.column', prop: 'padding-top', expected: '16px', describe: 'pt 16px' },
        ],
        hints: ['auto margins centre a block', 'padding-top 16px', 'Three declarations'],
      },
    },
    {
      id: 'c35',
      name: 'The Cut Silhouette',
      concept: 'clip-path',
      brief: 'A portrait trimmed to a shape — circle, polygon, or path.',
      lesson: [
        { type: 'p', text: '`clip-path` masks an element to a geometry. `circle()`, `inset()`, `polygon()` are common.' },
        { type: 'code', code: `.avatar {
  clip-path: circle(50%);
}
.ribbon {
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
}` },
        { type: 'note', text: 'Clipped content is not clickable outside the shape in most browsers.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="avatar">A</div>`,
        prompt: 'Give `.avatar` `width: 64px`, `height: 64px`, and `clip-path: circle(50%)`.',
        starter: `.avatar {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.avatar', prop: 'width', expected: '64px', describe: 'width' },
          { kind: 'style', sel: '.avatar', prop: 'height', expected: '64px', describe: 'height' },
          { kind: 'style', sel: '.avatar', prop: 'clip-path', expected: 'circle(50%)', describe: 'clip-path' },
        ],
        hints: ['Three declarations', 'circle(50%)', '64px box'],
      },
    },
    {
      id: 'c36',
      name: 'The Perspective Door',
      concept: '3D transforms',
      brief: 'A door that tips in space — perspective on the parent, rotate on the child.',
      lesson: [
        { type: 'p', text: '`perspective` on a parent and `transform: rotateY()` on children create 3D. `transform-style: preserve-3d` keeps nested 3D.' },
        { type: 'code', code: `.stage { perspective: 800px; }
.door { transform: rotateY(-25deg); }` },
        { type: 'note', text: 'Keep 3D subtle in UI. Motion-sensitive visitors need reduced-motion alternatives.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="stage"><div class="door">Door</div></div>`,
        prompt: 'Set `.stage` `perspective: 800px` and `.door` `opacity: 1` with `width: 120px`.',
        starter: `.stage {\n\n}\n.door {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.stage', prop: 'perspective', expected: '800px', describe: 'perspective' },
          { kind: 'style', sel: '.door', prop: 'width', expected: '120px', describe: 'width' },
          { kind: 'style', sel: '.door', prop: 'opacity', expected: '1', describe: 'opacity' },
        ],
        hints: ['perspective on parent', 'width/opacity on door', 'Try rotateY in practice — exam watches these props'],
      },
    },
  ],
}
