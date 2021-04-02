import React from 'react';

function DisplayGame (props) {
  const {frames, cumulativeScores} = props;
  
  return (
    <>
      <table >
        
        <thead>
          <tr>
            <th></th>
            {frames.map((frame, idx) => 
              <th key={idx}>
                Frame {idx + 1}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
              {/* Frame Outcome */}
              <td>Frame Outcome</td>
              {frames.map((frame, idx) => 
                <td key={idx} id='outcome' style={{ 'border': '1px solid black' }}>
                  {
                    frames[idx].length === 0 ?
                      `${''}`
                    :
                    frames[idx].length === 1 ?
                      `${frames[idx][0]}`
                    :
                      frames[idx].length === 2 ?
                      `${frames[idx][0]} ${frames[idx][1]}`
                    :
                      `${frames[idx][0]} ${frames[idx][1]} ${frames[idx][2]}`
                  }
                </td>
              )}
          </tr>
          <tr>
            {/* Cumulative Score */}
            <td>Cumulative Score</td>
            {cumulativeScores.map((score, idx) => 
              <td key={idx} id='outcome' style={{ 'border': '1px solid black' }}>
                {score}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default DisplayGame