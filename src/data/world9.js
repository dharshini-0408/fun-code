export default {
  track: 'css',
  id: 'robing-room',
  name: 'The Robing Room',
  tagline: 'CSS, from colour to layout',
  icon: '🎨',
  rooms: [
    {
      id: 'c1',
      name: 'The Colour Chest',
      concept: 'Selectors & declarations',
      brief:
        'A chest of dyes stands open, every bottle labelled but none of them applied. The robes on the rail are all the same drab grey, and the door will not open until they are not.',
      lesson: [
        {
          type: 'p',
          text: 'CSS picks elements out of the page and gives them properties. A rule is a **selector**, then a block of **declarations**.',
        },
        {
          type: 'code',
          code: `h1 {
  color: #7a2530;
  font-size: 32px;
}`,
        },
        {
          type: 'p',
          text: '`h1` is the selector — every `<h1>` on the page. Inside the braces, each declaration is `property: value;`. The semicolon ends it.',
        },
        { type: 'p', text: 'There are three selectors you will use constantly:' },
        {
          type: 'code',
          code: `p        { }   /* by tag   — every <p>              */
.note    { }   /* by class — every class="note"      */
#total   { }   /* by id    — the one id="total"       */`,
        },
        {
          type: 'p',
          text: 'A class may be shared by any number of elements, and an element may carry several classes. An id belongs to exactly one element. Reach for classes almost always.',
        },
        {
          type: 'note',
          text: 'Colours can be written as a name (`red`), a hex code (`#7a2530`) or `rgb(122, 37, 48)`. Hex is the common currency.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<h1>The Robing Room</h1>
<p class="note">Every robe the same drab grey.</p>`,
        prompt:
          'Open the chest. Make every `<h1>` the colour `#7a2530`, and anything with the class `note` the colour `#1f5c3d`.',
        starter: `/* your rules go here */
`,
        checks: [
          { kind: 'style', sel: 'h1', prop: 'color', expected: '#7a2530', describe: 'the h1 is dyed #7a2530' },
          { kind: 'style', sel: '.note', prop: 'color', expected: '#1f5c3d', describe: '.note is dyed #1f5c3d' },
        ],
        hints: [
          'Two rules, one per selector. A class selector begins with a dot.',
          'The property for text colour is `color`, and every declaration ends in a semicolon.',
          'Answer shape: `h1 { color: #7a2530; }` and `.note { color: #1f5c3d; }`',
        ],
      },
    },

    {
      id: 'c2',
      name: 'The Fitting Boxes',
      concept: 'The box model',
      brief:
        'Every robe is folded into a box, and every box is the wrong size. Some have too much packing inside, some too little space around them, and the shelf will not close.',
      lesson: [
        {
          type: 'p',
          text: 'Every element is a box, built of four layers from the inside out: **content**, **padding**, **border**, **margin**.',
        },
        {
          type: 'code',
          code: `.card {
  padding: 16px;        /* space INSIDE, before the border  */
  border: 2px solid #333;
  margin: 24px;         /* space OUTSIDE, pushing others away */
}`,
        },
        {
          type: 'p',
          text: 'Padding is inside the box and takes the background colour with it. Margin is outside and is always transparent — it is the gap to its neighbours.',
        },
        { type: 'p', text: 'Any of the four can be set per side, clockwise from the top:' },
        {
          type: 'code',
          code: `padding: 10px;                 /* all four sides       */
padding: 10px 20px;            /* top+bottom, left+right */
padding: 1px 2px 3px 4px;      /* top, right, bottom, left */

padding-top: 10px;             /* or just the one        */`,
        },
        {
          type: 'note',
          text: 'By default `width` measures the *content only*, so padding and border make the box bigger than the number you wrote. `box-sizing: border-box` makes width mean the whole box instead, which is nearly always what you meant.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="card">A folded robe.</div>`,
        prompt:
          'Refold the box. Give `.card` `16px` of padding on every side, a `24px` margin on every side, and set its `box-sizing` to `border-box`.',
        starter: `.card {

}
`,
        checks: [
          { kind: 'style', sel: '.card', prop: 'padding-top', expected: '16px', describe: 'padding is 16px' },
          { kind: 'style', sel: '.card', prop: 'padding-left', expected: '16px', describe: 'padding applies to every side' },
          { kind: 'style', sel: '.card', prop: 'margin-top', expected: '24px', describe: 'margin is 24px' },
          { kind: 'style', sel: '.card', prop: 'margin-right', expected: '24px', describe: 'margin applies to every side' },
          { kind: 'style', sel: '.card', prop: 'box-sizing', expected: 'border-box', describe: 'box-sizing is border-box' },
        ],
        hints: [
          'Three declarations, all inside the `.card { }` block already written for you.',
          'One value applies to all four sides at once — you do not need `padding-top` and friends here.',
          'Answer shape: `padding: 16px; margin: 24px; box-sizing: border-box;`',
        ],
      },
    },

    {
      id: 'c3',
      name: 'The Order of Precedence',
      concept: 'The cascade & specificity',
      brief:
        'Two tailors have written conflicting instructions on the same robe, and a third has scrawled over both. The robe cannot decide what colour it is, and flickers.',
      lesson: [
        {
          type: 'p',
          text: 'When two rules set the same property on the same element, the browser must pick one. It has an order.',
        },
        {
          type: 'p',
          text: 'First it compares **specificity** — how precisely each selector names the element. Roughly:',
        },
        {
          type: 'code',
          code: `element      p            weakest
class        .note
id           #total       strongest`,
        },
        {
          type: 'p',
          text: 'An id beats any number of classes; a class beats any number of tags. Only when specificity ties does the **later** rule win.',
        },
        {
          type: 'code',
          code: `p        { color: grey;  }   /* loses: weakest      */
.note    { color: green; }   /* loses to the id     */
#lead    { color: red;   }   /* wins                */`,
        },
        {
          type: 'p',
          text: 'Combining selectors adds them up. `.card p` is one class plus one tag, which beats `p` on its own.',
        },
        {
          type: 'note',
          text: '`!important` overrides all of it and is almost always a mistake — it wins the battle and loses the war, because the only way to beat it later is another `!important`.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="card">
  <p class="note" id="lead">Which colour am I?</p>
</div>`,
        prompt:
          'Settle the argument. Write three rules so the paragraph ends up `#1f5c3d`: a `p` rule setting `#111111`, a `.note` rule setting `#22407a`, and an `#lead` rule setting `#1f5c3d`.',
        starter: `/* weakest first, strongest last */
`,
        checks: [
          { kind: 'style', sel: '#lead', prop: 'color', expected: '#1f5c3d', describe: 'the id rule wins' },
          { kind: 'exists', sel: 'p.note#lead', describe: 'the paragraph carries all three selectors' },
        ],
        hints: [
          'Write all three rules. The point is that the id one wins regardless of the order you put them in.',
          'A tag selector is a bare name, a class starts with `.`, an id starts with `#`.',
          'Answer shape: `p { color: #111111; }`, `.note { color: #22407a; }`, `#lead { color: #1f5c3d; }`',
        ],
      },
    },

    {
      id: 'c4',
      name: 'The Row of Hooks',
      concept: 'Flexbox',
      brief:
        'A rail of hooks runs the length of the wall, but every robe hangs from the same one, stacked and crushed. They need to be spread along the rail, and level with each other.',
      lesson: [
        {
          type: 'p',
          text: 'Flexbox lays children out along one axis. You set it on the **parent**, and the children fall into line.',
        },
        {
          type: 'code',
          code: `.rail {
  display: flex;
  gap: 12px;
}`,
        },
        {
          type: 'p',
          text: 'That alone puts every child in a row, side by side, with a 12px gap. `flex-direction: column` turns the row into a stack.',
        },
        { type: 'p', text: 'Two properties do most of the work:' },
        {
          type: 'code',
          code: `justify-content: space-between;  /* along the axis   */
align-items: center;             /* across the axis  */`,
        },
        {
          type: 'p',
          text: '`justify-content` spreads children **along** the direction they flow — `flex-start`, `center`, `space-between`, `space-around`. `align-items` positions them **across** it — `stretch`, `center`, `flex-start`.',
        },
        {
          type: 'note',
          text: 'The two swap meaning when you set `flex-direction: column`. `justify-content` always follows the flow; `align-items` is always the other way.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="rail">
  <div class="robe">One</div>
  <div class="robe">Two</div>
  <div class="robe">Three</div>
</div>`,
        prompt:
          'Hang them along the rail. Make `.rail` a flex container, spread its children with `space-between`, centre them with `align-items`, and put a `12px` gap between them.',
        starter: `.rail {

}
`,
        checks: [
          { kind: 'style', sel: '.rail', prop: 'display', expected: 'flex', describe: 'the rail is a flex container' },
          { kind: 'style', sel: '.rail', prop: 'justify-content', expected: 'space-between', describe: 'children are spread apart' },
          { kind: 'style', sel: '.rail', prop: 'align-items', expected: 'center', describe: 'children are centred across the axis' },
          { kind: 'style', sel: '.rail', prop: 'gap', expected: '12px', describe: 'there is a 12px gap' },
        ],
        hints: [
          'Four declarations, all on the parent. The children need nothing at all.',
          '`display: flex` must come first — the other three do nothing without it.',
          'Answer shape: `display: flex; justify-content: space-between; align-items: center; gap: 12px;`',
        ],
      },
    },

    {
      id: 'c5',
      name: 'The Pigeonholes',
      concept: 'Grid',
      brief:
        'A wall of pigeonholes, three across, each waiting for a folded robe. At present everything is in the first hole and the rest stand empty.',
      lesson: [
        {
          type: 'p',
          text: 'Flexbox handles one direction. Grid handles two at once — rows *and* columns — and you describe the shape up front.',
        },
        {
          type: 'code',
          code: `.wall {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}`,
        },
        {
          type: 'p',
          text: 'That is three equal columns. `fr` is a *fraction of the space left over* — `1fr 2fr` would make the second column twice the first.',
        },
        { type: 'p', text: 'Repeating yourself is common enough to have shorthand:' },
        {
          type: 'code',
          code: `grid-template-columns: repeat(3, 1fr);

/* as many 200px-minimum columns as fit, then wrap */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`,
        },
        {
          type: 'p',
          text: 'That second line is the whole of responsive grid layout in one declaration, with no media query at all.',
        },
        {
          type: 'note',
          text: 'Rule of thumb: grid when you are laying out the *page*, flexbox when you are lining up a *row of things*. They work happily inside one another.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<div class="wall">
  <div class="hole">A</div>
  <div class="hole">B</div>
  <div class="hole">C</div>
</div>`,
        prompt:
          'Build the pigeonholes. Make `.wall` a grid of exactly three equal columns using `repeat`, with a `10px` gap.',
        starter: `.wall {

}
`,
        checks: [
          { kind: 'style', sel: '.wall', prop: 'display', expected: 'grid', describe: 'the wall is a grid' },
          {
            kind: 'style',
            sel: '.wall',
            prop: 'grid-template-columns',
            expected: 'repeat(3, 1fr)',
            describe: 'it has three equal columns',
          },
          { kind: 'style', sel: '.wall', prop: 'gap', expected: '10px', describe: 'there is a 10px gap' },
        ],
        hints: [
          'Three declarations. `display: grid` comes first.',
          'Write the columns with `repeat(3, 1fr)` exactly — three columns, each one fraction wide.',
          'Answer shape: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;`',
        ],
      },
    },

    {
      id: 'c6',
      name: 'The Shrinking Doorway',
      concept: 'Responsive design & variables',
      brief:
        'The doorway narrows as you approach it. A robe cut for the wide hall will not pass through the narrow one, and must be recut on the way.',
      lesson: [
        {
          type: 'p',
          text: 'A media query applies rules only when the page is a certain size. Write the small layout first, then widen it.',
        },
        {
          type: 'code',
          code: `.wall {
  display: grid;
  grid-template-columns: 1fr;   /* one column by default */
}

@media (min-width: 700px) {
  .wall { grid-template-columns: repeat(3, 1fr); }
}`,
        },
        {
          type: 'p',
          text: 'That is *mobile first*: the plain rule is the narrow case, and the query adds to it once there is room. It reads better and it degrades better.',
        },
        { type: 'p', text: 'Custom properties let you name a value once and use it everywhere:' },
        {
          type: 'code',
          code: `:root {
  --ink: #7a2530;
}

h1   { color: var(--ink); }
.tag { border: 1px solid var(--ink); }`,
        },
        {
          type: 'p',
          text: '`:root` is the document itself, so anything defined there is available to every rule below. Change the one line and the whole page follows.',
        },
        {
          type: 'note',
          text: 'These are real CSS, not a preprocessor. They cascade and inherit like anything else, and JavaScript can read and change them at runtime.',
        },
      ],
      puzzle: {
        kind: 'markup',
        surface: 'css',
        html: `<h1>The Shrinking Doorway</h1>
<p class="tag">Recut on the way through.</p>`,
        prompt:
          'Name the dye once. Define `--ink` as `#7a2530` on `:root`, then use `var(--ink)` to colour both the `<h1>` and `.tag`.',
        starter: `:root {

}
`,
        checks: [
          { kind: 'style', sel: 'h1', prop: 'color', expected: '#7a2530', describe: 'the h1 takes the variable' },
          { kind: 'style', sel: '.tag', prop: 'color', expected: '#7a2530', describe: '.tag takes the same variable' },
        ],
        hints: [
          'Define the variable inside the `:root { }` block, then write two more rules that use it.',
          'A custom property must start with two dashes, and you read it back with `var(--name)`.',
          'Answer shape: `:root { --ink: #7a2530; }`, then `h1 { color: var(--ink); }` and `.tag { color: var(--ink); }`',
        ],
      },
    },
  ],
}
