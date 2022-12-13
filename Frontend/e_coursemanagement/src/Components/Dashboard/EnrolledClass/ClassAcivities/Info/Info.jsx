import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './Info.css'

import { useSearchParams } from "react-router-dom";
import {FaInfoCircle} from "react-icons/fa";
const Info = () => {

  const [classData,setClassData] = useState({})

  const [params] = useSearchParams();
  let getClass = async()=>{
    let id = params.get("id");
    // http://localhost:3001/course/getCourse
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      };
      const response = await fetch(
        `http://localhost:3001/course/getCourse`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
    setClassData(data.data)
    if(response.status === 400 || response.status === 404)
        alert(response.message)
}
  useEffect(()=>{
  
    getClass()
    // eslint-disable-next-line
  },[])
  return (
    <div className='PollClass'>

        <div className='InfoContainer'>
            <div className='TitleContainer'>
            <FaInfoCircle className='InfoIcon' />
             <span className='CourseTitle'>{classData.courseName ? classData.courseName : "ClassName"}</span> 
             
            </div>
            <div className='OtherContainer'>
            <span className='CoureCode'>Class-Code : {classData.course_code ? classData.course_code : "course_code"}</span>
            <span className='CoureCode'>Instructor-Name : {classData.instructor_id ? <>{classData.instructor_id.firstname} {classData.instructor_id.lastname}</>  : "Instructor name"}</span>
            <span className='CoureCode'>Instructor E-mail ID :{classData.instructor_id  ? classData.instructor_id.email : "Instructor email"}</span>
            </div>
        </div>
        
    </div>
  )
}

export default Info