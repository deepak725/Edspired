import React from 'react'
import './NavBar.css'

import logo from "../../../Images/Demo.png";
import account from "../../../Images/account.svg"

import { NavLink } from 'react-router-dom';
const NavBar = () => {
  return (
    <div className='NavBar'>
       
        <div className='NavBar-logo'>
            <input type={"image"} src={logo} alt={"logo"}/>
        </div>
        <div className='NavBar-items'>

            <a href='#feature'>Features</a> 
            <a href='#aboutus'>Team</a>
              <div className='NavBar-items2'>
              <input type={"image"} style={{width:"24px",height:"27px",top:"31px"}} alt={"account logo"} src={account} />
              <a href='/login'><NavLink to={"/login"}>Sign-In</NavLink></a>
              </div>
        </div>

    </div>
  )
}

export default NavBar