import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import HeaderInterface from '../components/interfaces/headerInterface';
import MainPage from './main/mainPage';
import ContactPage from './contact/contactPage';
import FooterInterface from '../components/interfaces/footerInterface';
import LoadingInterface from '../components/interfaces/loadingInterface';
import { ThemeProvider } from '../context/themeContext';
import AboutPage from './about/aboutPage';

function RouteContent() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {isLoading ? (
        <LoadingInterface />
      ) : (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      )}
    </>
  );
};

export default function RoutesProvider() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <HeaderInterface />
        <RouteContent />
        <FooterInterface />
      </BrowserRouter>
    </ThemeProvider>
  );
}
