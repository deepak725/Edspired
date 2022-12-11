import React,{useEffect,useState} from 'react'
import EnrolledClassHead from '../../../EnrolledClassHead/EnrolledClassHead'
import './MaterialPage.css'
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import {FaBook} from "react-icons/fa";
const MaterialPage = () => {
    
  const [params] = useSearchParams();
  let materialid = params.get("id");
  let course_id = params.get("classid")

  var isInstructor = false;
  const insval = params.get("prof");

  if(insval === "true")
  {
    isInstructor = true
  }
  let navigate = useNavigate()
  const[folderData,setFolderData] = useState({})
  async function getFolderData(req,res)
  {
    // http://localhost:3001/material/folder/638b1b5508974d3a6d9828c5
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      };
      const response = await fetch(
        ` http://localhost:3001/material/folder/${materialid}`,
        requestOptions
      );
      const data = await response.json();

      if(response.status === 400 || response.status === 404)
      {
        alert(data.message)
      }
      else
      {
            console.log(data);
            setFolderData(data.data)
      }
  }
  useEffect(()=>{
    getFolderData()
  },[])

  return (
    <div className='MAterialPage'>
        <EnrolledClassHead />
           <div className='Back-Button' onClick={(e)=>{
                e.preventDefault();
                navigate(`/Enrolledclass?id=${course_id}`);
            }}>Back</div>
              <div className='TaskPageBody'>
                    <FaBook className='TaskIcon2' style={{"color":"#FF7F50"}} />
                    <span className='AssignmentDesc'>{folderData && folderData.m_Desc ? folderData.m_Desc : "Assignment Description" }</span>
                    {isInstructor ?  <button className='plusmaterial' >Add material</button> : null}
              </div>

    </div>
  )
}

export default MaterialPage