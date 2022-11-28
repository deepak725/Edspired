import React from 'react'
import './Course.css'

import { useNavigate } from "react-router-dom";
const Course = ({data}) => {

      const id = data.course_id._id;
      const classCliked = (e) => {
            // let id = e.target.parentElement.id;
            console.log("clicked")
            console.log(id);
            if (id) {
              navigate(`/Enrolledclass?id=${id}`);
            }
          };
          
    const navigate = useNavigate();
  return (
            <div className='Course-main'   onClick={classCliked}>
                  <div className='Course-title'>
                        {data.course_id.courseName}
                  </div>
                  
            </div> 
  )
}

export default Course