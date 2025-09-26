import React from "react";
import { Container, Button } from "react-bootstrap";
import Slider from "react-slick";
import { BlogOne } from "../../assets/images";

const ServiceBlog: React.FC = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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

  const Blog = [
    {
      id: 1,
      image: BlogOne,
      title:
        "The difference between alternative wood material and real wood",
      author: "Ahemd Salen",
    },
    {
      id: 2,
      image: BlogOne,
      title: "Sustainable furniture trends in 2025",
      author: "Sara Ali",
    },
    {
      id: 3,
      image: BlogOne,
      title: "Why eco-friendly materials matter in interior design",
      author: "John Doe",
    },
    {
      id: 4,
      image: BlogOne,
      title: "Top 5 tips for maintaining wooden furniture",
      author: "Ahemd Salen",
    },
    {
      id: 5,
      image: BlogOne,
      title: "The rise of alternative building materials",
      author: "Sara Ali",
    },
    {
      id: 6,
      image: BlogOne,
      title: "Choosing the right wood finish for your home",
      author: "John Doe",
    },
  ];

  return (
    <section className="service-blog">
      <Container>
        <div className="service-blog-title">
          <h2>Blog articles</h2>
        </div>
        <div className="service-blog-content">
          <Slider {...settings}>
            {Blog.map((post) => (
              <div className="blog-item" key={post.id}>
                <img src={post.image} alt={post.title} />
                <div className="blog-text-list">
                  <h3>{post.title}</h3>
                  <p>By {post.author}</p>
                </div>
              </div>
            ))}
          </Slider>
          <div className="blog-list-items-button">
            <Button className="btn-teal">See All articles</Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceBlog;
