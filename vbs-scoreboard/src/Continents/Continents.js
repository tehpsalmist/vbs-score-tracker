import React from 'react'
import { Globe } from './Globe'

export const ContinentMap = props => {
  return <div style={{ width: '100%' }}>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 602 306'>
      <Globe />
      {props.children}
    </svg>
  </div>
}
