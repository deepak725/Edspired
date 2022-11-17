import React from 'react'
import './Aboutus.css'
import team from "../../../Images/team.gif";
import male from "../../../Images/boys.gif"
import female from "../../../Images/girls.gif"

const Aboutus = () => {
  return (
    <div id='aboutus'>
        <div className='aboutus1'></div>
        {/* <span></span> */}
        <span className='aboutus2'></span>
        <div className='aboutus3'>
                <input type={"image"} src={team}  alt={"team"} />
        </div>
        <div className='aboutus4'>
            <div className='aboutus5'>
                <input type={"image"} src={male} alt={"user img"} />
                <span className='user-text'>Jimmy Thakkar</span>
            </div>
            <div className='aboutus5'>
                <input type={"image"} src={female} alt={"user img"} />
                <span className='user-text'>Naju Shah</span>
            </div>
            <div className='aboutus5'>
                <input type={"image"} src={male} alt={"user img"} />
                <span className='user-text'>Devam Panchasara</span>
            </div>
            <div className='aboutus5'>
                <input type={"image"} src={female} alt={"user img"} />
                <span className='user-text'>Darshi Desai</span>
            </div>
            <div className='aboutus5'>
                <input type={"image"} src={male} alt={"user img"} />
                <span className='user-text'>Deepak Dadlani</span>
            </div>
            <div className='aboutus5'>
                <input type={"image"} src={female} alt={"user img"} />
                <span className='user-text'>Nisha Shah</span>
            </div>
        </div>
        
    </div>
  )
}

export default Aboutus