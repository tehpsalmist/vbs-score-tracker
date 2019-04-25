import React from 'react'
import { mappings } from '../utilities'

export const ScoresPreviewer = ({ close, scores }) => {
  return <section
    className='fixed h-screen w-full z-40 flex justify-center items-center bg-opacity-50'
    onClick={close}
  >
    <button className='text-5xl ml-4 p-4 fixed top-0 left-0' onClick={close}>{'\u2715'}</button>
    <div
      onClick={e => e.stopPropagation()}
      className='shadow-lg rounded-lg bg-gray-600 text-white w-5xl py-4 opacity-100 z-50 flex flex-wrap'
    >
      <h1 className='text-4xl text-center w-full'>Scores Preview</h1>
      {Object.keys(scores).map(team => {
        const classes = `w-1/2 flex flex-col px-12 text-shadow-${mappings.colors[team]}`
        return <div className={classes}>
          <h2 className='text-3xl text-center'>{mappings.names[team]}</h2>
          <ul>
            {Object.keys(scores[team]).map(category => {
              return <li className='text-2xl py-2'>
                <em>{mappings.names[category]}</em>
                {`: ${scores[team][category].toLocaleString()}`}
              </li>
            })}
            <strong>
              <li className='text-2xl py-2'>
                <em>Total</em>
                {`: ${Object.keys(scores[team]).reduce((total, cat) => total + scores[team][cat], 0).toLocaleString()}`}
              </li>
            </strong>
          </ul>
        </div>
      })}
    </div>
  </section>
}
