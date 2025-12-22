import React, { useEffect, useMemo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../../../redux/slice/homepage/teamsSlice";
import { fetchManageTitleBySlug } from "../../../redux/slice/homepage/manageTitleSlice";
import type { RootState, AppDispatch } from "../../../redux/store";
import teamImage from "../../../assets/images/team-3.webp";
import Loader from "../../loader/Loader";

const Team: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  // Teams slice
  const { data: teams, teamsloading } = useSelector(
    (state: RootState) => state.teams
  );

  // Manage title slice
  const { data: manageTitleData, loading: titleLoading, error: titleError } =
    useSelector((state: RootState) => state.manageTitle);

  // Memoize teamSection
  const teamSection = useMemo(() => manageTitleData["solo-team"], [manageTitleData]);

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchManageTitleBySlug("solo-team"));
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

  // Combine loaders
  const isLoading = titleLoading || teamsloading;

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
                {teams.map((member) => (
                  <div key={member.id} data-aos="fade-up">
                    <div className="team-content">
                      <div className="team-image">
                        <img
                          src={member.images_url}
                          alt={lang === "ar" ? member.name_ar : member.name_en}
                          loading="lazy"
                        />
                      </div>
                      <div className="team-title">
                        <h4>
                          <span>
                            {lang === "ar" ? member.name_ar : member.name_en} -
                          </span>{" "}
                          {lang === "ar" ? member.job_title_ar : member.job_title_en}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </Col>

          {/* JOIN TEAM CARD */}
          <Col lg={3} md={4}>
            <div className="team-content team-join" data-aos="fade-up">
              <div className="team-image">
                <img src={teamImage} alt="Join us" loading="lazy" />
              </div>
              <div className="team-title">
                <h4>
                  <span>Maybe You -</span> Be part of our team
                </h4>
              </div>
              <div className="apply-btn">
                <Button className="btn btn-teal">Apply Now</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Team;
