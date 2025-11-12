import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/slice/servicepage/serviceTabSlice";
import type { RootState, AppDispatch } from "../../redux/store";
import Loader from "../loader/Loader";
import { useTranslation } from "react-i18next";

const ServiceTab: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, serviceTabloading, error } = useSelector(
    (state: RootState) => state.serviceTab
  );

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [parentKey, setParentKey] = useState("0");
  const [childKey, setChildKey] = useState("0");

  // Fetch services
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Set default parent/child keys
  useEffect(() => {
    if (services.length > 0) {
      setParentKey(String(services[0].id));
      if (services[0].sub_features?.length > 0) {
        setChildKey(String(services[0].sub_features[0].id));
      }
    }
  }, [services]);

  // Reset childKey when parent changes
  useEffect(() => {
    const parent = services.find((s) => String(s.id) === parentKey);
    if (parent && parent.sub_features?.length > 0) {
      setChildKey(String(parent.sub_features[0].id));
    }
  }, [parentKey, services]);

  if (serviceTabloading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <section
      className={`service-tab ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={i18n.language}
    >
      <Container>
        <div className="service-tab-content">
          <Tabs
            id="parent-tabs"
            activeKey={parentKey}
            onSelect={(k) => setParentKey(k as string)}
            className="mb-5 parent-tab-nav"
          >
            {services.map((service) => (
              <Tab
                key={service.id}
                eventKey={String(service.id)}
                title={
                  isArabic
                    ? service.name_ar || service.name_en
                    : service.name_en
                }
              >
                <Tabs
                  id={`child-tabs-${service.id}`}
                  activeKey={childKey}
                  onSelect={(k) => setChildKey(k as string)}
                  className="servicetab-btn"
                >
                  {service.sub_features?.map((sub) => (
                    <Tab
                      key={sub.id}
                      eventKey={String(sub.id)}
                      title={
                        isArabic
                          ? sub.name_ar || sub.name_en
                          : sub.name_en
                      }
                    >
                      <div className="feature-content">
                        <div className="feature-image">
                          <img
                            src={sub.images_url}
                            alt={
                              isArabic
                                ? sub.name_ar || sub.name_en
                                : sub.name_en
                            }
                            loading="lazy"
                          />
                        </div>
                        <div className="feature-info">
                          <p>
                            {isArabic
                              ? sub.discription_ar || sub.discription_en
                              : sub.discription_en}
                          </p>
                        </div>
                      </div>
                    </Tab>
                  ))}
                </Tabs>
              </Tab>
            ))}
          </Tabs>
        </div>
      </Container>
    </section>
  );
};

export default ServiceTab;
