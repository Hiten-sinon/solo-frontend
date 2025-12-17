import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchSoloDifferent } from "../../redux/slice/servicepage/soloDifferentSlice";
import type { SoloDifferentItem } from "../../redux/slice/servicepage/soloDifferentSlice";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

const SoloDifferent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, solodifferentloading, error } = useSelector(
    (state: RootState) => state.soloDifferent
  );

  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    dispatch(fetchSoloDifferent());
  }, [dispatch]);

  // ✅ Initialize AOS (scroll animation)
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation speed
      easing: "ease-in-out",
      once: true, // run only once per element
      offset: 120,
    });
  }, []);

  if (solodifferentloading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const mainService = data.find((item) => item.type === "main_service");
  const subServices = data.filter((item) => item.type === "sub_service");

  // ✅ Click handler for Inquiry button
  const handleInquiryClick = () => {
    window.open("/inquiry", "_self");
  };

  return (
    <section
      className={`solo-different ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        {/* ---------- MAIN SECTION ---------- */}
        {mainService && (
          <div
            className="solo-different-content"
            data-aos={isArabic ? "fade-left" : "fade-right"}
          >
            <img
              src={mainService.images_url}
              alt={
                isArabic
                  ? mainService.title_ar || mainService.title_en
                  : mainService.title_en
              }
              loading="lazy"
              data-aos="zoom-in"
              data-aos-delay="100"
            />
            <div className="solo-different-text" data-aos="fade-up">
              <h2>
                {isArabic
                  ? mainService.title_ar || mainService.title_en
                  : mainService.title_en}
              </h2>
            </div>
          </div>
        )}

        {/* ---------- SUB SERVICE LIST ---------- */}
        <div className="solo-different-list" data-aos="fade-up">
          <Row>
            {subServices.map((service: SoloDifferentItem, index) => (
              <Col
                lg={4}
                md={6}
                sm={12}
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="solo-different-list-item" data-aos="zoom-in">
                  <div className="solo-different-list-item-icon">
                    <img
                      src={service.images_url}
                      alt={
                        isArabic
                          ? service.title_ar || service.title_en
                          : service.title_en
                      }
                      loading="lazy"
                      data-aos="zoom-in"
                    />
                  </div>
                  <div
                    className="solo-different-list-item-text"
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
                  >
                    <h3>
                      {isArabic
                        ? service.title_ar || service.title_en
                        : service.title_en}
                    </h3>
                    <p>
                      {isArabic
                        ? service.description_ar || service.description_en
                        : service.description_en}
                    </p>
                  </div>
                </div>
              </Col>
            ))}

            <Col md={12} data-aos="fade-up" data-aos-delay="200">
              <div className="solo-different-list-btn text-center mt-4">
                <Button
                  className="btn btn-teal"
                  onClick={handleInquiryClick}
                  data-aos="zoom-in"
                >
                  {t("Btninquiry.inquiry_now") || "Inquiry Now"}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default SoloDifferent;
