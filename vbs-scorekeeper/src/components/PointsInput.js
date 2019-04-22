import React, { useRef, useEffect } from 'react'

export const PointsInput = ({ value, onChange }) => {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
    inputRef.current.selectionStart = value.length
  })

  return <input
    ref={inputRef}
    className='bg-transparent rounded-lg m-2 p-1 mb-6 border-orange-400 border-4 text-5xl text-indigo-600 focus:outline-none focus:border-indigo-600'
    value={value}
    onChange={onChange}
  />
}
