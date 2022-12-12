import React, { useState } from "react";
import "./EnrolledClassBody.css";
import tasks from "../../../../Images/tasks.png";
// import quiz from "../../../../Images/quiz.png";
import info from "../../../../Images/info.png";
import poll from "../../../../Images/poll.png";
import material from "../../../../Images/material.png";
import announcement from "../../../../Images/announcement.png";
import student from "../../../../Images/student.png";
import Poll from "../ClassAcivities/Poll/Poll";
import Task from "../ClassAcivities/Task/Task";
import Material from "../ClassAcivities/Material/Material";
import Announcement from "../ClassAcivities/Announcement/Announcement";
import { useEffect } from "react";
import Students from "../ClassAcivities/Students/Students";
// const Comp1 = () => {

       
//      return (
//        <div className="first">
//          {/* <h1>{isInstructor ? "YEs":"No"}</h1> */}
//                 Hello
//        </div>
//      );
//    };


   
  

const EnrolledClassBody = () => {
  
        const Components = {
                1: ()=>Task,
                2: ()=>Poll ,
                3: ()=>Announcement,
                4: ()=>Material,
                5: ()=>Students
              };
  
              const [Comp, setComp] = useState(Components[1]);
  useEffect(()=>{
        console.log("Enrolled")
  },[])
  
  // const Comp = Components[1]

  return (
    <div className="EnrolledClassBody">
      <div className="ClassMenu">
        <div
          className="subclassmenu"
          onClick={(e) => {
            e.preventDefault();
            setComp(Components[1]);
          }}
        >
          <div className="subclassmenu-icon">
            <input type={"image"} alt={"image"} src={tasks} />
          </div>
          <div className="subclassmenu-text">Tasks</div>
        </div>
        <div
          className="subclassmenu"
          onClick={(e) => {
            e.preventDefault();
            setComp(Components[2]);
          }}
        >
          <div className="subclassmenu-icon">
            <input type={"image"} alt={"image"} src={poll} />
          </div>
          <div className="subclassmenu-text">Poll</div>
        </div>
        {/* <div className="subclassmenu">
          <div className="subclassmenu-icon">
            <input type={"image"} alt={"image"} src={quiz} />
          </div>
          <div className="subclassmenu-text">Quiz</div>
        </div> */}
        <div className="subclassmenu" onClick={(e) => {
            e.preventDefault();
            setComp(Components[3]);
          }}>
          <div className="subclassmenu-icon">
            <input type={"image"} alt={"image"} src={announcement} />
          </div>
          <div className="subclassmenu-text">Announcements</div>
        </div>
        <div className="subclassmenu" onClick={(e) => {
            e.preventDefault();
            setComp(Components[5]);
          }}>
          <div className="subclassmenu-icon">
            <input type={"image"} alt={"image"} src={student} />
          </div>
          <div className="subclassmenu-text">Students</div>
        </div>
        <div className="subclassmenu"   onClick={(e) => {
            e.preventDefault();
            setComp(Components[4]);
          }}>
          <div className="subclassmenu-icon">
            <input type={"image"} alt={"image"} src={material} />
          </div>
          <div className="subclassmenu-text">Materials</div>
        </div>
        <div className="subclassmenu">
          <div className="subclassmenu-icon">
            <input type={"image"} alt={"image"} src={info} />
          </div>
          <div className="subclassmenu-text">Info</div>
        </div>
      </div>

      <div className="classBody">{<Comp/>}</div>
    </div>
  );
};
export default EnrolledClassBody;
