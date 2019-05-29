import React from 'react'

export const CalculatorButton = ({ label, onClick }) => {
  return <button
    className='flex-center w-full h-full rounded-lg shadow bg-orange-400 text-5xl text-orange-700 focus:outline-none focus:bg-indigo-400 focus:text-indigo-700'
    onClick={onClick}
    tabIndex='-1'
  >
    {label}
  </button>
}
