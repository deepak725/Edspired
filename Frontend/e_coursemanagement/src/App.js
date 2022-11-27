import './App.css';
import Login from './Components/Login/login';
import Register from './Components/Regiter/Register';
import Home from './Components/Home/home';
import { Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
// import React,{useState,useEffect } from 'react';
// import jwt_decode from "jwt-decode";
function App() {
  
  
  // const [passuser,setUser] = useState(false);
  // useEffect(() => {
  //   if(localStorage)
  //   {
  //     const token = localStorage.getItem('token')
  //     // console.log(token);
  //     if (token) {
  //       const user = jwt_decode(token)
  //       if (!user) {

  //         localStorage.removeItem('token')
  //         setUser(false);
  //       } else {
  //         // populateQuote()
  //         setUser(true);
  //         console.log(user);
  //         console.log(passuser);
  //       }
  //     }
  // }
	// },[passuser])
  
  
 

  return (

    <div className="App">
    <Routes>
            <Route path="/" element={<Home />} />
          
                  <Route path='/dashboard' element={<Dashboard  />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />      
                      
    </Routes>
    </div>
  );
}

export default App;
