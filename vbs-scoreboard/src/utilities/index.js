import { ipcRenderer } from 'electron'

export const mappings = {
  names: {
    'teamA': 'Team A',
    'teamB': 'Team B',
    'rally': 'Rally Time',
    'visitors': 'Visitors',
    'bibles': 'Bibles',
    'attendance': 'Attendance',
    'offering': 'Offering',
    'verses': 'Verses',
    'games': 'Games'
  },
  categories: {
    'games': 'antarctica',
    'rally': 'north-america',
    'bibles': 'south-america',
    'visitors': 'asia',
    'attendance': 'europe',
    'verses': 'africa',
    'offering': 'australia'
  },
  continents: {
    'antarctica': 'games',
    'north-america': 'rally',
    'south-america': 'bibles',
    'asia': 'visitors',
    'europe': 'attendance',
    'africa': 'verses',
    'australia': 'offering'
  },
  colors: {
    'teamA': 'text-indigo-500',
    'teamB': 'text-red-500',
    'plain': 'text-green-500'
  },
  defaultScores: {
    'teamB': {
      'rally': 0,
      'visitors': 0,
      'verses': 0,
      'games': 0,
      'attendance': 0,
      'bibles': 0,
      'offering': 0
    },
    'teamA': {
      'rally': 0,
      'visitors': 0,
      'verses': 0,
      'games': 0,
      'attendance': 0,
      'bibles': 0,
      'offering': 0
    }
  }
}

export const generateColors = (teamA, teamB) => {
  return Object.keys(mappings.categories).reduce((map, cat) => {
    const color = mappings.colors[teamA[cat] === teamB[cat] ? 'plain' : teamA[cat] > teamB[cat] ? 'teamA' : 'teamB']

    return { ...map, [mappings.categories[cat]]: color }
  }, {})
}

export const fromIPCEvent = (channel) => (start, sink) => {
  if (start !== 0) return
  let disposed = false
  const handler = (ev, data) => {
    sink(1, [ev, data])
  }

  sink(0, t => {
    if (t !== 2) {
      return
    }

    disposed = true
    ipcRenderer.removeListener(channel, handler) // probably never happens?
  })

  if (disposed) {
    return
  }

  ipcRenderer.on(channel, handler)
}
