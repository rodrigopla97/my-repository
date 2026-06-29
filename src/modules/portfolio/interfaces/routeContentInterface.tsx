import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import LoadingInterface from '@app/modules/main/interfaces/loadingInterface';
import HomePage from '@app/modules/portfolio/interfaces/home/homeModule';
import AboutPage from '@app/modules/portfolio/interfaces/about/aboutModule';
import ProjectsPage from '@app/modules/portfolio/interfaces/projects/projectsModule';
import ErrorPage from '@app/modules/portfolio/interfaces/error/errorModule';
import ComingSoonInterface from '@app/modules/main/interfaces/comingSoonInterface';
import { usePortfolio } from '@app/modules/portfolio/states/portfolioProvider';
import { BASE_TABS } from '@app/modules/portfolio/constants/constants';

function FallbackRoute() {
  const { pathname } = useLocation();
  const { getPortfolioState } = usePortfolio();
  const allTabs = [...getPortfolioState.tabdataItems, ...BASE_TABS];
  const isKnownTab = allTabs.some(tab => tab.path === pathname);
  return isKnownTab ? <ComingSoonInterface /> : <Navigate to="/error" replace />;
}

export default function RouteContent() {
  const { getPortfolioState } = usePortfolio();
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
      {(isLoading || tabsLoading) ? (
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
};
