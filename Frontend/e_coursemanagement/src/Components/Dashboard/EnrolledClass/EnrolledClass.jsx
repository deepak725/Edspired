import React from 'react'
import { useEffect } from 'react'
import './EnrolledClass.css'
import EnrolledClassHead from './EnrolledClassHead/EnrolledClassHead'
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState } from 'react';
import jwt_decode from "jwt-decode"
import EnrolledClassBody from './EnrolledClassBody/EnrolledClassBody';
import ins_logo from '../../../Images/instructor.png'
import { InstructorContext } from '../../../Helper/Context';

const EnrolledClass = () => {
    const [params] = useSearchParams();
    const [isInstructor,setInstructor] = useState(false)
    const [className,setClassName] = useState("Class-name")
    
    const navigate = useNavigate();
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
          console.log(data.data.courseName);

        // setClassData(data);
        // console.log(classData)
        setClassName(data.data.courseName)

        const token = localStorage.getItem('token')
        // console.log(token);
            if (token) {
                var user = jwt_decode(token)
                
            }
            if(user) 
            {
                if(String(data.data.instructor_id._id) === String(user.id))
                {
                    console.log("Instructor");
                    setInstructor(true)
                }  else
                {
                    console.log("Student")
                }
            }
        if(response.status === 400 || response.status === 404)
            alert(response.message)
    }
    useEffect(()=>{
        getClass()
        
       // eslint-disable-next-line
    },[])
  return (
    <div className='EnrolledClass'>
      <InstructorContext.Provider value={{isInstructor}}>
            <EnrolledClassHead isInstructor={isInstructor}/>
            <div className='ClassTitle'>
            {isInstructor ? <><input type={"image"} className={"ins_image"} src={ins_logo} alt={"ins"} />{className}</> : className }   
            </div>
            <div className='Back-Button' onClick={(e)=>{
                e.preventDefault();
                navigate('/dashboard');
            }}>
                {/* Back button */}
                Back
            </div>
            <EnrolledClassBody isInstructor={isInstructor} />
            </InstructorContext.Provider>
    </div>
  )
}

export default EnrolledClass