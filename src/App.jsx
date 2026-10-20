import { useMemo, useState } from 'react'
import './App.css'
import ChessClub from './components/ChessClub.jsx'
import EnglishHall from './components/EnglishHall.jsx'
import HelpDesk from './components/HelpDesk.jsx'
import Playground from './components/Playground.jsx'
import RoomView from './components/RoomView.jsx'
import TopicLibrary from './components/TopicLibrary.jsx'
import TrackPicker from './components/TrackPicker.jsx'
import WorldMap from './components/WorldMap.jsx'
import { TRACK_LIST, engineFor, pathFor } from './data/index.js'
import { generatePractice } from './engine/practice.js'
import { useProgress } from './hooks/useProgress.js'

export default function App() {
  const { progress, solve, saveDraft, revealHint, reset, chooseTrack, countPractice } =
    useProgress()
  const [at, setAt] = useState(null) // null = looking at the map
  const [drill, setDrill] = useState(null) // a generated practice room, if any
  const [drillHints, setDrillHints] = useState(0)
  // Side rooms: coding library/playground, plus English & Chess halls.
  const [view, setView] = useState(null) // null | 'topics' | 'play' | 'english' | 'chess'
  const [help, setHelp] = useState(false) // the Owlery, reachable from the top bar
  const [playLang, setPlayLang] = useState('javascript')

  const track = progress.track
  const solvedSet = useMemo(() => new Set(progress.solved), [progress.solved])
  const path = useMemo(() => pathFor(track), [track])

  const helpCta = {
    label: 'Help',
    onClick: () => setHelp(true),
  }

  function leaveRooms() {
    setAt(null)
    setDrill(null)
    setDrillHints(0)
    setView(null)
    setHelp(false)
  }

  function goHall(where) {
    setAt(null)
    setDrill(null)
    setDrillHints(0)
    setHelp(false)
    setView(where)
  }

  function onCastleNav(where) {
    if (where === 'subjects') {
      chooseTrack(null)
      leaveRooms()
      return
    }
    if (where === 'english') {
      goHall('english')
      return
    }
    if (where === 'chess') {
      goHall('chess')
      return
    }
    // Room of Requirement still needs a coding subject.
    const firstReady = TRACK_LIST.find((t) => pathFor(t.id).length > 0)?.id ?? 'html'
    if (where === 'room') {
      chooseTrack(track ?? firstReady)
      setPlayLang(track ?? firstReady)
      goHall('play')
    }
  }

  // Practice rooms are thrown away and rerolled, so they are deliberately kept
  // out of localStorage — only the tally of them survives.
  function roll(level) {
    setDrill(generatePractice(track, level, Date.now()))
    setDrillHints(0)
    setAt(null)
    setView(null)
  }

  // The Owlery sits in front of everything else: it is a side door out of
  // whatever room you were in, and closing it puts you back on the map.
  if (help) return <HelpDesk onBack={() => setHelp(false)} />

  if (view === 'english') {
    return <EnglishHall onNavigate={onCastleNav} cta={helpCta} />
  }

  if (view === 'chess') {
    return <ChessClub onNavigate={onCastleNav} cta={helpCta} />
  }

  if (!track) {
    // Nothing is sorted yet, so the top bar's shortcuts open halls that do
    // not need a coding subject — or pick a default for the Room.
    return (
      <TrackPicker
        solvedSet={solvedSet}
        onPick={(id) => {
          chooseTrack(id)
          leaveRooms()
        }}
        onNavigate={onCastleNav}
        cta={helpCta}
      />
    )
  }

  if (view === 'topics') {
    return (
      <TopicLibrary
        trackId={track}
        solvedSet={solvedSet}
        onBack={leaveRooms}
        onPractice={() => roll('basics')}
      />
    )
  }

  if (view === 'play') {
    // Re-keyed per language: each playground loads its own draft on mount.
    return (
      <Playground
        key={playLang}
        lang={playLang}
        engine={engineFor(playLang)}
        onBack={leaveRooms}
        onSwitchLang={setPlayLang}
      />
    )
  }

  if (drill) {
    return (
      <RoomView
        key={drill.id}
        room={drill}
        index={0}
        total={0}
        isLast={false}
        solved={false}
        draft={undefined}
        hintsUsed={drillHints}
        onDraft={() => {}}
        onSolve={countPractice}
        onHint={setDrillHints}
        onNext={() => roll(drill.level)}
        onReroll={() => roll(drill.level)}
        onMap={leaveRooms}
      />
    )
  }

  if (at === null) {
    return (
      <WorldMap
        trackId={track}
        path={path}
        solvedSet={solvedSet}
        practiceSolved={progress.practiceSolved}
        onEnter={setAt}
        onPractice={roll}
        onTopics={() => setView('topics')}
        onPlayground={(lang) => {
          setPlayLang(lang)
          setView('play')
        }}
        onSwitchTrack={() => {
          chooseTrack(null)
          leaveRooms()
        }}
        onReset={() => {
          if (confirm('Obliviate? Every mark in both subjects will be forgotten.')) {
            reset()
            leaveRooms()
          }
        }}
      />
    )
  }

  const room = path[at]

  return (
    <RoomView
      key={room.id}
      room={room}
      index={at}
      total={path.length}
      isLast={at === path.length - 1}
      solved={solvedSet.has(room.id)}
      draft={progress.drafts[room.id]}
      hintsUsed={progress.hintsUsed[room.id]}
      onDraft={(code) => saveDraft(room.id, code)}
      onSolve={() => solve(room.id)}
      onHint={(n) => revealHint(room.id, n)}
      onNext={() => setAt((i) => Math.min(i + 1, path.length - 1))}
      onMap={leaveRooms}
    />
  )
}
