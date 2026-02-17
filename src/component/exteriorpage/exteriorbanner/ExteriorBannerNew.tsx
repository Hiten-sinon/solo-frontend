import React, { useState, useEffect } from "react";
import { Container, Modal } from 'react-bootstrap'
import { InteriorB } from '../../../assets/images'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store';
import { fetchExteriorBanner } from '../../../redux/slice/exteriorpage/ExteriorBannerSlice';
import { useTranslation } from 'react-i18next';

const ExteriorBanner: React.FC = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { i18n } = useTranslation();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // fetch exterior banner data
  useEffect(() => {
    // initial fetch
    dispatch(fetchExteriorBanner());

    // refetch every 30 seconds so admin changes propagate
    const interval = setInterval(() => {
      dispatch(fetchExteriorBanner());
    }, 30000);

    // refetch when window gains focus (useful after admin update)
    const onFocus = () => dispatch(fetchExteriorBanner());
    window.addEventListener("focus", onFocus);

    // refetch when tab becomes visible again
    const onVisibility = () => {
      if (!document.hidden) dispatch(fetchExteriorBanner());
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [dispatch]);

  const { data: banner } = useSelector((state: RootState) => state.exteriorBanner);
  const getYouTubeEmbed = (url?: string) => {
    if (!url) return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    try {
      const decoded = decodeURIComponent(url);
      const idMatch = decoded.match(/(?:v=|\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
      const id = idMatch ? idMatch[1] : null;
      return id ? `https://www.youtube.com/embed/${id}` : url.replace('watch?v=', 'embed/');
    } catch (e) {
      return url.replace('watch?v=', 'embed/');
    }
  };

  const videoSrc = getYouTubeEmbed(banner?.button_link || undefined);

  const isArabic = i18n.language === 'ar';

  return (
    <>
      <section
        className={`interior-banner ${isArabic ? 'rtl' : 'ltr'}`}
        dir={isArabic ? 'rtl' : 'ltr'}
        lang={i18n.language}
        style={{ backgroundImage: `url(${InteriorB})` }}
      >
        <Container>
          <div className="interior-banner-text">
            <h1>{i18n.language === "ar"
                ? banner?.title_ar || banner?.title_en
                : banner?.title_en}</h1>
            {/* Play button */}
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
                lineHeight:"23px"
              }}
            >
              <i className="bi bi-play-circle-fill"></i>
            </button>
          </div>
        </Container>
      </section>
      {/* Modal for Video */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body style={{ padding: 0 }}>
          <div className="ratio ratio-16x9">
            <iframe
              width="100%"
              height="100%"
              src={videoSrc}
              title="Exterior Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </>

  )
}

export default ExteriorBanner
