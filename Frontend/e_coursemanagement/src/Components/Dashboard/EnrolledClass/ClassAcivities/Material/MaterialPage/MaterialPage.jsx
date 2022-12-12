import React,{useEffect,useState , useRef} from 'react'
import EnrolledClassHead from '../../../EnrolledClassHead/EnrolledClassHead'
import './MaterialPage.css'

import axios from 'axios';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import {FaBook , FaFileDownload} from "react-icons/fa";
const MaterialPage = () => {
    
  const [params] = useSearchParams();
  
  let materialid = params.get("id");
  let course_id = params.get("classid")

  var isInstructor = false;
  const insval = params.get("prof");

  if(insval === "true")
  {
    isInstructor = true
  }
  let navigate = useNavigate()
  const[folderData,setFolderData] = useState({})
  async function getFolderData(req,res)
  {
    // http://localhost:3001/material/folder/638b1b5508974d3a6d9828c5
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      };
      const response = await fetch(
        ` http://localhost:3001/material/folder/${materialid}`,
        requestOptions
      );
      const data = await response.json();

      if(response.status === 400 || response.status === 404)
      {
        alert(data.message)
      }
      else
      {
            console.log(data);
            setFolderData(data.data)
            getMaterialFiles()
      }
  }

  const [m_files,setMfilesData] = useState([])

  async function getMaterialFiles(req,res){
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      };
      const response = await fetch(
        ` http://localhost:3001/material/file/${materialid}`,
        requestOptions
      );
      const data = await response.json();

      if(response.status === 400 || response.status === 404)
      {
        alert(data.message)
      }
      else
      {
        console.log("filesData")    
        console.log(data);
            
            setMfilesData(data.data)
      }
  }
  useEffect(()=>{
    getFolderData()
    // eslint-disable-next-line
  },[])
  const [showModal, setShowModal] = useState(false);
  const openModal =async() => {
    setShowModal(true);
  
};

const modalRef = useRef();
const closeModal = (e) => {
if (e.target === modalRef.current) {
  setShowModal(false);
}
};

const [m_name,setMname] = useState('')

const [loading,setLoading] = useState(false)
const [files,setFiles] = useState('')
const[success,setSuccess] = useState(false)
async function uplaodMaterial(e)
{
    setLoading(true)
    setSuccess(false)
    console.log(m_name)
    console.log(files)
    var formData = new FormData();
    for (const key of Object.keys(files)) {
      formData.append('pictures', files[key])
    }

    formData.append('m_name',m_name)

    axios.post(`http://localhost:3001/material/uploadfile/${materialid}`, formData, {
    }).then(res => {
        console.log(res.data)
        setLoading(false)
        setSuccess(true)
        e.target.reset()

    }).catch(err =>{
        console.log(err)
        alert(err.response.data.message)
        setLoading(false)
        getMaterialFiles()
    })

}

  return (
    <div className='MAterialPage'>
        <EnrolledClassHead />
           <div className='Back-Button' onClick={(e)=>{
                e.preventDefault();
                navigate(`/Enrolledclass?id=${course_id}`);
            }}>Back</div>
              <div className='TaskPageBody'>
                    <FaBook className='TaskIcon2' style={{"color":"#FF7F50"}} />
                    <span className='AssignmentDesc2'>{folderData && folderData.m_Desc ? folderData.m_Desc : "Assignment Description" }</span>
                  {m_files.length > 0 ? <div className='FilesConainer'>
                        {
                            m_files.map((obj)=>{
                                return <div>
                                    <a href={obj.url} target={"_blank"} rel="noreferrer" ><FaFileDownload className='filelogo'/>{obj.name}</a>
                                </div>
                               

                            })
                        }
                  </div> : <p>No files to show</p> }
                    {isInstructor ?  <button className='plusmaterial' onClick={(e)=>{
                        e.preventDefault()
                        openModal(true)
                    

                    }}
                     >Add material</button> : null}
                    {showModal ?  <div className="container" onClick={closeModal}>
            
             <div className="modal">
              
               <button onClick={() => setShowModal(false)}>X</button>
               <div className='modal-child'>
                        <form  onSubmit={(e)=>{
                    e.preventDefault()
                    uplaodMaterial(e)
               }} >
                        <input type={"text"} onChange={
                            (e)=>{
                                setMname(e.target.value)
                            }
                            
                            } placeholder={"Enter material name!"}  required/>
                            <input className='file-custom' type={"file"} onChange={(e)=>{setFiles(e.target.files)}} accept="image/* , application/pdf"   />
                         {loading ?   <input className='uploadBtn2'  type={"submit"} value={"uploading...."} disabled /> :   <input className='uploadBtn' type={"submit"} value={"upload"} />}
                        {success ? <p className='success'>Material uploaded Successfully</p> : null}
                        </form>

               </div>
               </div>
               </div> : null}
              </div>

    </div>
  )
}

export default MaterialPage