// The subjects' own marks, drawn as inline SVG.
//
// These were emoji until now, and emoji are a trap for exactly this: 🟨 has no
// glyph on most systems and rendered as a plain yellow square, so JavaScript
// showed up with no logo at all. SVG renders identically everywhere, scales to
// any size, and carries each technology's real colour.

const MARKS = {
  html: (
    <>
      <path fill="#e34f26" d="M5 3l2.2 25.4L16 31l8.8-2.6L27 3H5z" />
      <path fill="#f06529" d="M16 5v24.2l7.1-2.1L25 5h-9z" />
      <text
        x="16"
        y="22.5"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="#fff"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        5
      </text>
    </>
  ),

  css: (
    <>
      <path fill="#1572b6" d="M5 3l2.2 25.4L16 31l8.8-2.6L27 3H5z" />
      <path fill="#33a9dc" d="M16 5v24.2l7.1-2.1L25 5h-9z" />
      <text
        x="16"
        y="22.5"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="#fff"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        3
      </text>
    </>
  ),

  bootstrap: (
    <>
      <rect x="3" y="3" width="26" height="26" rx="6" fill="#7952b3" />
      <path
        fill="#fff"
        d="M11 9h6.4c2.6 0 4.2 1.2 4.2 3.3 0 1.5-1 2.7-2.4 3v.1c1.9.2 3.1 1.5 3.1 3.4 0 2.4-1.8 3.9-4.8 3.9H11V9zm2.8 2.2v3.6h2.5c1.5 0 2.4-.7 2.4-1.9 0-1.1-.8-1.7-2.2-1.7h-2.7zm0 5.6v4h2.9c1.7 0 2.6-.7 2.6-2s-.9-2-2.7-2h-2.8z"
      />
    </>
  ),

  javascript: (
    <>
      <rect x="3" y="3" width="26" height="26" rx="3" fill="#f7df1e" />
      <path
        fill="#20201d"
        d="M13.6 24.3c.5.9 1.2 1.6 2.5 1.6 1.1 0 1.8-.55 1.8-1.3 0-.9-.72-1.22-1.93-1.75l-.66-.28c-1.9-.81-3.17-1.83-3.17-3.98 0-1.98 1.5-3.48 3.87-3.48 1.68 0 2.89.58 3.76 2.12l-2.06 1.32c-.45-.81-.94-1.13-1.7-1.13-.78 0-1.27.49-1.27 1.13 0 .79.49 1.11 1.63 1.6l.66.28c2.24.96 3.51 1.94 3.51 4.15 0 2.38-1.87 3.68-4.37 3.68-2.45 0-4.03-1.17-4.81-2.7l2.24-1.26zm-8.5.23c.41.73.79 1.35 1.7 1.35.86 0 1.4-.34 1.4-1.65v-8.9h2.64v8.94c0 2.73-1.6 3.98-3.94 3.98-2.11 0-3.33-1.09-3.96-2.41l2.16-1.31z"
      />
    </>
  ),

  react: (
    <>
      <circle cx="16" cy="16" r="2.6" fill="#61dafb" />
      <g fill="none" stroke="#61dafb" strokeWidth="1.5">
        <ellipse cx="16" cy="16" rx="12" ry="4.6" />
        <ellipse cx="16" cy="16" rx="12" ry="4.6" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="12" ry="4.6" transform="rotate(120 16 16)" />
      </g>
    </>
  ),

  python: (
    <g transform="scale(0.125)">
      <path
        fill="#3776ab"
        d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
      />
      <path
        fill="#ffd43b"
        d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127h-61.868v-8.745h86.441s41.486 4.705 41.486-60.711c0-65.417-36.21-63.097-36.21-63.097h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
      />
    </g>
  ),
}

export default function SubjectMark({ id, size = 40 }) {
  const mark = MARKS[id]
  if (!mark) return null
  return (
    <svg
      className="subject-mark"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {mark}
    </svg>
  )
}
