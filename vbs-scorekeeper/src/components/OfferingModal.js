import React, { useState } from 'react'
import { ipcRenderer } from 'electron'
import { mappings, adjustOfferingAmount, adjustOfferings } from '../utilities'
import { RegularButton } from './RegularButton'

export const OfferingModal = ({ close, offerings }) => {
  const [{ teamA, teamB }, setOfferings] = useState({ teamA: { ...offerings.teamA }, teamB: { ...offerings.teamB } })

  const saveOfferings = () => {
    ipcRenderer.send('offeringUpdate', adjustOfferings({ teamA, teamB }))
    close()
  }

  const revealOffering = selectedOfferings => {
    ipcRenderer.send('openOfferingRevealer', {
      teamA: adjustOfferingAmount(selectedOfferings.teamA),
      teamB: adjustOfferingAmount(selectedOfferings.teamB)
    })
    saveOfferings()
  }

  const grid = {
    display: 'grid',
    gridTemplate: '1fr / repeat(4, 1fr)',
    justifyItems: 'center',
    alignItems: 'center',
    gridGap: '10px'
  }

  return <section
    className='fixed h-screen w-full z-40 flex-center bg-opacity-50'
    onClick={close}
  >
    <button className='text-5xl ml-4 p-4 fixed top-0 left-0' onClick={close}>{'\u2715'}</button>
    <div
      onClick={e => e.stopPropagation()}
      className='shadow-lg rounded-lg bg-gray-600 text-white w-5xl py-12 opacity-100 z-50 flex flex-wrap'
    >
      <h1 className='text-4xl text-center w-full'>Offerings</h1>
      <div className='w-full mb-4 text-3xl' style={grid}>
        <h2 style={{ gridColumn: '2' }}>Team A</h2>
        <h2 style={{ gridColumn: '3' }}>Team B</h2>
      </div>
      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => <div
        key={day}
        className='w-full mb-4 text-2xl'
        style={grid}
      >
        <h3 className='text-3xl'>{day}</h3>
        <div className={`text-${mappings.colors.teamA}-300 flex justify-stretch`}>
          <span>$</span>
          <input
            type='number'
            className={`bg-transparent hover:bg-${mappings.colors.teamA}-100 focus:outline-none rounded `}
            value={teamA[day]}
            onChange={({ target: { value } }) => setOfferings({ teamB, teamA: { ...teamA, [day]: value } })}
          />
        </div>
        <div className={`text-${mappings.colors.teamB}-300 flex justify-stretch`}>
          <span>$</span>
          <input
            type='number'
            className={`bg-transparent hover:bg-${mappings.colors.teamB}-100 focus:outline-none rounded `}
            value={teamB[day]}
            onChange={({ target: { value } }) => setOfferings({ teamA, teamB: { ...teamB, [day]: value } })}
          />
        </div>
        <RegularButton
          disabled={!teamA[day] || !teamB[day]}
          label='Reveal'
          color='blue'
          onClick={() => revealOffering({ teamA: teamA[day], teamB: teamB[day] })}
        />
      </div>)}
      <RegularButton label='Save Offerings' color='green' onClick={saveOfferings} classNames='ml-auto mr-8 mt-12' />
    </div>
  </section>
}
