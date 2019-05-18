import React from 'react'

export const RegularButton = ({ onClick, label, color, classNames }) => {
  const classes = `rounded-lg shadow-md bg-${color}-300 text-${color}-700 text-xl p-4 focus:outline-none focus:bg-${color}-500 relative${classNames ? ` ${classNames}` : ''}`

  return <button className={classes} onClick={onClick}>{label}</button>
}
