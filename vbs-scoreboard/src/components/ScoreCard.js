import React from 'react'

export const ScoreCard = ({ flipped, score, color }) => {
  const classes = `h-full w-6vw card${flipped ? ' flipped' : ''} ${color}`

  return <div className='card-container h-8vw w-6vw m-1 text-huge'>
    <div className={classes}>
      <div className='card-side front h-8vw w-6vw bg-gray-400 shadow-lg rounded-lg' />
      <div className='card-side back h-8vw w-6vw bg-white flex-center shadow-lg rounded-lg'>
        {score}
      </div>
    </div>
  </div>
}
