import React,{useEffect,useState} from 'react'
import './DashboardClasses.css'
import jwt_decode from "jwt-decode"
import Course from './Course/Course';
import CourseIns from './Course/CourseIns';

const DashBoardClasses = () => {

    const [classData,setClassData] = useState([]);
    
    const [EnrollData,setEnrollData] = useState([]);
    const [change,setChange] = useState(true);

    async function enrolled()
    {
        const token = localStorage.getItem('token')
        // console.log(token);
            if (token) {
                var user = jwt_decode(token)
                
                    console.log(user.id)
                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token }),
                      };
                      const response = await fetch(
                        `http://localhost:3001/course/getAll/${user.id}`,
                        requestOptions
                      );
                      const data = await response.json();
                      console.log(data.data);
                      setEnrollData(data.data);
                        // console.log(classData)
                    }    
    }
    
    async function created()
    {
        const token = localStorage.getItem('token')
        // console.log(token);
            if (token) {
                var user = jwt_decode(token)
                
                    console.log(user.id)
                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token }),
                      };
                      const response = await fetch(
                        `http://localhost:3001/course/getAll/created/${user.id}`,
                        requestOptions
                      );
                      const data = await response.json();
                      console.log(data.data);
                        setClassData(data.data);
                        // console.log(classData)
                    }    
    }
    useEffect(()=>{
        // console.log(.id);
        
        enrolled()
    },[])
   
    return (
    <div className='DashBoardClasses'>

       <div className='DashboardFirstHalf'>
       <span className='classText'>Your classes</span>
       </div>
       <div className='class-categories'>
        <div className={change ? 'category':'category2'} onClick={()=>{
                enrolled()
                setChange(!change)
        }}>
                Classes Enrolled In!
        </div>
        <div className={!change ? 'category':'category2'} onClick={()=>{
                created()
                setChange(!change)
        }}>
                Classes you created!
                
        </div>
       </div>
        <div className='DashBoardAllClasses' >
          
            {
             
             change ? EnrollData.length === 0 ?<> Classes Not found </>  :
             EnrollData.map((obj,index)=>{
                return <Course data={obj}  key={index} id={obj._id} />
              }) :
               classData.length === 0 ?<> Classes Not found </>  :
               classData.map((obj,index)=>{
                  return <CourseIns data={obj}  key={index} id={obj._id} />
                })
            }
       
            
        </div>

    </div>
  )
}

export default DashBoardClasses