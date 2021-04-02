export default function calcCumulativeScore(scores, frame, currRoll, endGame) {
  let cumulativeScores = []
  let delayedScores = []
  // FIXME:
  // Use currRoll in each helper function to determine how to treat 10th frame
  // endGame && currRoll to determine if 10th frame should be cleaned up

  function handleStrike(currScore) {
    if (delayedScores.length === 2) {
      cumulativeScores.push(currScore + 30)
    } else if (delayedScores.length === 1 && delayedScores[0] === 'X') {
      delayedScores.push('X')
    } else if (delayedScores.length === 1 && delayedScores[0] === '/') {
      cumulativeScores.push(20 + currScore)
      delayedScores = ['X']
    } else {
      delayedScores.push('X')
    } 
  }

  function handleSpare(score, currScore) {
    const firstRollScore = score[0] === '-' ? 0 : parseInt(score[0], 10)
    if (delayedScores.length === 2) {
      cumulativeScores.push(20 + firstRollScore + currScore)
      cumulativeScores.push(20 + currScore)
      delayedScores = ['/']
    } else if (delayedScores.length === 1) {
      if (delayedScores[0] === 'X') {
        cumulativeScores.push(20 + currScore)
        delayedScores = ['/']
      } else if (delayedScores[0] === '/') {
        cumulativeScores.push(firstRollScore + currScore)
      }
    } else {
      delayedScores.push('/')
    }
  }

  function handleOpenFrame(score, currScore) {
    const firstRollScore = score[0] === '-' ? 0 : parseInt(score[0], 10)
    const secRollScore = score[1] === '-' ? 0 : parseInt(score[1], 10)
    const totalScore = firstRollScore + secRollScore
    if (delayedScores.length === 2) {
      // first strike
      let newCurrScore = currScore + 20 + firstRollScore
      cumulativeScores.push(newCurrScore)
      // second strike
      newCurrScore = newCurrScore + 10 + totalScore
      cumulativeScores.push(newCurrScore)

    } else if (delayedScores.length === 1 && delayedScores[0] === 'X') {
      
      const newCurrScore = currScore + 10 + totalScore
      cumulativeScores.push(newCurrScore)

    } else if (delayedScores.length === 1 && delayedScores[0] === '/') {
      const newCurrScore = currScore + 10 + firstRollScore
      cumulativeScores.push(newCurrScore)

    }
    const currCumScore = cumulativeScores.length > 0 ? cumulativeScores[cumulativeScores.length - 1] : 0
    cumulativeScores.push(totalScore + currCumScore)
    delayedScores = []
  }

  scores.forEach(score => {
    let currCumulativeScore = cumulativeScores.length > 0 ? parseInt(cumulativeScores[cumulativeScores.length - 1], 10) : 0
    console.log('score', score)
    console.log('frame', frame)

    if (score[0] === 'X') {
      console.log('strike is working')
      handleStrike(currCumulativeScore)

    } else if (score.length === 2 && score[1] === '/') {
      console.log('spare frame working')
      handleSpare(score, currCumulativeScore)

    } else if (score.length === 2) {
      console.log('open frame working')
      handleOpenFrame(score, currCumulativeScore)
    } 
  });

  if (cumulativeScores.length < 10) {
    for (let i = cumulativeScores.length; i < 10; i++) {
      cumulativeScores.push('')
    }
  }

  console.log('scores', scores)
  console.log('delayedScores', delayedScores)
  console.log('cumulativeScores', cumulativeScores)
  return cumulativeScores
}