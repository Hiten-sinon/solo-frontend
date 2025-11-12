import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { fetchAboutData } from "../../../redux/slice/aboutpage/aboutBannerSlice";
import { useTranslation } from "react-i18next";

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
      className={`partnership ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        <div className="partnership-text">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          <Row>
            {section2Items &&
              section2Items.map((item, index) => (
                <Col lg={3} md={6} key={index}>
                  <div className="partner-box">
                    <div className="partner-image mb-3">
                      <img
                        src={item.icon}
                        alt={`Partner ${index + 1}`}
                        loading="lazy"
                      />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
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
