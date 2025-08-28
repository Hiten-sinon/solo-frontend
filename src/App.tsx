import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './page/Homepage'
import Header from './component/layout/Header'
import Footer from './component/layout/Footer'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import './assets/css/style.css'
import './assets/css/responsive.css'

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
