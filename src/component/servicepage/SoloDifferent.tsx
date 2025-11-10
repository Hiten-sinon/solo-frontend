import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchSoloDifferent } from "../../redux/slice/servicepage/soloDifferentSlice";
import type { SoloDifferentItem } from "../../redux/slice/servicepage/soloDifferentSlice";

const SoloDifferent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, solodifferentloading, error } = useSelector(
    (state: RootState) => state.soloDifferent
  );

  useEffect(() => {
    dispatch(fetchSoloDifferent());
  }, [dispatch]);

  if (solodifferentloading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const mainService = data.find((item) => item.type === "main_service");
  const subServices = data.filter((item) => item.type === "sub_service");

  return (
    <section className="solo-different">
      <Container>
        {mainService && (
          <div className="solo-different-content">
            <img
              src={mainService.images_url}
              alt="solo-different"
              loading="lazy"
            />
            <div className="solo-different-text">
              <h2>{mainService.title_en}</h2>
            </div>
          </div>
        )}

        <div className="solo-different-list">
          <Row>
            {subServices.map((service: SoloDifferentItem) => (
              <Col lg={4} md={6} sm={12} key={service.id}>
                <div className="solo-different-list-item">
                  <div className="solo-different-list-item-icon">
                    <img
                      src={service.images_url}
                      alt={service.title_en}
                      loading="lazy"
                    />
                  </div>
                  <div className="solo-different-list-item-text">
                    <h3>{service.title_en}</h3>
                    <p>{service.description_en}</p>
                  </div>
                </div>
              </Col>
            ))}
            <Col md={12}>
              <div className="solo-different-list-btn">
                <Button className="btn btn-teal">Inquiry form</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default SoloDifferent;
