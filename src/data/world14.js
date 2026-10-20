export default {
  track: 'css',
  id: 'mirror-gallery',
  name: 'The Mirror Gallery',
  tagline: 'Position, overflow, pseudos and polish',
  icon: '🪞',
  rooms: [
    {
      id: 'c7',
      name: 'The Floating Frame',
      concept: 'Position & z-index',
      brief:
        'Frames that sit where the document put them, and one that refuses — pinned to a corner, layered above the rest.',
      lesson: [
        {
          type: 'p',
          text: '`position` pulls an element out of ordinary flow. `relative` nudges from its natural place; `absolute` places it against a positioned ancestor; `fixed` against the viewport.',
        },
        {
          type: 'code',
          code: `.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
}

.card {
  position: relative; /* becomes the absolute's anchor */
}`,
        },
        {
          type: 'p',
          text: '`z-index` only works on positioned elements (and flex/grid children). Higher numbers paint on top.',
        },
        {
          type: 'note',
          text: 'Reach for flexbox and grid before absolute positioning. Absolute is for badges, overlays and deliberate exceptions.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="card"><span class="badge">New</span>A lesson card.</div>`,
        prompt:
          'Pin the badge. Make `.card` `position: relative`, and `.badge` `position: absolute` with `top: 8px`, `right: 8px`, and `z-index: 3`.',
        starter: `.card {

}
.badge {

}
`,
        checks: [
          { kind: 'style', sel: '.card', prop: 'position', expected: 'relative', describe: '.card is relative' },
          { kind: 'style', sel: '.badge', prop: 'position', expected: 'absolute', describe: '.badge is absolute' },
          { kind: 'style', sel: '.badge', prop: 'top', expected: '8px', describe: 'badge top is 8px' },
          { kind: 'style', sel: '.badge', prop: 'right', expected: '8px', describe: 'badge right is 8px' },
          { kind: 'style', sel: '.badge', prop: 'z-index', expected: '3', describe: 'badge z-index is 3' },
        ],
        hints: [
          'Two rules: the card anchors, the badge floats inside it.',
          'Absolute needs top/right (or similar) or it may not move visibly.',
          'Answer shape: `.card { position: relative; }` and `.badge { position: absolute; top: 8px; right: 8px; z-index: 3; }`',
        ],
      },
    },

    {
      id: 'c8',
      name: 'The Overflowing Chest',
      concept: 'Overflow & display',
      brief:
        'The chest is smaller than its contents. Something must be clipped, scrolled, or allowed to spill — you choose which.',
      lesson: [
        {
          type: 'p',
          text: '`overflow` controls what happens when content is taller or wider than its box: `visible`, `hidden`, `scroll`, or `auto`.',
        },
        {
          type: 'code',
          code: `.chest {
  height: 120px;
  overflow: auto;   /* scrollbar only when needed */
}

.clip {
  overflow: hidden; /* hard crop */
}`,
        },
        {
          type: 'p',
          text: '`display` still matters: `none` removes the element; `block` / `inline-block` / `flex` / `grid` change how it participates in layout.',
        },
        {
          type: 'note',
          text: '`overflow: hidden` is also how you clip children that stick out of rounded corners.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="chest"><p>A very long inventory that will not fit in one glance.</p></div>`,
        prompt:
          'Contain the spill. Give `.chest` a `height` of `100px`, `overflow: auto`, and `display: block`.',
        starter: `.chest {

}
`,
        checks: [
          { kind: 'style', sel: '.chest', prop: 'height', expected: '100px', describe: 'height is 100px' },
          { kind: 'style', sel: '.chest', prop: 'overflow', expected: 'auto', describe: 'overflow is auto' },
          { kind: 'style', sel: '.chest', prop: 'display', expected: 'block', describe: 'display is block' },
        ],
        hints: [
          'Three declarations on the same rule.',
          '`auto` scrolls only when the content actually overflows.',
          'Answer shape: `height: 100px; overflow: auto; display: block;`',
        ],
      },
    },

    {
      id: 'c9',
      name: 'The Conditional Candle',
      concept: 'Pseudo-classes',
      brief:
        'Candles that brighten when touched, links that remember where you have been, and rows that alternate of their own accord.',
      lesson: [
        {
          type: 'p',
          text: 'A pseudo-class styles an element in a particular state: `:hover`, `:focus`, `:first-child`, `:nth-child`, `:not()`.',
        },
        {
          type: 'code',
          code: `a:hover { color: #7a2530; }
a:focus { outline: 2px solid #22407a; }

li:first-child { font-weight: 700; }
li:nth-child(odd) { background: #f3efe6; }
button:disabled { opacity: 0.5; }`,
        },
        {
          type: 'p',
          text: '`:focus-visible` is kinder than `:focus` — it shows the ring for keyboard users without punishing mouse clicks.',
        },
        {
          type: 'note',
          text: 'Never remove focus outlines without providing a clearer replacement. Keyboard visitors navigate by that ring.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<ul class="list"><li>One</li><li>Two</li><li>Three</li></ul>`,
        prompt:
          'Light the states. Style `.list li:first-child` with `font-weight: 700`, and `.list li:nth-child(odd)` with `color: #7a2530`.',
        starter: `.list li:first-child {

}
.list li:nth-child(odd) {

}
`,
        checks: [
          {
            kind: 'style',
            sel: '.list li:first-child',
            prop: 'font-weight',
            expected: '700',
            describe: 'first child is bold',
          },
          {
            kind: 'style',
            sel: '.list li:nth-child(odd)',
            prop: 'color',
            expected: '#7a2530',
            describe: 'odd items use the ink colour',
          },
        ],
        hints: [
          'Two separate rules — one for :first-child, one for :nth-child(odd).',
          'font-weight can be the number 700.',
          'Answer shape: `.list li:first-child { font-weight: 700; }` and `.list li:nth-child(odd) { color: #7a2530; }`',
        ],
      },
    },

    {
      id: 'c10',
      name: 'The Ghost Marker',
      concept: 'Pseudo-elements',
      brief:
        'Marks that are not in the HTML at all — a bullet drawn before a line, a flourish after a title — summoned by CSS alone.',
      lesson: [
        {
          type: 'p',
          text: '`::before` and `::after` insert generated content. They need a `content` property — even `content: ""` — or they do not appear.',
        },
        {
          type: 'code',
          code: `.note::before {
  content: "✦ ";
  color: #7a2530;
}

.quote::after {
  content: " — anon";
  font-style: italic;
}`,
        },
        {
          type: 'p',
          text: '`::placeholder` styles input hints. `::selection` styles highlighted text. Double-colon is the modern form; single-colon still works for the old ones.',
        },
        {
          type: 'note',
          text: 'Generated content is for decoration. Real information belongs in the HTML so it is copyable, selectable and announced.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<p class="note">Bring a spare quill.</p>`,
        prompt:
          'Make room for the ghost marker. Give `.note` `padding-left: 24px` and `color: #7a2530`, and give `.note::before` a `content` of `"✦ "` (the marker itself is decoration — the checks watch the host).',
        starter: `.note {

}
.note::before {
  content: "";
}
`,
        checks: [
          {
            kind: 'style',
            sel: '.note',
            prop: 'padding-left',
            expected: '24px',
            describe: 'padding-left is 24px',
          },
          { kind: 'style', sel: '.note', prop: 'color', expected: '#7a2530', describe: 'colour is #7a2530' },
        ],
        hints: [
          'The ::before rule needs `content: "✦ ";` to show the mark — set that while you style `.note`.',
          'padding-left and color both go on `.note`, not on the pseudo.',
          'Answer shape: `.note { padding-left: 24px; color: #7a2530; }` and `.note::before { content: "✦ "; }`',
        ],
      },
    },

    {
      id: 'c11',
      name: 'The Soft Shadow',
      concept: 'Shadows & gradients',
      brief:
        'Light falling across parchment: a soft edge behind a card, and colour that fades from one dye into another.',
      lesson: [
        {
          type: 'p',
          text: '`box-shadow` lifts a surface. Linear and radial gradients paint backgrounds that change across the box.',
        },
        {
          type: 'code',
          code: `.card {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  background: linear-gradient(180deg, #fff8ee, #f0e6d6);
}`,
        },
        {
          type: 'p',
          text: 'Shadow values are offset-x, offset-y, blur, spread, then colour. Gradients need at least two colour stops.',
        },
        {
          type: 'note',
          text: 'Soft, large, low-opacity shadows look more natural than hard black outlines.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="card">A lifted card.</div>`,
        prompt:
          'Cast the light. Give `.card` `border-radius: 12px`, `background-color: #fff8ee`, and `opacity: 1`.',
        starter: `.card {

}
`,
        checks: [
          {
            kind: 'style',
            sel: '.card',
            prop: 'border-radius',
            expected: '12px',
            describe: 'corners are rounded 12px',
          },
          {
            kind: 'style',
            sel: '.card',
            prop: 'background-color',
            expected: '#fff8ee',
            describe: 'background is #fff8ee',
          },
          { kind: 'style', sel: '.card', prop: 'opacity', expected: '1', describe: 'opacity is 1' },
        ],
        hints: [
          'Three declarations — radius, background-color, opacity.',
          'Use `background-color` (not a gradient) so the check can compare a solid colour.',
          'Answer shape: `border-radius: 12px; background-color: #fff8ee; opacity: 1;`',
        ],
      },
    },

    {
      id: 'c12',
      name: 'The Slow Door',
      concept: 'Transitions',
      brief:
        'A door that does not slam — colour and size ease from one state into the next when you touch them.',
      lesson: [
        {
          type: 'p',
          text: '`transition` animates property changes between states (often `:hover`). Name the property, the duration, and optionally the easing.',
        },
        {
          type: 'code',
          code: `.door {
  background: #f0e6d6;
  transition: background 200ms ease, transform 200ms ease;
}

.door:hover {
  background: #e2d3bb;
  transform: translateY(-2px);
}`,
        },
        {
          type: 'p',
          text: '`transition: all` works but is blunt — prefer listing the properties you mean to move.',
        },
        {
          type: 'note',
          text: 'Keep UI transitions short (150–300ms). Longer motion belongs to deliberate animations, not hover feedback.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<button class="door">Open</button>`,
        prompt:
          'Ease the door. Give `.door` `transition-property: background-color`, `transition-duration: 200ms`, and `background-color: #f0e6d6`.',
        starter: `.door {

}
`,
        checks: [
          {
            kind: 'style',
            sel: '.door',
            prop: 'transition-property',
            expected: 'background-color',
            describe: 'transition-property is background-color',
          },
          {
            kind: 'style',
            sel: '.door',
            prop: 'transition-duration',
            expected: '200ms',
            describe: 'duration is 200ms',
          },
          {
            kind: 'style',
            sel: '.door',
            prop: 'background-color',
            expected: '#f0e6d6',
            describe: 'background is #f0e6d6',
          },
        ],
        hints: [
          'Write `transition-duration: 200ms` exactly — that is how the exam reads it.',
          'Use the longhand properties listed in the prompt.',
          'Answer shape: `transition-property: background-color; transition-duration: 200ms; background-color: #f0e6d6;`',
        ],
      },
    },
  ],
}
