import React,{useContext,useEffect,useState,useRef} from 'react'
import { InstructorContext } from '../../../../../Helper/Context'
import './Material.css'
import { useSearchParams,useNavigate } from "react-router-dom";
import{FaFolder}  from "react-icons/fa";
const Material = () => {
    const [showModal, setShowModal] = useState(false);
    const [name,setName] = useState("");
    const[desc,setDesc] = useState("");
    

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
  
const[loading,setLoading] = useState(false)
const [success,setSuccess] = useState(false);
    const [params] = useSearchParams();
    let course_id = params.get("id");
    const {isInstructor} = useContext(InstructorContext)
    const[folderData,setFolderData] = useState([])
    async function getFolders()
    {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(),
          };
          const response = await fetch(
            `http://localhost:3001/material/Allfolders/${course_id}`,
            requestOptions
          );
            const data = await response.json()
          if(response.status === 400 || response.status === 404)
            {
                alert(data.message)
            }
            else
            {
                console.log(data)
                setFolderData(data.data)
            }

    }
    
    useEffect(()=>{

        getFolders()
// eslint-disable-next-line
    },[])

   async function handleSubmit(e)
    {
        e.preventDefault()
        setLoading(true);
        setSuccess(false);

        const token = localStorage.getItem('token')
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"token":token,"course_id":course_id,"title":name,"description":desc}),
          };
          const response = await fetch(
            `http://localhost:3001/material/create`,
            requestOptions
          );
            const data = await response.json()
          if(response.status === 400 || response.status === 404)
            {
                alert(data.message)
                setLoading(false);
            }
            else
            {
                console.log(data)
                setLoading(false)
                setSuccess(true)
                getFolders()
            }
    }
    const navigate = useNavigate();
    const classCliked = (id) => {
        // let id = e.target.parentElement.id;
       
        console.log("clicked")
        console.log();
        if (id) {
          navigate(`/material/?id=${id}&classid=${course_id}&prof=${isInstructor}`);
        }
      };
  return (
    <div className='MaterialBody'>
  {isInstructor ? <div className='CreatePoll' onClick={openModal}>
                    Create Folder +
            </div> : 
            null}
            <div className='MaterialContainer'>
            {folderData.length > 0 ? folderData.map((obj,i)=>{

                    return  <div className='FolderContainer' onClick={(e)=>{ e.preventDefault()
                        classCliked(obj._id)}} key={i}>
                            <FaFolder className='FolderIcon' />
                            <span className='folderNo'>{i+1})</span>
                            <span className='folderTitle'>{obj.m_title}</span>
                        </div>

            }) : "All folders will be shown here"}
             {showModal ? 
             <div className="container" onClick={closeModal}>
             <div className="modal">
              
               <button onClick={() => setShowModal(false)}>X</button>
               <div className='modal-child'>
                <form className='Material-form'  onSubmit={handleSubmit}>
                    <input type={"text"} onChange={(e)=>{setName(e.target.value)}} className={"materialName"} placeholder={"Enter folder name!"} required/>
                    <textarea className='materialDesc' onChange={(e)=>{setDesc(e.target.value)}} placeholder='Enter Folder Description!' required />
                   {!loading ?  <input type={"submit"}  className={"materialButton"}/> : <input type={"submit"}  className={"materialButton2"} disabled/> }
                   {success ? <center><div className='success'>Material folder created!</div></center>:null}
                
                 </form>
                 </div>
                </div>
                </div> : null}
            </div>

    </div>
  )
}

export default Material