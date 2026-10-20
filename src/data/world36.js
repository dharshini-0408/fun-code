export default {
  track: 'html',
  id: 'form-forge',
  name: 'The Form Forge',
  tagline: 'Input types, validation attributes, datalist and output',
  icon: '⚒️',
  rooms: [
    {
      id: 'h31',
      name: 'The Typed Slots',
      concept: 'Input types',
      brief: 'Each slot accepts a different kind of ink — email, date, colour, file, range.',
      lesson: [
        { type: 'p', text: 'The `type` attribute on `<input>` changes the control: `text`, `email`, `password`, `number`, `date`, `time`, `color`, `range`, `file`, `checkbox`, `radio`, `hidden`, `submit`.' },
        { type: 'code', code: `<input type="email" name="mail">
<input type="date" name="when">
<input type="range" min="0" max="10" name="level">
<input type="file" name="scroll">
<input type="color" name="ink">` },
        { type: 'note', text: 'Browsers show native UI for many types. Always pair with a `<label>`.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write three inputs: `type="email"` `name="mail"`, `type="date"` `name="when"`, and `type="range"` `name="level"` with `min="0"` `max="10"`.',
        starter: `<!-- three input types -->\n`,
        checks: [
          { kind: 'attr', sel: 'input[name="mail"]', name: 'type', expected: 'email', describe: 'email' },
          { kind: 'attr', sel: 'input[name="when"]', name: 'type', expected: 'date', describe: 'date' },
          { kind: 'attr', sel: 'input[name="level"]', name: 'type', expected: 'range', describe: 'range' },
          { kind: 'attr', sel: 'input[name="level"]', name: 'min', expected: '0', describe: 'min' },
          { kind: 'attr', sel: 'input[name="level"]', name: 'max', expected: '10', describe: 'max' },
        ],
        hints: ['Three separate input tags', 'name attributes as given', 'range needs min and max'],
      },
    },
    {
      id: 'h32',
      name: 'The Validation Gate',
      concept: 'Form validation attributes',
      brief: 'Gates on the field itself — required, patterned, bounded — before submit.',
      lesson: [
        { type: 'p', text: '`required`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `step`, and `multiple` constrain input without JavaScript.' },
        { type: 'code', code: `<input name="code" required pattern="[A-Z]{3}" maxlength="3">
<input type="number" name="age" min="11" max="120" step="1">` },
        { type: 'note', text: 'Client checks are convenience. Always validate on the server too.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `<input name="code" required pattern="[A-Z]{3}" maxlength="3">` and `<input type="number" name="age" min="11" max="120">`.',
        starter: `<!-- validation attrs -->\n`,
        checks: [
          { kind: 'attr', sel: 'input[name="code"]', name: 'required', expected: '', describe: 'required' },
          { kind: 'attr', sel: 'input[name="code"]', name: 'pattern', expected: '[A-Z]{3}', describe: 'pattern' },
          { kind: 'attr', sel: 'input[name="code"]', name: 'maxlength', expected: '3', describe: 'maxlength' },
          { kind: 'attr', sel: 'input[name="age"]', name: 'min', expected: '11', describe: 'min' },
          { kind: 'attr', sel: 'input[name="age"]', name: 'max', expected: '120', describe: 'max' },
        ],
        hints: ['required is boolean', 'pattern exact string', 'number input for age'],
      },
    },
    {
      id: 'h33',
      name: 'The Suggestion List',
      concept: 'datalist',
      brief: 'A field that suggests answers without forcing one.',
      lesson: [
        { type: 'p', text: '`<datalist id="…">` + `<option>` pairs with `<input list="…">` for suggestions.' },
        { type: 'code', code: `<input list="houses" name="house">
<datalist id="houses">
  <option value="Gryffindor">
  <option value="Ravenclaw">
</datalist>` },
        { type: 'note', text: 'Unlike `<select>`, the visitor may still type a free value.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `<input list="houses" name="house">` and `<datalist id="houses">` with options values **Gryffindor** and **Ravenclaw**.',
        starter: `<!-- datalist -->\n`,
        checks: [
          { kind: 'attr', sel: 'input[name="house"]', name: 'list', expected: 'houses', describe: 'list' },
          { kind: 'exists', sel: 'datalist#houses', describe: 'datalist' },
          { kind: 'attr', sel: 'datalist#houses option', name: 'value', expected: 'Gryffindor', describe: 'first option' },
          { kind: 'count', sel: 'datalist#houses option', expected: 2, describe: 'two options' },
        ],
        hints: ['list on input matches datalist id', 'option value attributes', 'Two options'],
      },
    },
    {
      id: 'h34',
      name: 'The Calculated Output',
      concept: 'output element',
      brief: 'A read-only result of a calculation, tied to the fields that feed it.',
      lesson: [
        { type: 'p', text: '`<output>` shows a calculation result. `for` lists space-separated control ids that contribute.' },
        { type: 'code', code: `<input id="a" type="number"> + <input id="b" type="number">
= <output name="sum" for="a b">0</output>` },
        { type: 'note', text: 'Updating the value usually needs a tiny script; the element carries the semantics.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `<output name="sum" for="a b">0</output>`.',
        starter: `<!-- output -->\n`,
        checks: [
          { kind: 'exists', sel: 'output', describe: 'output exists' },
          { kind: 'attr', sel: 'output', name: 'name', expected: 'sum', describe: 'name' },
          { kind: 'attr', sel: 'output', name: 'for', expected: 'a b', describe: 'for' },
          { kind: 'text', sel: 'output', expected: '0', describe: 'text 0' },
        ],
        hints: ['One output element', 'for is "a b"', 'Text content 0'],
      },
    },
    {
      id: 'h35',
      name: 'The Silent Fallback',
      concept: 'noscript & base',
      brief: 'What to show when magic is forbidden — and a base address for every relative link.',
      lesson: [
        { type: 'p', text: '`<noscript>` shows content when JavaScript is off. `<base href="…">` sets the base URL for relative links (one per document).' },
        { type: 'code', code: `<base href="https://castle.test/">
<noscript>This floor needs JavaScript.</noscript>` },
        { type: 'note', text: 'Misplaced `<base>` rewrites every relative URL — use carefully.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `<base href="https://castle.test/">` and `<noscript>` reading **This floor needs JavaScript.**',
        starter: `<!-- base + noscript -->\n`,
        checks: [
          { kind: 'attr', sel: 'base', name: 'href', expected: 'https://castle.test/', describe: 'base href' },
          { kind: 'text', sel: 'noscript', expected: 'This floor needs JavaScript.', describe: 'noscript text' },
        ],
        hints: ['base is void', 'Trailing slash on href', 'Exact noscript sentence'],
      },
    },
    {
      id: 'h36',
      name: 'The Shared Card',
      concept: 'Open Graph meta',
      brief: 'How a link looks when shared — title, description, and a picture for the preview.',
      lesson: [
        { type: 'p', text: 'Open Graph tags are `<meta property="og:…" content="…">` for title, description, image, and url.' },
        { type: 'code', code: `<meta property="og:title" content="FunCode">
<meta property="og:description" content="A castle of lessons.">
<meta property="og:image" content="https://castle.test/og.png">` },
        { type: 'note', text: 'These live in `<head>` on real sites. Platforms cache previews aggressively.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write three meta tags: `og:title` **FunCode**, `og:description` **A castle of lessons.**, `og:image` **https://castle.test/og.png**.',
        starter: `<!-- open graph -->\n`,
        checks: [
          { kind: 'attr', sel: 'meta[property="og:title"]', name: 'content', expected: 'FunCode', describe: 'title' },
          { kind: 'attr', sel: 'meta[property="og:description"]', name: 'content', expected: 'A castle of lessons.', describe: 'description' },
          { kind: 'attr', sel: 'meta[property="og:image"]', name: 'content', expected: 'https://castle.test/og.png', describe: 'image' },
        ],
        hints: ['property not name', 'content holds the value', 'Three meta elements'],
      },
    },
  ],
}
