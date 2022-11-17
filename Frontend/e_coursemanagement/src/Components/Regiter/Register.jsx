import React from 'react'
import './register.css'

import logo2 from "../../Images/logo3.png";
import logo from "../../Images/Demo.png";
import de from "../../Images/1.gif";
import { NavLink } from 'react-router-dom';
const Register = () => {
  return (
    <div className='register-main'>
        <div className='register-left'>
          
        <div className="register-form-layout">
            <div className="register-form-layout2">

            <div className="register-form-layout-inner">
          <input type={"image"} src={logo2} alt="logo3" />
           <center> <label className="register-form-title">Hello!</label></center>
            </div>
            <form className="register-formclass">

                <input type={"text"} placeholder={"Enter your first name!"} className="text-field2" />
                <input type={"text"} placeholder={"Enter your last name!"} className="text-field2" />
                <input type={"email"} placeholder={"Enter your email!"} className="text-field2"/>
                <div className='radiodiv'><input type={"radio"} name={"Gender"} id={"male"} value={"Male"} /> <label htmlFor='male'>Male</label>
                <input type={"radio"} name={"Gender"} value={"Female"} />Female
                <input type={"radio"} name={"Gender"} value={"Others"} /> Others
                </div>
                <input type={"password"} placeholder={"Enter your password!"} className="text-field2" />
                <input type={"password"} placeholder={"Re-Enter your password!"} className="text-field2" />
                <input type={"submit"} className="btn" value={"Register"}/>
          
          </form>
            </div>
            <br></br>
            <center><p>Already have an account ? <NavLink to={"/login"} style={{color:"blue"}} >Sign in</NavLink></p></center> 

            </div>
            
        </div>
        <div className='register-right'>
          
            <div className='logo-div'>
        <input type={"image"} src={logo} alt="logo" style={{"float":"left"}} className="register-logo" />
            </div>
        <input
          type={"image"}
          src={de}
          alt="login-image"
          className="register-image"
        />
        </div>
    </div>
  )
}

export default Register