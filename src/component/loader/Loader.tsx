import React from "react";
import LoaderLogo from "../../assets/images/logo.svg";
import "./loader.css";
const Loader: React.FC = () => {
    return (
        <div>
            <div className="loader">
                <div className="loader-img">
                    <img src={LoaderLogo} alt="Loader_img" loading="lazy" />
                </div>
            </div>
        </div>
    );
};

export default Loader;
