import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import {
  submitInquiryForm,
  resetInquiryState,
} from "../redux/slice/contactpage/contactFormSlice";
import Loader from "../component/loader/Loader";

const Careerpage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, success, error } = useSelector(
    (state: RootState) => state.contactForm
  );

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email_address: "",
    message: "",
    cv: null,
  });

  useEffect(() => {
    if (success) {
      setFormData({
        name: "",
        phone_number: "",
        email_address: "",
        message: "",
        cv: null,
      });

      setTimeout(() => {
        dispatch(resetInquiryState());
      }, 3000);
    }
  }, [success, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      setFormData({ ...formData, cv: e.target.files?.[0] || null });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("phone_number", formData.phone_number);
    data.append("email_address", formData.email_address);
    data.append("message", formData.message);
    data.append("type", "career");

    if (formData.cv) {
      data.append("cv", formData.cv); // ✅ VERY IMPORTANT
    }

    dispatch(submitInquiryForm(data));
  };

  if (loading) return <Loader />;

  return (
    <section className="career-form">
      <Container>
        <div className="title">
          <h2>{t("Career.title")}</h2>
        </div>

        <div className="contact-inputs">
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Name */}
              <Col md={6}>
                <Form.Group
                  className="mb-3 "
                  data-aos="fade-up"
                  controlId="Name"
                >
                  <Form.Label>{t("Career.career_form.Name")}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={
                      t("Career.career_form.Placeholder.Name") ||
                      "Enter your name"
                    }
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* Phone */}
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  data-aos="fade-up"
                  controlId="Phone"
                >
                  <Form.Label>{t("Career.career_form.Phone")}</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder={
                      t("Career.career_form.Placeholder.Phone") ||
                      "Enter your phone number"
                    }
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* Email */}
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  data-aos="fade-up"
                  controlId="Email"
                >
                  <Form.Label>{t("Career.career_form.Email")}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={
                      t("Career.career_form.Placeholder.Email") ||
                      "Enter your email"
                    }
                    name="email_address"
                    value={formData.email_address}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    {t("We'll never share your email with anyone else.") ||
                      "We'll never share your email with anyone else."}
                  </Form.Text>
                </Form.Group>
              </Col>

              {/* Message */}

              <Col md={6}>
                <Form.Group
                  controlId="Message"
                  className="mb-3"
                  data-aos="fade-up"
                >
                  <Form.Label>{t("Career.career_form.Position")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      t("Career.career_form.Placeholder.Position") ||
                      "Enter your Position"
                    }
                  />
                </Form.Group>
              </Col>
              {/* Upload CV */}
              <Col md={12}>
                <Form.Group
                  controlId="CV"
                  className="mb-3"
                  data-aos="fade-up"
                >
                  <Form.Label>{t("Career.career_form.UploadCV") || "Upload CV"}</Form.Label>
                  <Form.Control
                    type="file"
                    name="cv"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              {/* Submit Button */}
              <Col md={12}>
                <Button type="submit" className="btn btn-teal">
                  {loading ? t("submitting...") : t("Submit")}
                </Button>
              </Col>
              {success && (
                <Col md={12} className="text-success mt-3">
                  {t("Application submitted successfully!")}
                </Col>
              )}

              {error && (
                <Col md={12} className="text-danger mt-3">
                  {error}
                </Col>
              )}
            </Row>
          </Form>
        </div>
      </Container>
    </section>
  );
};

export default Careerpage;
