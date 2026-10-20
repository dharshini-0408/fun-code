export default {
  track: 'css',
  id: 'pigment-vault',
  name: 'The Pigment Vault',
  tagline: 'Colour, backgrounds, borders, floats and tables',
  icon: '🎨',
  rooms: [
    {
      id: 'c25',
      name: 'The Dye Vials',
      concept: 'CSS colours',
      brief: 'Hex, rgb, hsl — three ways to name the same dye.',
      lesson: [
        { type: 'p', text: 'Colours can be hex (`#7a2530`), `rgb()`, `rgba()`, `hsl()`, or keywords. `currentColor` reuses the text colour.' },
        { type: 'code', code: `color: #7a2530;
background: rgb(34, 64, 122);
border-color: hsl(210 50% 40%);
outline-color: currentColor;` },
        { type: 'note', text: 'Modern CSS also has `color-mix()` and relative colours — start from solid values first.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<p class="ink">Ink</p><p class="wash">Wash</p>`,
        prompt: 'Set `.ink` `color: #7a2530` and `.wash` `background-color: #22407a` with `color: #ffffff`.',
        starter: `.ink {\n\n}\n.wash {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.ink', prop: 'color', expected: '#7a2530', describe: 'ink colour' },
          { kind: 'style', sel: '.wash', prop: 'background-color', expected: '#22407a', describe: 'wash bg' },
          { kind: 'style', sel: '.wash', prop: 'color', expected: '#ffffff', describe: 'wash text' },
        ],
        hints: ['Two rules', 'Use hex as given', 'wash needs both background-color and color'],
      },
    },
    {
      id: 'c26',
      name: 'The Tapestry Wall',
      concept: 'Backgrounds',
      brief: 'A wall painted once, or tiled, or fixed while the room scrolls.',
      lesson: [
        { type: 'p', text: '`background-color`, `background-image`, `background-size`, `background-position`, `background-repeat` — or the `background` shorthand.' },
        { type: 'code', code: `.hero {
  background-color: #1a1510;
  background-image: url(hall.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}` },
        { type: 'note', text: '`cover` fills and crops; `contain` letterboxes.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="hero">Hall</div>`,
        prompt: 'Style `.hero` with `background-color: #1a1510`, `background-size: cover`, and `background-repeat: no-repeat`.',
        starter: `.hero {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.hero', prop: 'background-color', expected: '#1a1510', describe: 'bg colour' },
          { kind: 'style', sel: '.hero', prop: 'background-size', expected: 'cover', describe: 'size cover' },
          { kind: 'style', sel: '.hero', prop: 'background-repeat', expected: 'no-repeat', describe: 'no-repeat' },
        ],
        hints: ['Three declarations', 'background-size: cover', 'Match the hex'],
      },
    },
    {
      id: 'c27',
      name: 'The Framed Pane',
      concept: 'Borders & outline',
      brief: 'A frame around a pane — and an outline that does not take space in the layout.',
      lesson: [
        { type: 'p', text: '`border` takes width, style, colour. `border-radius` rounds corners. `outline` draws outside without affecting box size — useful for focus rings.' },
        { type: 'code', code: `.card {
  border: 2px solid #7a2530;
  border-radius: 8px;
}
.card:focus { outline: 2px solid #22407a; outline-offset: 2px; }` },
        { type: 'note', text: 'Never remove outlines without a clearer focus style.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="card">Card</div>`,
        prompt:
          'Give `.card` `border: 2px solid #7a2530` and `border-radius: 8px`.',
        starter: `.card {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.card', prop: 'border-top-width', expected: '2px', describe: 'width 2px' },
          { kind: 'style', sel: '.card', prop: 'border-top-style', expected: 'solid', describe: 'solid' },
          { kind: 'style', sel: '.card', prop: 'border-radius', expected: '8px', describe: 'radius' },
        ],
        hints: ['border shorthand is fine', 'radius is separate', '2px solid #7a2530'],
      },
    },
    {
      id: 'c28',
      name: 'The Floating Banner',
      concept: 'Float & clear',
      brief: 'Old magic: text wrapping around a banner. Still seen in legacy pages.',
      lesson: [
        { type: 'p', text: '`float: left|right` pulls an element aside so text wraps. `clear` stops following elements from sitting beside floats.' },
        { type: 'code', code: `img.thumb { float: left; margin-right: 12px; }
.footer { clear: both; }` },
        { type: 'note', text: 'Prefer flex/grid for new layouts. Know floats to repair older CSS.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<img class="thumb" src="owl.png" alt=""><p class="footer">Footer</p>`,
        prompt: 'Float `.thumb` `left` with `margin-right: 12px`. Give `.footer` `clear: both`.',
        starter: `.thumb {\n\n}\n.footer {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.thumb', prop: 'float', expected: 'left', describe: 'float left' },
          { kind: 'style', sel: '.thumb', prop: 'margin-right', expected: '12px', describe: 'margin-right' },
          { kind: 'style', sel: '.footer', prop: 'clear', expected: 'both', describe: 'clear both' },
        ],
        hints: ['Two rules', 'float on the image', 'clear on the footer'],
      },
    },
    {
      id: 'c29',
      name: 'The Ruled Sheet',
      concept: 'Table styling',
      brief: 'Borders that collapse into one line, cells with padding, headers set apart.',
      lesson: [
        { type: 'p', text: '`border-collapse`, `border-spacing`, and cell padding make HTML tables readable.' },
        { type: 'code', code: `table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ccc; padding: 8px; }
th { text-align: left; }` },
        { type: 'note', text: '`collapse` merges adjacent borders into a single stroke.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<table class="sheet"><tr><th>A</th><td>1</td></tr></table>`,
        prompt: 'Style `.sheet` with `border-collapse: collapse` and `width: 100%`. Style `.sheet th, .sheet td` with `padding: 8px`.',
        starter: `.sheet {\n\n}\n.sheet th,\n.sheet td {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.sheet', prop: 'border-collapse', expected: 'collapse', describe: 'collapse' },
          { kind: 'style', sel: '.sheet', prop: 'width', expected: '100%', describe: 'full width' },
          { kind: 'style', sel: '.sheet td', prop: 'padding', expected: '8px', describe: 'cell padding' },
        ],
        hints: ['border-collapse on table', 'padding on cells', 'width 100%'],
      },
    },
    {
      id: 'c30',
      name: 'The Overriding Stamp',
      concept: '!important & layers',
      brief: 'A stamp that forces a rule through — powerful, and easy to regret.',
      lesson: [
        { type: 'p', text: '`!important` boosts a declaration over normal specificity. `@layer` orders whole groups of styles without !important wars.' },
        { type: 'code', code: `p { color: navy !important; }

@layer reset, base, components;
@layer components { .btn { padding: 8px; } }` },
        { type: 'note', text: 'Reach for better specificity or layers before !important. Use !important mainly to override third-party CSS.' },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<p class="note">Note</p>`,
        prompt: 'Set `.note` `color: #7a2530` and `font-weight: 700`. (Teach yourself !important in the lesson — the exam checks the visible result.)',
        starter: `.note {\n\n}\n`,
        checks: [
          { kind: 'style', sel: '.note', prop: 'color', expected: '#7a2530', describe: 'colour' },
          { kind: 'style', sel: '.note', prop: 'font-weight', expected: '700', describe: 'bold' },
        ],
        hints: ['Two declarations', '700 not bold keyword', 'Match hex'],
      },
    },
  ],
}
