import React from "react";
import "./register.css";
import { useState } from "react";
import logo2 from "../../Images/logo3.png";
import logo from "../../Images/Demo.png";
import de from "../../Images/1.gif";
import { NavLink } from "react-router-dom";
const Register = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [servererr, setServererr] = useState(false);
  const [success, setSuccess] = useState(false);

  // const [errormsg,seterrormsg] = useState("normal");
  async function submithandler(event) {
    event.preventDefault();
    console.log(firstname, lastname, email, password, password2, gender);
    console.log(password.normalize() === password2.normalize());
    if (password.normalize() === password2.normalize()) {
      // true
      setError(false);
      setLoading(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstname, lastname, password, gender }),
      };
      const response = await fetch(
        "http://localhost:3001/user/register",
        requestOptions
      );
      const data = await response.json();
      console.log(data);

      if (response.status === 500) {
        setServererr(true);
        setLoading(false);
      }
      if (response.status === 201) {
        setSuccess(true);
        setServererr(false);
        // localStorage.setItem('token', response.message)
      }
      
    } else {
      setError(true);
    }
  }

  return (
    <div className="register-main">
      <div className="register-left">
        <div className="register-form-layout">
          <div className="register-form-layout2">
            <div className="register-form-layout-inner">
              <input type={"image"} src={logo2} alt="logo3" />
              <center>
                {" "}
                <label className="register-form-title">Hello!</label>
              </center>
            </div>
            <form className="register-formclass" onSubmit={submithandler}>
              <input
                type={"text"}
                placeholder={"Enter your first name!"}
                className="text-field2"
                onChange={(e) => {
                  setfirstname(e.target.value);
                }}
                required
              />
              <input
                type={"text"}
                placeholder={"Enter your last name!"}
                className="text-field2"
                onChange={(e) => {
                  setlastname(e.target.value);
                }}
                required
              />
              <input
                type={"email"}
                placeholder={"Enter your email!"}
                className="text-field2"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              {servererr ? (
                <span className="errormsg">Email already exists!</span>
              ) : (
                <></>
              )}
              <div className="radiodiv">
                <input
                  type={"radio"}
                  name={"Gender"}
                  id={"male"}
                  value={"Male"}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  required
                />{" "}
                <label htmlFor="male">Male</label>
                <input
                  type={"radio"}
                  name={"Gender"}
                  value={"Female"}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  required
                />
                Female
                <input
                  type={"radio"}
                  name={"Gender"}
                  value={"Others"}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />{" "}
                Others
              </div>
              <input
                type={"password"}
                minLength={"8"}
                placeholder={"Enter your password!"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="text-field2"
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                required
              />
              <input
                type={"password"}
                placeholder={"Re-Enter your password!"}
                className="text-field2"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                required
              />
              {error ? (
                <span className="errormsg">Please enter same password!</span>
              ) : (
                <></>
              )}

              {loading ? (
                <input
                  type={"submit"}
                  className="btn2"
                  value={"Register"}
                  disabled
                />
              ) : (
                <input type={"submit"} className="btn" value={"Register"} />
              )}
              {loading && !success ? <span className="spin"></span> : <></>}
            </form>
          </div>
          <br></br>
          <center>
            <p>
              {success ? (
                <span className="success">
                  {" "}
                  Registered successfullyy🥳🥳{" "}
                  <NavLink to={"/login"} style={{ color: "blue" }}>
                    Please click here to login.
                  </NavLink>{" "}
                </span>
              ) : (
                <>
                  Already have an account ?{" "}
                  <NavLink to={"/login"} style={{ color: "blue" }}>
                    Sign in
                  </NavLink>
                </>
              )}{" "}
            </p>
          </center>
        </div>
      </div>
      <div className="register-right">
        <div className="logo-div">
          <input
            type={"image"}
            src={logo}
            alt="logo"
            style={{ float: "left" }}
            className="register-logo"
          />
        </div>
        <input
          type={"image"}
          src={de}
          alt="login-image"
          className="register-image"
        />
      </div>
    </div>
  );
};

export default Register;
