import React, { useLayoutEffect, useState } from 'react'
import { mappings } from '../utilities'

export const UndoButton = ({ onClick, oldTeam, oldPoints, oldCategory, index }) => {
  let classes = `text-xl ml-4 mt-2 p-2 rounded bg-${mappings.colors[oldTeam]}-300 text-${mappings.colors[oldTeam]}-700 shadow-md focus:outline-none relative`

  const [shouldFadeIn, setShouldFadeIn] = useState(false)
  const [didFadeIn, setDidFadeIn] = useState(false)

  useLayoutEffect(() => {
    index === 0 && !didFadeIn ? setShouldFadeIn(true) : setShouldFadeIn(false)

    shouldFadeIn && setDidFadeIn(true)
  }, [oldCategory, oldTeam, oldPoints, index])

  return <button
    tabIndex='-1'
    className={classes + (shouldFadeIn ? ' fade-in' : '')}
    onClick={onClick}
  >
    <span className={`text-${mappings.colors[oldTeam]}-800`}>{oldPoints.toLocaleString()}</span>
    &nbsp;&nbsp;
    <span>{mappings.names[oldCategory]}</span>
    &nbsp;&nbsp;
    <span className={`text-${mappings.colors[oldTeam]}-800`}>{mappings.names[oldTeam]}</span>
  </button>
}
