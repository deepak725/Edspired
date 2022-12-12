import React from 'react'
import { useEffect,useState } from 'react';
import './Student.css'
import { useSearchParams } from "react-router-dom";
import {FaUserAlt} from "react-icons/fa";

const Students = () => {
    
const [params] = useSearchParams();
let course_id = params.get("id");

const [studata,setStuData] = useState(null)

async function getStudents()
{
        
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        `http://localhost:3001/course/getStudents/${course_id}`,
        requestOptions
      );
        
      const data = await response.json()
      if(response.status === 400 || response.status === 404)
            alert(data.message)
        else
        {
            console.log(data.data[0])
            // setPollData(data.data)
            setStuData(data.data[0])
        }
}
useEffect(()=>{
    getStudents()
    // eslint-disable-next-line
},[])
  return (
    <div className='StudentClass'>
        <div className='AllStudents'>
                { studata === null ? <div>Student Details will be shown here!</div> :  <>
                        {studata.student_id.map((obj)=>{
                                return <div key={obj._id} className={"StudentContainer"}>
                                       <div className='DetailsContanier'>
                                       <FaUserAlt  className='usericon2'/>
                                        {obj.firstname} {obj.lastname}({obj.email})
                                       </div>

                                </div>
                        })}
                    </>}
        </div>
    </div>
  )
}

export default Students