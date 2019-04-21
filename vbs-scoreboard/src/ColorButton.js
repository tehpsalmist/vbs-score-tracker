import React from 'react'

export const ColorButton = ({ continent, teamA, teamB }) => <>
  <button
    className='focus:outline-none p-2 border rounded border-purple-700 text-purple-700 bg-purple-300 shadow-md'
    onClick={() => teamA(continent)}
  >
    {(makeName(continent))}
  </button>
  <button
    className='focus:outline-none p-2 border rounded border-orange-700 text-orange-700 bg-orange-300 shadow-md'
    onClick={() => teamB(continent)}
  >
    {(makeName(continent))}
  </button>
</>

function makeName (kebab) {
  return kebab.split('-').map(word => <span key={word} className='capitalize'>{ word }</span>)
}

// const hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

// function randomNumber (upperBound) {
//   return Math.floor(Math.random() * upperBound)
// }

// function randomDigit () {
//   return hexValues[randomNumber(16)]
// }

// function randomColor () {
//   return '#' + Array(6).fill(0).map(randomDigit).join('')
// }
