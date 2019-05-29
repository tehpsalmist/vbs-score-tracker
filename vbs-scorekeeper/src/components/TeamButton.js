import React from 'react'

export const TeamButton = ({ onClick, label, color }) => {
  const classes = `w-64 h-64 flex-center rounded-lg shadow-lg text-5xl bg-${color}-300 text-${color}-700 border-4 border-${color}-300 focus:outline-none focus:border-red-500 hover:border-red-500`

  return <button
    className={classes}
    onClick={onClick}
  >{label}</button>
}
