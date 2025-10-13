import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { fetchAboutData } from "../../../redux/slice/aboutpage/aboutBannerSlice";

const Partnership: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.aboutBanner);

  useEffect(() => {
    if (!data) {
      dispatch(fetchAboutData());
    }
  }, [dispatch, data]);

  const section2Items =
    data &&
    [
      {
        icon: data.section2_icon1_url,
        title: data.section2_title1_en,
        description: data.section2_description1_en,
      },
      {
        icon: data.section2_icon2_url,
        title: data.section2_title2_en,
        description: data.section2_description2_en,
      },
      {
        icon: data.section2_icon3_url,
        title: data.section2_title3_en,
        description: data.section2_description3_en,
      },
      {
        icon: data.section2_icon4_url,
        title: data.section2_title4_en,
        description: data.section2_description4_en,
      },
    ];

  return (
    <section className="partnership">
      <Container>
        <div className="partnership-text">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          <Row>
            {section2Items &&
              section2Items.map((item, index) => (
                <Col lg={3} md={6} key={index}>
                  <div className="partner-box">
                    <div className="partner-image">
                      <img src={item.icon} alt={`Partner ${index + 1}`} loading="lazy" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Partnership;
