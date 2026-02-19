import React from 'react';
import { Container } from 'react-bootstrap';
import { BBanner } from '../../assets/images';
import { useTranslation } from 'react-i18next';

interface BlogBannerProps {
  className?: string;
  showFeatured?: boolean;
}

const BlogBanner: React.FC<BlogBannerProps> = ({ className = 'blog-banner-section', showFeatured = true }) => {
  const { t } = useTranslation();

  return (
    <section className={className}>
      <Container>
        <div className='blog-content'>
          <div className='blog-image'>
            <img src={BBanner} alt="Blog Banner" />
          </div>
          <div className='blog-text'>
            {showFeatured && <h5>{t('BlogBanner.featured')}</h5>}
            <h1>{t('BlogBanner.title')}</h1>
            <p>{t('BlogBanner.by')}</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogBanner;
