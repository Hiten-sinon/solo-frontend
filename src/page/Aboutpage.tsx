import React from 'react'
import AboutBanner from '../component/aboutpage/aboutbanner/AboutBanner'
import Partnership from '../component/aboutpage/partnership/Partnership'
import AboutCounter from '../component/aboutpage/aboutcounter/AboutCounter'
import Team from '../component/homepage/teams/Team'
import Testimonial from '../component/aboutpage/testimonial/Testimonial'

const Aboutpage: React.FC = () => {
  return (
    <>
        <AboutBanner />
        <Partnership />
        <AboutCounter />
        <Team />
        <Testimonial />        
    </>
  )
}

export default Aboutpage
