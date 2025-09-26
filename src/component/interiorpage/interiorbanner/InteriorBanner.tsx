import React, { useState } from "react";
import { Container, Modal } from 'react-bootstrap'
import { InteriorB } from '../../../assets/images'

const InteriorBanner = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <section className='interior-banner' style={{ backgroundImage: `url(${InteriorB})` }}>
        <Container>
          <div className="interior-banner-text">
            <h1>important rules for interior design in hot areas</h1>
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
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Interior Design Video"
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

export default InteriorBanner
