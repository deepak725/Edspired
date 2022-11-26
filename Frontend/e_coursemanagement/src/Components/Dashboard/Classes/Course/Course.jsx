import React from 'react'
import './Course.css'
const Course = ({data}) => {
  return (
            <div className='Course-main'>
                  <div className='Course-title'>
                        {data.course_id.courseName}
                  </div>
                  
            </div> 
  )
}

export default Course