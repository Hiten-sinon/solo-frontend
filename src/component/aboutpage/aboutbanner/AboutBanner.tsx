import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { fetchAboutData } from "../../../redux/slice/aboutpage/aboutBannerSlice";

const AboutBanner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.aboutBanner);

  useEffect(() => {
    dispatch(fetchAboutData());
  }, [dispatch]);

  return (
    <section className="about-banner">
      <Container>
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
        {data && (
          <div className="ab-info">
            <div className="about-image">
              <img src={data.images_url} alt="About Us" loading="lazy" />
            </div>
            <div className="about-text">
              <h1>{data.main_banner_title_en}</h1>
            </div>
            <div className="about-btn">
              <h5>{data.section2_main_title_en}</h5>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default AboutBanner;
