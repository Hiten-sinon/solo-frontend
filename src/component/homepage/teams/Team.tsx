import React, { useEffect, useMemo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../../../redux/slice/homepage/teamsSlice";
import { fetchManageTitleBySlug } from "../../../redux/slice/homepage/manageTitleSlice";
import type { RootState, AppDispatch } from "../../../redux/store";
import Loader from "../../loader/Loader";

const Team: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { data: teams, teamsloading } = useSelector(
    (state: RootState) => state.teams
  );

  const {
    data: manageTitleData,
    loading: titleLoading,
    error: titleError,
  } = useSelector((state: RootState) => state.manageTitle);

  const teamSection = useMemo(
    () => manageTitleData["solo-team"],
    [manageTitleData]
  );

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchManageTitleBySlug("solo-team"));
  }, [dispatch]);

  const lang = i18n.language;

  // SPLIT DATA BY FLAG
  const mainTeam = teams.find((item) => item.flag === "main");
  const otherTeams = teams.filter((item) => item.flag == "other");

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

  const isLoading = teamsloading || titleLoading;

  return (
    <section className="team-sec overflow-hidden">
      <Container>
        <Row>
          {/* LEFT CONTENT */}
          <Col lg={3}>
            <div
              className="solo-member-text"
              data-aos={lang === "ar" ? "fade-left" : "fade-right"}
            >
              {isLoading ? (
                <Loader />
              ) : titleError ? (
                <p className="text-danger">{titleError}</p>
              ) : (
                <>
                  <h3>
                    {lang === "ar"
                      ? teamSection?.title_ar
                      : teamSection?.title_en}
                  </h3>

                  <p>
                    {lang === "ar"
                      ? teamSection?.sub_title_ar
                      : teamSection?.sub_title_en}
                  </p>

                  {teamSection?.button_link && (
                    <Link to={teamSection.button_link} className="banner-btn">
                      <Button className="btn btn-teal">
                        {lang === "ar"
                          ? teamSection.button_name_ar
                          : teamSection.button_name_en}
                      </Button>
                      <span className="arrow-btn">
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                  )}
                </>
              )}
            </div>
          </Col>

          {/* TEAM SLIDER */}
          <Col lg={6} md={8}>
            {teamsloading ? (
              <Loader />
            ) : (
              <Slider {...settings} className="team-slider">
                {otherTeams.map((member) => (
                  <div key={member.id} data-aos="fade-up">
                    <div className="team-content">
                      <div className="team-image">
                        <img
                          src={member.images_url}
                          alt={
                            lang === "ar"
                              ? member.name_ar
                              : member.name_en
                          }
                          loading="lazy"
                        />
                      </div>
                      <div className="team-title">
                        <h4>
                          <span>
                            {lang === "ar"
                              ? member.name_ar
                              : member.name_en}
                            {" - "}
                          </span>
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

          {/* JOIN TEAM CARD (FLAG === MAIN) */}
          <Col lg={3} md={4}>
            {teamsloading ? (
              <Loader />
            ) : mainTeam ? (
              <div className="team-content team-join" data-aos="fade-up">
                <div className="team-image">
                  <img
                    src={mainTeam.images_url}
                    alt={
                      lang === "ar"
                        ? mainTeam.name_ar
                        : mainTeam.name_en
                    }
                    loading="lazy"
                  />
                </div>

                <div className="team-title">
                  <h4>
                    <span>
                      {lang === "ar"
                        ? mainTeam.name_ar
                        : mainTeam.name_en}
                    </span>{" "}
                    {lang === "ar"
                      ? mainTeam.job_title_ar
                      : mainTeam.job_title_en}
                  </h4>
                </div>

                {mainTeam.button_link && (
                  <div className="apply-btn">
                    <Link to={mainTeam.button_link}>
                      <Button className="btn btn-teal">
                        {lang === "ar"
                          ? mainTeam.button_name_ar
                          : mainTeam.button_name_en}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Team;
