import React from "react";
import { Dreams } from "../../../assets/images";
import { useTranslation } from "react-i18next";

const Dream: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="dream">
      <div className="dream-image">
        <img src={Dreams} alt={t("dream.title")} loading="lazy" />
      </div>
      <div className="dream-text">
        <h3>{t("dream.title")}</h3>
      </div>
    </section>
  );
};

export default Dream;
