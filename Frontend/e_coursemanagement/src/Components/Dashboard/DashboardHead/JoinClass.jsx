import React,{useRef,useState}from 'react'
import jwt_decode from 'jwt-decode'
import './DashBoardHead.css'
const JoinClass = ({ setJoinShowModal }) => {
    const modalRef = useRef();
    const btnvalue = "Join"
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
          setJoinShowModal(false);
        }
      };
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    const [courseCode,setcourseCode] = useState("");
    
    const classJoin = async(e)=>{
        e.preventDefault();
        setLoading(true)
        console.log(setcourseCode)
        const token = localStorage.getItem('token')
        // console.log(token);
            if (token) {
                var user = jwt_decode(token) 
                    console.log(user.id)
                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token,courseCode }),
                      };
                      const response = await fetch(
                        "http://localhost:3001/course/join",
                        requestOptions
                      );
                      const data = await response.json();
                      console.log(data);
                      setLoading(false);
                      if(response.status === 400)
                      {
                            alert(data.message);
                      }else if(response.status === 201)
                      {
                            setSuccess(true);
                      }
                       
                        // console.log(classData)
                    }    
                    else
                    {
                        alert("Please login again to join the course!");
                    }
}
  return (
    <div className="container" ref={modalRef} onClick={closeModal}>
    <div className="modal">
     
      <button onClick={() => setJoinShowModal(false)}>X</button>
      <div className='modal-child'>
              <form onSubmit={classJoin} >
              <input type="text" className="form__input" id="name" onChange={(e)=>{setcourseCode(e.target.value)}} placeholder="Enter Class Code!" required="" />
               <label htmlFor="name" className="form__label">Enter Class Code!</label>
               {loading ? <input type={"submit"} value={btnvalue} className={"submit-create-form2"} disabled />:
               <input type={"submit"} value={btnvalue} className={"submit-create-form"}  />
}
                <span className='course-success'>  {success ? "Course Joined successfully🥳":null}</span>
              </form>
             
      </div>
     
    </div>
  </div>
  )
}

export default JoinClass