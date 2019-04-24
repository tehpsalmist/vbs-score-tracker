import React from 'react'

export const Continent = ({ d, fill, id, className }) => {
  className = className ? className + ' continent fill-current' : 'continent fill-current'

  return <path
    style={{
      transition: '2s'
    }}
    id={id}
    className={className}
    d={d}
  />
}
