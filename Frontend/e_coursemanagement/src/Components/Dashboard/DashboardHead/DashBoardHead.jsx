import React from 'react'
import './DashBoardHead.css'

import logo from '../../../Images/Demo.png'
import enroll from '../../../Images/enroll.png'
import Add from '../../../Images/Add.png'
import Profile from '../../../Images/user.png'

const DashBoardHead = () => {
  return (
    <div className='DashBoardHead'>
        <div className='DashBoardLogo'>
            <input type={"image"} src={logo} alt={"logo"}/>
        </div>
        <div className='DashBoardHeadItems'>
            <div className='subclass'>
                    <div className='subclass-logo'>
                    <input type={"image"} src={enroll} alt={"logo"}/>
                    </div>
                    <div className='subclass-Text'>Enroll</div>
            </div>
            <div className='subclass'>
            <div className='subclass-logo'>
                    <input type={"image"} src={Add} alt={"logo"}/>
                    </div>
                    <div className='subclass-Text'>Course</div>
            </div>
            <div className='subclass'>
            <div className='subclass-logo'>
                    <input type={"image"} src={Profile} alt={"logo"}/>
                    
                    </div>
                    <div className='subclass-Text'>Profile</div>
            </div>
        </div>
    </div>
  )
}

export default DashBoardHead