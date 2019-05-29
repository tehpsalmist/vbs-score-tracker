import React from 'react'

export const Calculator = props => {
  return <div
    className='rounded-lg bg-orange-500 calculator-grid w-72 shadow-lg'
  >
    {props.children}
  </div>
}
