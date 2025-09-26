import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SoloDifferentImg from "../../assets/images/feauture.webp";
import Communication from "../../assets/images/Communication.svg";
import Eye from "../../assets/images/Eye.svg";
import Gear from "../../assets/images/Gear.svg";
const SoloDifferent: React.FC = () => {
  return (
    <section className="solo-different">
      <Container>
        <div className="solo-different-content">
          <img src={SoloDifferentImg} alt="solo-different" loading="lazy" />
          <div className="solo-different-text">
            <h2>
              What makes
              <br />
              Solo different
            </h2>
          </div>
        </div>
        <div className="solo-different-list">
          <Row>
            <Col lg={4} md={6} sm={12}>
              <div className="solo-different-list-item">
                <div className="solo-different-list-item-icon">
                  <img
                    src={Communication}
                    alt="open-communication"
                    loading="lazy"
                  />
                </div>
                <div className="solo-different-list-item-text">
                  <h3>Open Communication</h3>
                  <p>
                    We value transparency and clear communication with our
                    clients, ensuring you understand every step of the process.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <div className="solo-different-list-item">
                <div className="solo-different-list-item-icon">
                  <img src={Gear} alt="open-communication" loading="lazy" />
                </div>
                <div className="solo-different-list-item-text">
                  <h3>Practical experience</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <div className="solo-different-list-item">
                <div className="solo-different-list-item-icon">
                  <img src={Eye} alt="open-communication" loading="lazy" />
                </div>
                <div className="solo-different-list-item-text">
                  <h3>urban vision</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <div className="solo-different-list-item">
                <div className="solo-different-list-item-icon">
                  <img
                    src={Communication}
                    alt="open-communication"
                    loading="lazy"
                  />
                </div>
                <div className="solo-different-list-item-text">
                  <h3>Open Communication</h3>
                  <p>
                    We value transparency and clear communication with our
                    clients, ensuring you understand every step of the process.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <div className="solo-different-list-item">
                <div className="solo-different-list-item-icon">
                  <img src={Gear} alt="open-communication" loading="lazy" />
                </div>
                <div className="solo-different-list-item-text">
                  <h3>Practical experience</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <div className="solo-different-list-item">
                <div className="solo-different-list-item-icon">
                  <img src={Eye} alt="open-communication" loading="lazy" />
                </div>
                <div className="solo-different-list-item-text">
                  <h3>urban vision</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={12}>
            <div className="solo-different-list-btn">
              <Button className="btn btn-teal">Inquiry forum</Button>
            </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default SoloDifferent;
