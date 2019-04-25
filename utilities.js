exports.getStringScores = (a, b) => {
  let teamA = String(a)
  let teamB = String(b)

  return {
    teamA: '0'.repeat(Math.max(teamA.length, teamB.length) - teamA.length).concat(teamA),
    teamB: '0'.repeat(Math.max(teamA.length, teamB.length) - teamB.length).concat(teamB)
  }
}
