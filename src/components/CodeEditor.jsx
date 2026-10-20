import { useRef } from 'react'

// A plain textarea, taught the two manners a code editor needs:
// Tab inserts spaces instead of leaving the field, and Enter keeps your indent.
export default function CodeEditor({ value, onChange, readOnly }) {
  const ref = useRef(null)
  const lines = value.split('\n')

  function replaceSelection(text, caretOffset) {
    const el = ref.current
    const { selectionStart: start, selectionEnd: end } = el
    const next = value.slice(0, start) + text + value.slice(end)
    onChange(next)
    const caret = start + caretOffset
    requestAnimationFrame(() => el.setSelectionRange(caret, caret))
  }

  function onKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault()
      replaceSelection('  ', 2)
      return
    }
    if (e.key === 'Enter') {
      const upToCaret = value.slice(0, e.target.selectionStart)
      const currentLine = upToCaret.slice(upToCaret.lastIndexOf('\n') + 1)
      const indent = currentLine.match(/^[ \t]*/)[0]
      const extra = /[{([]\s*$/.test(currentLine) ? '  ' : ''
      e.preventDefault()
      replaceSelection('\n' + indent + extra, 1 + indent.length + extra.length)
    }
  }

  return (
    <div className="editor">
      <div className="editor-gutter" aria-hidden="true">
        {lines.map((_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <textarea
        ref={ref}
        className="editor-area"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        readOnly={readOnly}
        spellCheck="false"
        autoCapitalize="off"
        autoCorrect="off"
        rows={Math.max(lines.length + 1, 8)}
        aria-label="Your solution"
      />
    </div>
  )
}
