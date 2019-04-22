import React, { useState } from 'react'
import { useIPCRendererOn } from './hooks'
import { ContinentMap } from './Continents/Continents'
import { Africa } from './Continents/Africa'
import { Australia } from './Continents/Australia'
import { NorthAmerica } from './Continents/NorthAmerica'
import { SouthAmerica } from './Continents/SouthAmerica'
import { Asia } from './Continents/Asia'
import { Europe } from './Continents/Europe'
import { Antarctica } from './Continents/Antarctica'
import { Globe } from './Continents/Globe'
import mappings from './mappings'

const continents = [
  ['antarctica', 'games'],
  ['north-america', 'rally'],
  ['south-america', 'bibles'],
  ['asia', 'visitors'],
  ['europe', 'attendance'],
  ['africa', 'verses'],
  ['australia', 'offering']
]

const App = props => {
  const [fill, setFill] = useState(continents.reduce((map, [key]) => ({ ...map, [key]: 'text-green-300' }), {}))

  const changeColor = (team, cat) => {
    setFill({ ...fill, [mappings.categories[cat]]: `text-${mappings.colors[team]}` })
  }

  useIPCRendererOn('new-score', (event, { key, points, newValue }) => {
    console.log({ key, points, newValue })
    const [team, category] = key.split('.')

    changeColor(team, category)
  })

  return (
    <div className='bg-gray-700 h-screen'>
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
    </div>
  )
}

export default App
