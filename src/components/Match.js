import React from 'react'
import './Match.css'
import {teamList} from './Constants'

function Match({matchNo, total, date, team1,team2, winner}) {
  return (
    <div className='match'>
        <div className='title'>
            <p>T20 {matchNo} of {total} </p>
            <p>{date}</p>
        </div>
        <p>{teamList[team1]}</p>
        <p>{teamList[team2]}</p>
        <p>{winner ? `${teamList[winner]} Won`:null}</p>
    </div>
  )
}

export default Match