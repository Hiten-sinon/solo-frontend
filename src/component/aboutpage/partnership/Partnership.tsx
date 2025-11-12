import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { fetchAboutData } from "../../../redux/slice/aboutpage/aboutBannerSlice";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

const Partnership: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { i18n } = useTranslation();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.aboutBanner
  );

  const isArabic = i18n.language === "ar";

  useEffect(() => {
    if (!data) {
      dispatch(fetchAboutData());
    }
  }, [dispatch, data]);

  // Initialize AOS animation
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // run once per scroll
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);

  const section2Items =
    data &&
    [
      {
        icon: data.section2_icon1_url,
        title: isArabic
          ? data.section2_title1_ar || data.section2_title1_en
          : data.section2_title1_en,
        description: isArabic
          ? data.section2_description1_ar || data.section2_description1_en
          : data.section2_description1_en,
      },
      {
        icon: data.section2_icon2_url,
        title: isArabic
          ? data.section2_title2_ar || data.section2_title2_en
          : data.section2_title2_en,
        description: isArabic
          ? data.section2_description2_ar || data.section2_description2_en
          : data.section2_description2_en,
      },
      {
        icon: data.section2_icon3_url,
        title: isArabic
          ? data.section2_title3_ar || data.section2_title3_en
          : data.section2_title3_en,
        description: isArabic
          ? data.section2_description3_ar || data.section2_description3_en
          : data.section2_description3_en,
      },
      {
        icon: data.section2_icon4_url,
        title: isArabic
          ? data.section2_title4_ar || data.section2_title4_en
          : data.section2_title4_en,
        description: isArabic
          ? data.section2_description4_ar || data.section2_description4_en
          : data.section2_description4_en,
      },
    ];

  return (
    <section
      className={`partnership py-5 ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        <div className="partnership-text">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          <Row className="g-4 justify-content-center">
            {section2Items &&
              section2Items.map((item, index) => (
                <Col
                  lg={3}
                  md={6}
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={index * 150} // stagger animation
                >
                  <div
                    className="partner-box shadow-sm"
                    style={{
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    <div className="partner-image mb-3">
                      <img
                        src={item.icon}
                        alt={`Partner ${index + 1}`}
                        className="img-fluid"
                        loading="lazy"
                      />
                    </div>
                    <h3 className=" mb-2">{item.title}</h3>
                    <p className="small mb-0">{item.description}</p>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Partnership;
