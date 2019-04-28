import React from 'react'

export const CalculatorButton = ({ label, onClick }) => {
  return <button
    className='flex-center w-24 h-24 rounded-lg shadow-md bg-orange-400 text-5xl text-orange-700 focus:outline-none mx-1 focus:bg-indigo-400 focus:text-indigo-700'
    onClick={onClick}
    tabIndex='-1'
  >
    {label}
  </button>
}
