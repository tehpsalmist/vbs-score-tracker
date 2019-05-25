import React, { useState } from 'react'
import { ipcRenderer, remote } from 'electron'
import { CalculatorButton } from './components/CalculatorButton'
import { Calculator } from './components/Calculator'
import { NumPad } from './components/NumPad'
import { PointsInput } from './components/PointsInput'
import { CategoryButton } from './components/CategoryButton'
import { TeamButton } from './components/TeamButton'
import { UndoButton } from './components/UndoButton'
import { useIPCRendererOn } from './hooks'
import { mappings } from './utilities'
import { RegularButton } from './components/RegularButton'
import { ScoresPreviewer } from './components/ScoresPreviewer'
import { Revealer } from './components/Revealer'
import { OfferingModal } from './components/OfferingModal'

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
  const [scores, setScores] = useState(mappings.defaultScores)
  const [offerings, setOfferings] = useState(mappings.defaultOfferings)
  const [showScorePreview, setShowScorePreview] = useState(false)
  const [showOfferingModal, setShowOfferingModal] = useState(false)
  const [revealerScores, setRevealerScores] = useState({ teamA: '', teamB: '' })
  const [showScoreRevealer, setShowScoreRevealer] = useState(false)
  const [revealerOfferings, setRevealerOfferings] = useState({ teamA: '', teamB: '' })
  const [showOfferingRevealer, setShowOfferingRevealer] = useState(false)

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

  useIPCRendererOn('freshDB', (event, database, reason) => {
    setScores({ teamA: database.teamA, teamB: database.teamB })
    setOfferings(database.offerings)
    if (reason === 'offerings') {
      setShowOfferingModal(true)
    }
  })

  useIPCRendererOn('openScoreRevealer', (event, scores) => {
    setShowScoreRevealer(true)
    setRevealerScores(scores)
  })

  useIPCRendererOn('openOfferingRevealer', (event, offerings) => {
    setShowOfferingRevealer(true)
    setRevealerOfferings(offerings)
  })

  useIPCRendererOn('clearUndoList', (event) => {
    setUndoList([])
  })

  const previewScores = () => {
    ipcRenderer.send('getDB', 'scores')
    setShowScorePreview(true)
  }

  const revealScores = () => {
    ipcRenderer.send('openScoreRevealer')
  }

  const openOfferingModal = () => {
    ipcRenderer.send('getDB', 'offerings')
  }

  const clearScores = () => {
    remote.dialog.showSaveDialog({
      title: 'Export the current scores, just in case.',
      defaultPath: 'scores.json',
      filters: [{
        extensions: ['.json']
      }]
    }, filename => ipcRenderer.send('clearScores', filename))
  }

  const importScores = () => {
    remote.dialog.showOpenDialog({
      title: 'Import Scores',
      defaultPath: '~/Documents',
      filters: [{
        extensions: ['.json']
      }]
    }, filenames => filenames && ipcRenderer.send('importScores', filenames[0]))
  }

  return <main className='h-screen w-full flex flex-wrap bg-gradient-indigo-blue'>
    <section className='h-sk-column w-1/3 flex flex-col justify-evenly items-center'>
      <Calculator>
        <PointsInput value={points} onChange={({ target: { value } }) => (value.match(/^[\d]+$/) || value === '') && setPoints(value)} />
        <NumPad>
          {Array(9).fill(1).map((d, i) => {
            const digit = d + i

            return <CalculatorButton key={digit} label={digit} onClick={() => setPoints(points + String(digit))} />
          })}
          <CalculatorButton label={'C'} onClick={() => setPoints('')} />
          <CalculatorButton label={0} onClick={() => setPoints(points + '0')} />
          <CalculatorButton label={'\u232B'} onClick={() => setPoints(points.substring(0, points.length - 1))} />
        </NumPad>
      </Calculator>
      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplate: '1fr / repeat(2, 1fr)',
        justifyItems: 'center',
        alignItems: 'center',
        gridGap: '30px'
      }}>
        <RegularButton onClick={previewScores} color='orange' label='Preview Scores' />
        <RegularButton onClick={revealScores} color='green' label='Reveal Scores' />
        <RegularButton onClick={clearScores} color='red' label='Clear & Export' />
        <RegularButton onClick={importScores} color='blue' label='Import Scores' />
        <RegularButton onClick={openOfferingModal} color='green' label='Offerings' />
      </div>
    </section>
    <section className='h-sk-column w-1/3 flex flex-col justify-evenly items-center'>
      {categories.map(c => <CategoryButton
        key={c}
        selected={category === c}
        label={mappings.names[c]}
        sublabel={mappings.continents[c]}
        onClick={() => setCategory(c)}
      />)}
    </section>
    <section className='h-sk-column w-1/3 flex flex-col justify-evenly items-center'>
      {['teamA', 'teamB'].map(t =>
        <TeamButton key={t} label={mappings.names[t]} color={mappings.colors[t]} onClick={() => recordScore(t)} />
      )}
    </section>
    <section className='undo-list'>
      {undoList.length > 0 && <h2 className='text-xl ml-4 text-white'>Click to Undo:</h2>}
      {undoList.map((item, i) => <UndoButton key={item.time} {...item} index={i} onClick={() => undoScore(item, i)} />)}
    </section>
    {showScorePreview && <ScoresPreviewer scores={scores} close={() => setShowScorePreview(false)} />}
    {showOfferingModal && <OfferingModal offerings={offerings} close={() => setShowOfferingModal(false)} />}
    {showScoreRevealer && <Revealer teamA={revealerScores.teamA} teamB={revealerScores.teamB} close={() => setShowScoreRevealer(false)} />}
    {showOfferingRevealer && <Revealer teamA={revealerOfferings.teamA} teamB={revealerOfferings.teamB} close={() => setShowOfferingRevealer(false)} />}
  </main>
}

export default App
