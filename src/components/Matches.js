import React from 'react'
import Match from './Match'
import './Matches.css'

function Matches({matchesList,selectedTeam}) {
  return (
    <div className='matches'>
      {
        matchesList.map((match,index) =>(
          <Match key={match.id} matchNo={index+1} total={matchesList.length} date={match.date} team1={match.team1} team2={match.team2} winner={match.winner} />
        ))
      }
    </div>
  )
}

export default Matches
