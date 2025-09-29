import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../../../redux/slice/teamsSlice";
import type { RootState, AppDispatch } from "../../../redux/store";
import teamImage from "../../../assets/images/team-3.webp";

const Team: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { data: teams, loading } = useSelector(
    (state: RootState) => state.teams
  );

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const lang = i18n.language;

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
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

  return (
    <section
      ref={teamRef}
      className={`team-sec fade-up ${isVisible ? "visible" : ""}`}
    >
      <Container>
        <Row>
          <Col className="col-md-12 col-lg-3">
            <div className="solo-member-text">
              <h3>{t("team_sec.title")}</h3>
              <p>{t("team_sec.description")}</p>
              <Link to="#" className="banner-btn">
                <Button className="btn btn-teal">
                  {t("team_sec.allTeam")}
                </Button>
                <span className="arrow-btn">
                  <i className="bi bi-arrow-right"></i>
                </span>
              </Link>
            </div>
          </Col>

          <Col className="col-md-8 col-lg-6">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Slider {...settings} className="team-slider">
                {teams.map((member) => (
                  <div key={member.id}>
                    <div className="team-content">
                      <div className="team-image">
                        <img
                          src={member.images_url}
                          alt={member.name_en}
                          loading="lazy"
                        />
                      </div>
                      <div className="team-title">
                        <h4>
                          <span>
                            {lang === "ar" ? member.name_ar : member.name_en} -
                          </span>{" "}
                          {lang === "ar"
                            ? member.job_title_ar
                            : member.job_title_en}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </Col>

          <Col className="col-md-4 col-lg-3">
            <div className="team-content team-join">
              <div className="team-image">
                <img src={teamImage} alt="Join us" loading="lazy" />
              </div>
              <div className="team-title">
                <h4>
                  <span>{t("team_sec.maybeYou")}</span> {t("team_sec.bePart")}
                </h4>
              </div>
              <div className="apply-btn">
                <Button className="btn btn-teal">
                  {t("team_sec.applyNow")}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Team;
