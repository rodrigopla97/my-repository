import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import LoadingInterface from "./loadingInterface";
import HomePage from "../../routes/main/mainPage";
import AboutPage from "../../routes/about/aboutPage";
import ContactPage from "../../routes/contact/contactPage";
import ErrorPage from "../../routes/error/errorPage";
import ComingSoonInterface from "./main/comingSoonInterface";
import { TAB_DATA_ITEMS } from "../../containers/constants/constants";

function FallbackRoute() {
  const { pathname } = useLocation();
  const isKnownTab = TAB_DATA_ITEMS.some(tab => tab.path === pathname);
  return isKnownTab ? <ComingSoonInterface /> : <Navigate to="/error" replace />;
}

export default function RouteContent() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
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
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<FallbackRoute />} />
        </Routes>
      )}
    </>
  );
};


