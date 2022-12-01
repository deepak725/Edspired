import React,{useContext, useState} from 'react'
import './EachTask.css'
import { InstructorContext } from '../../../../../Helper/Context'
import { BiTask } from "react-icons/bi";
import {HiArrowTopRightOnSquare} from "react-icons/hi2";

import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const EachTask = ({obj}) => {

    
  const [params] = useSearchParams();
  let course_id = params.get("id");
    const id = obj._id;
    const classCliked = () => {
          // let id = e.target.parentElement.id;
         
          console.log("clicked")
          console.log(id);
          if (id) {
            navigate(`/Task?id=${id}&classid=${course_id}&prof=${isInstructor}`);
          }
        };
        
  const navigate = useNavigate();

const {isInstructor} = useContext(InstructorContext)
var date = new Date(obj.assignment_dueDate);

var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var year = date.getFullYear();
var month = months[date.getMonth()];
var dateVal = date.getDate();
var formattedDate = dateVal + `/ ${month} /` + year;

const [show,setShow] = useState(false)
  return (
    <div className='EachTaskMain' onClick={()=>{setShow(!show)}}>
    <div className='EachTask'>
       <div className='EachTask2'>
        <BiTask className='TaskIcon' />
           <span className='TaskTitle'>{obj.assignment_name}</span>

       </div>
       <div className='EachTask3'>
            <div className='EachTask4'>
            <span className='DateText'>Due : {formattedDate}</span>
            <HiArrowTopRightOnSquare  onClick={(e)=>{
                e.preventDefault()
                classCliked()}} className='TaskIcon' title='Visit this assignment page'/>
            </div>
     
       </div>
       
    </div>
    <div className={show?'EachTask6':'EachTask7'}>
        <br ></br>
        {/* <hr></hr> */}
        <span className='TaskDesc'>{obj.assignment_description ? obj.assignment_description : "Description"}</span>
        {isInstructor ? 
        <div className='SubmittedTask'>
                
                
                <span className='submitNumber'>30/30</span>
                <span className='textTask'>Turned In</span>
        </div>:null}
    </div>
    </div>
  )
}

export default EachTask