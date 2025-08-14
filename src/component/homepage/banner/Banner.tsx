import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BannerOne } from "../../../assets/images";

const slides = [
  {
    img: BannerOne,
    title: "Interior Design",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: BannerOne,
    title: "Interior Design",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    img: BannerOne,
    title: "Interior Design",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
];

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_current: number, next: number) => {
      setActiveIndex(next);
    },
  };

  return (
    <section className="banner">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="banner-content">
              <div className="banner-image">
                <Image src={slide.img} alt={`Banner ${index + 1}`} />
              </div>
              <Container>
                <div
                  className={`banner-text-info fade-left ${
                    activeIndex === index ? "visible" : ""
                  }`}
                >
                  <h1>{slide.title}</h1>
                  <p>{slide.desc}</p>
                  <Link to="#" className="banner-btn">
                    <Button className="btn btn-teal">
                      Have your solo moment now
                    </Button>
                    <span className="arrow-btn">
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </Container>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
