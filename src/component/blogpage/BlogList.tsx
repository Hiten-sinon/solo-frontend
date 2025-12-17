import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchBlogs } from "../../redux/slice/blogSlice";
import { useTranslation } from "react-i18next";

const BlogList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { posts, blogcardloading, error } = useSelector(
    (state: RootState) => state.blogSlice
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (blogcardloading)
    return (
      <section className="blog-list-section text-center py-5">
        <p>{t("Loading blog posts...")}</p>
      </section>
    );

  if (error)
    return (
      <section className="blog-list-section text-center py-5">
        <p className="text-danger">{t("Error loading blogs")}: {error}</p>
      </section>
    );

  if (!posts || posts.length === 0)
    return (
      <section className="blog-list-section text-center py-5">
        <p>{t("No blog posts available at the moment.")}</p>
      </section>
    );

  return (
    <section
      className={`blog-list-section ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        {/* ----- Section Title ----- */}
        <div className="blog-list-content text-center mb-4">
          <h2 data-aos={isArabic ? "fade-left" : "fade-right"}>
            {isArabic ? t("المقالات الحديثة") : t("Recent blog posts")}
          </h2>
        </div>

        {/* ----- Blog Cards ----- */}
        <div className="blog-list-items">
          <Row className="g-4">
            {posts.map((post) => (
              <Col md={6} lg={4} key={post.id}>
                <Link
                  to={`/blog/${post.id}`}
                  className="blog-item d-block text-decoration-none h-100"
                  data-aos="fade-up"
                >
                  <div className="blog-image-wrapper">
                    <img
                      src={post.images_url}
                      alt={
                        isArabic
                          ? post.blog_title_ar || post.blog_title_en
                          : post.blog_title_en
                      }
                      className="w-100 rounded-3"
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-text-list mt-3">
                    <h3 className="h5">
                      {isArabic
                        ? post.blog_title_ar || post.blog_title_en
                        : post.blog_title_en}
                    </h3>
                    <p className="mb-1">
                      {t("By")}{" "}
                      {isArabic
                        ? post.author_ar || post.author_en
                        : post.author_en}
                    </p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default BlogList;
