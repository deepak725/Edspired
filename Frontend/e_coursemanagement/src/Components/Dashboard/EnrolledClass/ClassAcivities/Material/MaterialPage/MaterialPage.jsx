import React from 'react'
import EnrolledClassHead from '../../../EnrolledClassHead/EnrolledClassHead'

import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

const MaterialPage = () => {
    
  const [params] = useSearchParams();
  let course_id = params.get("classid");

  let navigate = useNavigate()
    
  return (
    <div className='MAterialPage'>
        <EnrolledClassHead />
           <div className='Back-Button' onClick={(e)=>{
                e.preventDefault();
                navigate(`/Enrolledclass?id=${course_id}`);
            }}>Back</div>
    </div>
  )
}

export default MaterialPage