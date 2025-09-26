import React, { useEffect } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import villa from "../../assets/images/feauture-02.webp";
import Gallery from "../../assets/images/feauture-03.webp";

const ServiceTab: React.FC = () => {
  const [parentKey, setParentKey] = React.useState("1");
  const [childKey, setChildKey] = React.useState("1");

  useEffect(() => {
    setChildKey("1");
  }, [parentKey]);

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
            <Tab eventKey="1" title="Santorini villa">
              <Tabs
                id="child-tabs-1"
                activeKey={childKey}
                onSelect={(k) => setChildKey(k as string)}
                className=" servicetab-btn"
              >
                <Tab eventKey="1" title="Villa Details">
                  <div className="feature-content">
                    <div className="feature-image">
                      <img src={villa} alt="santorini villa" loading="lazy" />
                    </div>
                    <div className="feature-info">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusantium aliquid, velit alias dolor atque numquam
                        tempora ad maxime, excepturi blanditiis aperiam magni,
                        ipsa sint aut natus accusamus ipsum illum minus?
                      </p>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="2" title="Gallery">
                  <div className="feature-content">
                    <div className="feature-image">
                      <img src={Gallery} alt="Gallery" loading="lazy" />
                    </div>
                    <div className="feature-info">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusantium aliquid, velit alias dolor atque numquam
                        tempora ad maxime, excepturi blanditiis aperiam magni,
                        ipsa sint aut natus accusamus ipsum illum minus?
                      </p>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Tab>

            <Tab eventKey="2" title="Wehda bank">
              <Tabs
                id="child-tabs-2"
                activeKey={childKey}
                onSelect={(k) => setChildKey(k as string)}
                className=" servicetab-btn"
              >
                <Tab eventKey="1" title="Bank Overview">
                  <div className="feature-content">
                    <div className="feature-image">
                      <img src={villa} alt="santorini villa" loading="lazy" />
                    </div>
                    <div className="feature-info">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusantium aliquid, velit alias dolor atque numquam
                        tempora ad maxime, excepturi blanditiis aperiam magni,
                        ipsa sint aut natus accusamus ipsum illum minus?
                      </p>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="2" title="Services">
                  <div className="feature-content">
                    <div className="feature-image">
                      <img src={villa} alt="santorini villa" loading="lazy" />
                    </div>
                    <div className="feature-info">
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusantium aliquid, velit alias dolor atque numquam
                        tempora ad maxime, excepturi blanditiis aperiam magni,
                        ipsa sint aut natus accusamus ipsum illum minus?
                      </p>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </section>
  );
};

export default ServiceTab;
