import React,{useContext,useRef,useState} from 'react'
import { InstructorContext } from '../../../../../Helper/Context';
import './Task.css'
import jwt_Decode from 'jwt-decode'
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';
import EachTask from './EachTask';
const Task = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
      setShowModal(true);
      setSuccess(false)
  };

 const closeModal = (e) => {
  if (e.target === modalRef.current) {
    setShowModal(false);
  }
};
const modalRef = useRef();
  const {isInstructor} = useContext(InstructorContext)
const[loading,setLoading] = useState(false)
const[success,setSuccess] = useState(false)
  const [assign_title,setAssignTitle] = useState('')
  const [dueDate,setDate] = useState('')
  const [ass_desc,setAsscDesc] = useState('')
  const [points,setPoints] = useState(0)
  const [files,setFiles] = useState('')

  const [params] = useSearchParams();
  let token = localStorage.getItem('token')
  var user = jwt_Decode(token)
  function handleSubmit(e)
  {
    e.preventDefault()
      // console.log(e.target.value)
      console.log(assign_title)
      console.log(dueDate)
      console.log(ass_desc)
      console.log(points)
      console.log(files)
      
      setLoading(true)
      setSuccess(false)

      var formData = new FormData();
      for (const key of Object.keys(files)) {
        formData.append('pictures', files[key])
    }

  
   var course_id = params.get("id");

    formData.append('assignment_name',assign_title)
    formData.append('assignment_dueDate',dueDate)
    formData.append('assignment_description',ass_desc)
    formData.append('token',token)
    formData.append('course_id',course_id)
    formData.append('Points',points)
    formData.append('instructor_id',user.id)
    
    axios.post("http://localhost:3001/assignment/upload", formData, {
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

  const [funcData,setFuncData] = useState([])

  async function getAssignments()
  {
      let course_id = params.get("id");

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_id }),
      };
      const response = await fetch(
        `http://localhost:3001/assignment/getAll`,
        requestOptions
      );
      
      const data = await response.json()
      console.log(data)
      if(response.status === 400 || response.status === 500)
      {
        alert(data.message)
      }else
      {

        setFuncData(data.data);
       

      }


  }
  useEffect(()=>{
    getAssignments()
    // eslint-disable-next-line
  },[])

  return (
    <div className='TaskContainer'>
       {isInstructor ? <div className='CreatePoll' onClick={openModal}>
                    Create Task  +
            </div> : null}
            {showModal ? <div className="container" onClick={closeModal}>
             <div className="modal">
              
               <button onClick={() => setShowModal(false)}>X</button>
               <div className='modal-child'>

                  <form className='Task-form' onSubmit={(e)=>{handleSubmit(e)}}>
                        <input type={"text"} onChange={(e)=>{
                            setAssignTitle(e.target.value)
                        }} className='titleInput' placeholder={"Assignment Title"}  required/>
                        <textarea placeholder='Description' onChange={(e)=>{
                            setAsscDesc(e.target.value)
                        }} className='descInput' required></textarea>
                        <div className='flexform'>
                          <div className='flexform2'>
                              <label>Points</label>  
                              <select  onChange={(e)=>{
                                  console.log(e.target.value)
                                  setPoints(e.target.value)
                              }} required>
                                  <option>0</option>
                                  <option>10</option>
                                  <option>50</option>
                                  <option>100</option>
                                  <option>200</option>
                                </select>
                              </div>
                       
                            <div className='flexform3'>
                              <label>Due Date</label>
                              <input className='flexform-date' onChange={(e)=>{
                                  console.log(e.target.value)
                                  setDate(e.target.value)
                              }} min={new Date().toISOString().slice(0, -8)} type={"datetime-local"} />
                            </div>
                            
                        </div>
              
              <div className='flexform4'> <label>Attachments :</label><input type={"file"} onChange={(e)=>{
                            console.log(e.target.value)
                            setFiles(e.target.files)
                       }} className={'custom-file-input'} multiple />
                       
                       </div>
                   {loading ? <input type={"submit"} value={"Creating please wait!"} className={"submit-task-form2"}  disabled/> : <input type={"submit"} className={"submit-task-form"} />}
                  </form>
                    {success ?<center><span className='success'>Assignment created Successfully!</span></center> :null}
               </div>
              
             </div>
             </div>
           :null}
           <div className='TaskEach'>
                    {funcData.length >0 ? <>{funcData.map((obj)=>{

            return <EachTask obj={obj} />

            })}</>  : " All Task will be shown here!"}
           </div>
    </div>
  )
}

export default Task