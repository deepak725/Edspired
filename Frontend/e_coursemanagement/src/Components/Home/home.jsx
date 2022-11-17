import React from 'react'
import './home.css'
import NavBar from './NavBar/NavBar'
import HomeScreen from './HomeScreen/HomeScreen'
import FeatureScreen from './FeatureScreen/FeatureScreen'
import Aboutus from './AboutUS/Aboutus'
import Footer from './Footer/Footer'
const Home = () => {
  return (
    <div className='home'>
        <NavBar/>
        <HomeScreen />
        <FeatureScreen />
        <Aboutus />
        <Footer />
    </div>
  )
}

export default Home