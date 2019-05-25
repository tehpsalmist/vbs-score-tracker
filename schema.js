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
  },
  offerings: {
    type: 'object',
    properties: {
      teamA: {
        type: 'object',
        properties: {
          Monday: {
            type: 'string',
            default: ''
          },
          Tuesday: {
            type: 'string',
            default: ''
          },
          Wednesday: {
            type: 'string',
            default: ''
          },
          Thursday: {
            type: 'string',
            default: ''
          },
          Friday: {
            type: 'string',
            default: ''
          }
        }
      },
      teamB: {
        type: 'object',
        properties: {
          Monday: {
            type: 'string',
            default: ''
          },
          Tuesday: {
            type: 'string',
            default: ''
          },
          Wednesday: {
            type: 'string',
            default: ''
          },
          Thursday: {
            type: 'string',
            default: ''
          },
          Friday: {
            type: 'string',
            default: ''
          }
        }
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
  },
  offerings: {
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

const keys = [
  'visitors',
  'verses',
  'rally',
  'games',
  'attendance',
  'bibles',
  'offering'
]

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

exports.validateSchema = json => {
  try {
    const { teamA, teamB, offerings } = JSON.parse(json)

    if (
      !teamA ||
      !teamB ||
      !offerings ||
      Object.keys(teamA).length !== 7 ||
      Object.keys(teamA).length !== 7 ||
      Object.keys(offerings.teamA).length !== 5 ||
      Object.keys(offerings.teamB).length !== 5
    ) {
      return false
    }

    return keys.every(key => typeof teamA[key] === 'number' && typeof teamB[key] === 'number') &&
      days.every(day => typeof offerings.teamA[day] === 'string' && typeof offerings.teamB[day] === 'string')
  } catch (e) {
    return false
  }
}
