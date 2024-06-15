import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import CurriculumPage from './curriculum/curriculumPage';
import HeaderInterface from '../components/interfaces/headerInterface';
import MainPage from './main/mainPage';
import ContactPage from './contact/contactPage';
import FooterInterface from '../components/interfaces/footerInterface';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RoutesProvider = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HeaderInterface />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <FooterInterface />
    </BrowserRouter>
  );
};

export default RoutesProvider;
