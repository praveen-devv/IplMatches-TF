import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {teamList} from './Constants'
import './Table.css'
import {IoCloseSharp} from 'react-icons/io5'
import {MdDone} from 'react-icons/md'

function LastFive({status}){
  return(
    <>
      {status.map(sts=>{
        if(sts==='W'){
          return <MdDone style={{backgroundColor:'green', borderRadius:'50px', padding:'1px', margin:'2px' }}  />
        }
        if(sts==='L'){
          return <IoCloseSharp style={{backgroundColor:'red', borderRadius:'50px', padding:'1px', margin:'2px'}} />
        }
      })}
    </>
  )
}

function Table({matchesList}) {
    const [PointsTableData, setPointsTableData] = useState([])
    useEffect(() => {
        
            const teams = [...new Set(
              matchesList
                .map(match => [match.team1,match.team2])
                .flat()
            )]

            const pointsTableData=createPointsTable(teams,matchesList);
            setPointsTableData(pointsTableData);

    }, [])
    const teamTotalCalculation = (team,matches,stat) =>{
      if(stat==='played'){
        const total = matches.filter(match=> (
            (match.team1===team || match.team2===team ) && match.winner !==null
          ))
        return total.length;
      }
      if(stat==='won'){
        const total = matches.filter(match =>(
          (match.team1===team || match.team2===team ) && match.winner===team 
        ))
        return total.length;
      }
      if(stat==='points'){
        const total = matches.filter(match =>(
          (match.team1===team || match.team2===team ) && match.winner===team 
        ))
        return total.length*2;
      }
      if(stat==='lost'){
        const total = matches
          .filter(match =>(
            (match.team1===team || match.team2===team ) && match.winner!==null 
          ))
          .filter(match=>(
            match.winner!==team
          ))
        return total.length;
      }
      if(stat==='status'){
        const total = matches.filter(match=> (
          (match.team1===team || match.team2===team ) && match.winner !==null
        ))
        let sts='';
        total.map(match=> {
          if(match.winner===team){
            sts+='W'
          }
          else{
            sts+='L'
          }
        })
        sts=sts.split("").reverse().join("");
        return sts.substring(0,5);
      }
    }
    

    const createPointsTable = (teams,matches) =>{
      const pointsTable=teams.map((team)=>({
          team:team,
          played:teamTotalCalculation(team,matches,"played"),
          won:teamTotalCalculation(team,matches,"won"),
          lost:teamTotalCalculation(team,matches,"lost"),
          points:teamTotalCalculation(team,matches,"points"),
          status:teamTotalCalculation(team,matches,"status"),
      }))
      pointsTable.sort((team1,team2)=>{
        return team2.points-team1.points
      })
      return pointsTable;
    }

  return (
    <div className='table'>
        <table>
          <thead>
            <tr>
              <th align='left' style={{width:'60%'}}>Team</th>
              <th align="right" style={{width:'5%'}}>M</th>
              <th align="right" style={{width:'5%'}}>W</th>
              <th align="right" style={{width:'5%'}}>L</th>
              <th align="right" style={{width:'5%'}}>Pts</th>
              <th align="center" style={{width:'20%'}}>Last 5</th>
            </tr>
          </thead>
          <tbody>
            {PointsTableData.map((team,index) => (
              <tr key={team.team}>
                <td>{index+1}  &nbsp;     {teamList[team.team]}</td>
                <td align="right">{team.played}</td>
                <td align="right">{team.won}</td>
                <td align="right">{team.lost}</td>
                <td align="right">{team.points}</td>
                <td align="center">
                  <LastFive status={team.status.split("")} />
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      
    </div>
  )
}

export default Table