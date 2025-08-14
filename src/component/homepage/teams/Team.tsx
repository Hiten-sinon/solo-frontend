import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { TeamOne, TeamThree, TeamTwo } from "../../../assets/images";
import { Link } from "react-router-dom";

const Team = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    margin: 50,
    slidesToScroll: 1,
  };
  const teamData = [
    { image: TeamOne, name: "Full Name", title: "Job Title" },
    { image: TeamTwo, name: "Full Name", title: "Job Title" },
    { image: TeamThree, name: "Full Name", title: "Job Title" },
  ];
  return (
    <section className="team-sec">
      <Container>
        <Row>
          <Col className="col-md-3">
            <div className="solo-member-text">
              <h3>Solo Team</h3>
              <p>Our people who can make magic </p>
              <Link to="#" className="banner-btn">
                <Button className="btn btn-teal">
                  All Team
                </Button>
                <span className="arrow-btn">
                  <i className="bi bi-arrow-right"></i>
                </span>
              </Link>
            </div>
          </Col>
          <Col className="col-md-6">
            <Slider {...settings} className="team-slider">
              {teamData.map((member, index) => (
                <div key={index}>
                  <div className="team-content">
                    <div className="team-image">
                      <img src={member.image} alt="team" />
                    </div>
                    <div className="team-title">
                      <h4>
                        <span>{member.name} -</span> {member.title}
                      </h4>
                    </div>
                    <div className="apply-btn">
                      <Button className="btn btn-teal">Apply Now</Button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </Col>
          <Col className="col-md-3">
            <div className="team-content">
              <div className="team-image">
                <img src={TeamThree} alt="team" />
              </div>
              <div className="team-title">
                <h4>
                  <span>Full Name -</span> Job Title
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
