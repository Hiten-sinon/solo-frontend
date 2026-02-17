import React, { useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import { InteriorB } from "../../../assets/images";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchInteriorBanner } from "../../../redux/slice/interiorpage/interiorBanner.slice";
import type { AppDispatch, RootState } from "../../../redux/store";

const InteriorBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { data: InteriorBannerData, loading, error } = useSelector(
    (state: RootState) => state.interiorBanner as any
  );

  // ✅ If API returns array take first item
  const banner = Array.isArray(InteriorBannerData)
    ? InteriorBannerData[0]
    : InteriorBannerData;

  useEffect(() => {
    dispatch(fetchInteriorBanner());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading banner</p>;

  return (
    <>
      <section
        className="interior-banner"
        style={{
          backgroundImage: `url(${InteriorB})`,
        }}
      >
        <Container>
          <div className="interior-banner-text">
            <h1>
              {i18n.language === "ar"
                ? banner?.title_ar || banner?.title_en
                : banner?.title_en}
            </h1>

            <button
              onClick={handleShow}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "#fff",
                border: "none",
                fontSize: "60px",
                marginTop: "20px",
                color: "#2EA19B",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                lineHeight: "23px",
              }}
            >
              <i className="bi bi-play-circle-fill"></i>
            </button>
          </div>
        </Container>
      </section>

      {/* Video Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body style={{ padding: 0 }}>
          <div className="ratio ratio-16x9">
            <iframe
              width="100%"
              height="100%"
              src={
                banner?.button_link
                  ? banner.button_link.replace(
                      "watch?v=",
                      "embed/"
                    )
                  : ""
              }
              title="Interior Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InteriorBanner;
