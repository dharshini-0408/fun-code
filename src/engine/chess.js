// A compact chess rules + search engine for FunCode's Chess club.
// Enough for legal play and three difficulty depths — not a tournament engine.

export const EMPTY = null

const FILES = 'abcdefgh'
const START = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
]

const VALUE = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 }

export function freshBoard() {
  return {
    squares: START.map((row) => row.slice()),
    turn: 'w',
    castling: { wK: true, wQ: true, bK: true, bQ: true },
    ep: null, // [r,c] of en-passant target square, or null
    halfmove: 0,
    fullmove: 1,
  }
}

export function cloneState(s) {
  return {
    squares: s.squares.map((row) => row.slice()),
    turn: s.turn,
    castling: { ...s.castling },
    ep: s.ep ? [...s.ep] : null,
    halfmove: s.halfmove,
    fullmove: s.fullmove,
  }
}

export function isWhite(piece) {
  return piece != null && piece === piece.toUpperCase()
}

export function kind(piece) {
  return piece ? piece.toLowerCase() : null
}

export function glyph(piece) {
  if (!piece) return ''
  const map = {
    K: '♔',
    Q: '♕',
    R: '♖',
    B: '♗',
    N: '♘',
    P: '♙',
    k: '♚',
    q: '♛',
    r: '♜',
    b: '♝',
    n: '♞',
    p: '♟',
  }
  return map[piece] ?? ''
}

export function squareName(r, c) {
  return FILES[c] + (8 - r)
}

function inBounds(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8
}

function findKing(squares, white) {
  const target = white ? 'K' : 'k'
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (squares[r][c] === target) return [r, c]
    }
  }
  return null
}

function attackedBy(squares, r, c, byWhite) {
  // Pawns
  const pr = byWhite ? r + 1 : r - 1
  const p = byWhite ? 'P' : 'p'
  for (const dc of [-1, 1]) {
    if (inBounds(pr, c + dc) && squares[pr][c + dc] === p) return true
  }
  // Knights
  const n = byWhite ? 'N' : 'n'
  for (const [dr, dc] of [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ]) {
    const rr = r + dr
    const cc = c + dc
    if (inBounds(rr, cc) && squares[rr][cc] === n) return true
  }
  // King
  const k = byWhite ? 'K' : 'k'
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue
      const rr = r + dr
      const cc = c + dc
      if (inBounds(rr, cc) && squares[rr][cc] === k) return true
    }
  }
  // Sliding: rook/queen
  const rookish = byWhite ? ['R', 'Q'] : ['r', 'q']
  for (const [dr, dc] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    let rr = r + dr
    let cc = c + dc
    while (inBounds(rr, cc)) {
      const cell = squares[rr][cc]
      if (cell) {
        if (rookish.includes(cell)) return true
        break
      }
      rr += dr
      cc += dc
    }
  }
  // Sliding: bishop/queen
  const bishopish = byWhite ? ['B', 'Q'] : ['b', 'q']
  for (const [dr, dc] of [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]) {
    let rr = r + dr
    let cc = c + dc
    while (inBounds(rr, cc)) {
      const cell = squares[rr][cc]
      if (cell) {
        if (bishopish.includes(cell)) return true
        break
      }
      rr += dr
      cc += dc
    }
  }
  return false
}

export function inCheck(state, white = state.turn === 'w') {
  const king = findKing(state.squares, white)
  if (!king) return true
  return attackedBy(state.squares, king[0], king[1], !white)
}

function pushSlide(moves, state, r, c, dirs, white) {
  const { squares } = state
  for (const [dr, dc] of dirs) {
    let rr = r + dr
    let cc = c + dc
    while (inBounds(rr, cc)) {
      const t = squares[rr][cc]
      if (!t) moves.push({ from: [r, c], to: [rr, cc] })
      else {
        if (isWhite(t) !== white) moves.push({ from: [r, c], to: [rr, cc], capture: true })
        break
      }
      rr += dr
      cc += dc
    }
  }
}

