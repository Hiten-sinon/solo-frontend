import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BlogOne } from '../../../assets/images';

const videoContent = [
    {
        id: 1,
        image: BlogOne,
        title: "The difference between alternative wood material and real wood",
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
    {
        id: 7,
        image: BlogOne,
        title: "Choosing the right wood finish for your home",
        author: "John Does",
    },
    {
        id: 8,
        image: BlogOne,
        title: "Choosing the right wood finish for your home",
        author: "John Doess",
    },
    {
        id: 9,
        image: BlogOne,
        title: "Choosing the right wood finish for your home",
        author: "John Doesss",
    },
];

const VideoList: React.FC = () => {
    return (
        <section className='video-lists'>
            <Container>
                <div className="blog-list-content video-content">
                    <h2>Recent blog posts</h2>
                </div>
                <div className="blog-list-items">
                    <Row>
                        {videoContent.slice(0, 9).map((post) => (
                            <Col md={4} key={post.id}>
                                <div className="blog-item video-item">
                                    <img src={post.image} alt={post.title} />
                                    <div className="blog-text-list video-text-list">
                                        <h3>{post.title}</h3>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default VideoList
