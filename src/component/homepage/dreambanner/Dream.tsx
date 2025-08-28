import React from "react";
import { Dreams } from "../../../assets/images";
import useScrollAnimation from "../../../../useScrollAnimation";
import { useTranslation } from "react-i18next";

const Dream: React.FC = () => {
  const [dreamRef, isVisible] = useScrollAnimation<HTMLDivElement>();
  const { t } = useTranslation();

  return (
    <section
      ref={dreamRef}
      className={`dream fade-up ${isVisible ? "visible" : ""}`}
    >
      <div className="dream-image">
        <img src={Dreams} alt={t("dream.title")} loading="lazy"/>
      </div>
      <div className="dream-text">
        <h3>{t("dream.title")}</h3>
      </div>
    </section>
  );
};

export default Dream;
