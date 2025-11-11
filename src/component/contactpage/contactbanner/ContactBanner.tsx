import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { fetchContactBannerData } from "../../../redux/slice/contactpage/contactBannerSlice";
import Loader from "../../loader/Loader";
import { useTranslation } from "react-i18next";

const ContactBanner: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data, contactbannerloading, error } = useSelector(
    (state: RootState) => state.contactBanner
  );

  useEffect(() => {
    dispatch(fetchContactBannerData());
  }, [dispatch]);

  if (contactbannerloading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  const isArabic = i18n.language === "ar";

  return (
    <section className={`contact-banner overflow-hidden ${isArabic ? "rtl" : ""}`}>
      <Container>
        <div className="ct-info">
          <div className="ct-image">
            <img src={data.images_url} alt="Contact Banner" loading="lazy" />
          </div>

          <div
            className="ct-text"
            data-aos={isArabic ? "fade-left" : "fade-right"}
          >
            <h1>{isArabic ? data.title1_ar : data.title1_en}</h1>
          </div>

          <div className="ct-right">
            <h3 data-aos={isArabic ? "fade-right" : "fade-left"}>
              {isArabic ? data.title2_ar : data.title2_en}
            </h3>

            <ul data-aos={isArabic ? "fade-right" : "fade-left"}>
              <li>{isArabic ? data.button1_lable_ar : data.button1_lable_en}</li>
              <li>{isArabic ? data.button2_lable_ar : data.button2_lable_en}</li>
              <li>{isArabic ? data.button3_lable_ar : data.button3_lable_en}</li>
            </ul>

            <p data-aos={isArabic ? "fade-right" : "fade-left"}>
              {isArabic ? data.subtitle_ar : data.subtitle_en}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactBanner;
