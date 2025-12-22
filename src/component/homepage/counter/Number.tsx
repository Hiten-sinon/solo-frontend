import React, { useEffect, useRef, useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchNumbers } from "../../../redux/slice/homepage/numbersSlice";
import { fetchManageTitleBySlug } from "../../../redux/slice/homepage/manageTitleSlice";
import type { RootState, AppDispatch } from "../../../redux/store";
import Loader from "../../loader/Loader";

const Number: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  // Manage Title Slice
  const { data: manageTitleData, loading: titleLoading, error: titleError } = useSelector(
    (state: RootState) => state.manageTitle
  );
  // Memoize numberSection to avoid unnecessary re-renders
  const numberSection = useMemo(() => manageTitleData["solo-number"], [manageTitleData]);

  // Numbers Slice
  const { data: numbers, numbersLoading, error } = useSelector(
    (state: RootState) => state.numbers
  );

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);

  // Fetch APIs
  useEffect(() => {
    dispatch(fetchNumbers());
    dispatch(fetchManageTitleBySlug("solo-number"));
  }, [dispatch]);

  // Trigger count animation once on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartCount(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Combine loaders
  const isLoading = titleLoading || numbersLoading;

  return (
    <section className="number" ref={sectionRef}>
      <Container>
        {/* Title Section */}
        <div
          className="number-title"
          data-aos={i18n.language === "ar" ? "fade-left" : "fade-right"}
        >
          {isLoading ? (
            <Loader />
          ) : titleError ? (
            <p className="text-danger text-center">{titleError}</p>
          ) : (
            <>
              <h2>
                {i18n.language === "ar"
                  ? numberSection?.title_ar
                  : numberSection?.title_en}
              </h2>

              <p>
                {i18n.language === "ar"
                  ? numberSection?.sub_title_ar
                  : numberSection?.sub_title_en}
              </p>

              {numberSection?.button_link && (
                <a
                  href={numberSection.button_link ?? undefined}
                  className="btn btn-primary mt-3"
                  aria-label={
                    (i18n.language === "ar"
                      ? numberSection.button_name_ar
                      : numberSection.button_name_en) ?? undefined
                  }
                >
                  {i18n.language === "ar"
                    ? numberSection.button_name_ar
                    : numberSection.button_name_en}
                </a>
              )}


            </>
          )}
        </div>

        {/* Numbers Section */}
        {!isLoading && error && <p className="text-center text-danger">{error}</p>}

        <div className="counter-main">
          <div className="row g-4 justify-content-center">
            {numbers?.length > 0 ? (
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
              !isLoading && <p className="text-center">No stats available</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Number;
