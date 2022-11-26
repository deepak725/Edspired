import React from 'react'
import './DashBoardSubHead.css'
import todo from '../../../Images/todo.png'
import report from '../../../Images/report-card.png'
import setting from '../../../Images/settings.png'
import bell from '../../../Images/notification.png'

const DashBoardSubHead = ({classvalue}) => {
  return (
    <div className={classvalue}>
        <div className='subMenu'>
                <div className='subMenuIcon'><input type={"image"} src={todo} alt={""}/></div>
                <div className='subMenuText'> Tasks</div>

        </div>
        <div className='subMenu'>
                <div className='subMenuIcon'><input type={"image"} src={setting} alt={""}/></div>
                <div className='subMenuText'> Settings</div>
        </div>
        <div className='subMenu'>
                <div className='subMenuIcon'><input type={"image"} src={report} alt={""}/></div>
                <div className='subMenuText'>Report card</div>
        </div>
        <div className='subMenu'>
                <div className='subMenuIcon'><input type={"image"} src={bell} alt={""}/></div>
                <div className='subMenuText'> Notifications</div>
        </div>
    </div>
  )
}

export default DashBoardSubHead