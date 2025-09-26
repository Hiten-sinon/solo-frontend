import React from 'react'
import { Container } from 'react-bootstrap'
import { BBanner } from '../../assets/images'

const BlogBanner = () => {
    return (
        <section className="blog-banner-section">
            <Container>
                <div className='blog-content'>
                    <div className='blog-image'>
                        <img src={BBanner} alt="Blog Banner" />
                    </div>
                    <div className='blog-text'>
                        <h5>Featured</h5>
                        <h1>Visualizing trends in Libyan architecture culture</h1>
                        <p>By Ahemd Salen</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default BlogBanner
