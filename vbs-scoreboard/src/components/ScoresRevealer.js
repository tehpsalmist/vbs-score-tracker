import React, { useState } from 'react'
import { ScoreCard } from './ScoreCard'
import { useIPCRendererOn } from '../hooks'
import { mappings } from '../utilities'

export const ScoresRevealer = ({ scores }) => {
  const [flipped, setFlipped] = useState(Array(scores.teamA.length).fill(false))

  useIPCRendererOn('revealIndex', (event, index) => {
    setFlipped(flipped.map((bool, i) => i === index || bool))
  })

  return <section
    className='fixed h-screen w-full z-40 flex justify-evenly items-stretch bg-opacity-50'
  >
    <div className='flex h-full w-1/2 items-center justify-center'>
      {Array.from(scores.teamA)
        .map((n, i) => <ScoreCard key={i} flipped={flipped[i]} score={n} color={mappings.colors.teamA} />)}
    </div>
    <div className='flex h-full w-1/2 items-center justify-center'>
      {Array.from(scores.teamB)
        .map((n, i) => <ScoreCard key={i} flipped={flipped[i]} score={n} color={mappings.colors.teamB} />)}
    </div>
  </section>
}
