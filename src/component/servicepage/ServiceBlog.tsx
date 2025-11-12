import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchBlogs } from "../../redux/slice/blogSlice";
import type { BlogPost } from "../../redux/slice/blogSlice";
import { useTranslation } from "react-i18next";

const ServiceBlog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, blogcardloading, error } = useSelector(
    (state: RootState) => state.blogSlice
  );

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

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
    ],
  };

  if (blogcardloading) return <p>Loading blog articles...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <section
      className={`service-blog ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        <div className="service-blog-title text-center mb-4">
          <h2>Blog Articles</h2>
        </div>

        <div className="service-blog-content">
          <Slider {...settings}>
            {posts.map((post: BlogPost) => (
              <div key={post.id} className="blog-item-wrapper">
                <Link to={`/blog/${post.id}`} className="blog-item">
                  <img
                    src={post.images_url}
                    alt={isArabic ? post.blog_title_ar || post.blog_title_en : post.blog_title_en}
                    loading="lazy"
                    className="img-fluid"
                  />
                  <div className="blog-text-list">
                    <h3>
                      {isArabic
                        ? post.blog_title_ar || post.blog_title_en
                        : post.blog_title_en}
                    </h3>
                    <p>
                      By{" "}
                      {isArabic ? post.author_ar || post.author_en : post.author_en}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>

          <div className="blog-list-items-button text-center mt-4">
            <Link to="/blog" className="btn btn-teal">
              See All Articles
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceBlog;
