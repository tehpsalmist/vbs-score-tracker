import React from 'react'

export const RegularButton = ({ onClick, label, color }) => {
  const classes = `rounded-lg shadow-md bg-${color}-400 text-${color}-700 text-xl p-4 focus:outline-none focus:bg-${color}-500 relative`

  return <button className={classes} onClick={onClick}>{label}</button>
}
