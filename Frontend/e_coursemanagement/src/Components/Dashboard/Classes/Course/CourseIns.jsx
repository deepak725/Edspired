import React from 'react'
import './Course.css'
import inslogo from '../../../../Images/instructor.png'
const CourseIns = ({data}) => {
  return (
 
           <div className='Course-main'>
                  <div className='Course-title'>
                        {data.courseName}
                  </div>
                  <div className='course-icon'><input type={"image"} alt={"Image"} src={inslogo} /></div>
            </div> 
   
  )
}

export default CourseIns