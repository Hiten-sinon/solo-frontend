import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { fetchAboutData } from "../../../redux/slice/aboutpage/aboutBannerSlice";
import { useTranslation } from "react-i18next";

const AboutBanner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { i18n } = useTranslation(); // 👈 get language from i18n
  const { data, loading, error } = useSelector(
    (state: RootState) => state.aboutBanner
  );

  useEffect(() => {
    dispatch(fetchAboutData());
  }, [dispatch]);

  const isArabic = i18n.language === "ar"; // 👈 detect Arabic language

  return (
    <section
      className={`about-banner ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {data && (
          <div className="ab-info text-center">
            {/* Image */}
            <div className="about-image">
              <img src={data.images_url} alt="About Us" loading="lazy" />
            </div>

            {/* Title */}
            <div className="about-text">
              <h1>
                {isArabic
                  ? data.main_banner_title_ar || data.main_banner_title_en
                  : data.main_banner_title_en}
              </h1>
            </div>

            {/* Subtitle / Section Title */}
            <div className="about-btn">
              <h5>
                {isArabic
                  ? data.section2_main_title_ar || data.section2_main_title_en
                  : data.section2_main_title_en}
              </h5>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default AboutBanner;
