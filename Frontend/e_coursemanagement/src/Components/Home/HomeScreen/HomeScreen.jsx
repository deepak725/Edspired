import React from 'react'
import himg from '../../../Images/2.gif'
import './HomeScreen.css'

import { NavLink } from 'react-router-dom';
const HomeScreen = () => {
  return (
    
    <div className='Homescreen'>    
        <div className='Homescreen-image'>
            <input type={"image"} src={himg} alt={"HImage"} />
        </div>
        <div className='Homescreen-text'>
            <p> <span className='span-title '>A New Way To Get Inspired.</span>
                <br></br> 
            <span className='span-title2'>Edspired is your all-in-one place for  teaching and learning.Our easy-to-use and secure tool helps educators manage,measure, and enrich learning experiences.</span></p>
            <span><NavLink to={"/register"}><input className='span-buton' type={"submit"} value={"Create Account >"} /></NavLink></span>
            
        
        </div>
        
    </div>
  )
}

export default HomeScreen