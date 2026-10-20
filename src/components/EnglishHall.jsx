import { useState } from 'react'
import TopBar from './TopBar.jsx'
import Glitter from './Glitter.jsx'
import KittyBubble from './KittyBubble.jsx'
import EnglishDictionary from './EnglishDictionary.jsx'
import EnglishGrammar from './EnglishGrammar.jsx'
import EnglishSentence from './EnglishSentence.jsx'
import EnglishVocabulary from './EnglishVocabulary.jsx'
import EnglishSynonyms from './EnglishSynonyms.jsx'
import EnglishIdioms from './EnglishIdioms.jsx'
import EnglishSpeaking from './EnglishSpeaking.jsx'
import EnglishWriting from './EnglishWriting.jsx'
import EnglishPhonics from './EnglishPhonics.jsx'
import EnglishStories from './EnglishStories.jsx'
import { ENGLISH_SUBJECTS } from '../data/englishSubjects.js'
import HouseCrest from './HouseCrest.jsx'

// Topics hang as school crests in a pyramid: 4, then 3, then 2, then 1.
const BADGE_COUNTS = [4, 3, 2, 1]
const BADGE_ROWS = []
{
  let start = 0
  for (const count of BADGE_COUNTS) {
    BADGE_ROWS.push(ENGLISH_SUBJECTS.slice(start, start + count))
    start += count
  }
}

export default function EnglishHall({ onNavigate, cta }) {
  const [subject, setSubject] = useState(null)
  const [kittyOpen, setKittyOpen] = useState(false)
  const [kittyTopic, setKittyTopic] = useState(null)

  const kitty = (
    <KittyBubble
      open={kittyOpen}
      onOpen={() => setKittyOpen(true)}
      onClose={() => {
        setKittyOpen(false)
        setKittyTopic(null)
      }}
      focusTopicId={kittyTopic}
    />
  )

  const back = () => setSubject(null)

  if (subject === 'dictionary') {
    return (
      <Shell onNavigate={onNavigate} cta={cta} kitty={kitty}>
        <EnglishDictionary onBack={back} />
      </Shell>
    )
  }

  if (subject === 'grammar') {
    return (
      <Shell onNavigate={onNavigate} cta={cta} kitty={kitty}>
        <EnglishGrammar
          onBack={back}
          onAskKitty={(id) => {
            setKittyTopic(id)
            setKittyOpen(true)
          }}
        />
      </Shell>
    )
  }

  if (subject === 'sentence') {
    return (
      <Shell onNavigate={onNavigate} cta={cta} kitty={kitty}>
        <EnglishSentence onBack={back} />
      </Shell>
    )
  }

  if (subject === 'vocabulary') {
    return (
      <Shell onNavigate={onNavigate} cta={cta} kitty={kitty}>
        <EnglishVocabulary onBack={back} />
      </Shell>
    )
  }

  if (subject === 'synonyms') {
    return (
      <Shell onNavigate={onNavigate} cta={cta} kitty={kitty}>
        <EnglishSynonyms onBack={back} />
      </Shell>
    )
  }

  if (subject === 'idioms') {
    return (
      <Shell onNavigate={onNavigate} cta={cta} kitty={kitty}>
        <EnglishIdioms onBack={back} />
      </Shell>
    )
  }

  if (subject === 'speaking') {
    return (
      <Shell onNavigate={onNavigate} cta={cta} kitty={kitty}>
        <EnglishSpeaking onBack={back} />
      </Shell>
    )
  }

  if (subject === 'writing') {
    return (
      <Shell onNavigate={onNavigate} cta={cta} kitty={kitty}>
        <EnglishWriting onBack={back} />
      </Shell>
    )
  }

  if (subject === 'phonics') {
    return (
      <Shell onNavigate={onNavigate} cta={cta} kitty={kitty}>
        <EnglishPhonics onBack={back} />
      </Shell>
    )
  }

  if (subject === 'stories') {
    return (
      <Shell onNavigate={onNavigate} cta={cta} kitty={kitty} stories>
        <EnglishStories onBack={back} />
      </Shell>
    )
  }

  return (
    <div className="english-hall english-inkhall chamber-hall">
      <div className="picker-sky" aria-hidden="true">
        <Glitter />
      </div>
      <ChamberScene />

      <TopBar active="english" onNavigate={onNavigate} cta={cta} />

      <div className="hall">
        <div className="corridor">
          <div className="corridor-path house-badges" role="list" aria-label="English subjects">
            {BADGE_ROWS.map((row) => (
              <div key={row[0].id} className="house-badge-row">
                {row.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="listitem"
                    className="house-badge"
                    title={s.blurb}
                    onClick={() => setSubject(s.id)}
                  >
                    <HouseCrest name={s.name} accent={s.accent} emblem={s.id} />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <KittyBubble
        open={kittyOpen}
        onOpen={() => setKittyOpen(true)}
        onClose={() => {
          setKittyOpen(false)
          setKittyTopic(null)
        }}
        focusTopicId={kittyTopic}
        seal
      />
    </div>
  )
}

function Shell({ onNavigate, cta, kitty, children, stories }) {
  return (
    <div className={`english-hall english-hall-drill chamber-hall ${stories ? 'eng-stories-shell' : ''}`}>
      <div className="picker-sky" aria-hidden="true">
        <Glitter />
      </div>
      <ChamberScene quiet />
      <TopBar active="english" onNavigate={onNavigate} cta={cta} />
      {children}
      {kitty}
    </div>
  )
}

// The English hall is the Chamber of Secrets: Salazar's face at the far end,
// the serpent door where the sun used to sit, and the cave mouth framing it.
function ChamberScene({ quiet = false }) {
  return (
    <div className={`chamber-scene${quiet ? ' is-quiet' : ''}`} aria-hidden="true">
      <img className="chamber-salazar" src="/chamber/salazar.png" alt="" />
      <img className="chamber-cave chamber-cave-left" src="/chamber/cave-left.png" alt="" />
      <img className="chamber-cave chamber-cave-right" src="/chamber/cave-right.png" alt="" />
      <div className="chamber-mist" />
      <div className="chamber-water" />
    </div>
  )
}
