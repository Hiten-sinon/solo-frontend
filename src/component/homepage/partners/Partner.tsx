import React, { useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartners } from "../../../redux/slice/homepage/partnersSlice";
import { fetchManageTitleBySlug } from "../../../redux/slice/homepage/manageTitleSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import Loader from "../../loader/Loader";

const Partner: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  // Partners slice
  const { data: partners, partnersLoading } = useSelector(
    (state: RootState) => state.partners
  );

  // Manage title slice
  const { data: manageTitleData, loading: titleLoading, error: titleError } =
    useSelector((state: RootState) => state.manageTitle);

  // Memoize partnerSection
  const partnerSection = useMemo(
    () => manageTitleData["our-partner"],
    [manageTitleData]
  );

  useEffect(() => {
    dispatch(fetchPartners());
    dispatch(fetchManageTitleBySlug("our-partner"));
  }, [dispatch]);

  const isLoading = titleLoading || partnersLoading;

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
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
    <section className="partner">
      <Container>
        {/* TITLE & DESCRIPTION */}
        {isLoading ? (
          <Loader />
        ) : titleError ? (
          <p className="text-danger text-center">{titleError}</p>
        ) : (
          <>
            <h2>
              {i18n.language === "ar"
                ? partnerSection?.title_ar
                : partnerSection?.title_en}
            </h2>

            <p>
              {i18n.language === "ar"
                ? partnerSection?.sub_title_ar
                : partnerSection?.sub_title_en}
            </p>
          </>
        )}
      </Container>

      {/* PARTNERS SLIDER */}
      <div className="slider-partner">
        {partnersLoading ? (
          <Loader />
        ) : (
          <Slider {...settings}>
            {partners.map((partner) => (
              <div key={partner.id} data-aos="fade-up">
                <div className="partner-image-box">
                  <img
                    src={partner.images_url}
                    alt={i18n.language === "ar" ? partner.name_ar : partner.name_en}
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
