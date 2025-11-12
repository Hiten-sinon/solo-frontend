import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { Quote } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientSay } from "../../../redux/slice/clientsay/clientSaySlice";
import type { ClientSay } from "../../../redux/slice/clientsay/clientSaySlice";
import type { RootState, AppDispatch } from "../../../redux/store";
import { useTranslation } from "react-i18next";

const Testimonial: React.FC = () => {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.clientSay
  );

  useEffect(() => {
    dispatch(fetchClientSay());
  }, [dispatch]);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: isArabic, // 👈 enables right-to-left sliding for Arabic
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section
      className={`testimonial-sec ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        <div className="testimonial-title mb-5">
            <h2>{t("testimonial.what_our_clients_say")}</h2>
          {/* <h2>
            {isArabic
              ? t("what_our_clients_say_ar") || "ماذا يقول عملاؤنا عنا"
              : t("what_our_clients_say_en") || "What our clients say about us"}
          </h2> */}
        </div>

        <Slider {...settings} className="testimonial-slider">
          {Array.isArray(data) &&
            data.map((item: ClientSay) => (
              <div key={item.id}>
                <div className="testimonial-item text-center">
                  <img src={Quote} alt="quote" className="quote-icon mb-3" />
                  <p>
                    {isArabic
                      ? item.description_ar || item.description_en
                      : item.description_en}
                  </p>
                  <h5 className="mt-3">
                    {isArabic
                      ? item.title_ar || item.title_en
                      : item.title_en}
                  </h5>
                </div>
              </div>
            ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Testimonial;
