export default {
  track: 'html',
  id: 'scriptorium',
  name: 'The Scriptorium',
  tagline: 'Text semantics, quotes, links and canvas',
  icon: '✍️',
  rooms: [
    {
      id: 'h19',
      name: 'The Emphatic Quill',
      concept: 'Text formatting',
      brief: 'Ink that means stress, importance, code, or a highlighter swipe — not merely “bold”.',
      lesson: [
        {
          type: 'p',
          text: '`<strong>` is importance, `<em>` is stress, `<mark>` is highlight, `<code>` is code, `<pre>` preserves whitespace.',
        },
        {
          type: 'code',
          code: `<p><strong>Warning:</strong> the stair <em>moves</em>.</p>
<p>Run <code>npm install</code>.</p>
<pre>line 1
line 2</pre>`,
        },
        {
          type: 'note',
          text: 'Avoid `<b>` / `<i>` unless you truly mean style without meaning. Prefer strong/em.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Write a `<p>` containing `<strong>` **Caution:** then a space and `<em>` **live portraits**</em>, and a separate `<code>` reading **alto**.',
        starter: `<!-- formatting -->
`,
        checks: [
          { kind: 'exists', sel: 'p strong', describe: 'strong inside p' },
          { kind: 'text', sel: 'p strong', expected: 'Caution:', describe: 'strong text' },
          { kind: 'exists', sel: 'p em', describe: 'em inside p' },
          { kind: 'text', sel: 'p em', expected: 'live portraits', describe: 'em text' },
          { kind: 'text', sel: 'code', expected: 'alto', describe: 'code text' },
        ],
        hints: [
          'One paragraph holds both strong and em.',
          'code can sit outside the paragraph.',
          'Match punctuation on Caution:',
        ],
      },
    },

    {
      id: 'h20',
      name: 'The Quoted Passage',
      concept: 'Quotes & abbreviations',
      brief: 'Someone else’s words, set apart, and a short form explained for those who do not know it.',
      lesson: [
        {
          type: 'p',
          text: '`<blockquote>` for long quotations, `<q>` for inline. `<abbr title="...">` marks an abbreviation.',
        },
        {
          type: 'code',
          code: `<blockquote cite="https://example.com">
  <p>It does not do well to dwell on dreams.</p>
</blockquote>
<p>Use <abbr title="HyperText Markup Language">HTML</abbr>.</p>`,
        },
        {
          type: 'note',
          text: 'The cite attribute is a URL. Visible attribution is usually a separate `<cite>` or `<footer>`.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Write a `<blockquote>` containing a `<p>` reading **Nitwit, blubber, oddment, tweak.** and a `<p>` with `<abbr title="Cascading Style Sheets">CSS</abbr>.',
        starter: `<!-- quote and abbr -->
`,
        checks: [
          { kind: 'text', sel: 'blockquote p', expected: 'Nitwit, blubber, oddment, tweak.', describe: 'quote text' },
          { kind: 'exists', sel: 'abbr', describe: 'abbr exists' },
          { kind: 'attr', sel: 'abbr', name: 'title', expected: 'Cascading Style Sheets', describe: 'abbr title' },
          { kind: 'text', sel: 'abbr', expected: 'CSS', describe: 'abbr text' },
        ],
        hints: [
          'blockquote wraps its own paragraph.',
          'abbr needs a title attribute.',
          'Second paragraph holds the abbreviation.',
        ],
      },
    },

    {
      id: 'h21',
      name: 'The Directed Owl',
      concept: 'Link relations',
      brief: 'Owls that open a new window, fetch a file, or write a letter — all still `<a>`, with different instructions.',
      lesson: [
        {
          type: 'p',
          text: '`target="_blank"` opens a new tab (add `rel="noopener noreferrer"`). `download` suggests saving. `mailto:` and `tel:` start apps.',
        },
        {
          type: 'code',
          code: `<a href="/map.pdf" download>Map</a>
<a href="https://ex.test" target="_blank" rel="noopener noreferrer">Docs</a>
<a href="mailto:owl@castle.test">Write</a>`,
        },
        {
          type: 'note',
          text: 'Always pair `target="_blank"` with `rel="noopener noreferrer"` for security.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Write an `<a href="/map.pdf" download>` reading **Map**, and an `<a href="https://docs.test" target="_blank" rel="noopener noreferrer">` reading **Docs**.',
        starter: `<!-- two links -->
`,
        checks: [
          { kind: 'attr', sel: 'a[href="/map.pdf"]', name: 'download', expected: '', describe: 'download present' },
          { kind: 'text', sel: 'a[href="/map.pdf"]', expected: 'Map', describe: 'map text' },
          { kind: 'attr', sel: 'a[href="https://docs.test"]', name: 'target', expected: '_blank', describe: 'target blank' },
          {
            kind: 'attr',
            sel: 'a[href="https://docs.test"]',
            name: 'rel',
            expected: 'noopener noreferrer',
            describe: 'rel safe',
          },
          { kind: 'text', sel: 'a[href="https://docs.test"]', expected: 'Docs', describe: 'docs text' },
        ],
        hints: [
          'download is a boolean attribute on the first link.',
          'rel value is exactly noopener noreferrer.',
          'Two separate anchor tags.',
        ],
      },
    },

    {
      id: 'h22',
      name: 'The Footnote Mark',
      concept: 'Subscript, superscript & line breaks',
      brief: 'Tiny marks above and below the line, and a break that does not start a new paragraph.',
      lesson: [
        {
          type: 'p',
          text: '`<sup>` and `<sub>` for superscript/subscript. `<br>` forces a line break. `<hr>` is a thematic break.',
        },
        {
          type: 'code',
          code: `<p>E = mc<sup>2</sup></p>
<p>H<sub>2</sub>O</p>
<p>Line one<br>Line two</p>
<hr>`,
        },
        {
          type: 'note',
          text: 'Do not use `<br>` to create spacing between sections — that is CSS’s job.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Write a `<p>` reading **H** then `<sub>2</sub>` then **O**, and another `<p>` with **room** `<sup>3</sup>`.',
        starter: `<!-- sub and sup -->
`,
        checks: [
          { kind: 'exists', sel: 'p sub', describe: 'sub present' },
          { kind: 'text', sel: 'p sub', expected: '2', describe: 'sub is 2' },
          { kind: 'contains', sel: 'p', expected: 'H', describe: 'has H' },
          { kind: 'exists', sel: 'p sup', describe: 'sup present' },
          { kind: 'text', sel: 'p sup', expected: '3', describe: 'sup is 3' },
        ],
        hints: [
          'First paragraph is water: H sub 2 then O.',
          'Second paragraph has room with superscript 3.',
          'sub/sup wrap only the small characters.',
        ],
      },
    },

    {
      id: 'h23',
      name: 'The Blank Canvas',
      concept: 'Canvas element',
      brief: 'An empty frame waiting for script to paint. Without script it is only a box with a size.',
      lesson: [
        {
          type: 'p',
          text: '`<canvas>` reserves a bitmap drawing surface. Set `width` and `height` attributes (not only CSS) for the coordinate system.',
        },
        {
          type: 'code',
          code: `<canvas id="scene" width="400" height="200" aria-label="Map sketch">
  Fallback text if canvas is unsupported.
</canvas>`,
        },
        {
          type: 'note',
          text: 'Drawing needs JavaScript (`getContext("2d")`). The markup still needs accessible fallback or aria-label.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Write a `<canvas id="scene" width="400" height="200" aria-label="Map sketch">` with fallback text **Canvas not supported.**',
        starter: `<!-- canvas -->
`,
        checks: [
          { kind: 'exists', sel: 'canvas#scene', describe: 'canvas#scene' },
          { kind: 'attr', sel: 'canvas#scene', name: 'width', expected: '400', describe: 'width 400' },
          { kind: 'attr', sel: 'canvas#scene', name: 'height', expected: '200', describe: 'height 200' },
          {
            kind: 'attr',
            sel: 'canvas#scene',
            name: 'aria-label',
            expected: 'Map sketch',
            describe: 'aria-label',
          },
          {
            kind: 'contains',
            sel: 'canvas#scene',
            expected: 'Canvas not supported.',
            describe: 'fallback text',
          },
        ],
        hints: [
          'Attributes on the opening tag; fallback text between tags.',
          'id is scene.',
          'Match the aria-label exactly.',
        ],
      },
    },

    {
      id: 'h24',
      name: 'The Map of Hotspots',
      concept: 'Image maps',
      brief: 'One picture, several invisible doors drawn on it — each hotspot a link of its own.',
      lesson: [
        {
          type: 'p',
          text: '`<map>` + `<area>` define clickable regions on an image linked via `usemap="#name"`.',
        },
        {
          type: 'code',
          code: `<img src="castle.png" alt="Castle" usemap="#zones">
<map name="zones">
  <area shape="rect" coords="0,0,100,80" href="/tower" alt="Tower">
  <area shape="circle" coords="200,100,40" href="/lake" alt="Lake">
</map>`,
        },
        {
          type: 'note',
          text: 'Prefer real links overlaid with CSS for most modern layouts — image maps are niche but still valid HTML.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Write `<img src="castle.png" alt="Castle" usemap="#zones">` and a `<map name="zones">` with one `<area shape="rect" coords="0,0,100,80" href="/tower" alt="Tower">`.',
        starter: `<!-- image map -->
`,
        checks: [
          { kind: 'attr', sel: 'img', name: 'usemap', expected: '#zones', describe: 'usemap' },
          { kind: 'attr', sel: 'img', name: 'src', expected: 'castle.png', describe: 'src' },
          { kind: 'exists', sel: 'map[name="zones"]', describe: 'map name' },
          { kind: 'attr', sel: 'map area', name: 'shape', expected: 'rect', describe: 'shape' },
          { kind: 'attr', sel: 'map area', name: 'href', expected: '/tower', describe: 'href' },
          { kind: 'attr', sel: 'map area', name: 'alt', expected: 'Tower', describe: 'area alt' },
        ],
        hints: [
          'usemap value includes the hash: #zones.',
          'map name attribute is zones without the hash.',
          'area is void — self-close or open-only.',
        ],
      },
    },
  ],
}
