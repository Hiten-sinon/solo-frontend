import React from 'react';
import { Container } from 'react-bootstrap';
import { BBanner } from '../../assets/images';

interface BlogBannerProps {
  className?: string;
  showFeatured?: boolean;
}

const BlogBanner: React.FC<BlogBannerProps> = ({ className = 'blog-banner-section', showFeatured = true }) => {
  return (
    <section className={className}>
      <Container>
        <div className='blog-content'>
          <div className='blog-image'>
            <img src={BBanner} alt="Blog Banner" />
          </div>
          <div className='blog-text'>
            {showFeatured && <h5>Featured</h5>}
            <h1>Visualizing trends in Libyan architecture culture</h1>
            <p>By Ahemd Salen</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogBanner;
