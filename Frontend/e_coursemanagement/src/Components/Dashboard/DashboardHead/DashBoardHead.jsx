import React,{useState} from 'react'
import './DashBoardHead.css'

import logo from '../../../Images/Demo.png'
import enroll from '../../../Images/enroll.png'
import Add from '../../../Images/Add.png'
import Profile from '../../../Images/user.png'
import CreateClass from './CreateClass'
import JoinClass from './JoinClass'

const DashBoardHead = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const [JoinshowModal, setJoinShowModal] = useState(false);
  const JoinopenModal = () => {
    setJoinShowModal(true);
  };

  return (
    <div className='DashBoardHead'>
        <div className='DashBoardLogo'>
            <input type={"image"} src={logo} alt={"logo"}/>
        </div>
        <div className='DashBoardHeadItems'>
            <div className='subclass' onClick={JoinopenModal}>
                    <div className='subclass-logo'>
                    <input type={"image"} src={enroll} alt={"logo"}/>
                    </div>
                    <div className='subclass-Text'>Enroll</div>
                    
            </div>
            <div className='subclass' onClick={openModal}>
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
        
        {JoinshowModal ? <JoinClass setJoinShowModal={setJoinShowModal} /> : null}
        {showModal ? <CreateClass setShowModal={setShowModal} /> : null}
    </div>
  )
}

export default DashBoardHead