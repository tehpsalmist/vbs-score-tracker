import React, { useState } from 'react'
import { ScoreCard } from './ScoreCard'
import { useIPCRendererOn } from '../hooks'
import { mappings } from '../utilities'
import { SeparatorCharacter } from './SeparatorCharacter'
import vikings from '../VikingsLogo2019transparent2.png'
import ninjas from '../NinjasLogo2019transparent2.png'

export const ScoresRevealer = ({ scores }) => {
  const [flipped, setFlipped] = useState(Array(scores.teamA.length).fill(false))
  const [winningImage, setWinningImage] = useState(null)

  useIPCRendererOn('revealIndex', (event, index) => {
    setFlipped(flipped.map((bool, i) => i === index || bool))
  })

  if (flipped.every(Boolean) && !winningImage) {
    const image = Number(scores.teamA) > Number(scores.teamB) ? vikings : ninjas

    console.log('got here', image)
    setWinningImage(image)
  }

  return <section
    className='fixed h-screen w-full z-40 flex flex-col justify-evenly items-stretch bg-opacity-50'
  >
    <div className='flex-center h-full w-full'>
      <img className='h-60' src={ninjas} alt='Ninjas!' />
      {Array.from(scores.teamB)
        .reduce((l, n, i, a) => {
          const components = i > 0 && (a.length - i) % 3 === 0 ? [<SeparatorCharacter key={i + 0.5} character=',' color='red-500' />] : []

          components.push(<ScoreCard
            key={i}
            flipped={flipped[i]}
            score={n}
            color={Number(n) + i === 0 ? 'text-gray-400' : mappings.colors.teamB}
          />)

          return [...l, ...components]
        }, [])}
    </div>
    <div className='flex-center h-full w-full'>
      {Array.from(scores.teamA)
        .reduce((l, n, i, a) => {
          const components = i > 0 && (a.length - i) % 3 === 0 ? [<SeparatorCharacter key={i + 0.5} character=',' color='blue-500' />] : []

          components.push(<ScoreCard
            key={i}
            flipped={flipped[i]}
            score={n}
            color={Number(n) + i === 0 ? 'text-gray-400' : mappings.colors.teamA}
          />)

          return [...l, ...components]
        }, [])}
      <img className='h-60' src={vikings} alt='Vikings!' />
    </div>
    {winningImage && <div className='fixed w-full h-full flex-center inset-auto'>
      <img src={winningImage} alt='Winner!' className='winning-image h-2/3' />
    </div>}
  </section>
}
