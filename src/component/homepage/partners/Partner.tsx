import React from 'react'
import { Container } from 'react-bootstrap'
import Slider from "react-slick";
import { PartnerLogo } from '../../../assets/images';

const Partner = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        centerMode:true,
        margin:"20px",
        slidesToShow: 5,
        slidesToScroll: 1
    };
    return (
        <section className='partner'>
            <Container>
                <h2>Our Partners</h2>
                <p>A Success career must have a trusted partners to help you though the journey</p>
            </Container>
            <div className='slider-patner'>
                <Slider {...settings}>
                    <div>
                        <div className='partner-image-box'>
                            <img src={PartnerLogo} alt='partner' />
                        </div>
                    </div>
                     <div>
                        <div className='partner-image-box'>
                            <img src={PartnerLogo} alt='partner' />
                        </div>
                    </div>
                     <div>
                        <div className='partner-image-box'>
                            <img src={PartnerLogo} alt='partner' />
                        </div>
                    </div>
                     <div>
                        <div className='partner-image-box'>
                            <img src={PartnerLogo} alt='partner' />
                        </div>
                    </div>
                     <div>
                        <div className='partner-image-box'>
                            <img src={PartnerLogo} alt='partner' />
                        </div>
                    </div>
                     <div>
                        <div className='partner-image-box'>
                            <img src={PartnerLogo} alt='partner' />
                        </div>
                    </div>
                     <div>
                        <div className='partner-image-box'>
                            <img src={PartnerLogo} alt='partner' />
                        </div>
                    </div>
                     <div>
                        <div className='partner-image-box'>
                            <img src={PartnerLogo} alt='partner' />
                        </div>
                    </div>
                </Slider>
            </div>
        </section>
    )
}

export default Partner
