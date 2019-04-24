import React from 'react'
import { mappings } from '../utilities'

export const PointFlash = ({ team, points }) => {
  const classes = `fixed text-huge inset-x-auto top-50 fade-in-out text-glow z-30 ${mappings.colors[team]}`

  return <div className={classes}>{points}</div>
}
