import React from 'react'

export const SeparatorCharacter = ({ character, color }) => {
  const classes = `text-huge text-${color}-bright`

  return <span className={classes} style={{ margin: '-.6vw' }}>{character}</span>
}
