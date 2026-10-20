// How each piece walks the board — shown in Learn mode before anyone duels.

export const CHESS_MODES = [
  {
    id: 'easy',
    label: 'Easy',
    blurb: 'The computer plays gently — good for first games.',
    depth: 1,
    accent: '#4fc07d',
  },
  {
    id: 'medium',
    label: 'Medium',
    blurb: 'A fair fight. It looks a move or two ahead.',
    depth: 2,
    accent: '#e8b44a',
  },
  {
    id: 'hard',
    label: 'Hard',
    blurb: 'Think carefully. It searches deeper.',
    depth: 3,
    accent: '#d64550',
  },
]

export const PIECES = [
  {
    id: 'pawn',
    name: 'Pawn',
    white: '♙',
    black: '♟',
    blurb: 'One step forward. Two from the start. Captures diagonally.',
    detail:
      'Pawns march straight ahead, never back. On their first move they may stride two squares. They capture one square diagonally forward. Reaching the far rank, they promote — usually to a queen.',
  },
  {
    id: 'rook',
    name: 'Rook',
    white: '♖',
    black: '♜',
    blurb: 'Any number of squares along a rank or file.',
    detail:
      'Rooks slide horizontally or vertically as far as the board is clear. They cannot jump. Two rooks working together can control whole ranks.',
  },
  {
    id: 'knight',
    name: 'Knight',
    white: '♘',
    black: '♞',
    blurb: 'An L-shape: two then one. The only jumper.',
    detail:
      'Knights move in an L — two squares one way and one sideways, or one then two. They leap over anything in between, which makes them tricky in crowded middlegames.',
  },
  {
    id: 'bishop',
    name: 'Bishop',
    white: '♗',
    black: '♝',
    blurb: 'Any number of squares on a diagonal.',
    detail:
      'Bishops stay on one colour forever. They slide diagonally until blocked. A pair of bishops can rake both light and dark squares.',
  },
  {
    id: 'queen',
    name: 'Queen',
    white: '♕',
    black: '♛',
    blurb: 'Rook and bishop combined — the strongest piece.',
    detail:
      'The queen moves any number of squares vertically, horizontally, or diagonally. Guard her carefully; losing her early often loses the game.',
  },
  {
    id: 'king',
    name: 'King',
    white: '♔',
    black: '♚',
    blurb: 'One square any direction. Protect him at all costs.',
    detail:
      'The king steps one square in any direction. He may castle once with a rook if neither has moved and the path is clear. Checkmate ends the game.',
  },
]
