import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BlogOne } from '../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExteriorVideos } from '../../../redux/slice/exteriorpage/ExteriorVideoSlice';
import type { AppDispatch, RootState } from '../../../redux/store';
import { useTranslation } from 'react-i18next';

const ExteriorVideoList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { i18n } = useTranslation();

    const { data: videos, loading, error } = useSelector((state: RootState) => state.exteriorVideos);

    useEffect(() => {
        dispatch(fetchExteriorVideos());
    }, [dispatch]);

    if (loading) return <p>Loading videos...</p>;
    if (error) return <p>Error loading videos</p>;

    const list = videos ?? [];

    return (
        <section className='video-lists'>
            <Container>
                <div className="blog-list-content video-content">
                    <h2>{i18n.language === 'ar' ? 'مشاركات الفيديو الأخيرة' : 'Recent Video posts'}</h2>
                </div>
                <div className="blog-list-items">
                    <Row>
                        {list.slice(0, 9).map((post) => (
                            <Col md={6} lg={4} key={post.id}>
                                <div className="blog-item video-item">
                                    {(() => {
                                        const base = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/api\/?$/,'');
                                        const src1 = post.image_url
                                            ? post.image_url.startsWith("http")
                                                ? post.image_url
                                                : `${base}/uploads/${post.image}`
                                            : BlogOne;
                                        const src2 = post.image ? `${base}/storage/uploads/${post.image}` : BlogOne;
                                        const src3 = post.image ? `${base}/storage/${post.image}` : BlogOne;

                                        return (
                                            <img
                                                src={src1}
                                                onError={(e) => {
                                                    const el = e.currentTarget as HTMLImageElement & { dataset: any };
                                                    if (!el.dataset.attempt) {
                                                        el.dataset.attempt = '1';
                                                        el.src = src2;
                                                    } else if (el.dataset.attempt === '1') {
                                                        el.dataset.attempt = '2';
                                                        el.src = src3;
                                                    } else {
                                                        el.src = BlogOne;
                                                    }
                                                }}
                                                alt={i18n.language === 'ar' ? post.title_ar || post.title || 'video' : post.title || post.title_ar || 'video'}
                                            />
                                        );
                                    })()}
                                    <div className="blog-text-list video-text-list">
                                        <h3>{i18n.language === 'ar' ? post.title_ar || post.title || 'Untitled' : post.title || post.title_ar || 'Untitled'}</h3>
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

export default ExteriorVideoList
