import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ServiceCardImg from "../../assets/images/servicecard-img.jpg";
const ServiceCard: React.FC = () => {
  return (
    <section className="service-card">
      <Container>
        <Row>
          <Col md={12} lg={4}>
            <div className="service-card-item">
              <img src={ServiceCardImg} alt="servicecard-img" />
              <div className="service-card-content">
                <h3>Construction Work</h3>
                <p>
                  Construction work is a type of construction work that involves
                  the construction of buildings, bridges, roads, and other
                  structures.
                </p>
                <div className="service-card-link">
                  <Link to="#">
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
          <Col md={12} lg={4}>
            <div className="service-card-item">
              <img src={ServiceCardImg} alt="servicecard-img" />
              <div className="service-card-content">
                <h3>Construction Work</h3>
                <p>
                  Construction work is a type of construction work that involves
                  the construction of buildings, bridges, roads, and other
                  structures.
                </p>
                <div className="service-card-link">
                  <Link to="#">
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
          <Col md={12} lg={4}>
            <div className="service-card-item">
              <img src={ServiceCardImg} alt="servicecard-img" />
              <div className="service-card-content">
                <h3>Construction Work</h3>
                <p>
                  Construction work is a type of construction work that involves
                  the construction of buildings, bridges, roads, and other
                  structures.
                </p>
                <div className="service-card-link">
                  <Link to="#">
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ServiceCard;
