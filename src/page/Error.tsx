import react from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
const Error = () => {
  const { t } = useTranslation();
  return (
    <div className="error">
      <Container>
        <div className="error-content">
          <h1>{t("Error.title")}</h1>
          <h2>{t("Error.subtitle")}</h2>
          <p>{t("Error.description")}</p>
          <a href="/" className="home-btn">
            <i className="bi bi-arrow-left-circle "></i>
            <span>{t("Error.backhome")}</span>
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Error;
