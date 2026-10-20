export default {
  track: 'html',
  id: 'chamber-of-echoes',
  name: 'The Chamber of Echoes',
  tagline: 'Disclosure, dialogs, data and living markup',
  icon: '🔮',
  rooms: [
    {
      id: 'h13',
      name: 'The Folded Scroll',
      concept: 'Details & summary',
      brief:
        'A scroll sealed with a ribbon. Pull the ribbon and the rest unfurls. Leave it and only the title shows.',
      lesson: [
        {
          type: 'p',
          text: '`<details>` hides content until opened. `<summary>` is the always-visible label you click.',
        },
        {
          type: 'code',
          code: `<details>
  <summary>House points</summary>
  <p>Gryffindor leads by twelve.</p>
</details>`,
        },
        {
          type: 'p',
          text: 'Add the `open` attribute to start expanded. No JavaScript is required for the basic toggle.',
        },
        {
          type: 'note',
          text: 'Use details for optional extras — FAQs, footnotes, spoilers — not for primary navigation.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Fold the scroll. Make a `<details>` with `<summary>` reading **Hidden stair**, and inside it a `<p>` reading **Behind the tapestry on the third floor.**',
        starter: `<details>

</details>
`,
        checks: [
          { kind: 'exists', sel: 'details summary', describe: 'there is a summary' },
          { kind: 'text', sel: 'details summary', expected: 'Hidden stair', describe: 'summary reads correctly' },
          { kind: 'nested', sel: 'p', within: 'details', describe: 'a paragraph is inside details' },
          {
            kind: 'text',
            sel: 'details p',
            expected: 'Behind the tapestry on the third floor.',
            describe: 'the paragraph reads correctly',
          },
        ],
        hints: [
          'Summary must be the first child of details.',
          'Put the paragraph after the summary, still inside details.',
          'Answer shape: `<details><summary>Hidden stair</summary><p>Behind the tapestry on the third floor.</p></details>`',
        ],
      },
    },

    {
      id: 'h14',
      name: 'The Modal Door',
      concept: 'Dialog',
      brief:
        'A door that appears in front of everything else, and will not let you past until you answer it — or close it.',
      lesson: [
        {
          type: 'p',
          text: '`<dialog>` is a native modal. Call `showModal()` in JavaScript to open it; here you only need the markup.',
        },
        {
          type: 'code',
          code: `<dialog id="warn">
  <p>The stair is moving.</p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>`,
        },
        {
          type: 'p',
          text: 'A form with `method="dialog"` closes the dialog when submitted — no script required for the close button.',
        },
        {
          type: 'note',
          text: 'Add the `open` attribute only for demos. Real pages open dialogs from a button click.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Build the door. Write a `<dialog id="warn">` containing a `<p>` reading **Mind the gap.** and a `<form method="dialog">` with a `<button>` reading **Close**.',
        starter: `<dialog id="warn">

</dialog>
`,
        checks: [
          { kind: 'exists', sel: 'dialog#warn', describe: 'there is dialog#warn' },
          { kind: 'text', sel: 'dialog#warn p', expected: 'Mind the gap.', describe: 'paragraph reads correctly' },
          {
            kind: 'attr',
            sel: 'dialog#warn form',
            name: 'method',
            expected: 'dialog',
            describe: 'form method is dialog',
          },
          { kind: 'text', sel: 'dialog#warn button', expected: 'Close', describe: 'button reads Close' },
        ],
        hints: [
          'Paragraph first, then the form wrapping the button.',
          '`method="dialog"` goes on the form, not the button.',
          'Answer shape: dialog#warn > p + form[method=dialog] > button Close',
        ],
      },
    },

    {
      id: 'h15',
      name: 'The Measuring Glass',
      concept: 'Progress & meter',
      brief:
        'Two glasses on the shelf: one fills toward a goal, the other marks where you stand between a low and a high mark.',
      lesson: [
        {
          type: 'p',
          text: '`<progress>` shows completion toward a known maximum. `<meter>` shows a value within a range — often with low/high/optimum hints.',
        },
        {
          type: 'code',
          code: `<progress value="70" max="100">70%</progress>

<meter min="0" max="100" low="30" high="70" value="55">55</meter>`,
        },
        {
          type: 'p',
          text: 'Always put readable fallback text inside for older browsers. Pair them with a visible label.',
        },
        {
          type: 'note',
          text: 'Use progress for uploads and steps. Use meter for scores, disk space, or “how full” readings — not for navigation.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Fill the glasses. Add a `<progress value="40" max="100">` and a `<meter min="0" max="10" value="7">`.',
        starter: `<!-- progress, then meter -->
`,
        checks: [
          { kind: 'exists', sel: 'progress', describe: 'there is a <progress>' },
          { kind: 'attr', sel: 'progress', name: 'value', expected: '40', describe: 'progress value is 40' },
          { kind: 'attr', sel: 'progress', name: 'max', expected: '100', describe: 'progress max is 100' },
          { kind: 'exists', sel: 'meter', describe: 'there is a <meter>' },
          { kind: 'attr', sel: 'meter', name: 'min', expected: '0', describe: 'meter min is 0' },
          { kind: 'attr', sel: 'meter', name: 'max', expected: '10', describe: 'meter max is 10' },
          { kind: 'attr', sel: 'meter', name: 'value', expected: '7', describe: 'meter value is 7' },
        ],
        hints: [
          'Two empty elements with attributes are enough — no children required for the checks.',
          'Write progress first, then meter.',
          'Answer shape: `<progress value="40" max="100"></progress><meter min="0" max="10" value="7"></meter>`',
        ],
      },
    },

    {
      id: 'h16',
      name: 'The Dated Ledger',
      concept: 'Time & data attributes',
      brief:
        'Every entry needs a machine-readable date, and every relic a quiet note the page can read later without showing it.',
      lesson: [
        {
          type: 'p',
          text: '`<time datetime="...">` gives humans readable text and machines an ISO date. `data-*` attributes store private notes on any element.',
        },
        {
          type: 'code',
          code: `<time datetime="1991-09-01">1 September 1991</time>

<article data-house="gryffindor" data-year="1">
  The first-year list.
</article>`,
        },
        {
          type: 'p',
          text: 'In JavaScript you read them as `element.dataset.house` — the prefix drops and the name becomes camelCase.',
        },
        {
          type: 'note',
          text: 'Do not invent custom attributes without the `data-` prefix. Stick to the standard for anything the browser or a framework might own.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Date the entry. Write a `<time datetime="1991-09-01">` reading **1 September 1991**, and an `<article data-house="gryffindor">` reading **First years.**',
        starter: `<!-- time, then article -->
`,
        checks: [
          { kind: 'exists', sel: 'time', describe: 'there is a <time>' },
          {
            kind: 'attr',
            sel: 'time',
            name: 'datetime',
            expected: '1991-09-01',
            describe: 'datetime is 1991-09-01',
          },
          { kind: 'text', sel: 'time', expected: '1 September 1991', describe: 'time text is correct' },
          { kind: 'exists', sel: 'article', describe: 'there is an <article>' },
          {
            kind: 'attr',
            sel: 'article',
            name: 'data-house',
            expected: 'gryffindor',
            describe: 'data-house is gryffindor',
          },
          { kind: 'text', sel: 'article', expected: 'First years.', describe: 'article text is correct' },
        ],
        hints: [
          'datetime is an attribute; the human-readable date is the element’s text content.',
          'data-house is written exactly like that — with the hyphen.',
          'Answer shape: `<time datetime="1991-09-01">1 September 1991</time><article data-house="gryffindor">First years.</article>`',
        ],
      },
    },

    {
      id: 'h17',
      name: 'The Drawn Rune',
      concept: 'Inline SVG',
      brief:
        'A rune drawn in vector ink: sharp at any size, and editable as markup rather than a frozen picture.',
      lesson: [
        {
          type: 'p',
          text: 'SVG can live inline in HTML. You draw with shapes; `viewBox` sets the coordinate system; `fill` colours them.',
        },
        {
          type: 'code',
          code: `<svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
  <circle cx="50" cy="50" r="40" fill="#7a2530" />
</svg>`,
        },
        {
          type: 'p',
          text: 'Inline SVG can be styled with CSS and given text alternatives via `<title>` or `aria-label` when it carries meaning.',
        },
        {
          type: 'note',
          text: 'Prefer SVG for icons and diagrams. Prefer `<img>` when the asset is a photograph.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Draw the rune. Write an `<svg width="80" height="80" viewBox="0 0 80 80">` containing a `<circle cx="40" cy="40" r="30" fill="#22407a">`.',
        starter: `<svg width="80" height="80" viewBox="0 0 80 80">

</svg>
`,
        checks: [
          { kind: 'exists', sel: 'svg', describe: 'there is an <svg>' },
          { kind: 'attr', sel: 'svg', name: 'viewBox', expected: '0 0 80 80', describe: 'viewBox is correct' },
          { kind: 'exists', sel: 'svg circle', describe: 'there is a circle inside the svg' },
          { kind: 'attr', sel: 'svg circle', name: 'cx', expected: '40', describe: 'cx is 40' },
          { kind: 'attr', sel: 'svg circle', name: 'cy', expected: '40', describe: 'cy is 40' },
          { kind: 'attr', sel: 'svg circle', name: 'r', expected: '30', describe: 'r is 30' },
          { kind: 'attr', sel: 'svg circle', name: 'fill', expected: '#22407a', describe: 'fill is #22407a' },
        ],
        hints: [
          'The circle is a child of the svg element.',
          'Self-close the circle or write `</circle>` — both are fine.',
          'Answer shape: svg with viewBox, and circle cx=40 cy=40 r=30 fill=#22407a',
        ],
      },
    },

    {
      id: 'h18',
      name: 'The Changing Portrait',
      concept: 'Picture & sources',
      brief:
        'The same face, three canvases: a small one for phones, a wide one for the hall, and a fallback when none of the fancy formats work.',
      lesson: [
        {
          type: 'p',
          text: '`<picture>` lets you swap image sources by viewport or format. The browser picks the first matching `<source>`, then falls back to `<img>`.',
        },
        {
          type: 'code',
          code: `<picture>
  <source media="(min-width: 700px)" srcset="hall-wide.jpg">
  <source type="image/webp" srcset="hall.webp">
  <img src="hall.jpg" alt="The Entrance Hall">
</picture>`,
        },
        {
          type: 'p',
          text: 'Always keep a final `<img>` — with `alt` — so there is always something to show and something to announce.',
        },
        {
          type: 'note',
          text: '`srcset` on a plain `<img>` is enough for resolution switching. Reach for `<picture>` when art direction or format changes.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Hang the changing portrait. Inside a `<picture>`, add a `<source media="(min-width: 700px)" srcset="wide.jpg">` and an `<img src="narrow.jpg" alt="The Entrance Hall">`.',
        starter: `<picture>

</picture>
`,
        checks: [
          { kind: 'exists', sel: 'picture source', describe: 'there is a source inside picture' },
          {
            kind: 'attr',
            sel: 'picture source',
            name: 'media',
            expected: '(min-width: 700px)',
            describe: 'media query is correct',
          },
          {
            kind: 'attr',
            sel: 'picture source',
            name: 'srcset',
            expected: 'wide.jpg',
            describe: 'srcset is wide.jpg',
          },
          { kind: 'exists', sel: 'picture img', describe: 'there is an img inside picture' },
          { kind: 'attr', sel: 'picture img', name: 'src', expected: 'narrow.jpg', describe: 'img src is narrow.jpg' },
          {
            kind: 'attr',
            sel: 'picture img',
            name: 'alt',
            expected: 'The Entrance Hall',
            describe: 'alt is correct',
          },
        ],
        hints: [
          'Source first, then the fallback img — order matters.',
          'media and srcset are attributes on source; src and alt on img.',
          'Answer shape: picture > source[media][srcset=wide.jpg] + img[src=narrow.jpg]',
        ],
      },
    },
  ],
}
