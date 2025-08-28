import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import useScrollAnimation from "../../../../useScrollAnimation";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartners } from "../../../redux/slice/partnersSlice";
import type { AppDispatch, RootState } from "../../../redux/store";

const Partner: React.FC = () => {
  const [partnerRef, isVisible] = useScrollAnimation<HTMLDivElement>();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data: partners, loading } = useSelector((state: RootState) => state.partners);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1199, settings: { slidesToShow: 4 } },
      { breakpoint: 991, settings: { slidesToShow: 3 } },
      { breakpoint: 767, settings: { slidesToShow: 2 } },
      { breakpoint: 575, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      ref={partnerRef}
      className={`partner fade-up ${isVisible ? "visible" : ""}`}
    >
      <Container>
        <h2>{t("partner.title")}</h2>
        <p>{t("partner.description")}</p>
      </Container>

      <div className="slider-partner">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Slider {...settings}>
            {partners.map((partner) => (
              <div key={partner.id}>
                <div className="partner-image-box">
                  <img
                    src={partner.images_url}
                    alt={partner.name_en}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default Partner;
