import React from 'react'
import { ipcRenderer } from 'electron'

const App = props => <div
  className='h-screen w-full flex flex-wrap justify-around items-center bg-gradient-indigo-blue'
>
  <h1 className='w-full text-5xl text-pink-500 text-center mb-0'>VBS Score Tracker</h1>
  <button
    className='text-3xl text-green-800 bg-green-400 border border-green-700 rounded p-4 shadow-lg focus:outline-none'
    onClick={() => {
      ipcRenderer.send('open', 'scoreboard')
    }}
  >
    Open Scoreboard
  </button>
  <button
    className='text-3xl text-green-800 bg-green-400 border border-green-700 rounded p-4 shadow-lg focus:outline-none'
    onClick={() => {
      ipcRenderer.send('open', 'scorekeeper')
    }}
  >
    Open Scorekeeper
  </button>
</div>

export default App
