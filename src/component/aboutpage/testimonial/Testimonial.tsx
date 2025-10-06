import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Slider from "react-slick";
import { Quote } from '../../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientSay } from '../../../redux/slice/clientsay/clientSaySlice';
import type { ClientSay } from '../../../redux/slice/clientsay/clientSaySlice';
import type { RootState, AppDispatch } from '../../../redux/store';

const Testimonial: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.clientSay);

    useEffect(() => {
        dispatch(fetchClientSay());
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
        <section className="testimonial-sec">
            <Container>
                <div className="testimonial-title">
                    <h2>What our clients say about us</h2>
                </div>
                <Slider {...settings} className="testimonial-slider">
                    {data.map((item: ClientSay) => (
                        <div key={item.id}>
                            <div className="testimonial-item">
                                <img src={Quote} alt="quote" />
                                <p>{item.description_en}</p>
                                <h5>{item.title_en}</h5>
                            </div>
                        </div>
                    ))}
                </Slider>
            </Container>
        </section>
    );
};

export default Testimonial;
