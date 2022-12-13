import React,{useRef} from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Profile = ({setProfileShowModal}) => {
    const modalRef = useRef();
   
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setProfileShowModal(false);
        }
      };

    const[profileData,setProfileData] = useState({})
    async function getProfile()
    {
        let token  = localStorage.getItem('token')

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          };
          const response = await fetch(
            `http://localhost:3001/user/profile`,
            requestOptions
          );
            
          const data = await response.json()
          if(response.status === 400 || response.status === 404)
                alert(data.message)
            else
            {
                console.log(data.data)
                setProfileData(data.data)
            }
    }
      useEffect(()=>{
        // http://localhost:3001/user/profile
        getProfile()

      },[])

     async function logout()
      {
             localStorage.removeItem('token')
             window.location.reload();
      }
      const [loading,setLoading] = useState(false)
      async function verify()
      {
        let token  = localStorage.getItem('token')
        setLoading(true)
        
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          };
          const response = await fetch(
            `http://localhost:3001/user/verify`,
            requestOptions
          );
            
          const data = await response.json()
          console.log(data)
             alert(data.msg)
            setLoading(false)

         
      }
  
  return (
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
       
        <button onClick={() => setProfileShowModal(false)}>X</button>
        <div className='modal-child'>

                <div className='ProfileContainer'>
                    <div className='ProfileSubContainer'>
                            <div className='NameContainer'>
                                <span className='Value'>First Name</span>
                                <span className='Value2'>{profileData.firstname ? profileData.firstname : "frstname"}</span>
                            </div>
                            <div className='NameContainer'>
                                <span className='Value'>Last Name</span>
                                <span className='Value2'>{profileData.lastname ? profileData.lastname : "lastname"}</span>
                            </div>
                    </div>
                    <div className='ProfileSubContainer'>
                        <div className='NameContainer'>
                                <span className='Value'>Email</span>
                                <span className='Value2'>{profileData.email ? profileData.email : "Email"}</span>
                                {profileData.verified ? <span className='Value4'>Verified!</span>: <span className='Value3' onClick={verify}>{!loading ? "Click to verify!":"Loading..."}</span>}
                        </div>
                            
                    </div>
                    <div className='ProfileSubContainer'>
                        <div className='NameContainer'>
                                <span className='Value2' onClick={logout}>Logout</span>
                            </div>
                    </div>
                </div>
        </div>
       
      </div>
    </div>)
}

export default Profile