import React from 'react'
import { useState } from 'react';
import './Dashboard.css';
import DashBoardHead from './DashboardHead/DashBoardHead';
import DashBoardSubHead from './DashBoardSubHead/DashBoardSubHead';
import down from '../../Images/down.png';
import DashBoardClasses from './Classes/DashBoardClasses';
const Dashboard = () => {

  const [isTrue,setTrue] = useState(false);


  return (
    <div className='dashboardMain'>
      <DashBoardHead />
      <DashBoardSubHead classvalue = {isTrue ? "DashBoardSubHeadMain2":"DashBoardSubHeadMain"} />
      <div className='icondowndiv'><input title='Menu' type={"image"} src={down} alt={"Down"} className={isTrue ? "downicon2" : "downicon"}  onClick={()=>{setTrue(!isTrue)}}/></div>
      <DashBoardClasses  />
    </div>
  )
}

export default Dashboard