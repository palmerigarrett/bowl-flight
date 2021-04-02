import React from 'react'
import DisplayGame from './DisplayGame'

import calcCumulativeScore from '../utils/CalcCumulative'

const {useState, useEffect} = React

function Play() {
  const [currRoll, setCurrRoll] = useState(1)
  const [currFrame, setCurrFrame] = useState(1)
  const [currOutcome, setCurrOutcome] = useState('Please Choose Outcome')
  const initialFrameScores = Array(10).fill().map(() => [])
  const [frameScores, setFrameScores] = useState(initialFrameScores)
  const [cumulativeScores, setCumulativeScores] = useState([])
  const firstOutcomes = ['Strike', 'Miss', 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const secondOutcomes = ['Spare', 'Miss', 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [validOutcomes, setValidOutcomes] = useState(firstOutcomes)
  const [endFrame, setEndFrame] = useState(false)
  const [endGame, setEndGame] = useState(false)
  
  const pushFrameScore = (val) => {
    let tempFrameScores = frameScores
    tempFrameScores[currFrame - 1].push(val)
    setFrameScores(tempFrameScores)
    
    if (currRoll === 1 && val === 'X') {
      if (currFrame < 10) {
        setCumulativeScores(calcCumulativeScore(frameScores, currFrame, currRoll, endGame))
        setCurrFrame(currFrame + 1)
        setEndFrame(true)
      } else {
        setCurrRoll(2)
      }
    } else if (currRoll === 1 && val !== 'X') {
      setCurrRoll(2)
      if (val !== '-') {
        const filteredSecOutcomes = secondOutcomes.filter(outcome => typeof(outcome)==='string' || outcome < 10 - val)
        setValidOutcomes(filteredSecOutcomes)
      } else {
        setValidOutcomes(secondOutcomes)
      }
    } else if (currRoll === 2 && currFrame < 10) {
      setCumulativeScores(calcCumulativeScore(frameScores, currFrame, currRoll, endGame))
      setCurrFrame(currFrame + 1)
      setCurrRoll(1)
      setValidOutcomes(firstOutcomes)
      setEndFrame(true)
    } else if (currRoll === 2 && currFrame === 10) {
      if (tempFrameScores[9][0] === 'X' || val === '/') {
        setCurrRoll(3)
        setValidOutcomes(firstOutcomes)
      } else {
        setEndFrame(true)
        setEndGame(true)
        setCumulativeScores(calcCumulativeScore(frameScores, currFrame, currRoll, endGame))
      }
    } else if (currRoll === 3) {
      setEndFrame(true)
      setEndGame(true)
      setCumulativeScores(calcCumulativeScore(frameScores, currFrame, currRoll, endGame))
      
    }
  }

  useEffect(() => {
    console.log(frameScores)
  }, [frameScores])

  function validateRoll() {
    let isValid = true
    if (currOutcome === 'ignore' || !currOutcome) {
      isValid = false
    }
    if (currRoll === 1 && currOutcome === 'Spare') {
      isValid = false
    }
    return isValid
  }

  const handleRoll = (e) => {
    e.preventDefault()
    const val = e.target.value
    setCurrOutcome(val)
  }

  function submitRoll(e) {
    e.preventDefault()
    const isValid = validateRoll()
    if (isValid) {
      let val = currOutcome
      if (val === 'Strike') {
        val = 'X'
      } else if (val === 'Spare') {
        val = '/'
      } else if (val === 'Miss') {
        val = '-'
      }
      pushFrameScore(val)
      
    }
  }
      

  function resetGame() {
    setFrameScores(initialFrameScores)
    setCurrFrame(1)
    setCurrRoll(1)
    setValidOutcomes(firstOutcomes)
    setCumulativeScores([])
    setEndGame(false)
  }

  return (
    <>
    <h1>Bowling</h1>
        <h3>What is the outcome of your roll?</h3>
        {!endGame ?
          <form>
            {currRoll === 1 ?
              <>
                <label>First Roll</label>
                <select id='roll' name='rollOne' onChange={handleRoll} >
                  <option value='ignore' >Please Choose an Outcome</option>
                  {validOutcomes.map((outcome) => 
                    <option key={outcome} value={outcome} >{outcome}</option>
                  )}
                </select>
              </>
            :
            currRoll === 2 ?
              <>
                <label>Second Roll</label>
                <select id='roll' name='rollTwo' onChange={handleRoll} >
                <option value='ignore' >Please Choose an Outcome</option>
                  {validOutcomes.map((outcome) => 
                    <option key={outcome} value={outcome} >{outcome}</option>
                  )}
                </select>
              </>
            :
              <>
                <label>Third Roll</label>
                <select id='roll' name='rollThree' onChange={handleRoll} >
                <option value='ignore' >Please Choose an Outcome</option>
                  {validOutcomes.map((outcome) => 
                    <option key={outcome} value={outcome} >{outcome}</option>
                  )}
                </select>
                
              </>
          }
            <button id='submitRoll' onClick={submitRoll}>Enter</button>
          </form>
          :
            <>
            <button onClick={resetGame}>Reset Game</button>
            </>
        }

      {/* <DisplayGame outcome={currOutcome} currFrame={currFrame} currRole={currRoll}/> */}
      <DisplayGame frames={frameScores} cumulativeScores={cumulativeScores} endGame={endGame} />
    </>
  )
}

export default Play