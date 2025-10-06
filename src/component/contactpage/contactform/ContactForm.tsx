import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Border } from "../../../assets/images";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { submitContactForm } from "../../../redux/slice/contactpage/contactFormSlice";

const ContactForm: React.FC = () => {
  const { data } = useSelector((state: RootState) => state.contactBanner);
  const { loading, success, error } = useSelector((state: RootState) => state.contactForm);

  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email_address: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
  };

  return (
    <section className="contact-form">
      <Container>
        <div className="contact-title">
          <h2>
            {data?.contact_form_title_en}
            <i className="bi bi-arrow-right-circle"></i>
          </h2>
        </div>
        <div className="contact-inputs">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email_address"
                    value={formData.email_address}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="ControlTextarea1">
                  <Form.Label>Message</Form.Label>
                  <div className="form-textarea position-relative">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <img src={Border} alt="coman " />
                  </div>
                </Form.Group>
              </Col>
              <Col md={12} className="het-right">
                <Button type="submit" className="btn btn-teal" disabled={loading}>
                  {loading ? "Sending..." : "Send"}
                </Button>
              </Col>
              <Col md={12}>
                {success && <p className="text-success mt-2">Message sent successfully!</p>}
                {error && <p className="text-danger mt-2">{error}</p>}
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;
