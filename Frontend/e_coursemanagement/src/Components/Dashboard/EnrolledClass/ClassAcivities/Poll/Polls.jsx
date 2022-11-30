import React,{useState,useContext,useEffect,useRef} from 'react'
import './Polls.css'
import jwt_decode from 'jwt-decode'
import { InstructorContext } from '../../../../../Helper/Context'
const Polls = ({obj}) => {

const [answer_id,setAnswerID] = useState('')
const {isInstructor} = useContext(InstructorContext)
const[loading,setLoading] = useState(false)
const[success,setSuccess] = useState(false)
const token = localStorage.getItem('token')
const user= jwt_decode(token)
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
          callMust()
      }

  }

  const [voted,setVote] = useState(false)
  function callMust()
  {
    // eslint-disable-next-line
    obj.voted.length >0 && obj.voted.filter((id)=>{

      if(String(id)===String(user.id))
        setVote(true)

    })
  }
  
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

const [resData,setResData] = useState([])
const getResult = async()=>{

  const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token}),
      };
      const response = await fetch(
        `http://localhost:3001/poll/result/${obj._id}`,
        requestOptions
      );

      const data = await response.json();
      console.log(data);

      if(response.status === 404 || response.status === 400)
      {
        alert(data.message)
        
      } 
        else
      {
        setResData(data.data)
        
      }


}
const modalRef = useRef();
  
  useEffect(()=>{
    callMust()
    // eslint-disable-next-line
  },[])
  return (
    <div className='PollContainer'>
       <div className='PollTitle'>
        {obj.poll_title}
       </div>
       
      {!voted ?
       <form onSubmit={handleSubmit}>
 {showModal ? 
        <div className="container" onClick={closeModal}>
             <div className="modal">
              
               <button onClick={() => setShowModal(false)}>X</button>
               <div className='modal-child'>
                  {
                    resData && resData.length > 0 ? <div >
                          {
                            resData.map((opt,i)=>{
                              return <div className='resShow' key={i}>
                                
                                 <span>{`${opt.title} :  `}</span>
                                 <span>{opt.votesPercent ? `${opt.votesPercent}%` : "0%"}</span>
                              </div>
                            })
                          }
                    </div> : "Please check after some time!."}
                
               </div>
              
             </div>
             </div>
           :null}
       {obj.options && obj.options.map((f, i) => (
                        
                      <div className='OptionDisplay' key={i} >
                        
                      {!isInstructor ?  <input type={"radio"} 
                                onChange={(e)=>{
                                  e.preventDefault()
                                  // console.log(e.target.value)
                                  setAnswerID(f._id)
                                  // console.log(answer_id)
                                }}   name={obj.poll_title} required />:<></>}<label className='OptionValue' >{f.option}</label> </div> 

                      
          ))}
              {isInstructor ?<input type={"submit"} value={"View Result"} onClick={(e)=>{
                  e.preventDefault()
                  openModal()
                  getResult()

              }} className={'submit-create-poll'} /> : <input type={"submit"} value={!loading?"Submit":"Wait..."}  className={!loading ? 'submit-create-poll' : 'submit-create-poll2'} />}
       </form> : <div style={{"textAlign":"center"}} className='success'>Already voted</div> }
      <div className='PollTime'>
        {success?<span className='success'>Voted Successfully!!</span>:null}
        {obj.createdAt}</div>
    </div>
  )
}

export default Polls