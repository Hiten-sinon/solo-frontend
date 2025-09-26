import React from 'react'
import { Container } from 'react-bootstrap'
import { CtBanner } from '../../../assets/images'

const ContactBanner = () => {
    return (
        <section className="contact-banner">
            <Container>
                <div className='ct-info'>
                    <div className='ct-image'>
                        <img src={CtBanner} alt="About Us" loading="lazy" />
                    </div>
                    <div className='ct-text'>
                        <h1>Every project<br/> start with a plan</h1>
                    </div>
                    <div className='ct-right'>
                        <h3>What service we can support you with?</h3>
                        <ul>
                            <li>Constructions</li>
                            <li>Design</li>
                            <li>Finishes</li>
                        </ul>
                        <p>We can help you with what ever you need</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default ContactBanner
