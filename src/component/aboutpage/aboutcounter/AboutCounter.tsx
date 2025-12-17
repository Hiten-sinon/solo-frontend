import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchNumbers } from "../../../redux/slice/homepage/numbersSlice";
import { fetchAboutData } from "../../../redux/slice/aboutpage/aboutBannerSlice";
import type { RootState, AppDispatch } from "../../../redux/store";

const AboutCounter: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { data: numbers, numbersLoading } = useSelector(
    (state: RootState) => state.numbers
  );
  const { data: aboutData } = useSelector(
    (state: RootState) => state.aboutBanner
  );

  const isArabic = i18n.language === "ar";

  // Fetch data
  useEffect(() => {
    dispatch(fetchNumbers());
    dispatch(fetchAboutData());
  }, [dispatch]);

  // Initialize AOS (scroll animation)
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      className={`about-counter py-5 ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        {/* ---- Section Title ---- */}
        <div
          className="counter-text text-center mb-5"
          data-aos={isArabic ? "fade-left" : "fade-right"}
        >
          <h2 className="fw-bold">
            {isArabic
              ? aboutData?.section3_main_title_ar ||
                aboutData?.section3_main_title_en
              : aboutData?.section3_main_title_en}
          </h2>
        </div>

        {/* ---- Counter Boxes ---- */}
        <div className="counter-main">
          <Row className="g-4 justify-content-center">
            {Array.isArray(numbers) && numbers.length > 0 ? (
              numbers.map((item, index) => (
                <Col
                  key={item.id}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                  className="d-flex justify-content-center"
                  data-aos="zoom-in"
                  data-aos-delay={index * 150}
                >
                  <div
                    className="p-4 text-center bg-white shadow-sm box-number rounded-4"
                    style={{
                      minHeight: "150px",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    {/* CountUp starts when scrolled into view */}
                    <h3 className="fw-bold mb-2">
                      <CountUp
                        start={0}
                        end={item.value}
                        duration={2.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />
                      +
                    </h3>
                    <p className="mb-0 text-muted small">
                      {isArabic
                        ? item.description_ar || item.description_en
                        : item.description_en}
                    </p>
                  </div>
                </Col>
              ))
            ) : !numbersLoading ? (
              <p className="text-center">No stats available</p>
            ) : (
              <p className="text-center">Loading...</p>
            )}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default AboutCounter;
