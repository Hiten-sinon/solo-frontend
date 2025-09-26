import React from 'react'
import { Container } from 'react-bootstrap';
import Slider from "react-slick";
import { Quote } from '../../../assets/images';

const Testimonial = () => {
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
    return (
        <section className="testimonial-sec">
            <Container>
                <div className="testimonial-title">
                    <h2>What our clients says about us</h2>
                </div>
                <Slider {...settings} className="testimonial-slider">
                    <div>
                        <div className="testimonial-item">
                            <img src={Quote} alt="quote" />
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <h5>Ahmed wahed - villa owner</h5>
                        </div>
                    </div>
                    <div>
                        <div className="testimonial-item">
                            <img src={Quote} alt="quote" />
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <h5>Ahmed wahed - villa owner</h5>
                        </div>
                    </div>
                    <div>
                        <div className="testimonial-item">
                            <img src={Quote} alt="quote" />
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <h5>Ahmed wahed - villa owner</h5>
                        </div>
                    </div>
                    
                </Slider>
            </Container>

        </section>
    )
}

export default Testimonial
