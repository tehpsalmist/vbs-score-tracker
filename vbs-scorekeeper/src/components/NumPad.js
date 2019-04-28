import React from 'react'

export const NumPad = props => {
  return <div className='w-80 h-104 mb-1 flex-center flex-wrap'>
    {props.children}
  </div>
}
