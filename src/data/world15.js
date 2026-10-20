export default {
  track: 'css',
  id: 'enchanted-loom',
  name: 'The Enchanted Loom',
  tagline: 'Motion, filters and modern layout tools',
  icon: '🧵',
  rooms: [
    {
      id: 'c13',
      name: 'The Turning Crest',
      concept: 'Transforms',
      brief:
        'A crest that tips, grows and slides without leaving its place in the document — the box stays; the drawing moves.',
      lesson: [
        {
          type: 'p',
          text: '`transform` moves, scales or rotates an element visually without changing layout for its siblings.',
        },
        {
          type: 'code',
          code: `.crest {
  transform: rotate(-6deg) scale(1.05);
  transform-origin: center;
}

.crest:hover {
  transform: rotate(0deg) scale(1.1);
}`,
        },
        {
          type: 'p',
          text: 'Common functions: `translate`, `scale`, `rotate`, `skew`. Combine them in one `transform` — later functions apply first in the list’s visual stack.',
        },
        {
          type: 'note',
          text: 'Prefer `transform` and `opacity` for animation — they are cheaper than animating `top`, `left` or `width`.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="crest">G</div>`,
        prompt:
          'Turn the crest. Give `.crest` `width: 64px`, `height: 64px`, and `opacity: 1`. (Add any `transform` you like for practice — the checks watch the box.)',
        starter: `.crest {

}
`,
        checks: [
          { kind: 'style', sel: '.crest', prop: 'width', expected: '64px', describe: 'width is 64px' },
          { kind: 'style', sel: '.crest', prop: 'height', expected: '64px', describe: 'height is 64px' },
          { kind: 'style', sel: '.crest', prop: 'opacity', expected: '1', describe: 'opacity is 1' },
        ],
        hints: [
          'Three declarations on `.crest`.',
          'Try `transform: rotate(-6deg)` while you are here — it will not be marked.',
          'Answer shape: `width: 64px; height: 64px; opacity: 1;`',
        ],
      },
    },

    {
      id: 'c14',
      name: 'The Looping Lantern',
      concept: 'Animations',
      brief:
        'A lantern that breathes on its own — brighter, dimmer, brighter — without anyone hovering.',
      lesson: [
        {
          type: 'p',
          text: '`@keyframes` names a sequence of frames. `animation` attaches that sequence to an element with duration and repetition.',
        },
        {
          type: 'code',
          code: `@keyframes pulse {
  from { opacity: 0.6; }
  to   { opacity: 1; }
}

.lantern {
  animation: pulse 1.2s ease-in-out infinite alternate;
}`,
        },
        {
          type: 'p',
          text: 'Use percentages (`0%`, `50%`, `100%`) when you need more than two stops. `animation-fill-mode: forwards` keeps the final frame.',
        },
        {
          type: 'note',
          text: 'Respect `prefers-reduced-motion` — offer a still state for visitors who ask the system to calm motion.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="lantern">✦</div>`,
        prompt:
          'Light the loop. Give `.lantern` `animation-name: pulse`, `animation-duration: 1s`, and `opacity: 1`. (Define `@keyframes pulse` as you like — the checks watch the element.)',
        starter: `@keyframes pulse {
  from { opacity: 0.5; }
  to { opacity: 1; }
}
.lantern {

}
`,
        checks: [
          {
            kind: 'style',
            sel: '.lantern',
            prop: 'animation-name',
            expected: 'pulse',
            describe: 'animation-name is pulse',
          },
          {
            kind: 'style',
            sel: '.lantern',
            prop: 'animation-duration',
            expected: '1s',
            describe: 'duration is 1s',
          },
          { kind: 'style', sel: '.lantern', prop: 'opacity', expected: '1', describe: 'opacity is 1' },
        ],
        hints: [
          'Longhands are clearer here: animation-name and animation-duration.',
          'The keyframes block is already started for you — finish `.lantern`.',
          'Answer shape: `.lantern { animation-name: pulse; animation-duration: 1s; opacity: 1; }`',
        ],
      },
    },

    {
      id: 'c15',
      name: 'The Veil',
      concept: 'Filters & opacity',
      brief:
        'A veil over a portrait: dimmed, blurred, or washed of colour — the picture remains, the light changes.',
      lesson: [
        {
          type: 'p',
          text: '`opacity` fades the whole element including its children. `filter` adjusts the rendering: blur, brightness, grayscale, contrast.',
        },
        {
          type: 'code',
          code: `.veil {
  opacity: 0.85;
  filter: grayscale(40%) brightness(1.05);
}

.ghost {
  filter: blur(2px);
}`,
        },
        {
          type: 'p',
          text: 'Filters can stack in one declaration. They apply in order from left to right.',
        },
        {
          type: 'note',
          text: '`opacity: 0` hides visually but the element can still receive clicks — use `visibility` or `pointer-events` when you need otherwise.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<img class="veil" src="portrait.png" alt="">`,
        prompt: 'Draw the veil. Give `.veil` `opacity: 0.8` and `filter: blur(0px)`.',
        starter: `.veil {

}
`,
        checks: [
          { kind: 'style', sel: '.veil', prop: 'opacity', expected: '0.8', describe: 'opacity is 0.8' },
          {
            kind: 'style',
            sel: '.veil',
            prop: 'filter',
            expected: 'blur(0px)',
            describe: 'blur filter is set',
          },
        ],
        hints: [
          'Use `blur(0px)` so the computed filter stays a stable string for the exam.',
          'Both declarations go on `.veil`.',
          'Answer shape: `opacity: 0.8; filter: blur(0px);`',
        ],
      },
    },

    {
      id: 'c16',
      name: 'The Fitted Frame',
      concept: 'Object-fit & aspect-ratio',
      brief:
        'Portraits forced into frames that are not their shape — crop, letterbox, or stretch. The frame decides; the paint obeys.',
      lesson: [
        {
          type: 'p',
          text: '`object-fit` controls how replaced content (`img`, `video`) fills its box. `aspect-ratio` locks the box’s shape.',
        },
        {
          type: 'code',
          code: `.frame {
  width: 200px;
  aspect-ratio: 1 / 1;
}

.frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;   /* crop to fill */
  object-position: center;
}`,
        },
        {
          type: 'p',
          text: '`cover` fills and crops. `contain` letterboxes. `fill` stretches. Prefer `cover` for thumbnails.',
        },
        {
          type: 'note',
          text: '`aspect-ratio` replaces many old padding-hack tricks for responsive media boxes.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="frame"><img src="owl.png" alt=""></div>`,
        prompt:
          'Fit the portrait. Give `.frame` `width: 160px` and `aspect-ratio: 1 / 1`, and give `.frame img` `object-fit: cover`.',
        starter: `.frame {

}
.frame img {
  width: 100%;
  height: 100%;
}
`,
        checks: [
          { kind: 'style', sel: '.frame', prop: 'width', expected: '160px', describe: 'frame width is 160px' },
          {
            kind: 'style',
            sel: '.frame',
            prop: 'aspect-ratio',
            expected: '1 / 1',
            describe: 'aspect-ratio is 1 / 1',
          },
          {
            kind: 'style',
            sel: '.frame img',
            prop: 'object-fit',
            expected: 'cover',
            describe: 'image object-fit is cover',
          },
        ],
        hints: [
          'aspect-ratio goes on the frame; object-fit on the image.',
          'Write `1 / 1` with spaces around the slash.',
          'Answer shape: `.frame { width: 160px; aspect-ratio: 1 / 1; }` and `.frame img { object-fit: cover; ... }`',
        ],
      },
    },

    {
      id: 'c17',
      name: 'The Fluid Measure',
      concept: 'Clamp & fluid type',
      brief:
        'A title that grows with the hall, but never smaller than a whisper nor larger than a shout.',
      lesson: [
        {
          type: 'p',
          text: '`clamp(min, preferred, max)` picks a fluid value bounded at both ends. It is the clean way to do responsive type and spacing.',
        },
        {
          type: 'code',
          code: `h1 {
  font-size: clamp(1.4rem, 2vw + 1rem, 2.8rem);
}

.pad {
  padding-inline: clamp(12px, 4vw, 48px);
}`,
        },
        {
          type: 'p',
          text: '`vw` is one percent of the viewport width. Mixing `rem` and `vw` keeps type readable on tiny and huge screens.',
        },
        {
          type: 'note',
          text: 'Test the extremes. If the preferred expression is wrong, clamp still obeys min/max — but the middle feels stuck.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<h1 class="title">Fluid Measure</h1>`,
        prompt:
          'Bound the title. Set `.title` `font-size` to `clamp(20px, 4vw, 40px)`, `line-height` to `1.2`, and `color` to `#7a2530`.',
        starter: `.title {

}
`,
        checks: [
          {
            kind: 'style',
            sel: '.title',
            prop: 'line-height',
            expected: '1.2',
            describe: 'line-height is 1.2',
          },
          {
            kind: 'style',
            sel: '.title',
            prop: 'color',
            expected: '#7a2530',
            describe: 'colour is #7a2530',
          },
        ],
        hints: [
          'Write the clamp for font-size even though the checks watch line-height and colour.',
          'line-height: 1.2 is unitless.',
          'Answer shape: `font-size: clamp(20px, 4vw, 40px); line-height: 1.2; color: #7a2530;`',
        ],
      },
    },

    {
      id: 'c18',
      name: 'The Watchful Selector',
      concept: 'Advanced selectors',
      brief:
        'Rules that notice what a box contains, what follows it, or whether a child is in a certain state — CSS that watches the tree.',
      lesson: [
        {
          type: 'p',
          text: 'Modern selectors reach sideways and inward: `:has()`, `+` (adjacent sibling), `~` (general sibling), and attribute selectors.',
        },
        {
          type: 'code',
          code: `/* card that contains a .badge */
.card:has(.badge) {
  border-color: #7a2530;
}

label:has(input:checked) {
  font-weight: 700;
}

input[type="search"] {
  padding-left: 28px;
}`,
        },
        {
          type: 'p',
          text: '`:has()` is the parent selector CSS lacked for years. Use it sparingly — complex trees can get expensive.',
        },
        {
          type: 'note',
          text: 'Attribute selectors (`[aria-expanded="true"]`) pair well with accessible state you already put in the HTML.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="card"><span class="badge">New</span>Charms</div>
<div class="card">Potions</div>`,
        prompt:
          'Watch the tree. Style `.card:has(.badge)` with `border-style: solid` and `border-width: 2px`, and style `.card` with `padding: 12px`.',
        starter: `.card {
  border-color: #7a2530;
}
.card:has(.badge) {

}
`,
        checks: [
          { kind: 'style', sel: '.card', prop: 'padding', expected: '12px', describe: 'cards have 12px padding' },
          {
            kind: 'style',
            sel: '.card:has(.badge)',
            prop: 'border-top-style',
            expected: 'solid',
            describe: 'card with badge has a solid border',
          },
          {
            kind: 'style',
            sel: '.card:has(.badge)',
            prop: 'border-top-width',
            expected: '2px',
            describe: 'border width is 2px',
          },
        ],
        hints: [
          'Put padding on `.card`; put border-style and border-width on `.card:has(.badge)`.',
          'You can write `border: 2px solid` as a shorthand on the :has rule.',
          'Answer shape: `.card { padding: 12px; ... }` and `.card:has(.badge) { border-style: solid; border-width: 2px; }`',
        ],
      },
    },
  ],
}
