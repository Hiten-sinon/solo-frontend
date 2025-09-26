import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './page/Homepage'
import Header from './component/layout/Header'
import Footer from './component/layout/Footer'
import Servicepage from './page/Servicepage'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import './assets/css/style.css'
import './assets/css/responsive.css'
import Aboutpage from './page/Aboutpage'
import Contactpage from './page/Contactpage'
import Blogpage from './page/Blogpage'
import Interiorpage from './page/Interiorpage'

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/service" element={<Servicepage />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/blog" element={<Blogpage />} />
          <Route path="/interior" element={<Interiorpage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
