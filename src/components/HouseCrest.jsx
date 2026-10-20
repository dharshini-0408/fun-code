import { useId } from 'react'

// Original school crests: heater shield, metal rim, charge, and a name ribbon.
// Each charge is a simple emblem for that English topic.

function isLight(hex) {
  const n = Number.parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return (r * 299 + g * 587 + b * 114) / 1000 > 155
}

function Emblem({ id }) {
  if (id === 'dictionary') {
    return (
      <g fill="currentColor">
        <path d="M8 24c16-10 30-6 40 2v52c-10-8-24-12-40-2V24z" />
        <path d="M92 24c-16-10-30-6-40 2v52c10-8 24-12 40-2V24z" />
        <rect x="46" y="22" width="8" height="56" rx="2" />
      </g>
    )
  }
  if (id === 'grammar') {
    return (
      <g fill="currentColor">
        <path d="M68 6C42 24 28 48 30 68c16-6 30-22 40-42 2-8 0-16-2-20z" />
        <path d="M30 66 12 94l14-12 8 10-4-26z" />
      </g>
    )
  }
  if (id === 'sentence') {
    return (
      <g fill="currentColor">
        <ellipse cx="18" cy="50" rx="12" ry="20" />
        <ellipse cx="82" cy="50" rx="12" ry="20" />
        <rect x="18" y="30" width="64" height="40" />
        <path d="M30 42h40M30 52h34M30 62h28" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  }
  if (id === 'vocabulary') {
    return (
      <g fill="currentColor">
        <rect x="14" y="16" width="72" height="16" rx="3" />
        <rect x="20" y="40" width="60" height="16" rx="3" />
        <rect x="14" y="64" width="72" height="16" rx="3" />
      </g>
    )
  }
  if (id === 'synonyms') {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="10">
        <circle cx="36" cy="50" r="22" />
        <circle cx="64" cy="50" r="22" />
      </g>
    )
  }
  if (id === 'idioms') {
    return (
      <g fill="currentColor">
        <path d="M18 22h22c6 0 10 5 10 12v8c0 7-4 12-10 12H30l-10 14V54h-2c-6 0-10-5-10-12v-8c0-7 4-12 10-12z" />
        <path d="M52 36h22c6 0 10 5 10 12v8c0 7-4 12-10 12H64l-10 14V68h-2c-6 0-10-5-10-12v-8c0-7 4-12 10-12z" />
      </g>
    )
  }
  if (id === 'speaking') {
    return (
      <g fill="currentColor">
        <path d="M16 42h22l40-22v60L38 58H16c-6 0-8-4-8-8s2-8 8-8z" />
        <path d="M78 28c10 6 14 14 14 22s-4 16-14 22" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </g>
    )
  }
  if (id === 'writing') {
    return (
      <g fill="currentColor">
        <path d="M58 8 74 46 58 88 42 46 58 8z" transform="translate(-8 0)" />
        <path d="M46 40h8" transform="translate(-8 0)" stroke="rgba(0,0,0,.4)" strokeWidth="3" />
        <ellipse cx="34" cy="78" rx="16" ry="8" />
        <path d="M20 78c2 12 8 18 14 18s12-6 14-18" />
      </g>
    )
  }
  if (id === 'phonics') {
    return (
      <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
        <circle cx="28" cy="50" r="7" fill="currentColor" stroke="none" />
        <path d="M44 34c8 8 8 24 0 32" />
        <path d="M58 24c14 14 14 38 0 52" />
        <path d="M72 16c20 18 20 50 0 68" />
      </g>
    )
  }
  return (
    <g fill="currentColor">
      <path d="M16 16h58v62H28c-12 0-12 10 0 10h46V26H16V16z" />
      <path d="M58 16v20l-10-6-10 6V16h20z" />
      <path d="M30 40h28M30 52h22M30 64h18" fill="none" stroke="rgba(0,0,0,.35)" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

export default function HouseCrest({ name, accent, emblem }) {
  const uid = useId().replace(/:/g, '')
  const gold = `${uid}-gold`
  const field = `${uid}-field`
  const shade = `${uid}-shade`
  const light = isLight(accent)
  const charge = light ? '#3a2a12' : '#f8e7b0'

  return (
    <svg className="house-crest" viewBox="0 0 180 220" role="img" aria-label={name}>
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6d2" />
          <stop offset="0.45" stopColor="#e2c36a" />
          <stop offset="0.72" stopColor="#8d6420" />
          <stop offset="1" stopColor="#f0d78a" />
        </linearGradient>
        <linearGradient id={field} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="0.22" stopColor={accent} />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={shade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor="#140e08" />
        </linearGradient>
      </defs>

      <path
        fill={`url(#${gold})`}
        d="M90 6C50 6 22 18 14 42L12 108c0 40 28 74 78 106 50-32 78-66 78-106l-2-66C158 18 130 6 90 6z"
      />
      <path
        fill="#4a3412"
        d="M90 14c-34 0-58 12-66 32l-2 62c0 36 26 66 68 94 42-28 68-58 68-94l-2-62c-8-20-32-32-66-32z"
      />
      <path
        fill={`url(#${shade})`}
        d="M90 20c-30 0-52 10-58 28l-2 58c0 32 22 60 60 86 38-26 60-54 60-86l-2-58c-6-18-28-28-58-28z"
      />
      <path
        fill={`url(#${field})`}
        d="M90 20c-30 0-52 10-58 28l-2 58c0 32 22 60 60 86 38-26 60-54 60-86l-2-58c-6-18-28-28-58-28z"
      />
      <path
        fill="none"
        stroke="#f8e7b0"
        strokeWidth="1.6"
        d="M90 28c-26 0-44 8-50 24l-2 52c0 28 18 52 52 74 34-22 52-46 52-74l-2-52c-6-16-24-24-50-24z"
      />

      <g color={charge} transform="translate(40 24)">
        <Emblem id={emblem} />
      </g>

      <path
        fill={`url(#${gold})`}
        stroke="#5a3e14"
        strokeWidth="1.4"
        strokeLinejoin="round"
        d="M2 132l22-9h132l22 9-22 8 22 8-22 10H24l-22-10 22-8z"
      />
      <path fill="#fff6d4" opacity="0.35" d="M24 125h132l18 7H26z" />
      <text
        className="house-crest-name"
        x="90"
        y="145"
        textAnchor="middle"
        fill="#2a1c0e"
        textLength={name.length > 12 ? 128 : 108}
        lengthAdjust="spacingAndGlyphs"
        fontSize={name.length > 12 ? 13 : 16}
      >
        {name}
      </text>
    </svg>
  )
}
