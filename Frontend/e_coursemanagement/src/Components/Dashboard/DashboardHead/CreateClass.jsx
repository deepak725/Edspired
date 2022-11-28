import React,{useRef,useState} from 'react'
import jwt_decode from 'jwt-decode'
import './DashBoardHead.css'

const CreateClass = ({ setShowModal }) => {
    const modalRef = useRef();
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    const [courseName,setValue] = useState("");

    const btnvalue = loading ? "Creating....." : "Create"
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
          setShowModal(false);
        }
      };
    const classCreate = async(e)=>{
            e.preventDefault();
            setLoading(true)
            console.log(courseName)
            const token = localStorage.getItem('token')
            // console.log(token);
                if (token) {
                    var user = jwt_decode(token) 
                        console.log(user.id)
                        const requestOptions = {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ token,courseName }),
                          };
                          const response = await fetch(
                            "http://localhost:3001/course/create",
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
                            alert("Please login again to create the course!");
                        }
    }
  return (
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
       
        <button onClick={() => setShowModal(false)}>X</button>
        <div className='modal-child'>
                <form onSubmit={classCreate} >
                <input type="text" className="form__input" onChange={(e)=>{setValue(e.target.value)}} id="name" placeholder="Enter Class Name!" required />
                 <label htmlFor="name" className="form__label">Enter Class Name!</label>
                 {loading ? <input type={"submit"} value={btnvalue} className={"submit-create-form2"} disabled />:
                 <input type={"submit"} value={btnvalue} className={"submit-create-form"}  />
}
                  <span className='course-success'>  {success ? "Course created successfully🥳":null}</span>
                </form>
               
        </div>
       
      </div>
    </div>
  )
}

export default CreateClass