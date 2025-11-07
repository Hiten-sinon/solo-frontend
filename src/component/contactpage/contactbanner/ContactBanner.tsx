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

  return (
    <section className="contact-banner overflow-hidden" >
      <Container>
        <div className="ct-info">
          <div className="ct-image">
            <img src={data.images_url} alt="Contact Banner" loading="lazy" />
          </div>
          <div className="ct-text" data-aos={i18n.language === "ar" ? "fade-left" : "fade-right"}>
            <h1>{data.title1_en}</h1>
          </div>
          <div className="ct-right" >
            <h3 data-aos={i18n.language === "ar" ? "fade-right" : "fade-left"}>{data.title2_en}</h3>
            <ul data-aos={i18n.language === "ar" ? "fade-right" : "fade-left"}>
              <li>{data.button1_lable_en}</li>
              <li>{data.button2_lable_en}</li>
              <li>{data.button3_lable_en}</li>
            </ul>
            <p data-aos={i18n.language === "ar" ? "fade-right" : "fade-left"}>{data.subtitle_en}</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactBanner;
