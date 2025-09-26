import React from "react";
import ServiceBanner from "../../assets/images/servicebanner.jpg";
const Banner: React.FC = () => {
    return (
        <section className="service-banner">
            <div className="banner-img">
                <img src={ServiceBanner} alt="banner_img" className="img-fluid" />
                <div className="service-banner-content">
                    <h1>Our Services</h1>
                </div>
            </div>
        </section>
    );
};
export default Banner;