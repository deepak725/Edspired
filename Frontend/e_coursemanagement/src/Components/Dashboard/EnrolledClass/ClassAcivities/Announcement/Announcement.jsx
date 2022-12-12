import React from 'react'
import { useEffect ,useRef} from 'react'
import './Announcement.css'

import axios from 'axios';
import { useSearchParams } from "react-router-dom";
import { useState } from 'react';
import {FaUserAlt} from "react-icons/fa";
const Announcement = () => {
    const openModal = () => {
        setShowModal(true);
    };
  
   const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  const modalRef = useRef();
  
const [showModal, setShowModal] = useState(false);
const [params] = useSearchParams();
const [announceData,setAnnouncementData] = useState([])
const [files,setFiles] = useState('')
const [loading,setLoading] = useState(false)
const[success,setSuccess] = useState(false)
let course_id = params.get("id");
    async function GetAnnouncement()
    {
    
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            
          };
          const response = await fetch(
            `http://localhost:3001/announcement/getAll/${course_id}`,
            requestOptions
          );
            
          const data = await response.json()
          if(response.status === 400 || response.status === 404)
                alert(data.message)
            else
            {
                console.log(data.data)
                setAnnouncementData(data.data)
            }
         
    }
    useEffect(()=>{
        GetAnnouncement()
// eslint-disable-next-line
    },[])

    const[announceInput ,setannounceInput] = useState('');
    function convertDate(obj)
    {
        const dt = new Date(obj)
        return `${dt.getDate()} / ${dt.getMonth()} /${dt.getFullYear()} : ${dt.getHours()}:${dt.getMinutes()}`
    }

    const token = localStorage.getItem('token')
    async function submitfunc(e)
    {
            e.preventDefault()
            console.log(announceInput)
            console.log(files)
            setLoading(true)
            setSuccess(false)
            var formData = new FormData();
            for (const key of Object.keys(files)) {
              formData.append('pictures', files[key])
            }
        
            formData.append('announcement',announceInput)
            formData.append('courseid',course_id);
            formData.append('token',token)
        
            axios.post(`http://localhost:3001/announcement/Create`, formData, {
            }).then(res => {
                console.log(res.data)
                setLoading(false)
                setSuccess(true)
                e.target.reset()
        
            }).catch(err =>{
                console.log(err)
                alert(err.response.data.message)
                setLoading(false)
                GetAnnouncement()
            })

    }

//     const [CommentShowModal, setCommentShowModal] = useState(false);
//   const CommentOpenModal = () => {
//     setCommentShowModal(true);
//   };

//   const [cmntId,setCmntID] = useState('')

    return (
    <div className='AnnouncementClass'>
        <div className='CreateAnnouncement' onClick={openModal}>Create Announcement +</div>
        {showModal ? 
             <div className="container" onClick={closeModal}>
             <div className="modal">
              
               <button onClick={() => setShowModal(false)}>X</button>
               <div className='modal-child' onSubmit={submitfunc}>
                        <form className='announceForm'>
                            <textarea placeholder='Enter announcement here' onChange={(e)=>{
                               
                               setannounceInput(e.target.value)  

                            }}  required></textarea>
                            <input type={"file"} onChange={(e)=>{
                                setFiles(e.target.files)
                            }} accept={".png,.pdf,.jpeg,.jpg"} multiple />

                          {loading ?  <input type={"submit"} value={"loading"} className={"submitBtn"} disabled />:<input type={"submit"} className={"submitBtn"} />}
                            {success ? <span className='success'>Announcement created successfully!</span>:null}
                        </form>
               </div>
               </div>
               </div> : null}

        <div className='AllAnnouncement'>
            {announceData.length > 0?<>
                
                {announceData.map((obj)=>{
                        return <div className='AnnouncementContainer' >
                                <div className='CreatorDetail'>
                                    
                                <FaUserAlt className='usericon' />
                                        <div className='CreatorName'>
                                            <span title={obj.creator_id.email}>{obj.creator_id.firstname} {obj.creator_id.lastname}</span>
                                        </div>
                                        <span className='timestamp'>
                                                {convertDate(obj.createdAt)}
                                        </span>
                                </div>
                                <div className='Announcement'>
                                    {
                                        obj.announcement
                                    }
                                </div>
                                {obj.attachments.length > 0 ? <div className='Attachment'>
                                            {obj.attachments.map((dt,i)=>{
                                                    return <a  href={dt} rel="noreferrer" target={"_blank"}>{`Files${i+1}`}</a>
                                            })}
                                     </div>
                                     : null }
                                <div className='commentsec'>
                                    <span>Click here to view and add comments</span>
                                    {/* {CommentShowModal ? <Comment id={cmntId} setCommentShowModal={setCommentShowModal} /> : null} */}
                                </div>
                        </div>      
                })}
                
            </> :"All anouncement will be shown here!"}
        </div>
    </div>
  )
}

export default Announcement