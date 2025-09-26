import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LogoDark } from "../../assets/images";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="col-md-6">
            <div className="footer-logo">
              <img src={LogoDark} alt="logo" loading="lazy" />
              <h4>{t("footer.workWithUs")}</h4>
              <Button className="btn btn-teal">{t("footer.inquiryBtn")}</Button>
            </div>
          </Col>
          <Col className="col-md-6">
            <div className="navigation">
              <h5>{t("footer.navigationTitle")}</h5>
              <ul>
                <li><Link to="/">{t("footer.navigation.home")}</Link></li>
                <li><Link to="/about">{t("footer.navigation.about")}</Link></li>
                <li><Link to="/service">{t("footer.navigation.services")}</Link></li>
                <li><Link to="/projects">{t("footer.navigation.projects")}</Link></li>
              </ul>
            </div>
            <div className="contact-link">
              <h5>{t("footer.contactTitle")}</h5>
              <ul>
                <li><Link to="tel:+18919891191">{t("footer.contact.phone")}</Link></li>
                <li><Link to="mailto:hello@logoipsum.com">{t("footer.contact.email")}</Link></li>
                <li><Link to="#">{t("footer.contact.address")}</Link></li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="footer-bottom">
          <p className="copy-text">{t("footer.copyright")}</p>
          <ul className="social-media">
            <li><Link to="www.facebook.com"><i className="bi bi-facebook"></i></Link></li>
            <li><Link to="www.instagram.com"><i className="bi bi-instagram"></i></Link></li>
            <li><Link to="www.twitter.com"><i className="bi bi-twitter"></i></Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
