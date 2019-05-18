import React, { useState } from 'react'
import { ipcRenderer } from 'electron'
import { mappings } from '../utilities'

export const ScoreCard = ({ scoreA, scoreB, index }) => {
  const [flipped, setFlipped] = useState(false)
  const cardClasses = `h-full w-8vw card${flipped ? ' flipped' : ''}`
  const Aclasses = `text-${mappings.colors.teamA}-500`
  const Bclasses = `text-${mappings.colors.teamB}-500`

  const flip = () => {
    if (!flipped) {
      ipcRenderer.send('revealIndex', index)
      setFlipped(true)
    }
  }

  return <div className='card-container h-20vw w-8vw m-2 text-huge' onClick={() => flip()}>
    <div className={cardClasses}>
      <div className='card-side front h-20vw w-8vw bg-gray-600 flex flex-col justify-evenly leading-none items-center  shadow-lg rounded-lg'>
        <div className={Aclasses}>{scoreA}</div>
        <div className={Bclasses}>{scoreB}</div>
      </div>
      <div className='card-side back h-20vw w-8vw bg-white flex flex-col justify-evenly leading-none items-center shadow-lg rounded-lg'>
        <div className={Aclasses}>{scoreA}</div>
        <div className={Bclasses}>{scoreB}</div>
      </div>
    </div>
  </div>
}
