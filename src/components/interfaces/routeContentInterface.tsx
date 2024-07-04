import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingInterface from "./loadingInterface";
import MainPage from "../../routes/main/mainPage";
import AboutPage from "../../routes/about/aboutPage";
import ContactPage from "../../routes/contact/contactPage";

export default function RouteContent() {
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


