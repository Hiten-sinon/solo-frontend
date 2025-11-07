import React from 'react'
import Banner from '../component/homepage/banner/Banner'
import Feature from '../component/homepage/feature/Feature'
import Number from '../component/homepage/counter/Number'
import Dream from '../component/homepage/dreambanner/Dream'
import Team from '../component/homepage/teams/Team'
import Partner from '../component/homepage/partners/Partner'

const Homepage: React.FC = () => {
  return (
    <div>
       <Banner />
       <Feature />
       <Number />
       <Dream />
       <Team />
       <Partner />
    </div>
  )
}

export default Homepage
