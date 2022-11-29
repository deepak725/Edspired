import React,{useState,useContext} from 'react'
import './Polls.css'

import { InstructorContext } from '../../../../../Helper/Context'
const Polls = ({obj}) => {

  const [answer_id,setAnswerID] = useState('')
  const {isInstructor} = useContext(InstructorContext)
const[loading,setLoading] = useState(false)
const[success,setSuccess] = useState(false)
  async function handleSubmit(e){
      console.log(answer_id)
      e.target.reset()
      e.preventDefault()
      setSuccess(false)
      setLoading(true)
      const token = localStorage.getItem('token')
     
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token,answer_id}),
      };
      const response = await fetch(
        `http://localhost:3001/poll/vote/${obj._id}`,
        requestOptions
      );
      
      const data = await response.json();
      console.log(data);

      if(response.status === 404 || response.status === 400)
      {
        alert(data.message)
        setLoading(false)
        setSuccess(false)
      } 
        else
      {
          setLoading(false)
          setSuccess(true)
      }

  }
  return (
    <div className='PollContainer'>
       <div className='PollTitle'>
        {obj.poll_title}
       </div>

       <form onSubmit={handleSubmit}>

       {obj.options && obj.options.map((f, i) => (
                        
                      <div className='OptionDisplay'>
                        
                      {!isInstructor ?  <input type={"radio"} 
                                onChange={(e)=>{
                                  e.preventDefault()
                                  // console.log(e.target.value)
                                  setAnswerID(f._id)
                                  // console.log(answer_id)
                                }}   name={obj.poll_title} required />:<>{`Option${i+1}`}<span></span></>}<label className='OptionValue' >{f.option}</label> </div> 

                      
          ))}
           {isInstructor ?<input type={"submit"} value={"View Result"} className={'submit-create-poll'} /> : <input type={"submit"} value={!loading?"Submit":"Wait..."}  className={!loading ? 'submit-create-poll' : 'submit-create-poll2'} />}
       </form>
      <div className='PollTime'>
        {success?<span className='success'>Voted Successfully!!</span>:null}
        {obj.createdAt}</div>
    </div>
  )
}

export default Polls