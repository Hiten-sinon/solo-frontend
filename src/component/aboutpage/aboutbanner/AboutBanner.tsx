import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Abanner } from '../../../assets/images'

const AboutBanner = () => {
    return (
        <section className='about-banner'>
            <Container>
                <div className='ab-info'>
                    <div className='about-image'>
                        <img src={Abanner} alt="About Us" loading="lazy" />
                    </div>
                    <div className='about-text'>
                        <h1>20+ years<br/> of in field experience</h1>
                    </div>
                    <div className='about-btn'>
                        <h5>OUR CORE VALUES</h5>
                    </div>
                </div>

            </Container>
        </section>
    )
}

export default AboutBanner
