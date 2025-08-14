import React from 'react'
import { Dreams } from '../../../assets/images'

const Dream = () => {
  return (
    <section className='dream'>
        <div className='dream-image'>
            <img src={Dreams} alt="dream photo"/>
        </div>
        <div className='dream-text'>
            <h3>Your Dream Building Awaits!</h3>
        </div>
    </section>
  )
}

export default Dream
