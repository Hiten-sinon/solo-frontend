import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { AbFour, AbOne, AbThree, AbTwo } from '../../../assets/images'

const Partnership = () => {
    return (
        <section className='partnership'>
            <Container>
                <div className='partnership-text'>
                    <Row>
                        <Col lg={3}>
                            <div className='partner-box'>
                                <div className='partner-image'>
                                    <img src={AbOne} alt="Partner 1" loading="lazy" />
                                </div>
                                <h3>Real partnership</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='partner-box'>
                                <div className='partner-image'>
                                    <img src={AbTwo} alt="Partner 1" loading="lazy" />
                                </div>
                                <h3>Innovation</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='partner-box'>
                                <div className='partner-image'>
                                    <img src={AbThree} alt="Partner 1" loading="lazy" />
                                </div>
                                <h3>Time consistent</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className='partner-box'>
                                <div className='partner-image'>
                                    <img src={AbFour} alt="Partner 1" loading="lazy" />
                                </div>
                                <h3>Environmental </h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default Partnership
