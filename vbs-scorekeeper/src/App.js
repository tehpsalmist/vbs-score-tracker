import React, { useState } from 'react'
import { ipcRenderer } from 'electron'
import { CalculatorButton } from './components/CalculatorButton'
import { Calculator } from './components/Calculator'
import { NumPad } from './components/NumPad'
import { PointsInput } from './components/PointsInput'
import { CategoryButton } from './components/CategoryButton'
import { TeamButton } from './components/TeamButton'
import { UndoButton } from './components/UndoButton'
import { useIPCRendererOn } from './hooks'
import mappings from './mappings'

const categories = [
  'rally',
  'visitors',
  'bibles',
  'attendance',
  'offering',
  'verses',
  'games'
]

const App = props => {
  const [points, setPoints] = useState('')
  const [category, setCategory] = useState('rally')
  const [undoList, setUndoList] = useState([])

  const recordScore = team => {
    if (points) {
      ipcRenderer.send('score', { category, points: Number(points), team })

      setPoints('')
    }
  }

  const undoScore = ({ oldTeam, oldPoints, oldCategory }, index) => {
    ipcRenderer.send('score', { category: oldCategory, points: -oldPoints, team: oldTeam })

    setUndoList([...undoList.filter((u, i) => i !== index)])
  }

  useIPCRendererOn('new-score', (event, { key, oldPoints, newValue }) => {
    const [oldTeam, oldCategory] = key.split('.')
    const time = new Date().toISOString()

    oldPoints > 0 && setUndoList([{ oldTeam, oldCategory, oldPoints, time }, ...undoList.slice(0, 4)])
  })

  return <main className='h-screen w-full flex flex-wrap bg-gradient-indigo-blue'>
    <section className='h-sk-column w-1/3 flex flex-col justify-evenly items-center'>
      <Calculator>
        <PointsInput value={points} onChange={({ target: { value } }) => (value.match(/^[\d]+$/) || value === '') && setPoints(value)} />
        <NumPad>
          {Array(9).fill(1).map((d, i) => {
            const digit = d + i

            return <CalculatorButton label={digit} onClick={() => setPoints(points + String(digit))} />
          })}
          <CalculatorButton label={'C'} onClick={() => setPoints('')} />
          <CalculatorButton label={0} onClick={() => setPoints(points + '0')} />
          <CalculatorButton label={'\u232B'} onClick={() => setPoints(points.substring(0, points.length - 1))} />
        </NumPad>
      </Calculator>
    </section>
    <section className='h-sk-column w-1/3 flex flex-col justify-evenly items-center'>
      {categories.map(c => {
        return <CategoryButton selected={category === c} label={mappings.names[c]} onClick={() => setCategory(c)} />
      })}
    </section>
    <section className='h-sk-column w-1/3 flex flex-col justify-evenly items-center'>
      {['teamA', 'teamB'].map(t => {
        return <TeamButton label={mappings.names[t]} color={mappings.colors[t]} onClick={() => recordScore(t)} />
      })}
    </section>
    <section className='h-24 w-full flex justify-evenly items-center'>
      {undoList.length > 0 && <h2 className='text-xl text-white'>Click to Undo:</h2>}
      {undoList.map((item, i) => <UndoButton key={item.time} {...item} index={i} onClick={() => undoScore(item, i)} />)}
    </section>
  </main>
}

export default App
