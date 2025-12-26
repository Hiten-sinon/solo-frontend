import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import {
  submitInquiryForm,
  resetInquiryState,
} from "../../../redux/slice/contactpage/contactFormSlice";
import Loader from "../../loader/Loader";
import { useTranslation } from "react-i18next";
import { Border } from "../../../assets/images";

const ContactForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { i18n, t } = useTranslation();

  const { loading, success, error } = useSelector(
    (state: RootState) => state.contactForm
  );
  const { data } = useSelector((state: RootState) => state.contactBanner);

  const isArabic = i18n.language === "ar";

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email_address: "",
    message: "",
  });

  useEffect(() => {
    if (success) {
      setFormData({
        name: "",
        phone_number: "",
        email_address: "",
        message: "",
      });

      setTimeout(() => {
        dispatch(resetInquiryState());
      }, 3000);
    }
  }, [success, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      submitInquiryForm({
        ...formData,
        type: "contact",
      })
    );
  };

  if (loading) return <Loader />;

  return (
    <section
      className={`contact-form ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        <div className="contact-title mb-4">
          <h2 data-aos={isArabic ? "fade-left" : "fade-right"}>
            {isArabic
              ? data?.contact_form_title_ar || data?.contact_form_title_en
              : data?.contact_form_title_en}
            <i className="bi bi-arrow-right-circle ms-2"></i>
          </h2>
        </div>

        <div className="contact-inputs">
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Name */}
              <Col md={4}>
                <Form.Group
                  className="mb-3"
                  controlId="Name"
                  data-aos="fade-up"
                >
                  <Form.Label>{t("Name")}</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("Enter your name") || "Enter your name"}
                  />
                </Form.Group>
              </Col>

              {/* Phone */}
              <Col md={4}>
                <Form.Group
                  className="mb-3"
                  controlId="Phone"
                  data-aos="fade-up"
                >
                  <Form.Label>{t("Phone")}</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder={
                      t("Enter your phone number") || "Enter your phone number"
                    }
                  />
                </Form.Group>
              </Col>

              {/* Email */}
              <Col md={4}>
                <Form.Group
                  className="mb-3"
                  controlId="Email"
                  data-aos="fade-up"
                >
                  <Form.Label>{t("Email")}</Form.Label>
                  <Form.Control
                    type="email"
                    name="email_address"
                    value={formData.email_address}
                    onChange={handleChange}
                    placeholder={t("Enter your email") || "Enter your email"}
                  />
                  <Form.Text className="text-muted">
                    {t("We'll never share your email with anyone else.") ||
                      "We'll never share your email with anyone else."}
                  </Form.Text>
                </Form.Group>
              </Col>

              {/* Message */}
              <Col md={12}>
                <Form.Group controlId="Message" data-aos="fade-up">
                  <Form.Label>{t("Message")}</Form.Label>
                  <div className="form-textarea position-relative">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={
                        t("Enter your message") || "Enter your message"
                      }
                    />
                    <img src={Border} alt="border design" />
                  </div>
                </Form.Group>
              </Col>

              {/* Submit */}
              <Col md={12} className="het-right">
                <Button
                  type="submit"
                  className="btn btn-teal"
                  disabled={loading}
                  data-aos="fade-up"
                >
                  {loading ? t("Sending...") : t("Send")}
                </Button>
              </Col>

              {/* Messages */}
              <Col md={12} className="text-center mt-3">
                {success && (
                  <p className="text-success">
                    {t("Message sent successfully!")}
                  </p>
                )}
                {error && <p className="text-danger">{error}</p>}
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;
