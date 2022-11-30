import React, { useContext,useState,useRef } from 'react'
import { useEffect } from 'react'
import { InstructorContext } from '../../../../../Helper/Context'


import { useSearchParams } from "react-router-dom";
// import jwt_decode from 'jwt-decode'
import './Poll.css'
import Polls from './Polls';
const Poll = () => {

    const {isInstructor} = useContext(InstructorContext)
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
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([])
  const [fields, setFields] = useState([])
  const [valid, setValid] = useState(true)

  const addFields = () => {
    if (fields.length < 4) {
        setFields((f) => [...fields, f])
    }
    if(fields.length === 3){
       setValid(false) 
    }
    

}

const handleChange = (e, i) => {

    console.log(e.target.value)
    options[i] = e.target.value
    setOptions(options)
    
}
const [success,setSuccess] = useState(false);
const [params] = useSearchParams();
const[loading,setLoading] = useState(false)
const token = localStorage.getItem('token')
// const user= jwt_decode(token) 
const handleSubmit = async(e) => {
   e.preventDefault()
   console.log(question)
   console.log(options)
   setLoading(true)

   let course_id = params.get("id");
        
   const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course_id,poll_title:question,token,options }),
  };
  const response = await fetch(
    `http://localhost:3001/poll/create`,
    requestOptions
  );
  
  const data = await response.json();
  if(response.status === 400 || response.status === 404 )
    {
        console.log(response)
        alert(data.message)
        setLoading(false)
       
    }else
    {
     
        console.log(data)   
        setSuccess(true)
        setFields([])
        setValid(true)
        setQuestion('')
    setOptions([])
    setLoading(false)
    e.target.reset()
    GetPoll()
    }
}

const [pollData,setPollData] = useState([])
async function GetPoll()
{
    let course_id = params.get("id");

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_id}),
      };
      const response = await fetch(
        `http://localhost:3001/poll/getPoll`,
        requestOptions
      );
        
      const data = await response.json()
      if(response.status === 400 || response.status === 404)
            alert(data.message)
        else
        {
            console.log(data.data)
            setPollData(data.data)
        }
     
}
useEffect(()=>{

   
    GetPoll()
    // eslint-disable-next-line
},[])
  return (
    
    <div className='PollClass'>
           {isInstructor ? <div className='CreatePoll' onClick={openModal}>
                    Create Poll  +
            </div> : null}
           {showModal ? 
             <div className="container" onClick={closeModal}>
             <div className="modal">
              
               <button onClick={() => setShowModal(false)}>X</button>
               <div className='modal-child'>
                
                <form onSubmit={handleSubmit} >
                   <input placeholder="Enter question" className='inputfield' onChange={(e) => setQuestion(e.target.value)} required></input>
                    <span className='Labeloptions'>Enter options:</span>
                    <div className='OptionFields'>
                        {fields && fields.map((f, i) => (
                            <input className='inputfield2' placeholder="Enter option"
                                onChange={(e) => handleChange(e, i)} required />
                        ))}
                        </div>
                {valid && (
                        <input type={"button"}  className={'submit-create-form3'} value={"Add option"} onClick={addFields}  required />
                    
                 )}
                    <input type={"submit"} value={loading?'Wait...' : 'Create'} className={loading ?"submit-create-form2":"submit-create-form"} />
                    
                    {success && !loading ? <center> <span className='success'>Poll created successfully</span></center>:null}
                       </form>
               </div>
              
             </div>
             </div>
           :null}
            <div className='AllPolls'>
              {pollData.length > 0 ? <>
                
                    {

                        pollData.map((obj)=>{
                              
                              return <Polls obj={obj} />  
                        })
                    }

              </> : "No polls found!"}
            </div>
    </div>
    )
}

export default Poll