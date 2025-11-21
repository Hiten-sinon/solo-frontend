import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchNumbers } from "../../../redux/slice/homepage/numbersSlice";
import type { RootState, AppDispatch } from "../../../redux/store";
import Loader from "../../loader/Loader";

const Number: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { data: numbers, numbersLoading, error } = useSelector(
    (state: RootState) => state.numbers
  );

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);

  // Fetch API data
  useEffect(() => {
    dispatch(fetchNumbers());
  }, [dispatch]);

  // Intersection Observer to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartCount(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="number" ref={sectionRef}>
      <Container>
        <div
          className="number-title"
          data-aos={i18n.language === "ar" ? "fade-left" : "fade-right"}
        >
          <h2>{t("number.title")}</h2>
          <p>{t("number.desc")}</p>
        </div>

        {numbersLoading && <Loader />}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="counter-main">
          <div className="row g-4 justify-content-center">
            {Array.isArray(numbers) && numbers.length > 0 ? (
              numbers.map((item) => (
                <div
                  key={item.id}
                  className="col-12 col-sm-6 col-md-6 col-lg-3"
                >
                  <div
                    className="p-4 text-center bg-white shadow-sm box-number"
                    style={{ minHeight: "150px" }}
                    data-aos="flip-up"
                  >
                    <h3 className="fw-bold">
                      {startCount ? (
                        <CountUp end={item.value} duration={2} start={0} />
                      ) : (
                        0
                      )}
                      +
                    </h3>
                    <p className="mb-0 small">
                      {i18n.language === "ar"
                        ? item.description_ar
                        : item.description_en}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              !numbersLoading && (
                <p className="text-center">No stats available</p>
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Number;
