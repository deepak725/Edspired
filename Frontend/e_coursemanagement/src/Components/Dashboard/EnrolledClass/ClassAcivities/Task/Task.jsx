import React,{useContext,useRef,useState} from 'react'
import { InstructorContext } from '../../../../../Helper/Context';
import './Task.css'
import jwt_Decode from 'jwt-decode'
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
const Task = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
      setShowModal(true);
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

    let token = localStorage.getItem('token')
    var user = jwt_Decode(token)
   let course_id = params.get("id");

    formData.append('assignment_name',assign_title)
    formData.append('assignment_dueDate',dueDate)
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
                    {success ? <span className='success'>Assignment created Successfully!</span>:null}
               </div>
              
             </div>
             </div>
           :null}
    </div>
  )
}

export default Task