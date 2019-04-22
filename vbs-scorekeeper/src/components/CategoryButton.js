import React from 'react'

export const CategoryButton = ({ onClick, label, selected }) => {
  const classes = selected
    ? 'p-6 text-5xl bg-green-400 text-green-700 w-80 border-green-400'
    : 'p-4 text-3xl bg-yellow-400 text-yellow-700 w-48 border-yellow-400'

  return <button
    className={classes + ' rounded-lg shadow-md border-4 focus:outline-none focus:border-red-400 hover:border-red-400'}
    onClick={onClick}
  >{label}</button>
}
