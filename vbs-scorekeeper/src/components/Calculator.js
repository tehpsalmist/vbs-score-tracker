import React from 'react'

export const Calculator = props => {
  return <div
    className='rounded-lg bg-orange-500 flex flex-col w-80 shadow-lg'
  >
    {props.children}
  </div>
}
