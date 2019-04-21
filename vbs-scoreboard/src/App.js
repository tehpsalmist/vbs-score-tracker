import React, { useState } from 'react'
import { ContinentMap } from './Continents/Continents'
import { ColorButton } from './ColorButton'
import { Africa } from './Continents/Africa'
import { Australia } from './Continents/Australia'
import { NorthAmerica } from './Continents/NorthAmerica'
import { SouthAmerica } from './Continents/SouthAmerica'
import { Asia } from './Continents/Asia'
import { Europe } from './Continents/Europe'
import { Antarctica } from './Continents/Antarctica'

const continents = [
  'antarctica',
  'north-america',
  'south-america',
  'asia',
  'europe',
  'africa',
  'australia'
]
const App = props => {
  const [fill, setFill] = useState(continents.reduce((map, key) => ({ ...map, [key]: 'text-green-300' }), {}))
  const teamA = cont => {
    setFill({ ...fill, [cont]: 'text-purple-500' })
  }
  const teamB = cont => {
    setFill({ ...fill, [cont]: 'text-orange-500' })
  }

  return (
    <div className='bg-gray-700 h-screen'>
      <ContinentMap>
        <Asia className={fill['asia']} />
        <SouthAmerica className={fill['south-america']} />
        <Antarctica className={fill['antarctica']} />
        <Australia className={fill['australia']} />
        <NorthAmerica className={fill['north-america']} />
        <Africa className={fill['africa']} />
        <Europe className={fill['europe']} />
      </ContinentMap>
      <div className='flex w-full justify-around mt-8'>
        {continents.map(continent => <ColorButton key={continent} continent={continent} teamA={teamA} teamB={teamB} />)}
      </div>
    </div>
  )
}

export default App
