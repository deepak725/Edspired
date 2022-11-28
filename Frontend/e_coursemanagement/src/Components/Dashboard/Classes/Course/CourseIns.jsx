import React from 'react'
import './Course.css'
import inslogo from '../../../../Images/instructor.png'
import { useNavigate } from "react-router-dom";

const CourseIns = ({data}) => {
      const id = data._id;
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
 
           <div className='Course-main' onClick={classCliked}>
                  <div className='Course-title' >
                        {data.courseName}
                  </div>
                  <div className='course-icon'><input type={"image"} alt={"Image"} src={inslogo} /></div>
            </div> 
   
  )
}

export default CourseIns