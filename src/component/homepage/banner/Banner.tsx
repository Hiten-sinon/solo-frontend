import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchSlider } from "../../../redux/slice/homepage/sliderSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import Loader from "../../loader/Loader";

const Banner: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { data: slides, bannersliderloading, error } = useSelector(
    (state: RootState) => state.slider
  );

  useEffect(() => {
    dispatch(fetchSlider());
  }, [dispatch]);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    lazyLoad: "ondemand" as "ondemand",
    rtl: i18n.language === "ar",
  };

  if (bannersliderloading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <section className="banner">
      <Slider {...settings}>
        {slides.length > 0 &&
          slides.map((slide) => (
            <div key={slide.id}>
              <div className="banner-content">
                <div className="banner-image">
                  <Image
                    src={slide.images_url}
                    alt={slide.title_en}
                    fluid
                    loading="lazy"
                  />
                </div>
                <Container>
                  <div className="banner-text-info">
                    <div>
                      <h1>
                        {i18n.language === "ar"
                          ? slide.title_ar
                          : slide.title_en}
                      </h1>
                      <p>
                        {i18n.language === "ar"
                          ? slide.sub_title_ar
                          : slide.sub_title_en}
                      </p>
                      <Link to={slide.button_link} className="banner-btn">
                        <Button className="btn btn-teal">
                          {i18n.language === "ar"
                          ? slide.button_name_ar
                          : slide.button_name_en}
                        </Button>
                        <span className="arrow-btn">
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          ))}
      </Slider>
    </section>
  );
};

export default Banner;
