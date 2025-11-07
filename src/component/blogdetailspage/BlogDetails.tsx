import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import print from "../../assets/images/print.png";
import copy from "../../assets/images/copy.png";
import Quotes from "../../assets/images/inverted-commas.png";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchBlogDetails } from "../../redux/slice/blogdetailsSlice";
import { showSuccess, showError } from "../../utils/toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { blogdetail, recentBlogs, loading, error } = useSelector(
    (state: RootState) => state.blogdetails
  );

  useEffect(() => {
    if (id) dispatch(fetchBlogDetails(id));
  }, [dispatch, id]);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => showSuccess("Link copied to clipboard!"))
      .catch(() => showError("Failed to copy link!"));
  };

  const handlePrint = () => window.print();

  const blogImgSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
   arrows: false,
  };

  const blogSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!blogdetail) return <p>No blog found</p>;

  const blogImages = [
    blogdetail.images_url,
    blogdetail.banner_image_url,
    blogdetail.banner_image2_url,
    blogdetail.banner_image3_url,
    blogdetail.banner_image4_url,
    blogdetail.banner_image5_url,
  ].filter((img): img is string => !!img);

  return (
    <div>
      <Container>
        <div className="blog-details">
          <Row>
            <Col lg={1} md={1} sm={12} xs={12}>
              <ul className="blog-details-iconlist">
                <li>
                  <Link to="#" onClick={handlePrint}>
                    <img src={print} alt="print_icon" />
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={handleCopyLink}>
                    <img src={copy} alt="copy_icon" />
                  </Link>
                </li>
              </ul>
            </Col>
            <Col lg={11} md={11} sm={12} xs={12}>
              <div className="blog-details-content">
                <h3>{blogdetail.blog_title_en}</h3>
                <p>{blogdetail.description_en}</p>

                {/* Image Slider */}
                <div className="blog-img-slider">
                  <Slider {...blogImgSlider}>
                    {blogImages.map((img, index) => (
                      <div key={index}>
                        <img src={img} alt={`blog slide ${index + 1}`} />
                      </div>
                    ))}
                  </Slider>
                </div>

                <div className="blog-details-quotes">
                  <img src={Quotes} alt="quotes" />
                  <h3>
                    Consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                  </h3>
                </div>

                <p>
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </Col>
          </Row>
        </div>

        {/* Recent Blogs Slider */}
        <div className="blog-slider">
          <Slider {...blogSlider}>
            {recentBlogs.map((blog) => (
              <Link to={`/blog/${blog.id}`} key={blog.id}>
                <div className="blog-item">
                  <img src={blog.images_url} alt="blog" />
                  <div className="blog-text-list">
                    <h3>{blog.blog_title_en}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default BlogDetails;
