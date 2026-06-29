import { BASE_TABS } from "@app/modules/portfolio/constants/constants";
import AboutPage from "@app/modules/portfolio/interfaces/about/aboutInterface";
import ComingSoonInterface from "@app/modules/portfolio/interfaces/comingSoonInterface";
import ErrorPage from "@app/modules/portfolio/interfaces/error/errorInterface";
import HomePage from "@app/modules/portfolio/interfaces/home/homePageInterface";
import LoadingInterface from "@app/modules/portfolio/interfaces/loadingInterface";
import ProjectsPage from "@app/modules/portfolio/interfaces/projects/projectsInterface";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useLayoutEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

function FallbackRoute() {
  const { pathname } = useLocation();
  const { getPortfolioState } = usePortfolioProvider();
  const allTabs = [...getPortfolioState.tabdataItems, ...BASE_TABS];
  const isKnownTab = allTabs.some((tab) => tab.path === pathname);
  return isKnownTab ? <ComingSoonInterface /> : <Navigate to="/error" replace />;
}

export default function RouteContent() {
  const { getPortfolioState } = usePortfolioProvider();
  const { tabsLoading } = getPortfolioState;
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading || tabsLoading ? (
        <LoadingInterface />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<FallbackRoute />} />
        </Routes>
      )}
    </>
  );
}
