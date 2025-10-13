import React, { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts} from "../../redux/slice/servicepage/blogSlice ";
import type { BlogPost } from "../../redux/slice/servicepage/blogSlice ";
import type { RootState, AppDispatch } from "../../redux/store";

const ServiceBlog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.blogSlice
  );

  useEffect(() => {
    dispatch(fetchBlogPosts());
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
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
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

  if (loading) return <p>Loading...</p>;
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
              <div className="blog-item" key={post.id}>
                <img src={post.images_url} alt={post.blog_title_en} />
                <div className="blog-text-list">
                  <h3>{post.blog_title_en}</h3>
                  <p>By {post.author_en}</p>
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
