import React from 'react'
import { ipcRenderer } from 'electron'
import { ScoreCard } from './ScoreCard'

export const Revealer = ({ teamA, teamB, close }) => {
  const closeRevealer = () => {
    ipcRenderer.send('closeRevealers')
    close()
  }

  return <section
    className='fixed h-screen w-full z-40 flex-center bg-opacity-50'
  >
    <button className='text-5xl ml-4 p-4 fixed top-0 left-0' onClick={() => closeRevealer()}>
      {'\u2715'}
    </button>
    <div className='w-full flex-center'>
      {Array.from(teamA).map((n, i) => <ScoreCard key={i} scoreA={n} scoreB={teamB[i]} index={i} />)}
    </div>
  </section>
}
