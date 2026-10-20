export default {
  track: 'html',
  id: 'gallery-of-relics',
  name: 'The Gallery of Relics',
  tagline: 'Media, embedding and forms that mean something',
  icon: '🖼️',
  rooms: [
    {
      id: 'h7',
      name: 'The Narrow Passage',
      concept: 'Block vs inline',
      brief:
        'Some doors take the whole corridor. Others sit quietly inside a sentence. Hang the wrong kind and the hallways jam.',
      lesson: [
        {
          type: 'p',
          text: 'Block elements start on a new line and stretch the width of their container. Inline elements sit inside a line of text.',
        },
        {
          type: 'code',
          code: `<!-- block: each takes its own line -->
<div>A box</div>
<p>A paragraph</p>
<h2>A heading</h2>

<!-- inline: they share the line -->
<span>a fragment</span>
<strong>emphasis</strong>
<a href="/">a link</a>`,
        },
        {
          type: 'p',
          text: 'You cannot put a block inside an inline element. A `<p>` inside a `<span>` is wrong; a `<span>` inside a `<p>` is fine.',
        },
        {
          type: 'note',
          text: '`<div>` is the generic block. `<span>` is the generic inline. Reach for a more meaningful tag when one exists.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Hang both kinds. Put a `<div>` containing the text **Corridor**, and beside the idea of a line put a `<p>` that contains a `<span>` reading **side door**.',
        starter: `<!-- one block, one inline inside a paragraph -->
`,
        checks: [
          { kind: 'exists', sel: 'div', describe: 'there is a <div>' },
          { kind: 'text', sel: 'div', expected: 'Corridor', describe: 'the div reads Corridor' },
          { kind: 'exists', sel: 'p span', describe: 'there is a <span> inside a <p>' },
          { kind: 'text', sel: 'p span', expected: 'side door', describe: 'the span reads side door' },
        ],
        hints: [
          'A `<div>` is a block; a `<span>` must live inside something that can hold text, like a `<p>`.',
          'Write the div first, then a paragraph that wraps the span.',
          'Answer shape: `<div>Corridor</div>` then `<p><span>side door</span></p>`',
        ],
      },
    },

    {
      id: 'h8',
      name: 'The Caption Plaque',
      concept: 'Figures & captions',
      brief:
        'A portrait hangs without a name. Visitors invent stories. The plaque under it is what stops the guessing.',
      lesson: [
        {
          type: 'p',
          text: '`<figure>` wraps self-contained content — usually an image, chart or code sample — and `<figcaption>` names it.',
        },
        {
          type: 'code',
          code: `<figure>
  <img src="owl.png" alt="A barn owl">
  <figcaption>Hedwig, delivery owl.</figcaption>
</figure>`,
        },
        {
          type: 'p',
          text: 'The caption can sit above or below the content. Keep the image’s `alt` short; the caption can carry the longer story.',
        },
        {
          type: 'note',
          text: 'A figure is optional. Use it when the media could be moved without breaking the surrounding prose.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Mount the portrait. Wrap an `<img src="crest.png" alt="House crest">` and a `<figcaption>` reading **The Gryffindor crest.** inside a `<figure>`.',
        starter: `<figure>

</figure>
`,
        checks: [
          { kind: 'nested', sel: 'img', within: 'figure', describe: 'the image is inside the figure' },
          { kind: 'nested', sel: 'figcaption', within: 'figure', describe: 'the caption is inside the figure' },
          { kind: 'attr', sel: 'figure img', name: 'src', expected: 'crest.png', describe: 'src is crest.png' },
          { kind: 'attr', sel: 'figure img', name: 'alt', expected: 'House crest', describe: 'alt is House crest' },
          {
            kind: 'text',
            sel: 'figure figcaption',
            expected: 'The Gryffindor crest.',
            describe: 'the caption reads correctly',
          },
        ],
        hints: [
          'Both the image and the figcaption must be children of the figure.',
          'Self-close the image: `<img src="..." alt="...">`.',
          'Answer shape: `<figure><img src="crest.png" alt="House crest"><figcaption>The Gryffindor crest.</figcaption></figure>`',
        ],
      },
    },

    {
      id: 'h9',
      name: 'The Talking Mirror',
      concept: 'Audio & video',
      brief:
        'The glass speaks, and sometimes it shows a moving image. Controls are on the frame — without them, nothing starts.',
      lesson: [
        {
          type: 'p',
          text: '`<audio>` and `<video>` embed sound and moving pictures. Give them `controls` so the visitor can play, pause and seek.',
        },
        {
          type: 'code',
          code: `<audio controls src="fanfare.mp3"></audio>

<video controls width="320" src="sorting.mp4">
  Your browser cannot play this clip.
</video>`,
        },
        {
          type: 'p',
          text: 'Fallback text between the tags shows only when the browser cannot play the media. Multiple `<source>` children let you offer formats.',
        },
        {
          type: 'code',
          code: `<video controls>
  <source src="clip.webm" type="video/webm">
  <source src="clip.mp4" type="video/mp4">
</video>`,
        },
        {
          type: 'note',
          text: 'Never autoplay sound with the volume up. `muted` autoplay for video backgrounds is the polite exception.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Wake the mirror. Add a `<video>` with `controls`, `width="400"`, and `src="mirror.mp4"`, and an `<audio>` with `controls` and `src="whisper.mp3"`.',
        starter: `<!-- video, then audio -->
`,
        checks: [
          { kind: 'exists', sel: 'video', describe: 'there is a <video>' },
          { kind: 'attr', sel: 'video', name: 'src', expected: 'mirror.mp4', describe: 'video src is mirror.mp4' },
          { kind: 'attr', sel: 'video', name: 'width', expected: '400', describe: 'video width is 400' },
          { kind: 'attr', sel: 'video', name: 'controls', expected: '', describe: 'video has controls' },
          { kind: 'exists', sel: 'audio', describe: 'there is an <audio>' },
          { kind: 'attr', sel: 'audio', name: 'src', expected: 'whisper.mp3', describe: 'audio src is whisper.mp3' },
          { kind: 'attr', sel: 'audio', name: 'controls', expected: '', describe: 'audio has controls' },
        ],
        hints: [
          'Boolean attributes like `controls` are written with no value: just the word on the tag.',
          'Write two elements: video first, then audio.',
          'Answer shape: `<video controls width="400" src="mirror.mp4"></video>` then `<audio controls src="whisper.mp3"></audio>`',
        ],
      },
    },

    {
      id: 'h10',
      name: 'The Window Within',
      concept: 'Iframes',
      brief:
        'A window cut into the wall shows another room entirely — sometimes another building. The frame is yours; what it shows is not.',
      lesson: [
        {
          type: 'p',
          text: 'An `<iframe>` embeds another HTML page inside yours. The `src` is the URL; `title` describes it for screen readers.',
        },
        {
          type: 'code',
          code: `<iframe
  src="https://example.com/map"
  title="Castle map"
  width="600"
  height="400"
></iframe>`,
        },
        {
          type: 'p',
          text: '`sandbox` restricts what the framed page may do. Prefer the smallest permissions you need.',
        },
        {
          type: 'note',
          text: 'Never iframe untrusted pages without a sandbox. They can navigate the top window or run scripts unless you stop them.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Cut the window. Write an `<iframe>` with `src="/map.html"`, `title="Castle map"`, `width="500"` and `height="300"`.',
        starter: `<!-- one iframe -->
`,
        checks: [
          { kind: 'exists', sel: 'iframe', describe: 'there is an <iframe>' },
          { kind: 'attr', sel: 'iframe', name: 'src', expected: '/map.html', describe: 'src is /map.html' },
          { kind: 'attr', sel: 'iframe', name: 'title', expected: 'Castle map', describe: 'title is Castle map' },
          { kind: 'attr', sel: 'iframe', name: 'width', expected: '500', describe: 'width is 500' },
          { kind: 'attr', sel: 'iframe', name: 'height', expected: '300', describe: 'height is 300' },
        ],
        hints: [
          'All four attributes go on the opening tag; close with `</iframe>`.',
          'The title is required for accessibility even when the frame looks obvious.',
          'Answer shape: `<iframe src="/map.html" title="Castle map" width="500" height="300"></iframe>`',
        ],
      },
    },

    {
      id: 'h11',
      name: 'The Enrolment Desk',
      concept: 'Advanced forms',
      brief:
        'The ordinary slip was not enough. Houses must be chosen from a list, notes written in a box, and the whole thing grouped under one legend.',
      lesson: [
        {
          type: 'p',
          text: '`<fieldset>` groups related controls. `<legend>` is the group’s title. `<select>` offers a list; `<textarea>` takes longer text.',
        },
        {
          type: 'code',
          code: `<fieldset>
  <legend>House preference</legend>
  <label for="house">House</label>
  <select id="house" name="house">
    <option value="g">Gryffindor</option>
    <option value="r">Ravenclaw</option>
  </select>
  <label for="notes">Notes</label>
  <textarea id="notes" name="notes" rows="3"></textarea>
</fieldset>`,
        },
        {
          type: 'p',
          text: '`<datalist>` suggests values for an `<input list="...">` without forcing one. The visitor can still type freely.',
        },
        {
          type: 'note',
          text: 'Every control still needs a `<label>` — fieldset does not replace labels, it groups them.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Build the desk. Inside a `<fieldset>` with legend **Sorting**, put a `<label for="house">` reading **House**, a `<select id="house" name="house">` with one `<option value="g">Gryffindor</option>`, and a `<textarea id="why" name="why" rows="2">`.',
        starter: `<fieldset>

</fieldset>
`,
        checks: [
          { kind: 'exists', sel: 'fieldset legend', describe: 'there is a legend' },
          { kind: 'text', sel: 'fieldset legend', expected: 'Sorting', describe: 'legend reads Sorting' },
          { kind: 'attr', sel: 'label[for="house"]', name: 'for', expected: 'house', describe: 'label targets house' },
          { kind: 'exists', sel: 'select#house', describe: 'there is select#house' },
          { kind: 'attr', sel: 'select#house option', name: 'value', expected: 'g', describe: 'option value is g' },
          { kind: 'text', sel: 'select#house option', expected: 'Gryffindor', describe: 'option reads Gryffindor' },
          { kind: 'exists', sel: 'textarea#why', describe: 'there is textarea#why' },
          { kind: 'attr', sel: 'textarea#why', name: 'rows', expected: '2', describe: 'textarea has rows=2' },
        ],
        hints: [
          'Legend first, then label, select with one option, then textarea.',
          'Match `for="house"` to `id="house"` on the select.',
          'Answer shape: legend Sorting, label+select#house with option Gryffindor, textarea#why rows=2',
        ],
      },
    },

    {
      id: 'h12',
      name: 'The Speaking Stone',
      concept: 'Accessibility basics',
      brief:
        'Not every visitor sees the wall. The stone must say what it shows, name what it does, and declare which tongue it speaks.',
      lesson: [
        {
          type: 'p',
          text: 'Accessibility is HTML used honestly: real labels, real headings, meaningful `alt`, and language declared on the page.',
        },
        {
          type: 'code',
          code: `<html lang="en">
  <!-- ... -->
</html>

<img src="owl.png" alt="Barn owl carrying a letter">
<button aria-label="Close the map">×</button>`,
        },
        {
          type: 'p',
          text: '`alt` describes the image for people who cannot see it. Decorative images use `alt=""`. `aria-label` names a control when visible text is missing.',
        },
        {
          type: 'note',
          text: 'Prefer native HTML — a real `<button>` beats a clickable `<div role="button">`. ARIA fills gaps; it does not replace semantics.',
        },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Make it speak. Write an `<img src="owl.png" alt="Barn owl with a letter">` and a `<button aria-label="Close">` whose visible text is **×**.',
        starter: `<!-- image and icon button -->
`,
        checks: [
          { kind: 'exists', sel: 'img', describe: 'there is an <img>' },
          { kind: 'attr', sel: 'img', name: 'src', expected: 'owl.png', describe: 'src is owl.png' },
          {
            kind: 'attr',
            sel: 'img',
            name: 'alt',
            expected: 'Barn owl with a letter',
            describe: 'alt describes the image',
          },
          { kind: 'exists', sel: 'button', describe: 'there is a <button>' },
          { kind: 'attr', sel: 'button', name: 'aria-label', expected: 'Close', describe: 'aria-label is Close' },
          { kind: 'text', sel: 'button', expected: '×', describe: 'button shows ×' },
        ],
        hints: [
          'The image needs both src and a real alt string — not empty.',
          'The button’s visible child is the × character; aria-label is an attribute.',
          'Answer shape: `<img src="owl.png" alt="Barn owl with a letter">` then `<button aria-label="Close">×</button>`',
        ],
      },
    },
  ],
}
