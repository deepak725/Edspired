import React,{useState,useRef} from 'react'
import{MdModeEditOutline } from "react-icons/md";



const TaskResult = ({obj,points}) => {
    
  const [showModal, setShowModal] = useState(false);
  const [score,SetScore] = useState('')
  
  const openModal =async() => {
    setShowModal(true);
    // http://localhost:3001/assignment/get/6388b289e17b75accf1ca69f
    setSuccess(false)
    
  }
  
//   let assi_id = params.get("")

const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
    };

    const [success,setSuccess] = useState(false)
  const[loading,setLoading] = useState(false)

const submitGrade = async()=>{
// http://localhost:3001/assignment/grade/
setLoading(true)

    const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"points":score}),
  };
  const response = await fetch(
    ` http://localhost:3001/assignment/grade/${obj._id}`,
    requestOptions
  );
  const data = await response.json();

  if(response.status === 400 || response.status === 404)
  {
    alert(data.message)
    setLoading(false)
}
  else{
    setLoading(false)
    setSuccess(true)
}

}
  return (
   <div className='tableContainer'>
    {/* hello */}
     <table>
        <tbody >
    <tr>
            <td className='emailContainer'>{obj.student_id.email}</td>
            <td  className='Attachments'>
            {obj.attachments.map((link,i)=>{
                return <a href={link} target={'_blank'} rel="noreferrer"> Attachment {i+1} </a>
            })}
            </td>
            {/* <span>{new Date(obj.submission_Date)}</span> */}
            <td  className='submit_status'>{obj.status === 1 ? "Submitted on time":"Submitted Late"}</td>
            <td className='grade_status'>{obj.EarnedPoints >=0  ?"Graded" :"Not Graded"}</td>
            <td className='edit' onClick={openModal}><MdModeEditOutline title='Give marks' /></td>
            </tr>
            </tbody>
  </table>
  {showModal ? <div className="container" onClick={closeModal}>
            
            <div className="modal">
             
              <button onClick={() => setShowModal(false)}>X</button>
              <div className='modal-child'>
                <div className='ResultBox' >
                        
                        <form className='gradeForm' onSubmit={(e)=>{
                            e.preventDefault()
                            submitGrade()
                            e.target.reset()
                        }}>
                            <label>Grade this assignment out of {points}</label>
                             <input type={"number"} onChange={(e)=>{SetScore(e.target.value)}} min={0} max={points} />
                            {loading ?  <input type={"submit"} value={"Please wait"} style={{"background":"#574e4bc5"}} className={"submitBtn"} disabled/> :   <input type={"submit"} className={"submitBtn"}/>}
                            {success ?  <center><span className='success'>Assignment Graded successfully!</span></center>:null}
                        </form>

                </div>
            </div>

   </div></div> : null}
   </div>

  )
}

export default TaskResult