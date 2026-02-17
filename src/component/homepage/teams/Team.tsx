import React, { useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
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

  const isLoading = teamsloading || titleLoading;

  // 👉 take first 7 members for 4+3 layout
  const displayTeams = teams.slice(0, 7);

  return (
    <section className="team-sec overflow-hidden">
      <Container>

        {/* TITLE AREA */}
        <Row>
          <Col lg={12}>
            <div className="solo-member-text text-center mb-5">
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
                </>
              )}
            </div>
          </Col>
        </Row>

        {/* GRID TEAM */}
        <Row>
          {teamsloading ? (
            <Loader />
          ) : (
            displayTeams.map((member) => (
              <Col lg={3} md={4} sm={6} xs={12} key={member.id} className="mb-4">
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
                      </span>
                      {" - "}
                      {lang === "ar"
                        ? member.job_title_ar
                        : member.job_title_en}
                    </h4>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>

      </Container>
    </section>
  );
};

export default Team;
