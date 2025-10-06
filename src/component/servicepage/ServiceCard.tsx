import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../redux/slice/servicepage/servicescardSlice";
import type { RootState, AppDispatch } from "../../redux/store";

const ServiceCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: services, loading, error } = useSelector(
    (state: RootState) => state.servicescard
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <section className="service-card">
      <Container>
        {loading && <p>Loading services...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Row>
          {services.map((service) => (
            <Col key={service.id} md={12} lg={4}>
              <div className="service-card-item">
                <img src={service.images_url} alt={service.title_en} />
                <div className="service-card-content">
                  <h3>{service.title_en}</h3>
                  <p>{service.discription_en}</p>
                  <div className="service-card-link">
                    <Link to="#">
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ServiceCard;
