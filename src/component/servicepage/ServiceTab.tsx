import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/slice/servicepage/servicetabSlice";
import type { RootState, AppDispatch } from "../../redux/store";

const ServiceTab: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector(
    (state: RootState) => state.serviceTab
  );

  const [parentKey, setParentKey] = useState("0");
  const [childKey, setChildKey] = useState("0");

  // Fetch services on mount
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Set default parent/child keys when data is loaded
  useEffect(() => {
    if (services.length > 0) {
      setParentKey(String(services[0].id));
      if (services[0].sub_features?.length > 0) {
        setChildKey(String(services[0].sub_features[0].id));
      }
    }
  }, [services]);

  // Reset childKey when parentKey changes
  useEffect(() => {
    const parent = services.find((s) => String(s.id) === parentKey);
    if (parent && parent.sub_features?.length > 0) {
      setChildKey(String(parent.sub_features[0].id));
    }
  }, [parentKey, services]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="service-tab">
      <Container>
        <div className="service-tab-content">
          <Tabs
            id="parent-tabs"
            activeKey={parentKey}
            onSelect={(k) => setParentKey(k as string)}
            className="mb-5"
          >
            {services.map((service) => (
              <Tab
                key={service.id}
                eventKey={String(service.id)}
                title={service.name_en}
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
                      title={sub.name_en}
                    >
                      <div className="feature-content">
                        <div className="feature-image">
                          <img
                            src={sub.images_url}
                            alt={sub.name_en}
                            loading="lazy"
                          />
                        </div>
                        <div className="feature-info">
                          <p>{sub.discription_en}</p>
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
