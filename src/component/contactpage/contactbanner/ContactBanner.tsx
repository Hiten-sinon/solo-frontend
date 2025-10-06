import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { fetchContactBannerData } from "../../../redux/slice/contactpage/contactBannerSlice";

const ContactBanner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.contactBanner
  );

  useEffect(() => {
    dispatch(fetchContactBannerData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <section className="contact-banner">
      <Container>
        <div className="ct-info">
          <div className="ct-image">
            <img src={data.images_url} alt="Contact Banner" loading="lazy" />
          </div>
          <div className="ct-text">
            <h1>{data.title1_en}</h1>
          </div>
          <div className="ct-right">
            <h3>{data.title2_en}</h3>
            <ul>
              <li>{data.button1_lable_en}</li>
              <li>{data.button2_lable_en}</li>
              <li>{data.button3_lable_en}</li>
            </ul>
            <p>{data.subtitle_en}</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactBanner;
