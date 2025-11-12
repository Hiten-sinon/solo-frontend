import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { fetchSoloDifferent } from "../../redux/slice/servicepage/soloDifferentSlice";
import type { SoloDifferentItem } from "../../redux/slice/servicepage/soloDifferentSlice";
import { useTranslation } from "react-i18next";

const SoloDifferent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, solodifferentloading, error } = useSelector(
    (state: RootState) => state.soloDifferent
  );

  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    dispatch(fetchSoloDifferent());
  }, [dispatch]);

  if (solodifferentloading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const mainService = data.find((item) => item.type === "main_service");
  const subServices = data.filter((item) => item.type === "sub_service");

    // ✅ Click handler for Inquiry button
  const handleInquiryClick = () => {
    window.open("/inquiry", "_self"); // opens in same tab
  };

  return (
    <section
      className={`solo-different ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        {/* ---------- MAIN SECTION ---------- */}
        {mainService && (
          <div className="solo-different-content">
            <img
              src={mainService.images_url}
              alt={
                isArabic
                  ? mainService.title_ar || mainService.title_en
                  : mainService.title_en
              }
              loading="lazy"
            />
            <div className="solo-different-text">
              <h2>
                {isArabic
                  ? mainService.title_ar || mainService.title_en
                  : mainService.title_en}
              </h2>
            </div>
          </div>
        )}

        {/* ---------- SUB SERVICE LIST ---------- */}
        <div className="solo-different-list">
          <Row>
            {subServices.map((service: SoloDifferentItem) => (
              <Col lg={4} md={6} sm={12} key={service.id}>
                <div className="solo-different-list-item">
                  <div className="solo-different-list-item-icon">
                    <img
                      src={service.images_url}
                      alt={
                        isArabic
                          ? service.title_ar || service.title_en
                          : service.title_en
                      }
                      loading="lazy"
                    />
                  </div>
                  <div className="solo-different-list-item-text">
                    <h3>
                      {isArabic
                        ? service.title_ar || service.title_en
                        : service.title_en}
                    </h3>
                    <p>
                      {isArabic
                        ? service.description_ar || service.description_en
                        : service.description_en}
                    </p>
                  </div>
                </div>
              </Col>
            ))}

            <Col md={12}>
              <div className="solo-different-list-btn text-center mt-4">
                <Button className="btn btn-teal" onClick={handleInquiryClick}>
                  {t("Btninquiry.inquiry_now") || "Inquiry Now"}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default SoloDifferent;
