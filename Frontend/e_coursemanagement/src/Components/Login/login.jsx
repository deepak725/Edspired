import React from "react";
import "./login.css";
import { useState } from "react";
import de from "../../Images/4.gif";
import logo from "../../Images/Demo.png";
import logo2 from "../../Images/logo3.png";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerr,setEmailerr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSucess] = useState(false);
  const [combi,setCombi] = useState(false);
  async function submithandler(e)
  {
    e.preventDefault();
    console.log(email);
    console.log(password);
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch(
      "http://localhost:3001/user/login",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    console.log(data.message);

    if(response.status === 401)
    {
      setEmailerr(true);
      setLoading(false);
    }

    if(response.status === 201)
    {
        alert("login successfull!");
        setEmailerr(false);
        setSucess(true);
        setCombi(false);
        localStorage.setItem('token',data.message);

    }
    if(response.status === 400)
    {
      setCombi(true);
      setLoading(false);

    }
  }
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
            
          <form className="formclass" onSubmit={submithandler}>
         
                <input type={"email"} placeholder={"Enter your email!"} onChange={(e)=>{setEmail(e.target.value)}} className="text-field" required/>
               
                <input type={"password"} placeholder={"Enter your password!"} onChange={(e)=>{setPassword(e.target.value)}} className="text-field" required />
                {loading ? (
                <input
                  type={"submit"}
                  className="btn2"
                  value={"Login"}
                  disabled
                />
              ) : (
                <input type={"submit"} className="btn" value={"Login"} />
              )}
          </form>
          </div>
          {emailerr ? (
                <span className="errormsg">Email is not registered!</span>
              ) : (
                <></>
              )}
           {combi ? (
                <span className="errormsg">Wrong email and Password Combination!</span>
              ) : (
                <></>
              )}
           {success ? (
               <center> <span className="success">Login successfullyy🥳🥳</span></center>
              ) : (
                <></>
              )}
                 
          {loading && !success ? <span className="spin2"></span> : <></>}
         <center><p>Don't have an account ? <NavLink to={"/register"} style={{color:"blue"}} >Sign up</NavLink></p></center> 
        </div>
      </div>
    </div>
  );
};

export default Login;
