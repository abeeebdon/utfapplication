import React, { useState } from 'react'
import SectionOne from './Landing/SectionOne'
import SectionTwo from './Landing/SectionTwo'
import SectionThree from './Landing/SectionThree'
import SectionFour from './Landing/SectionFour'
import SectionFive from './Landing/SectionFive'
import Navbar from './Landing/Navbar'
import SectionSix from './Landing/SectionSix'
import SectionSeven from './Landing/SectionSeven'



const LandingPage = () => {
    return (
        <main className='landing'>
            <Navbar />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <SectionSix />
            <SectionSeven />
        </main>
    )
}

export default LandingPage