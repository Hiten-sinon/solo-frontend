import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './page/Homepage'
import Header from './component/layout/Header'
import Footer from './component/layout/Footer'
import Servicepage from './page/Servicepage'
import Aboutpage from './page/Aboutpage'
import Contactpage from './page/Contactpage'
import Blogpage from './page/Blogpage'
import Interiorpage from './page/Interiorpage'
import BlogDetailspage from './page/BlogDetailspage'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Inquirypage from './page/Inquirypage'
import Exteriorpage from './page/Exteriorpage'
import Error from './page/Error'
import './App.css'
import './assets/css/style.css'
import './assets/css/responsive.css'
import Careerpage from './page/Careerpage'
const App: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <>
      <BrowserRouter>
      <Header />
       <ToastContainer/>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/service" element={<Servicepage />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/blog" element={<Blogpage />} />
          <Route path="/blog/:id" element={<BlogDetailspage />} />
          <Route path="/interior" element={<Interiorpage />} />
          <Route path="/inquiry" element={<Inquirypage />} />
          <Route path="/exterior" element={<Exteriorpage />} />
          <Route path="/career" element={<Careerpage />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
