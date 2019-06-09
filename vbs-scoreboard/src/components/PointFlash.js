import React from 'react'
import vikings from '../Vikings Logo 2019 transparent2.png'
import ninjas from '../Ninjas Logo 2019 transparent2.png'
import { mappings } from '../utilities'

export const PointFlash = ({ team, points }) => {
  const classes = `fixed flex flex-col justify-center text-center text-huge inset-x-auto top-35 fade-in-out text-glow z-30 ${mappings.colors[team]}`

  return <div className={classes}>
    <img className='w-60' src={team === 'teamA' ? vikings : ninjas} alt='team logo' />
    <h2>{points.toLocaleString()}</h2>
  </div>
}