function rawMoves(state) {
  const white = state.turn === 'w'
  const moves = []
  const { squares, castling, ep } = state

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = squares[r][c]
      if (!piece || isWhite(piece) !== white) continue
      const k = kind(piece)

      if (k === 'p') {
        const dir = white ? -1 : 1
        const start = white ? 6 : 1
        const promoRank = white ? 0 : 7
        const fr = r + dir
        if (inBounds(fr, c) && !squares[fr][c]) {
          if (fr === promoRank) {
            for (const promo of ['q', 'r', 'b', 'n']) {
              moves.push({ from: [r, c], to: [fr, c], promo })
            }
          } else {
            moves.push({ from: [r, c], to: [fr, c] })
            const fr2 = r + dir * 2
            if (r === start && !squares[fr2][c]) {
              moves.push({ from: [r, c], to: [fr2, c], double: true })
            }
          }
        }
        for (const dc of [-1, 1]) {
          const cc = c + dc
          if (!inBounds(fr, cc)) continue
          const t = squares[fr][cc]
          if (t && isWhite(t) !== white) {
            if (fr === promoRank) {
              for (const promo of ['q', 'r', 'b', 'n']) {
                moves.push({ from: [r, c], to: [fr, cc], capture: true, promo })
              }
            } else {
              moves.push({ from: [r, c], to: [fr, cc], capture: true })
            }
          } else if (ep && ep[0] === fr && ep[1] === cc) {
            moves.push({ from: [r, c], to: [fr, cc], capture: true, ep: true })
          }
        }
      } else if (k === 'n') {
        for (const [dr, dc] of [
          [-2, -1],
          [-2, 1],
          [-1, -2],
          [-1, 2],
          [1, -2],
          [1, 2],
          [2, -1],
          [2, 1],
        ]) {
          const rr = r + dr
          const cc = c + dc
          if (!inBounds(rr, cc)) continue
          const t = squares[rr][cc]
          if (!t || isWhite(t) !== white) {
            moves.push({ from: [r, c], to: [rr, cc], capture: !!t })
          }
        }
      } else if (k === 'b') {
        pushSlide(
          moves,
          state,
          r,
          c,
          [
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
          ],
          white,
        )
      } else if (k === 'r') {
        pushSlide(
          moves,
          state,
          r,
          c,
          [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
          ],
          white,
        )
      } else if (k === 'q') {
        pushSlide(
          moves,
          state,
          r,
          c,
          [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [1, -1],
            [-1, 1],
            [-1, -1],
          ],
          white,
        )
      } else if (k === 'k') {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (!dr && !dc) continue
            const rr = r + dr
            const cc = c + dc
            if (!inBounds(rr, cc)) continue
            const t = squares[rr][cc]
            if (!t || isWhite(t) !== white) {
              moves.push({ from: [r, c], to: [rr, cc], capture: !!t })
            }
          }
        }
        // Castling
        const back = white ? 7 : 0
        if (r === back && c === 4) {
          const ks = white ? castling.wK : castling.bK
          const qs = white ? castling.wQ : castling.bQ
          if (
            ks &&
            !squares[back][5] &&
            !squares[back][6] &&
            !attackedBy(squares, back, 4, !white) &&
            !attackedBy(squares, back, 5, !white) &&
            !attackedBy(squares, back, 6, !white)
          ) {
            moves.push({ from: [r, c], to: [back, 6], castle: 'K' })
          }
          if (
            qs &&
            !squares[back][1] &&
            !squares[back][2] &&
            !squares[back][3] &&
            !attackedBy(squares, back, 4, !white) &&
            !attackedBy(squares, back, 3, !white) &&
            !attackedBy(squares, back, 2, !white)
          ) {
            moves.push({ from: [r, c], to: [back, 2], castle: 'Q' })
          }
        }
      }
    }
  }
  return moves
}

export function applyMove(state, move) {
  const next = cloneState(state)
  const [fr, fc] = move.from
  const [tr, tc] = move.to
  const piece = next.squares[fr][fc]
  const white = isWhite(piece)
  let captured = next.squares[tr][tc]

  if (move.ep) {
    const capR = white ? tr + 1 : tr - 1
    captured = next.squares[capR][tc]
    next.squares[capR][tc] = null
  }

  next.squares[tr][tc] = move.promo
    ? white
      ? move.promo.toUpperCase()
      : move.promo
    : piece
  next.squares[fr][fc] = null

  if (move.castle === 'K') {
    next.squares[tr][5] = next.squares[tr][7]
    next.squares[tr][7] = null
  } else if (move.castle === 'Q') {
    next.squares[tr][3] = next.squares[tr][0]
    next.squares[tr][0] = null
  }

  // Castling rights
  if (piece === 'K') {
    next.castling.wK = false
    next.castling.wQ = false
  }
  if (piece === 'k') {
    next.castling.bK = false
    next.castling.bQ = false
  }
  if (fr === 7 && fc === 0) next.castling.wQ = false
  if (fr === 7 && fc === 7) next.castling.wK = false
  if (fr === 0 && fc === 0) next.castling.bQ = false
  if (fr === 0 && fc === 7) next.castling.bK = false
  if (tr === 7 && tc === 0) next.castling.wQ = false
  if (tr === 7 && tc === 7) next.castling.wK = false
  if (tr === 0 && tc === 0) next.castling.bQ = false
  if (tr === 0 && tc === 7) next.castling.bK = false

  next.ep = move.double ? [white ? tr + 1 : tr - 1, tc] : null

  const isPawn = kind(piece) === 'p'
  next.halfmove = isPawn || captured || move.ep ? 0 : next.halfmove + 1
  if (!white) next.fullmove += 1
  next.turn = white ? 'b' : 'w'
  return next
}

