import React, { useState } from 'react'
import './EnrolledClassBody.css'

import tasks from '../../../../Images/tasks.png'
import quiz from '../../../../Images/quiz.png'
import info from '../../../../Images/info.png'
import poll from '../../../../Images/poll.png'
import material from '../../../../Images/material.png'
import announcement from '../../../../Images/announcement.png'
import student from '../../../../Images/student.png'
import Poll from '../ClassAcivities/Poll/Poll'
import Task from '../ClassAcivities/Task/Task'
const Comp1 = ()=>{
    return(
        <div className='first'>
        <h1>Hello world</h1>
        </div>
    )
}

const Components = {
    1 : Task,
    2: Poll
}

const EnrolledClassBody = () => {
    const [comp,setComp] = useState(Components[1])
  return (
    <div className='EnrolledClassBody' >
        <div className='ClassMenu'>
                <div className='subclassmenu' onClick={(e)=>{
                        e.preventDefault()
                        setComp(Components[1])
                }}>
                        <div className='subclassmenu-icon'><input type={"image"} alt={"image"} src={tasks}/></div>
                        <div className='subclassmenu-text'>Tasks</div>
                </div>
                <div className='subclassmenu' onClick={(e)=>{
                        e.preventDefault()
                        setComp(Components[2])
                }}>
                        <div className='subclassmenu-icon'><input type={"image"} alt={"image"} src={poll}/></div>
                        <div className='subclassmenu-text'>Poll</div>
                </div>
                <div className='subclassmenu'>
                        <div className='subclassmenu-icon'><input type={"image"} alt={"image"} src={quiz}/></div>
                        <div className='subclassmenu-text'>Quiz</div>
                </div>
                <div className='subclassmenu'>
                        <div className='subclassmenu-icon'><input type={"image"} alt={"image"} src={announcement}/></div>
                        <div className='subclassmenu-text'>Announcements</div>
                </div>
                <div className='subclassmenu'>
                        <div className='subclassmenu-icon'><input type={"image"} alt={"image"} src={student}/></div>
                        <div className='subclassmenu-text'>Students</div>
                </div>
                <div className='subclassmenu'>
                        <div className='subclassmenu-icon'><input type={"image"} alt={"image"} src={material}/></div>
                        <div className='subclassmenu-text'>Materials</div>
                </div>
                <div className='subclassmenu'>
                        <div className='subclassmenu-icon'><input type={"image"} alt={"image"} src={info}/></div>
                        <div className='subclassmenu-text'>Info</div>
                </div>
        </div>
        <div className='classBody'>
            {comp}
        </div>
        
    </div>
  )
}


export default EnrolledClassBody