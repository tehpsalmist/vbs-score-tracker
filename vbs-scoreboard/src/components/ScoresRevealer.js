import React, { useState } from 'react'
import { ScoreCard } from './ScoreCard'
import { useIPCRendererOn } from '../hooks'
import { mappings } from '../utilities'
import { SeparatorCharacter } from './SeparatorCharacter'

export const ScoresRevealer = ({ scores }) => {
  const [flipped, setFlipped] = useState(Array(scores.teamA.length).fill(false))

  useIPCRendererOn('revealIndex', (event, index) => {
    setFlipped(flipped.map((bool, i) => i === index || bool))
  })

  return <section
    className='fixed h-screen w-full z-40 flex justify-evenly items-stretch bg-opacity-50'
  >
    <div className='flex-center h-full w-1/2'>
      {Array.from(scores.teamB)
        .reduce((l, n, i, a) => {
          const components = i > 0 && (a.length - i) % 3 === 0 ? [<SeparatorCharacter character=',' color='red-500' />] : []

          components.push(<ScoreCard
            key={i}
            flipped={flipped[i]}
            score={n}
            color={Number(n) + i === 0 ? 'text-gray-400' : mappings.colors.teamB}
          />)

          return [...l, ...components]
        }, [])}
    </div>
    <div className='flex-center h-full w-1/2'>
      {Array.from(scores.teamA)
        .reduce((l, n, i, a) => {
          const components = i > 0 && (a.length - i) % 3 === 0 ? [<SeparatorCharacter character=',' color='blue-500' />] : []

          components.push(<ScoreCard
            key={i}
            flipped={flipped[i]}
            score={n}
            color={Number(n) + i === 0 ? 'text-gray-400' : mappings.colors.teamA}
          />)

          return [...l, ...components]
        }, [])}
    </div>
  </section>
}
