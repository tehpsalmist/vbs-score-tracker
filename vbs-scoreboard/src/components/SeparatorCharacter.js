import React from 'react'

export const SeparatorCharacter = ({ character, color }) => {
  const classes = `text-huge text-${color}-400`

  return <span className={classes} style={{ margin: '-.6vw' }}>{character}</span>
}
