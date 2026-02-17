import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchLinksFooter } from "../../redux/slice/homepage/linksFooterSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchFooter } from "../../redux/slice/footerSlice";

/* Optional strong typing */
interface SocialLink {
  name: string;
  url: string;
  icon_class: string;
}

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { data: socialLinks, loading } = useSelector(
    (state: RootState) => state.linksFooter
  );
  const { data: footerData } = useSelector((state: RootState) => state.footer);

  useEffect(() => {
    if (!footerData) {
      dispatch(fetchFooter());
    }
  }, [dispatch, footerData]);

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
              <img
                src={footerData?.logo_url}
                alt="footer logo"
                loading="lazy"
              />
              {/* <h4>
                {i18n.language === "ar"
                  ? footerData?.heading_ar
                  : footerData?.heading_en}
              </h4>

              <Button className="btn btn-teal">
                {i18n.language === "ar"
                  ? footerData?.button_name_ar
                  : footerData?.button_name_en}
              </Button> */}
            </div>
          </Col>

          <Col md={6}>
            <div className="navigation">
              <h5>{t("footer.navigationTitle")}</h5>
              <ul>
                <li>
                  <Link to="/">{t("footer.navigation.home")}</Link>
                </li>
                <li>
                  <Link to="/about">{t("footer.navigation.about")}</Link>
                </li>
                <li>
                  <Link to="/service">{t("footer.navigation.services")}</Link>
                </li>
                <li>
                  <Link to="/contact">{t("contact")}</Link>
                </li>
              </ul>
            </div>

            <div className="contact-link">
              <h5>{t("footer.contactTitle")}</h5>
              <ul>
                <li>
                  <a href={`tel:${footerData?.phone}`}>{footerData?.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${footerData?.email}`}>
                    {footerData?.email}
                  </a>
                </li>
                <li>
                  {i18n.language === "ar"
                    ? footerData?.address_ar
                    : footerData?.address_en}
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copy-text"> © {new Date().getFullYear()} {footerData?.copyright_text}</p>

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
