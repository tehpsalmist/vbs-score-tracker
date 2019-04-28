import React from 'react'

export const ContinentMap = props => {
  const style = {
    filter: 'url(#glow)',
    fill: '#fff'
  }

  return <div style={{ width: '100%' }}>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 602 306'>
      {props.children}
      <filter id='glow' x='-30%' y='-30%' width='160%' height='160%'>
        <feGaussianBlur stdDeviation='5 3' result='glow' />
        <feMerge>
          <feMergeNode in='glow' />
          <feMergeNode in='glow' />
          <feMergeNode in='glow' />
        </feMerge>
      </filter>
      <text x='112' y='85' style={style}>Rally Time</text>
      <text x='112' y='85' className='continent-label'>Rally Time</text>
      <text x='400' y='65' style={style}>Visitors</text>
      <text x='400' y='65' className='continent-label'>Visitors</text>
      <text x='295' y='300' style={style}>Games</text>
      <text x='295' y='300' className='continent-label'>Games</text>
      <text x='180' y='180' style={style}>Bibles</text>
      <text x='180' y='180' className='continent-label'>Bibles</text>
      <text x='283' y='122' style={style} transform='rotate(-10)'>Attendance</text>
      <text x='283' y='122' className='continent-label' transform='rotate(-10)'>Attendance</text>
      <text x='487' y='208' style={style}>Offering</text>
      <text x='487' y='208' className='continent-label'>Offering</text>
      <text x='300' y='130' style={style}>Verses</text>
      <text x='300' y='130' className='continent-label'>Verses</text>
    </svg>
  </div>
}
