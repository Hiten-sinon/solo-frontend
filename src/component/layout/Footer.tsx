import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LogoDark } from "../../assets/images";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="col-md-6">
            <div className="footer-logo">
              <img src={LogoDark} alt="logo" />
              <h4>Want to work With Us!</h4>
              <Button className="btn btn-teal">Inquiry Forum</Button>
            </div>
          </Col>
          <Col className="col-md-6">
            <div className="navigation">
              <h5>Navigation</h5>
              <ul>
                <li>
                  <Link to="">Home</Link>
                </li>
                <li>
                  <Link to="">About</Link>
                </li>
                <li>
                  <Link to="">Services</Link>
                </li>
                <li>
                  <Link to="">projects</Link>
                </li>
              </ul>
            </div>
            <div className=" contact-link">
              <h5>Contact us</h5>
              <ul>
                <li>
                  <Link to="tel:+1 891 989-11-91">+1 891 989-11-91</Link>
                </li>
                <li>
                  <Link to="mailto:hello@logoipsum.com">
                    hello@logoipsum.com
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    2972 Westheimer Rd. Santa Ana, Illinois 85486
                  </Link>{" "}
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="footer-bottom">
          <p className="copy-text">© 2025 Copyright</p>
          <ul className="social-media">
            <li>
              <Link to="www.facebook.com"><i className="bi bi-facebook"></i></Link>
            </li>
            <li>
              <Link to="www.instagram.com"><i className="bi bi-instagram"></i></Link>
            </li>
            <li>
              <Link to="www.twitter.com"><i className="bi bi-twitter"></i></Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
