import React from 'react'
import EnrolledClassHead from '../../../EnrolledClassHead/EnrolledClassHead'
import './TaskPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
// import { InstructorContext } from '../../../../../../Helper/Context'
import { MdTask } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { useEffect,useRef } from 'react';
import { useState } from 'react';
// import jwt_Decode from 'jwt-decode'

const TaskPage = () => {

    let navigate = useNavigate()
    
  const [params] = useSearchParams();
  let course_id = params.get("classid");
  console.log(course_id)
  const [dueDate,setDueDate] = useState('Due date will be show here!');
  const [adata,setAdata] = useState()
  const[loading,setLoading] = useState(false)
  const[success,setSuccess] = useState(false)
  const [files,setFiles] = useState('')

  let token = localStorage.getItem('token')
//   var user = jwt_Decode(token)

  var isInstructor = false;
  const insval = params.get("prof");

  if(insval === "true")
  {
    isInstructor = true
  }
  async function getAssignment()
  {
        let assi_id = params.get("id")
        // http://localhost:3001/assignment/get
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(),
          };
          const response = await fetch(
            ` http://localhost:3001/assignment/get/${assi_id}`,
            requestOptions
          );
          const data = await response.json();

          if(response.status === 400 || response.status === 404)
          {
            alert(data.message)
          }
          else
          {
            console.log(data)
            setAdata(data.data)
            console.log(adata)
            console.log({isInstructor})
            var date = new Date(data.data.assignment_dueDate);

            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = date.getFullYear();
            var month = months[date.getMonth()];
            var dateVal = date.getDate();
            var formattedDate = dateVal + `/ ${month} /` + year;
            setDueDate(formattedDate)

                
          }
  }
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
    // setSuccess(false)
};


const modalRef = useRef();
const closeModal = (e) => {
if (e.target === modalRef.current) {
  setShowModal(false);
}
};


  useEffect(()=>{
    getAssignment()
    // eslint-disable-next-line
  },[])

  async function handleSubmit(e)
  {
    e.preventDefault();
    setLoading(true)
    setSuccess(false)
    
    var formData = new FormData();
    for (const key of Object.keys(files)) {
      formData.append('pictures', files[key])
  }

         let assi_id = params.get("id")
        formData.append('token',token)
        formData.append('assignment_id',assi_id)

          
    axios.post("http://localhost:3001/assignment/submit", formData, {
    }).then(res => {
        console.log(res.data)
        setLoading(false)
        setSuccess(true)
        e.target.reset()

    }).catch(err =>{
        console.log(err)
        alert(err.response.data.message)
        setLoading(false)
        
    })

  

  }
  return (
    <div>
        <EnrolledClassHead />
        <div className='Back-Button' onClick={(e)=>{
                e.preventDefault();
                navigate(`/Enrolledclass?id=${course_id}`);
            }}>Back</div>
            <div className='TaskPageBody'>

                    <MdTask className='TaskIcon2' />

                    <span className='AsignmentTitle'>{adata && adata.assignment_name ? adata.assignment_name : "Assignment Name" }</span>
                    <br></br>
                   <span className='Desc'>Assignment Description</span> 
                    <span className='AssignmentDesc'>{adata && adata.assignment_description ? adata.assignment_description : "Assignment Description"}</span>
                    <br></br>

                    <span className='DueDate'>Due-Date - { dueDate ? dueDate :"No due date"}</span>
                    {isInstructor? 
                        <div className='ViewResultContainer'>
                                hii
                                <button className='submit-create-form'></button>

                         </div> : <div className='StudentView'>
                                <button className='submitBtn' onClick={openModal} >Submit Assignment</button>
                                {showModal ? <div className="container" onClick={closeModal}>
            
             <div className="modal">
              
               <button onClick={() => setShowModal(false)}>X</button>
               <div className='modal-child'>
                    
                    <form onSubmit={(e)=>{handleSubmit(e)}}>
                        <label>Attach your submmission here : </label>
                        <input type={"file"} onChange={(e)=>{
                            console.log(e.target.value)
                            setFiles(e.target.files)
                       }} multiple required />

                     {loading ? <input type={"submit"}  className={"submitBtn3"} value={"Submitting please wait.."} disabled />: <input type={"submit"}  className={"submitBtn2"} />}
                    {success ?<center><span className='success'>Assignment submitted Successfully!</span></center> :null} 
                    </form>
                   
               </div>
              
             </div>
             </div>
           :null}
                            </div>}
            </div>  
    </div>
  )
}

export default TaskPage