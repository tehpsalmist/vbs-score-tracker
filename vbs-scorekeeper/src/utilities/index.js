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
  continents: {
    'games': 'Antarctica',
    'rally': 'North America',
    'bibles': 'South America',
    'visitors': 'Asia',
    'attendance': 'Europe',
    'verses': 'Africa',
    'offering': 'Australia'
  },
  colors: {
    'teamA': 'blue',
    'teamB': 'red'
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
  },
  defaultOfferings: {
    teamA: {
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: ''
    },
    teamB: {
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: ''
    }
  }
}

export const adjustOfferingAmount = string => {
  return string === '' ? '' : parseFloat(string).toFixed(2)
}

const adjustmentReducer = team => (list, key) => ({ ...list, [key]: adjustOfferingAmount(team[key]) })

export const adjustOfferings = ({ teamA, teamB }) => {
  return {
    teamA: Object.keys(teamA).reduce(adjustmentReducer(teamA), {}),
    teamB: Object.keys(teamB).reduce(adjustmentReducer(teamB), {})
  }
}
