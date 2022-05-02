import React from 'react'
import './Header.css'
import Select from 'react-select';
import {teamList} from './Constants'
import { useState } from 'react';
import { useEffect } from 'react';
import Matches from './Matches';
import Table from './Table';

function Header({matchesList}) {
  const teams=Object.keys(teamList).map(key => {
    return {value:key,label:teamList[key]}
  })


  const [selectedTeam, setSelectedTeam] = useState(null);
  const [tab, settab] = useState(1)
  const [filteredTeam, setFilteredTeam] = useState([])
  useEffect(() => {

    if(selectedTeam){

      var searchedTeam=[];
      selectedTeam.map(team =>{
        const filterMatches= matchesList.filter(match=>{
          return match.team1.includes(team['value']) || match.team2.includes(team['value'])
        })
        Array.prototype.push.apply(searchedTeam,filterMatches);
      })
      const jsonObj=searchedTeam.map(JSON.stringify);
      const uniqueSet = new Set(jsonObj);
      searchedTeam=Array.from(uniqueSet).map(JSON.parse)
      setFilteredTeam(searchedTeam)
    }
  }, [selectedTeam])
  
  const activeElement = document.getElementsByClassName('type');
  return (
    <>
      <div className='header'>
          <div className='headerTitle'>
              <p>IPL</p>
              <Select
                isMulti
                defaultValue={selectedTeam}
                options={teams}
                onChange={setSelectedTeam}
                className="multi-select"
                classNamePrefix="select"
                placeholder="Enter Team(s)"
              />
              <p>X</p>
          </div>
          <div className='headerType'>
              <div className='type active' onClick={(e)=>{activeElement[0].classList.add('active'); activeElement[1].classList.remove('active'); document.getElementsByClassName('multi-select')[0].style.display='block'; settab(1)}}>MATCHES</div>
              <div className='type' onClick={(e)=>{activeElement[1].classList.add('active'); activeElement[0].classList.remove('active'); document.getElementsByClassName('multi-select')[0].style.display='none'; settab(0)}}>TABLE</div>
          </div>
      </div>
      {
        tab ? <Matches matchesList={filteredTeam.length>0 ? filteredTeam : matchesList} selectedTeam={selectedTeam} /> : <Table  matchesList={matchesList} />
      }
    </>
  )
}

export default Header