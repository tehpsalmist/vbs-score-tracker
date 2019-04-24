import React, { useEffect, useState } from 'react'
import { useIPCRendererOn, useStore, useIPCRendererOnThrottled } from './hooks'
import { ipcRenderer } from 'electron'
import {
  ContinentMap,
  Globe,
  Asia,
  SouthAmerica,
  NorthAmerica,
  Europe,
  Africa,
  Antarctica,
  Australia
} from './components'
import { mappings, generateColors } from './utilities'
import { PointFlash } from './components/PointFlash'

const App = props => {
  const [teamA, setTeamA] = useStore(`teamA`, mappings.defaultScores.teamA)
  const [teamB, setTeamB] = useStore(`teamB`, mappings.defaultScores.teamB)
  const [{ scoringPoints, scoringTeam, scoringTime }, setPoints] = useState({})

  useIPCRendererOn('freshDB', (event, store) => {
    setTeamA(store.teamA)
    setTeamB(store.teamB)
  })

  useIPCRendererOnThrottled('new-score', 2000, ([event, { key, points, newValue }]) => {
    const [team, category] = key.split('.')

    setPoints({ scoringPoints: points, scoringTeam: team, scoringTime: new Date().toISOString() })

    if (team === 'teamA') {
      setTeamA({ ...teamA, [category]: newValue })
    } else if (team === 'teamB') {
      setTeamB({ ...teamB, [category]: newValue })
    }
  })

  useEffect(() => {
    ipcRenderer.send('getDB')
  }, [])

  const fill = generateColors(teamA, teamB)

  return (
    <div className='bg-gray-700 h-screen w-full flex items-center justify-center relative'>
      <ContinentMap>
        <Globe />
        <Asia className={fill['asia']} />
        <SouthAmerica className={fill['south-america']} />
        <Antarctica className={fill['antarctica']} />
        <Australia className={fill['australia']} />
        <NorthAmerica className={fill['north-america']} />
        <Africa className={fill['africa']} />
        <Europe className={fill['europe']} />
      </ContinentMap>
      {scoringPoints > 0 && <PointFlash key={scoringTime} points={scoringPoints} team={scoringTeam} />}
    </div>
  )
}

export default App
