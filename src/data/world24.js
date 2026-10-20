export default {
  track: 'css',
  id: 'type-foundry',
  name: 'The Type Foundry',
  tagline: 'Typography, calc, lists, scroll and centering',
  icon: '🔤',
  rooms: [
    {
      id: 'c19',
      name: 'The Letter Press',
      concept: 'Typography',
      brief: 'Type that sits at the right size, weight and leading for reading by candlelight.',
      lesson: [
        {
          type: 'p',
          text: '`font-family`, `font-size`, `font-weight`, `line-height`, and `letter-spacing` control how text reads.',
        },
        {
          type: 'code',
          code: `body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  line-height: 1.5;
  letter-spacing: 0.01em;
}`,
        },
        {
          type: 'note',
          text: 'Unitless `line-height` scales with the font size — usually what you want.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<p class="prose">Readable prose.</p>`,
        prompt:
          'Style `.prose` with `font-size: 18px`, `line-height: 1.5`, and `font-weight: 400`.',
        starter: `.prose {

}
`,
        checks: [
          { kind: 'style', sel: '.prose', prop: 'font-size', expected: '18px', describe: 'font-size' },
          { kind: 'style', sel: '.prose', prop: 'line-height', expected: '1.5', describe: 'line-height 1.5' },
          { kind: 'style', sel: '.prose', prop: 'font-weight', expected: '400', describe: 'font-weight' },
        ],
        hints: [
          'Write line-height as the unitless number 1.5.',
          'font-weight 400 is normal.',
          'Three declarations on `.prose`.',
        ],
      },
    },

    {
      id: 'c20',
      name: 'The Aligned Margin',
      concept: 'Text alignment & decoration',
      brief: 'Lines centred like a title, links that shed their underline, words struck through when revoked.',
      lesson: [
        {
          type: 'p',
          text: '`text-align`, `text-decoration`, and `text-transform` adjust alignment, underlines, and case.',
        },
        {
          type: 'code',
          code: `h1 { text-align: center; text-transform: uppercase; }
a { text-decoration: none; }
.done { text-decoration: line-through; }`,
        },
        {
          type: 'note',
          text: 'Removing link underlines? Add another cue (weight, colour, focus ring) so they stay obvious.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<h1 class="title">Charms</h1><a class="quiet" href="#">Syllabus</a>`,
        prompt:
          'Centre `.title` with `text-align: center` and uppercase it. Set `.quiet` to `text-decoration: none` and `color: #22407a`.',
        starter: `.title {

}
.quiet {

}
`,
        checks: [
          { kind: 'style', sel: '.title', prop: 'text-align', expected: 'center', describe: 'centred' },
          {
            kind: 'style',
            sel: '.title',
            prop: 'text-transform',
            expected: 'uppercase',
            describe: 'uppercase',
          },
          {
            kind: 'style',
            sel: '.quiet',
            prop: 'text-decoration-line',
            expected: 'none',
            describe: 'no underline',
          },
          { kind: 'style', sel: '.quiet', prop: 'color', expected: '#22407a', describe: 'link colour' },
        ],
        hints: [
          'text-decoration: none computes as text-decoration-line: none in the exam.',
          'Two rules: .title and .quiet.',
          'Match the hex colour exactly.',
        ],
      },
    },

    {
      id: 'c21',
      name: 'The Calculated Gap',
      concept: 'calc()',
      brief: 'A width that mixes percentages with fixed gutters — arithmetic inside the stylesheet.',
      lesson: [
        {
          type: 'p',
          text: '`calc()` lets you mix units: `calc(100% - 48px)`, `calc(2rem + 10%)`.',
        },
        {
          type: 'code',
          code: `.main {
  width: calc(100% - 2 * 24px);
  padding: calc(1rem + 2vw);
}`,
        },
        {
          type: 'note',
          text: 'Always leave spaces around `+` and `-` inside calc. `*` and `/` are stricter about types.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="main">Content</div>`,
        prompt:
          'Give `.main` `width: calc(100% - 40px)`, `max-width: 800px`, and `padding: 16px`.',
        starter: `.main {

}
`,
        checks: [
          { kind: 'style', sel: '.main', prop: 'padding', expected: '16px', describe: 'padding 16px' },
          { kind: 'style', sel: '.main', prop: 'max-width', expected: '800px', describe: 'max-width 800px' },
          {
            kind: 'style',
            sel: '.main',
            prop: 'width',
            expected: 'calc(100% - 40px)',
            describe: 'width uses calc',
          },
        ],
        hints: [
          'Spaces around the minus sign inside calc.',
          'Three declarations on `.main`.',
          'Answer shape: `width: calc(100% - 40px); max-width: 800px; padding: 16px;`',
        ],
      },
    },

    {
      id: 'c22',
      name: 'The Numbered Scroll',
      concept: 'Lists & counters',
      brief: 'Bullets removed, numbers restyled — a scroll that counts itself.',
      lesson: [
        {
          type: 'p',
          text: '`list-style` controls markers. CSS counters (`counter-reset`, `counter-increment`, `counter()`) build custom numbering.',
        },
        {
          type: 'code',
          code: `ul { list-style: none; padding-left: 0; }

.steps { counter-reset: step; }
.steps li { counter-increment: step; }
.steps li::before {
  content: counter(step) ". ";
}`,
        },
        {
          type: 'note',
          text: 'For accessibility, keep real `<ol>` / `<ul>` — do not fake lists with divs.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<ul class="plain"><li>One</li><li>Two</li></ul>`,
        prompt:
          'Strip the bullets: `.plain` gets `list-style-type: none` and `padding-left: 0`.',
        starter: `.plain {

}
`,
        checks: [
          {
            kind: 'style',
            sel: '.plain',
            prop: 'list-style-type',
            expected: 'none',
            describe: 'no bullets',
          },
          {
            kind: 'style',
            sel: '.plain',
            prop: 'padding-left',
            expected: '0px',
            describe: 'no left padding',
          },
        ],
        hints: [
          'list-style-type: none removes markers.',
          'padding-left: 0 (computes as 0px).',
          'Both on `.plain`.',
        ],
      },
    },

    {
      id: 'c23',
      name: 'The Snapping Gallery',
      concept: 'Scroll snap',
      brief: 'A gallery that settles on each portrait as you slide — no half-frames left hanging.',
      lesson: [
        {
          type: 'p',
          text: '`scroll-snap-type` on the scroller and `scroll-snap-align` on children make scroll positions latch.',
        },
        {
          type: 'code',
          code: `.row {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.card {
  scroll-snap-align: start;
  flex: 0 0 80%;
}`,
        },
        {
          type: 'note',
          text: '`mandatory` always snaps; `proximity` snaps when close enough.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="row"><div class="card">A</div><div class="card">B</div></div>`,
        prompt:
          'Make `.row` `display: flex`, `overflow-x: auto`, and `scroll-snap-type: x mandatory`. Give `.card` `scroll-snap-align: start`.',
        starter: `.row {

}
.card {

}
`,
        checks: [
          { kind: 'style', sel: '.row', prop: 'display', expected: 'flex', describe: 'flex' },
          { kind: 'style', sel: '.row', prop: 'overflow-x', expected: 'auto', describe: 'overflow-x' },
          {
            kind: 'style',
            sel: '.row',
            prop: 'scroll-snap-type',
            expected: 'x mandatory',
            describe: 'snap type',
          },
          {
            kind: 'style',
            sel: '.card',
            prop: 'scroll-snap-align',
            expected: 'start',
            describe: 'snap align',
          },
        ],
        hints: [
          'Three declarations on `.row`, one on `.card`.',
          'scroll-snap-type value is `x mandatory`.',
          'Match the prompt’s properties exactly.',
        ],
      },
    },

    {
      id: 'c24',
      name: 'The Centred Column',
      concept: 'Centering patterns',
      brief: 'A column of text that sits in the middle of a wide hall, never stretching edge to edge.',
      lesson: [
        {
          type: 'p',
          text: 'The classic readable column: `max-width` + `margin-left/right: auto`. Flex/grid centering uses `place-items` or `justify-content` / `align-items`.',
        },
        {
          type: 'code',
          code: `.column {
  max-width: 40rem;
  margin-inline: auto;
  padding-inline: 1rem;
}

.stage {
  display: grid;
  place-items: center;
  min-height: 100vh;
}`,
        },
        {
          type: 'note',
          text: '`margin-inline: auto` is the modern writing-mode-friendly form of `margin: 0 auto`.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="column">Prose.</div>`,
        prompt:
          'Centre `.column` with `max-width: 480px`, `margin-left: auto`, and `margin-right: auto`.',
        starter: `.column {

}
`,
        checks: [
          { kind: 'style', sel: '.column', prop: 'max-width', expected: '480px', describe: 'max-width' },
          {
            kind: 'style',
            sel: '.column',
            prop: 'margin-left',
            expected: 'auto',
            describe: 'margin-left auto',
          },
          {
            kind: 'style',
            sel: '.column',
            prop: 'margin-right',
            expected: 'auto',
            describe: 'margin-right auto',
          },
        ],
        hints: [
          'Three declarations.',
          'auto margins on left and right centre a block with max-width.',
          'Answer shape: `max-width: 480px; margin-left: auto; margin-right: auto;`',
        ],
      },
    },
  ],
}
