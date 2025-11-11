import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchBlogs } from "../../redux/slice/blogSlice";
import type { BlogPost } from "../../redux/slice/blogSlice";

const ServiceBlog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, blogcardloading, error } = useSelector(
    (state: RootState) => state.blogSlice
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 991,
        settings: { slidesToShow: 2, slidesToScroll: 1, dots: true },
      },
      {
        breakpoint: 767,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true },
      },
      {
        breakpoint: 575,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true },
      },
    ],
  };

  if (blogcardloading) return <p>Loading blog articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="service-blog">
      <Container>
        <div className="service-blog-title">
          <h2>Blog articles</h2>
        </div>
        <div className="service-blog-content">
          <Slider {...settings}>
            {posts.map((post: BlogPost) => (
              <Link to={`/blog/${post.id}`} className="blog-item" key={post.id}>
                <img src={post.images_url} alt={post.blog_title_en} />
                <div className="blog-text-list">
                  <h3>{post.blog_title_en}</h3>
                  <p>By {post.author_en}</p>
                </div>
              </Link>
            ))}
          </Slider>
          <div className="blog-list-items-button">
            <Link to="/blog" className="btn-teal">
              See All articles
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceBlog;
