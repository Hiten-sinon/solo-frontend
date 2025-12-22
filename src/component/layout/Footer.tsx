import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Logo } from "../../assets/images";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { fetchLinksFooter } from "../../redux/slice/homepage/linksFooterSlice";
import type { AppDispatch, RootState } from "../../redux/store";

/* Optional strong typing */
interface SocialLink {
  name: string;
  url: string;
  icon_class: string;
}

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { data: socialLinks, loading } = useSelector(
    (state: RootState) => state.linksFooter
  );

  useEffect(() => {
    if (!socialLinks) {
      dispatch(fetchLinksFooter());
    }
  }, [dispatch, socialLinks]);

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={6}>
            <div className="footer-logo">
              <img src={Logo} alt="logo" loading="lazy" />
              <h4>{t("footer.workWithUs")}</h4>
              <Button className="btn btn-teal">
                {t("footer.inquiryBtn")}
              </Button>
            </div>
          </Col>

          <Col md={6}>
            <div className="navigation">
              <h5>{t("footer.navigationTitle")}</h5>
              <ul>
                <li><Link to="/">{t("footer.navigation.home")}</Link></li>
                <li><Link to="/about">{t("footer.navigation.about")}</Link></li>
                <li><Link to="/service">{t("footer.navigation.services")}</Link></li>
                <li><Link to="/projects">{t("footer.navigation.projects")}</Link></li>
              </ul>
            </div>

            <div className="contact-link">
              <h5>{t("footer.contactTitle")}</h5>
              <ul>
                <li>
                  <a href="tel:+18919891191">
                    {t("footer.contact.phone")}
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@logoipsum.com">
                    {t("footer.contact.email")}
                  </a>
                </li>
                <li>{t("footer.contact.address")}</li>
              </ul>
            </div>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copy-text">
            {t("footer.copyright")}
          </p>

          {/* IMPORTANT: keep <ul> always rendered to avoid layout shift */}
          <ul className="social-media">
            {loading && (
              <>
                <li className="social-skeleton" />
                <li className="social-skeleton" />
                <li className="social-skeleton" />
              </>
            )}

            {!loading &&
              socialLinks?.map((item: SocialLink) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <i className={item.icon_class}></i>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
