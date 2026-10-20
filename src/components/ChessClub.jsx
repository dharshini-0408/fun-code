import { useEffect, useMemo, useState } from 'react'
import TopBar from './TopBar.jsx'
import { CHESS_MODES, PIECES } from '../data/chess.js'
import {
  applyMove,
  chooseComputerMove,
  freshBoard,
  glyph,
  legalMoves,
  lessonTargets,
  movesFrom,
  status,
} from '../engine/chess.js'

function Hub({ onLearn, onPlay, onNavigate, cta }) {
  return (
    <div className="sidehall">
      <TopBar active="chess" onNavigate={onNavigate} cta={cta} />
      <header className="sidehall-head">
        <h1 className="brand">Chess</h1>
        <p className="tagline">
          Learn how each piece moves, then duel the computer in three modes.
        </p>
      </header>

      <section className="sidehall-section">
        <h2 className="sidehall-section-title">Learn the pieces</h2>
        <div className="sidehall-grid pieces">
          {PIECES.map((p) => (
            <button
              key={p.id}
              className="sidehall-card piece-card"
              onClick={() => onLearn(p.id)}
            >
              <span className="piece-glyphs">
                <span>{p.white}</span>
                <span>{p.black}</span>
              </span>
              <span className="sidehall-name">{p.name}</span>
              <span className="sidehall-blurb">{p.blurb}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="sidehall-section">
        <h2 className="sidehall-section-title">Play the computer</h2>
        <div className="sidehall-grid modes">
          {CHESS_MODES.map((m) => (
            <button
              key={m.id}
              className="sidehall-card"
              style={{ '--accent': m.accent }}
              onClick={() => onPlay(m.id)}
            >
              <span className="sidehall-name">{m.label}</span>
              <span className="sidehall-blurb">{m.blurb}</span>
              <span className="sidehall-meta">You play white</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function MiniBoard({ board, from, targets, onSquare }) {
  return (
    <div className="cboard" role="grid" aria-label="Chess board">
      {board.map((row, r) =>
        row.map((piece, c) => {
          const light = (r + c) % 2 === 0
          const isFrom = from && from[0] === r && from[1] === c
          const isTarget = targets?.some(([tr, tc]) => tr === r && tc === c)
          return (
            <button
              key={`${r}-${c}`}
              type="button"
              className={`csq ${light ? 'light' : 'dark'} ${isFrom ? 'from' : ''} ${
                isTarget ? 'target' : ''
              }`}
              onClick={() => onSquare?.(r, c)}
              aria-label={`Square ${r},${c}`}
            >
              <span className="cglyph">{glyph(piece)}</span>
            </button>
          )
        }),
      )}
    </div>
  )
}

function LearnPiece({ pieceId, onBack }) {
  const piece = PIECES.find((p) => p.id === pieceId)
  const { board, from, targets } = useMemo(() => lessonTargets(pieceId), [pieceId])

  return (
    <div className="drill chess-learn">
      <button className="btn link" onClick={onBack}>
        ← Chess club
      </button>
      <h2 className="drill-title">
        {piece.white} {piece.name}
      </h2>
      <p className="tagline" style={{ marginBottom: 18 }}>
        {piece.detail}
      </p>
      <MiniBoard board={board} from={from} targets={targets} />
      <p className="dimmed" style={{ marginTop: 14, textAlign: 'center' }}>
        Gold squares show where this {piece.name.toLowerCase()} can move from the marked square.
      </p>
    </div>
  )
}

function PlayGame({ modeId, onBack }) {
  const mode = CHESS_MODES.find((m) => m.id === modeId)
  const [state, setState] = useState(() => freshBoard())
  const [selected, setSelected] = useState(null)
  const [targets, setTargets] = useState([])
  const [msg, setMsg] = useState('Your move — you are white.')

  const gameStatus = status(state)
  const thinking = state.turn === 'b' && (gameStatus === 'ok' || gameStatus === 'check')

  useEffect(() => {
    if (state.turn !== 'b') return
    if (gameStatus === 'white' || gameStatus === 'black' || gameStatus === 'draw') return

    let cancelled = false
    const t = setTimeout(() => {
      if (cancelled) return
      const move = chooseComputerMove(state, mode.depth)
      if (!move) return
      const next = applyMove(state, move)
      setState(next)
      setSelected(null)
      setTargets([])
      const st = status(next)
      if (st === 'white') setMsg('Checkmate — you win!')
      else if (st === 'black') setMsg('Checkmate — computer wins.')
      else if (st === 'draw') setMsg('Stalemate — draw.')
      else if (st === 'check') setMsg('Check! Your move.')
      else setMsg('Your move.')
    }, mode.depth === 1 ? 280 : mode.depth === 2 ? 420 : 650)

    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [state, mode.depth, gameStatus])

  const statusLine = thinking ? 'Computer is thinking…' : msg

  function onSquare(r, c) {
    if (thinking || state.turn !== 'w') return
    if (gameStatus === 'white' || gameStatus === 'black' || gameStatus === 'draw') return

    if (selected) {
      const options = legalMoves(state).filter(
        (m) =>
          m.from[0] === selected[0] &&
          m.from[1] === selected[1] &&
          m.to[0] === r &&
          m.to[1] === c,
      )
      const chosen =
        options.find((m) => !m.promo) ?? options.find((m) => m.promo === 'q') ?? options[0]

      if (chosen) {
        const next = applyMove(state, chosen)
        setState(next)
        setSelected(null)
        setTargets([])
        const st = status(next)
        if (st === 'white') setMsg('Checkmate — you win!')
        else if (st === 'black') setMsg('Checkmate — computer wins.')
        else if (st === 'draw') setMsg('Stalemate — draw.')
        else if (st === 'check') setMsg('Check — computer to move.')
        else setMsg('Computer to move…')
        return
      }
    }

    const piece = state.squares[r][c]
    if (!piece || piece !== piece.toUpperCase()) {
      setSelected(null)
      setTargets([])
      return
    }
    const ms = movesFrom(state, r, c)
    setSelected([r, c])
    setTargets(ms.map((m) => m.to))
  }

  function restart() {
    setState(freshBoard())
    setSelected(null)
    setTargets([])
    setMsg('Your move — you are white.')
  }

  return (
    <div className="drill chess-play">
      <button className="btn link" onClick={onBack}>
        ← Chess club
      </button>
      <h2 className="drill-title">
        vs Computer · {mode.label}
      </h2>
      <p className="chess-status">{statusLine}</p>
      <MiniBoard
        board={state.squares}
        from={selected}
        targets={targets}
        onSquare={onSquare}
      />
      <div className="drill-actions" style={{ marginTop: 18 }}>
        <button className="btn" onClick={restart}>
          New game
        </button>
        <button className="btn ghost" onClick={onBack}>
          Leave board
        </button>
      </div>
    </div>
  )
}

export default function ChessClub({ onNavigate, cta }) {
  const [view, setView] = useState('hub') // hub | learn | play
  const [pieceId, setPieceId] = useState(null)
  const [modeId, setModeId] = useState(null)

  if (view === 'learn' && pieceId) {
    return (
      <div className="sidehall sidehall-drill">
        <TopBar active="chess" onNavigate={onNavigate} cta={cta} />
        <LearnPiece pieceId={pieceId} onBack={() => setView('hub')} />
      </div>
    )
  }

  if (view === 'play' && modeId) {
    return (
      <div className="sidehall sidehall-drill">
        <TopBar active="chess" onNavigate={onNavigate} cta={cta} />
        <PlayGame key={modeId} modeId={modeId} onBack={() => setView('hub')} />
      </div>
    )
  }

  return (
    <Hub
      onNavigate={onNavigate}
      cta={cta}
      onLearn={(id) => {
        setPieceId(id)
        setView('learn')
      }}
      onPlay={(id) => {
        setModeId(id)
        setView('play')
      }}
    />
  )
}
