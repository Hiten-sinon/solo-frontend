import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Border } from '../../../assets/images';

const ContactForm = () => {
    return (
        <section className="contact-form">
            <Container>
                <div className='contact-title'>
                    <h2>Send us a message and we will reach<br /> out as soon as possible <i className="bi bi-arrow-right-circle"></i></h2>
                </div>
                <div className='contact-inputs'>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="Name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="number" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col md={12}>
                                <Form.Group controlId="ControlTextarea1">
                                    <Form.Label>Message</Form.Label>
                                    <div className='form-textarea position-relative'>
                                        <Form.Control as="textarea" rows={4} />
                                        <img src={Border} alt='coman ' />
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col md={12} className='het-right'>
                                <Button className="btn btn-teal">Send</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Container>
        </section>
    )
}

export default ContactForm
