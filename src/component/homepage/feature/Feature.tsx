import { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatures } from "../../../redux/slice/featureSlice";
import type { AppDispatch, RootState } from "../../../redux/store";
import useScrollAnimation from "../../../../useScrollAnimation";
import { useTranslation } from "react-i18next";

function Feature() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.features
  );
  const [key, setKey] = useState<string>("0");

  const [refFeature, isVisible] = useScrollAnimation<HTMLDivElement>();
  console.log(isVisible,'isVisible');

  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    dispatch(fetchFeatures());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div ref={refFeature} className={`feature fade-up ${isVisible ? "visible" : ""}`}>
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
                  <div className="future-image">
                    <img src={feature.images_url} alt={title} loading="lazy" />
                  </div>
                  <div className="future-info">
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
