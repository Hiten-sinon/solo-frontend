import React from "react";
import Banner from "../component/servicepage/Banner";
import ServiceCard from "../component/servicepage/ServiceCard";
import ServiceTab from "../component/servicepage/ServiceTab";
import SoloDifferent from "../component/servicepage/SoloDifferent";
import ServiceBlog from "../component/servicepage/ServiceBlog";
const Servicepage: React.FC = () => {
  return (
    <>
        <Banner />
        <ServiceCard />
        <ServiceTab />
        <SoloDifferent />
        <ServiceBlog />
    </>
  );
};
export default Servicepage;