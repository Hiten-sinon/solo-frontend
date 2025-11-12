import React from "react";
import ServiceBanner from "../../assets/images/servicebanner.jpg";
import { useTranslation } from "react-i18next";

const Banner: React.FC = () => {
  const { t, i18n } = useTranslation(); // ✅ extract t and i18n

  const isArabic = i18n.language === "ar";

  return (
    <section
      className={`service-banner ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="banner-img position-relative">
        <img
          src={ServiceBanner}
          alt="service banner"
          className="img-fluid w-100"
          loading="lazy"
        />
        <div className="service-banner-content ">
          <h1 data-aos="fade-up">
            {t("Services.services_title") || (isArabic ? "خدماتنا" : "Our Services")}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Banner;
