import React, { useEffect, useState } from 'react'
import { useIPCRendererOn, useStore, useThrottledScore } from './hooks'
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
  Australia,
  PointFlash,
  ScoresRevealer,
  OfferingRevealer
} from './components'
import { mappings, generateColors } from './utilities'
import vikings from './Vikings Logo 2019 transparent2.png'
import ninjas from './Ninjas Logo 2019 transparent2.png'

const App = props => {
  const [teamA, setTeamA] = useStore(`teamA`, mappings.defaultScores.teamA)
  const [teamB, setTeamB] = useStore(`teamB`, mappings.defaultScores.teamB)
  const [{ scoringPoints, scoringTeam, scoringTime }, setPoints] = useState({})

  const [showScoreRevealer, setShowScoreRevealer] = useState(false)
  const [showOfferingRevealer, setShowOfferingRevealer] = useState(false)
  const [scoresToReveal, setScoresToReveal] = useState({ teamA: '', teamB: '' })
  const [offeringToReveal, setOfferingToReveal] = useState({ teamA: '', teamB: '' })

  useIPCRendererOn('freshDB', (event, store) => {
    setTeamA(store.teamA)
    setTeamB(store.teamB)
  })

  useIPCRendererOn('openScoreRevealer', (event, scores) => {
    setScoresToReveal(scores)
    setShowScoreRevealer(true)
  })

  useIPCRendererOn('openOfferingRevealer', (event, offerings) => {
    setOfferingToReveal(offerings)
    setShowOfferingRevealer(true)
  })

  useIPCRendererOn('closeRevealers', (event) => {
    setShowScoreRevealer(false)
    setShowOfferingRevealer(false)
  })

  useThrottledScore(([event, { key, points, newValue }]) => {
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
    <div className='bg-gray-700 h-screen w-full flex-center relative'>
      <ContinentMap>
        <Globe />
        <Asia className={fill['asia'].bg} />
        <SouthAmerica className={fill['south-america'].bg} />
        <Antarctica className={fill['antarctica'].bg} />
        <Australia className={fill['australia'].bg} />
        <NorthAmerica className={fill['north-america'].bg} />
        <Africa className={fill['africa'].bg} />
        <Europe className={fill['europe'].bg} />
        <text x='112' y='85'
          className={`continent-label ${fill[mappings.categories['rally']].text}`}>Rally Time</text>
        <text x='400' y='65'
          className={`continent-label ${fill[mappings.categories['visitors']].text}`}>Visitors</text>
        <text x='295' y='300'
          className={`continent-label ${fill[mappings.categories['games']].text}`}>Games</text>
        <text x='180' y='180'
          className={`continent-label ${fill[mappings.categories['bibles']].text}`}>Bibles</text>
        <text x='283' y='122' transform='rotate(-10)'
          className={`continent-label ${fill[mappings.categories['attendance']].text}`}>Attendance</text>
        <text x='487' y='208'
          className={`continent-label ${fill[mappings.categories['offering']].text}`}>Offering</text>
        <text x='300' y='130'
          className={`continent-label ${fill[mappings.categories['verses']].text}`}>Verses</text>
      </ContinentMap>
      {scoringPoints > 0 && <PointFlash key={scoringTime} points={scoringPoints} team={scoringTeam} />}
      {showScoreRevealer && <ScoresRevealer scores={scoresToReveal} />}
      {showOfferingRevealer && <OfferingRevealer scores={offeringToReveal} />}
      <img className='fixed top-30 ml-6 left-0 h-40' src={vikings} alt='Vikings!' />
      <img className='fixed top-30 mr-6 right-0 h-40' src={ninjas} alt='Ninjas!' />
    </div>
  )
}

export default App
