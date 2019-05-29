import React from 'react'

export const RegularButton = ({ onClick, label, color, classNames, disabled }) => {
  const classes = `rounded-lg shadow-md bg-${color}-300 text-${color}-700 text-xl p-2 focus:outline-none focus:bg-${color}-500 relative${disabled ? ' disabled' : ''}${classNames ? ` ${classNames}` : ''}`

  return <button className={classes} disabled={!!disabled} onClick={disabled ? () => {} : onClick}>{label}</button>
}
