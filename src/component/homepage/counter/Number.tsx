import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import CountUp from "react-countup";
import useScrollAnimation from "../../../../useScrollAnimation";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchNumbers } from "../../../redux/slice/numbersSlice";
import type { RootState, AppDispatch } from "../../../redux/store";

const Number: React.FC = () => {
  const [numberRef, isVisible] = useScrollAnimation<HTMLDivElement>();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { data: numbers, loading, error } = useSelector(
    (state: RootState) => state.numbers
  );

  useEffect(() => {
    dispatch(fetchNumbers());
  }, [dispatch]);

  return (
    <section
      ref={numberRef}
      className={`number fade-up ${isVisible ? "visible" : ""}`}
    >
      <Container>
        <div className="number-title">
          <h2>{t("number.title")}</h2>
          <p>{t("number.desc")}</p>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div
          ref={numberRef}
          className={`counter-main fade-up ${isVisible ? "visible" : ""}`}
        >
          <div className="row g-4 justify-content-center">
            {Array.isArray(numbers) && numbers.length > 0 ? (
              numbers.map((item) => (
                <div key={item.id} className="col-12 col-sm-6 col-md-6 col-lg-3">
                  <div
                    className="p-4 text-center bg-white shadow-sm box-number"
                    style={{ minHeight: "150px" }}
                  >
                    <h3 className="fw-bold">
                      <CountUp end={item.value} duration={2} />+
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
              !loading && <p className="text-center">No stats available</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Number;
