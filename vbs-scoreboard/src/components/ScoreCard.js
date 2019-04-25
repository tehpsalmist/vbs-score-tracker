import React from 'react'

export const ScoreCard = ({ flipped, score, color }) => {
  const classes = `h-full w-full card${flipped ? ' flipped' : ''} ${color}`

  return <div className='card-container h-36 w-28 m-2 text-huge'>
    <div className={classes}>
      <div className='card-side front h-36 w-28 bg-gray-600 shadow-lg rounded-lg' />
      <div className='card-side back h-36 w-28 bg-white flex justify-center items-center shadow-lg rounded-lg'>
        {score}
      </div>
    </div>
  </div>
}
