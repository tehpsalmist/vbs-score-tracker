exports.schema = {
  teamA: {
    type: 'object',
    properties: {
      visitors: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      verses: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      rally: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      games: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      attendance: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      bibles: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      offering: {
        type: 'number',
        default: 0,
        minimum: 0
      }
    }
  },
  teamB: {
    type: 'object',
    properties: {
      visitors: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      verses: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      rally: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      games: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      attendance: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      bibles: {
        type: 'number',
        default: 0,
        minimum: 0
      },
      offering: {
        type: 'number',
        default: 0,
        minimum: 0
      }
    }
  }
}

exports.defaults = {
  teamA: {
    visitors: 0,
    verses: 0,
    rally: 0,
    games: 0,
    attendance: 0,
    bibles: 0,
    offering: 0
  },
  teamB: {
    visitors: 0,
    verses: 0,
    rally: 0,
    games: 0,
    attendance: 0,
    bibles: 0,
    offering: 0
  }
}

const keys = [
  'visitors',
  'verses',
  'rally',
  'games',
  'attendance',
  'bibles',
  'offering'
]

exports.validateSchema = json => {
  try {
    const { teamA, teamB } = JSON.parse(json)

    if (!teamA || !teamB || Object.keys(teamA).length !== 7 || Object.keys(teamA).length !== 7) {
      return false
    }

    return keys.every(key => typeof teamA[key] === 'number' && typeof teamB[key] === 'number')
  } catch (e) {
    return false
  }
}
