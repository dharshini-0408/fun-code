export default {
  track: 'html',
  id: 'heralds-office',
  name: "The Herald's Office",
  tagline: 'Head metadata, entities, comments and deeper accessibility',
  icon: '📯',
  rooms: [
    {
      id: 'h25',
      name: 'The Title Plaque',
      concept: 'Document title & language',
      brief: 'Every page needs a name on the tab, and a tongue it claims to speak.',
      lesson: [
        { type: 'p', text: '`<title>` sets the tab/search title. `lang` on `<html>` declares the language. In this castle you practise the elements that belong in a real document head.' },
        { type: 'code', code: `<html lang="en">
  <head>
    <title>The Entrance Hall</title>
  </head>
</html>` },
        { type: 'note', text: 'One title per page. Keep it unique and human-readable.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Declare language and title. Write a `<div lang="en" class="doc">` containing a `<h1>` reading **FunCode Castle**, and a `<title>` reading **FunCode Castle**.',
        starter: `<!-- lang + title -->
`,
        checks: [
          { kind: 'attr', sel: 'div.doc', name: 'lang', expected: 'en', describe: 'lang is en' },
          { kind: 'text', sel: 'div.doc h1', expected: 'FunCode Castle', describe: 'h1 text' },
          { kind: 'text', sel: 'title', expected: 'FunCode Castle', describe: 'title text' },
        ],
        hints: [
          'lang belongs on an element — here a div.doc stand-in for html.',
          'title can sit beside it in this sandbox.',
          'Both texts read FunCode Castle.',
        ],
      },
    },
    {
      id: 'h26',
      name: 'The Meta Scrolls',
      concept: 'Meta charset & viewport',
      brief: 'Two seals every modern page carries: how text is encoded, and how phones should scale it.',
      lesson: [
        { type: 'p', text: '`<meta charset="UTF-8">` sets encoding. `<meta name="viewport" content="width=device-width, initial-scale=1">` makes mobile layout sane.' },
        { type: 'code', code: `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="A castle of lessons.">` },
        { type: 'note', text: 'Charset should be in the first 1024 bytes of the file — put it early in `<head>`.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Add `<meta charset="UTF-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1">`.',
        starter: `<!-- meta tags -->
`,
        checks: [
          { kind: 'attr', sel: 'meta[charset]', name: 'charset', expected: 'UTF-8', describe: 'charset UTF-8' },
          { kind: 'attr', sel: 'meta[name="viewport"]', name: 'content', expected: 'width=device-width, initial-scale=1', describe: 'viewport content' },
        ],
        hints: ['Two meta elements', 'charset attribute vs name/content pair', 'Match content string exactly'],
      },
    },
    {
      id: 'h27',
      name: 'The Favicon Seal',
      concept: 'Link rel icons',
      brief: 'A tiny crest for the browser tab, linked rather than painted into the page.',
      lesson: [
        { type: 'p', text: '`<link rel="icon" href="favicon.ico">` (and `apple-touch-icon`, stylesheets, preconnect) live in the head.' },
        { type: 'code', code: `<link rel="icon" href="/favicon.ico">
<link rel="stylesheet" href="/styles.css">` },
        { type: 'note', text: '`rel` names the relationship; `href` points at the resource.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write `<link rel="icon" href="/favicon.ico">` and `<link rel="stylesheet" href="/castle.css">`.',
        starter: `<!-- links -->
`,
        checks: [
          { kind: 'attr', sel: 'link[rel="icon"]', name: 'href', expected: '/favicon.ico', describe: 'icon href' },
          { kind: 'attr', sel: 'link[rel="stylesheet"]', name: 'href', expected: '/castle.css', describe: 'stylesheet href' },
        ],
        hints: ['Two link elements', 'rel and href on each', 'Paths start with /'],
      },
    },
    {
      id: 'h28',
      name: 'The Whispered Aside',
      concept: 'Comments & entities',
      brief: 'Notes the visitor never sees, and characters that must be spelled so the parser does not eat them.',
      lesson: [
        { type: 'p', text: 'Comments are `<!-- ... -->`. Entities encode special characters: `&amp;` `&lt;` `&gt;` `&nbsp;` `&quot;`.' },
        { type: 'code', code: `<!-- draft: move this later -->
<p>Tom &amp; Jerry use &lt;tags&gt;</p>` },
        { type: 'note', text: 'In text, prefer entities (or carefully authored Unicode) when `<` or `&` would confuse the parser.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write a comment containing exactly **todo: polish** and a `<p>` whose text is **A & B** using an ampersand entity.',
        starter: `<!-- your comment -->
`,
        checks: [
          { kind: 'contains', sel: 'p', expected: 'A', describe: 'paragraph has A' },
          { kind: 'contains', sel: 'p', expected: 'B', describe: 'paragraph has B' },
          { kind: 'exists', sel: 'p', describe: 'there is a p' },
        ],
        hints: ['Use &amp; between A and B', 'Comment syntax uses <!-- -->', 'Visible text should read like A & B'],
      },
    },
    {
      id: 'h29',
      name: 'The Landmark Map',
      concept: 'ARIA landmarks & roles',
      brief: 'Rooms named for what they are — banner, navigation, main — so those who listen can skip the corridors.',
      lesson: [
        { type: 'p', text: 'Prefer native landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`). When you must, ARIA roles like `role="navigation"` reinforce meaning.' },
        { type: 'code', code: `<header>…</header>
<nav aria-label="Subjects">…</nav>
<main id="content">…</main>
<a class="skip" href="#content">Skip to content</a>` },
        { type: 'note', text: 'Do not override native semantics with a conflicting role. A `<button role="link">` is usually wrong.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt: 'Write a skip link `<a class="skip" href="#content">Skip to content</a>`, a `<nav aria-label="Subjects">`, and `<main id="content">` containing a `<h1>` reading **Subjects**.',
        starter: `<!-- skip, nav, main -->
`,
        checks: [
          { kind: 'attr', sel: 'a.skip', name: 'href', expected: '#content', describe: 'skip href' },
          { kind: 'text', sel: 'a.skip', expected: 'Skip to content', describe: 'skip text' },
          { kind: 'attr', sel: 'nav', name: 'aria-label', expected: 'Subjects', describe: 'nav label' },
          { kind: 'attr', sel: 'main', name: 'id', expected: 'content', describe: 'main id' },
          { kind: 'text', sel: 'main h1', expected: 'Subjects', describe: 'h1 text' },
        ],
        hints: ['Skip link first', 'aria-label on nav', 'main id matches the skip hash'],
      },
    },
    {
      id: 'h30',
      name: 'The Template Chest',
      concept: 'template & slot',
      brief: 'A chest of markup that does not render until summoned — the seed of web components.',
      lesson: [
        { type: 'p', text: '`<template>` holds inert DOM. `<slot>` is a placeholder inside a shadow tree for light-DOM children.' },
        { type: 'code', code: `<template id="card">
  <article><slot name="title"></slot></article>
</template>` },
        { type: 'note', text: 'Activating a template needs JavaScript (`template.content.cloneNode(true)`). Here you author the markup correctly.' },
      ],
      puzzle: {
        kind: 'markup',
        prompt:
          'Write `<template id="card" data-kind="web-component">` and beside it an `<article class="preview"><slot name="title"></slot></article>` showing the slot pattern in ordinary markup.',
        starter: `<!-- template + preview -->
`,
        checks: [
          { kind: 'exists', sel: 'template#card', describe: 'template#card' },
          {
            kind: 'attr',
            sel: 'template#card',
            name: 'data-kind',
            expected: 'web-component',
            describe: 'data-kind',
          },
          { kind: 'attr', sel: 'article.preview slot', name: 'name', expected: 'title', describe: 'slot name' },
        ],
        hints: [
          'template needs id=card and data-kind',
          'slot lives in the preview article for this sandbox',
          'name="title" on the slot',
        ],
      },
    },
  ],
}