export function legalMoves(state) {
  const white = state.turn === 'w'
  return rawMoves(state).filter((m) => !inCheck(applyMove(state, m), white))
}

export function movesFrom(state, r, c) {
  return legalMoves(state).filter((m) => m.from[0] === r && m.from[1] === c)
}

export function status(state) {
  const moves = legalMoves(state)
  const check = inCheck(state)
  if (moves.length === 0) {
    return check ? (state.turn === 'w' ? 'black' : 'white') : 'draw'
  }
  return check ? 'check' : 'ok'
}

function evaluate(state) {
  let score = 0
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = state.squares[r][c]
      if (!p) continue
      const v = VALUE[kind(p)] ?? 0
      score += isWhite(p) ? v : -v
      // Tiny centre preference
      const centre = 3.5
      const dist = Math.abs(r - centre) + Math.abs(c - centre)
      score += (isWhite(p) ? 1 : -1) * (4 - dist) * 2
    }
  }
  return score
}

function minimax(state, depth, alpha, beta, maximizing) {
  if (depth === 0) return { score: evaluate(state) }
  const moves = legalMoves(state)
  if (moves.length === 0) {
    if (inCheck(state)) return { score: maximizing ? -99999 + depth : 99999 - depth }
    return { score: 0 }
  }

  // Soft shuffle so Easy mode isn't deterministic
  for (let i = moves.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[moves[i], moves[j]] = [moves[j], moves[i]]
  }

  let best = null
  if (maximizing) {
    let bestScore = -Infinity
    for (const m of moves) {
      const { score } = minimax(applyMove(state, m), depth - 1, alpha, beta, false)
      if (score > bestScore) {
        bestScore = score
        best = m
      }
      alpha = Math.max(alpha, bestScore)
      if (beta <= alpha) break
    }
    return { score: bestScore, move: best }
  }
  let bestScore = Infinity
  for (const m of moves) {
    const { score } = minimax(applyMove(state, m), depth - 1, alpha, beta, true)
    if (score < bestScore) {
      bestScore = score
      best = m
    }
    beta = Math.min(beta, bestScore)
    if (beta <= alpha) break
  }
  return { score: bestScore, move: best }
}

/** Computer plays black. depth 1/2/3 ≈ easy/medium/hard. */
export function chooseComputerMove(state, depth = 2) {
  const maximizing = state.turn === 'w'
  // Prefer captures on Easy to feel lively without being brutal
  if (depth <= 1) {
    const moves = legalMoves(state)
    if (!moves.length) return null
    const captures = moves.filter((m) => m.capture || m.ep)
    const pool = captures.length && Math.random() < 0.55 ? captures : moves
    return pool[Math.floor(Math.random() * pool.length)]
  }
  const { move } = minimax(state, depth, -Infinity, Infinity, maximizing)
  return move
}

/** Demo board highlighting legal targets for a piece lesson. */
export function lessonTargets(pieceId) {
  // Place a white piece on a clear board (with a distant king so legality checks pass).
  const board = Array.from({ length: 8 }, () => Array(8).fill(null))
  board[7][0] = 'K' // keep the white king safe and out of the way
  board[0][7] = 'k'
  const place = {
    pawn: { piece: 'P', at: [6, 4], foes: [[5, 3], [5, 5]] },
    rook: { piece: 'R', at: [4, 3], foes: [[4, 6], [1, 3]] },
    knight: { piece: 'N', at: [4, 4], foes: [] },
    bishop: { piece: 'B', at: [4, 3], foes: [[2, 5]] },
    queen: { piece: 'Q', at: [4, 3], foes: [[4, 6], [1, 0]] },
    king: { piece: 'K', at: [4, 4], foes: [] },
  }[pieceId]
  if (!place) return { board, from: null, targets: [] }
  const [r, c] = place.at
  if (pieceId === 'king') {
    board[7][0] = null // only one white king
  }
  board[r][c] = place.piece
  for (const [fr, fc] of place.foes) board[fr][fc] = 'p'
  const state = {
    squares: board,
    turn: 'w',
    castling: { wK: false, wQ: false, bK: false, bQ: false },
    ep: null,
    halfmove: 0,
    fullmove: 1,
  }
  const targets = movesFrom(state, r, c).map((m) => m.to)
  return { board, from: [r, c], targets }
}
