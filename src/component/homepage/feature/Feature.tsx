import { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatures } from "../../../redux/slice/homepage/featureSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import { useTranslation } from "react-i18next";
import Loader from "../../loader/Loader";

const Feature: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, featureloading, error } = useSelector(
    (state: RootState) => state.features
  );
  const [key, setKey] = useState<string>("0");

  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    dispatch(fetchFeatures());
  }, [dispatch]);

  if (featureloading) return <Loader />;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="feature">
      <Container className="position-relative">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k as string)}
          className="mb-3"
        >
          {data.map((feature, index) => {
            const title =
              currentLang === "ar" ? feature.title_ar : feature.title_en;
            const subTitle =
              currentLang === "ar"
                ? feature.sub_title_ar
                : feature.sub_title_en;

            return (
              <Tab key={feature.id} eventKey={String(index)} title={title}>
                <div className="feauture-content">
                  <div className="feature-image" data-aos="fade-up">
                    <img src={feature.images_url} alt={title} loading="lazy" />
                  </div>
                  <div className="feature-info" data-aos="fade-up">
                    <p>{subTitle}</p>
                  </div>
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </Container>
    </div>
  );
}

export default Feature;
