import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../redux/slice/servicepage/servicescardSlice";
import type { RootState, AppDispatch } from "../../redux/store";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";

const ServiceCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { i18n, t } = useTranslation();

  const isArabic = i18n.language === "ar";

  const { items: services, servicecardloading, error } = useSelector(
    (state: RootState) => state.servicescard
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (servicecardloading) {
    return <Loader />;
  }

  return (
    <section
      className={`service-card ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        {error && <p className="text-danger text-center">{error}</p>}

        <Row>
          {Array.isArray(services) && services.length > 0 ? (
            services.map((service) => (
              <Col key={service.id} md={6} lg={4} className="mb-4">
                <div className="service-card-item">
                  <div className="service-image">
                    <img
                      src={service.images_url}
                      alt={
                        isArabic
                          ? service.title_ar || service.title_en
                          : service.title_en
                      }
                      className="img-fluid"
                      loading="lazy"
                    />
                  </div>

                  <div className="service-card-content">
                    <h3>
                      {isArabic
                        ? service.title_ar || service.title_en
                        : service.title_en}
                    </h3>
                    <p>
                      {isArabic
                        ? service.discription_ar || service.discription_en
                        : service.discription_en}
                    </p>

                    <div className="service-card-link">
                      <Link to="#">
                        <i
                          className={`bi ${
                            isArabic ? "bi-arrow-left" : "bi-arrow-right"
                          }`}
                        ></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <p className="text-center">
              {t("Services.no_services") || "No services available"}
            </p>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default ServiceCard;
