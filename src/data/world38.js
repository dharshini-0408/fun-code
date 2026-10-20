export default {
  track: 'css',
  id: 'print-mask-wing',
  name: 'The Print & Mask Wing',
  tagline: 'Print styles, masks, object-position, minmax and overflow utilities',
  icon: '🖨️',
  rooms: [
    {
      id: 'c43',
      name: 'The Paper Copy',
      concept: 'Print styles',
      brief: 'What the page looks like when pressed onto paper — hide the chrome, keep the prose.',
      lesson: [
        { type: 'p', text: '`@media print` styles the printed page. Often hide nav and fix backgrounds.' },
        { type: 'code', code: `@media print {
  .no-print { display: none; }
  body { background: white; color: black; }
}` },
        { type: 'note', text: 'Test print preview. Dark themes rarely belong on paper.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<nav class="no-print">Nav</nav><p class="ink">Prose</p>`,
        prompt: 'Set `.no-print` `display: none` and `.ink` `color: #000000`.',
        starter: `.no-print {\n\n}\n.ink {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.no-print', prop: 'display', expected: 'none', describe: 'hidden' },
          { kind: 'style', sel: '.ink', prop: 'color', expected: '#000000', describe: 'black ink' },
        ],
        hints: ['display none for chrome', 'black text for print', 'Two rules'],
      },
    },
    {
      id: 'c44',
      name: 'The Masked Portrait',
      concept: 'CSS masks',
      brief: 'A portrait revealed only through a shaped mask.',
      lesson: [
        { type: 'p', text: '`mask-image` (and `-webkit-mask-image`) hide parts of an element using luminance or alpha.' },
        { type: 'code', code: `.hero {
  mask-image: linear-gradient(black, transparent);
  mask-size: cover;
}` },
        { type: 'note', text: 'Browser prefixes still matter for masks in some engines.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="hero">Hero</div>`,
        prompt: 'Set `.hero` `opacity: 1` and `mask-size: cover` (mask-image varies by engine — exam watches size + opacity).',
        starter: `.hero {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.hero', prop: 'opacity', expected: '1', describe: 'opacity' },
          { kind: 'style', sel: '.hero', prop: 'mask-size', expected: 'cover', describe: 'mask-size' },
        ],
        hints: ['mask-size: cover', 'opacity 1', 'Two declarations'],
      },
    },
    {
      id: 'c45',
      name: 'The Framed Focus',
      concept: 'object-position',
      brief: 'Where the interesting part of a cropped image sits inside its frame.',
      lesson: [
        { type: 'p', text: 'With `object-fit: cover`, `object-position` chooses which part stays visible (`center`, `top`, `20% 30%`).' },
        { type: 'code', code: `img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: top center;
}` },
        { type: 'note', text: 'Faces usually want `object-position: center top` rather than dead center.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<img class="shot" src="owl.png" alt="">`,
        prompt: 'Give `.shot` `object-fit: cover`, `object-position: center top`, and `height: 160px`.',
        starter: `.shot {\n  width: 100%;\n}\n`,
        checks: [
          { kind: 'style', sel: '.shot', prop: 'object-fit', expected: 'cover', describe: 'fit' },
          { kind: 'style', sel: '.shot', prop: 'object-position', expected: 'center top', describe: 'position top center' },
          { kind: 'style', sel: '.shot', prop: 'height', expected: '160px', describe: 'height' },
        ],
        hints: ['center top often computes to 50% 0%', 'object-fit cover', 'height 160px'],
      },
    },
    {
      id: 'c46',
      name: 'The Fluid Grid',
      concept: 'minmax & auto-fit',
      brief: 'Columns that invent themselves as the shelf widens.',
      lesson: [
        { type: 'p', text: '`grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr))` builds responsive grids without media queries.' },
        { type: 'code', code: `.cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}` },
        { type: 'note', text: '`auto-fill` keeps empty tracks; `auto-fit` collapses them.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="cards"><div>A</div><div>B</div></div>`,
        prompt: 'Make `.cards` `display: grid`, `gap: 16px`, and `grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))`.',
        starter: `.cards {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.cards', prop: 'display', expected: 'grid', describe: 'grid' },
          { kind: 'style', sel: '.cards', prop: 'gap', expected: '16px', describe: 'gap' },
          {
            kind: 'style',
            sel: '.cards',
            prop: 'grid-template-columns',
            expected: 'repeat(auto-fit, minmax(120px, 1fr))',
            describe: 'auto-fit minmax',
          },
        ],
        hints: ['Three declarations', 'minmax(120px, 1fr)', 'auto-fit not auto-fill'],
      },
    },
    {
      id: 'c47',
      name: 'The Shorthand Shelf',
      concept: 'Shorthand vs longhand',
      brief: 'One word that sets many — and the trap of resetting what you meant to keep.',
      lesson: [
        { type: 'p', text: 'Shorthands (`margin`, `background`, `font`, `animation`) set multiple longhands at once and reset omitted ones to initial.' },
        { type: 'code', code: `/* dangerous: resets background-image */
background: #fff;

/* safer when image must remain */
background-color: #fff;` },
        { type: 'note', text: 'After a shorthand, re-state any longhand you still need.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="box">Box</div>`,
        prompt: 'Set `.box` using longhands only: `margin-top: 8px`, `margin-bottom: 8px`, `background-color: #fff8ee`.',
        starter: `.box {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.box', prop: 'margin-top', expected: '8px', describe: 'mt' },
          { kind: 'style', sel: '.box', prop: 'margin-bottom', expected: '8px', describe: 'mb' },
          { kind: 'style', sel: '.box', prop: 'background-color', expected: '#fff8ee', describe: 'bg' },
        ],
        hints: ['Avoid margin shorthand here', 'background-color not background', '8px top and bottom'],
      },
    },
    {
      id: 'c48',
      name: 'The Overflow Modes',
      concept: 'Overflow-x & overflow-y',
      brief: 'Clip one axis, scroll the other — a map that pans sideways only.',
      lesson: [
        { type: 'p', text: '`overflow-x` and `overflow-y` control each axis. `clip` is a newer non-scroll clip.' },
        { type: 'code', code: `.rail {
  overflow-x: auto;
  overflow-y: hidden;
}` },
        { type: 'note', text: 'If one axis is visible and the other not, browsers may compute visible as auto.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="rail">……</div>`,
        prompt: 'Set `.rail` `overflow-x: auto`, `overflow-y: hidden`, and `height: 80px`.',
        starter: `.rail {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.rail', prop: 'overflow-x', expected: 'auto', describe: 'overflow-x' },
          { kind: 'style', sel: '.rail', prop: 'overflow-y', expected: 'hidden', describe: 'overflow-y' },
          { kind: 'style', sel: '.rail', prop: 'height', expected: '80px', describe: 'height' },
        ],
        hints: ['Three declarations', 'auto horizontal', 'hidden vertical'],
      },
    },
  ],
}
