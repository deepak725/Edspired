import React from "react";
import "./login.css";
import de from "../../Images/4.gif";
import logo from "../../Images/Demo.png";
import logo2 from "../../Images/logo3.png";
import { NavLink } from "react-router-dom";
const Login = () => {
  return (
    <div className="login-main">
      <div className="login-left">
        <input type={"image"} src={logo} alt="logo" className="logo" />
      <input
          type={"image"}
          src={de}
          alt="login-image"
          className="login-image"
        />
      </div>
      <div className="login-right">
        <div className="form-layout">
            <div className="form-layout2">

            <div className="form-layout-inner">
          <input type={"image"} src={logo2} alt="logo3" />
            <label className="form-title">Hello Again!</label>
            </div>
            
          <form className="formclass">
            
                <input type={"email"} placeholder={"Enter your email!"} className="text-field"/>
                <input type={"password"} placeholder={"Enter your password!"} className="text-field" />
                <input type={"submit"} className="btn" value={"Login"}/>
          
          </form>
          </div>
          
         <center><p>Don't have an account ? <NavLink to={"/register"} style={{color:"blue"}} >Sign up</NavLink></p></center> 
        </div>
      </div>
    </div>
  );
};

export default Login;
