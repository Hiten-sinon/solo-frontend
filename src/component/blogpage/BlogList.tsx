import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchBlogs } from "../../redux/slice/blogSlice";

const BlogList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.blogSlice
  );

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="blog-list-section">
      <Container>
        <div className="blog-list-content">
          <h2>Recent blog posts</h2>
        </div>
        <div className="blog-list-items">
          <Row>
            {posts.map((post) => (
              <Col md={6} lg={4} key={post.id}>
                <Link to={`/blog/${post.id}`} className="blog-item">
                  <img src={post.images_url} alt={post.blog_title_en} />
                  <div className="blog-text-list">
                    <h3>{post.blog_title_en}</h3>
                    <p>By {post.author_en}</p>
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
