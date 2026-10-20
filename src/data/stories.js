// Free story books via Gutendex (Project Gutenberg) — https://gutendex.com
// No API key. Public-domain texts.

const GUTENDEX = 'https://gutendex.com/books'

const SHELF_COLORS = ['#e8b44a', '#c45c26', '#2a6b9e', '#6b3fa0', '#1f7a5c', '#9b1c2e', '#8b6914', '#4a6fa5']

export async function fetchStoryBooks({ search = 'children', page = 1 } = {}) {
  const url = `${GUTENDEX}/?search=${encodeURIComponent(search)}&languages=en&page=${page}`
  const r = await fetch(url)
  if (!r.ok) throw new Error('Could not load storybooks. Check your connection.')
  const data = await r.json()
  const results = data.results ?? []

  return results.slice(0, 24).map((b, i) => {
    const author = b.authors?.[0]?.name || 'Unknown author'
    const textUrl =
      b.formats?.['text/plain; charset=utf-8'] ||
      b.formats?.['text/plain; charset=us-ascii'] ||
      b.formats?.['text/plain'] ||
      b.formats?.['text/html'] ||
      ''
    return {
      id: String(b.id),
      name: shortenTitle(b.title),
      fullTitle: b.title,
      icon: '📖',
      accent: SHELF_COLORS[i % SHELF_COLORS.length],
      blurb: author,
      count: '',
      author,
      textUrl,
      cover: b.formats?.['image/jpeg'] || '',
      shelf: Math.floor(i / 8),
    }
  })
}

export async function fetchBookText(textUrl) {
  if (!textUrl) throw new Error('No readable text for this book.')

  let text = ''
  try {
    const r = await fetch(textUrl)
    if (!r.ok) throw new Error('direct fail')
    text = await r.text()
  } catch {
    // Gutenberg hosts often block browser CORS — mirror via allorigins (free).
    const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(textUrl)}`
    const r = await fetch(proxied)
    if (!r.ok) throw new Error('Could not open this book’s text.')
    text = await r.text()
  }

  const start = text.search(/\n\*\*\* START OF/i)
  const end = text.search(/\n\*\*\* END OF/i)
  if (start >= 0) {
    const after = text.indexOf('\n', start + 1)
    text = text.slice(after >= 0 ? after : start)
  }
  if (end >= 0) text = text.slice(0, end)
  return text.trim().slice(0, 120_000)
}

function shortenTitle(title) {
  const t = title.split(/[;:]/)[0].trim()
  return t.length > 28 ? `${t.slice(0, 26)}…` : t
}
