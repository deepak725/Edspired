import React from 'react'
import './EnrolledClassHead.css'
import logo from '../../../../Images/Demo.png'
import profile from '../../../../Images/user.png'
import settings from '../../../../Images/settings.png'

const EnrolledClassHead = ({isInstructor}) => {
  return (
    <div className='EnrolledClassHead'>
            <div className='EnrolledClassHeadLogo'>
                <input type={"image"} src={logo}  alt={"Logo"} />
            </div>
            <div className='EnrolledClassHeadMenu'>
                {/* <div>Setting</div> */}
                {isInstructor ? <div className='EnrolledSubclass'>
                    <input type={"image"} src={settings} alt={"Profile"} />
                 </div> : null}
                <div className='EnrolledSubclass'>
                    <input type={"image"} src={profile} alt={"Profile"} />
                 </div>
            </div>
    </div>

  )
}

export default EnrolledClassHead