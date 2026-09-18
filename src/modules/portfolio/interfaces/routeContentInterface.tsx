import { BASE_TABS } from "@app/modules/portfolio/constants/constants";
import AboutPage from "@app/modules/portfolio/interfaces/about/aboutInterface";
import ComingSoonInterface from "@app/modules/portfolio/interfaces/comingSoonInterface";
import ContentBlocksInterface from "@app/modules/portfolio/interfaces/contentBlocksInterface";
import ErrorPage from "@app/modules/portfolio/interfaces/error/errorInterface";
import HomePage from "@app/modules/portfolio/interfaces/home/homePageInterface";
import LoadingInterface from "@app/modules/portfolio/interfaces/loadingInterface";
import ProjectsPage from "@app/modules/portfolio/interfaces/projects/projectsInterface";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

function FallbackRoute() {
  const { pathname } = useLocation();
  const { getPortfolioState } = usePortfolioProvider();
  const { language, tabsLoading } = getPortfolioState;
  const allTabs = [...getPortfolioState.tabdataItems, ...BASE_TABS];
  const normalize = (p: string) => (p.startsWith("/") ? p : `/${p}`);
  const matchedTab = allTabs.find((tab) => normalize(tab.path) === pathname);
  if (!matchedTab) {
    if (tabsLoading) return <LoadingInterface />;
    return <Navigate to="/error" replace />;
  }
  if (matchedTab.content?.length) {
    const title =
      (language === "es" ? matchedTab.contentTitleEs : matchedTab.contentTitleEn) ||
      matchedTab.contentTitleEs ||
      (language === "es" ? matchedTab.nameEs : matchedTab.nameEn) ||
      matchedTab.name;
    return <ContentBlocksInterface title={title} blocks={matchedTab.content} />;
  }
  return <ComingSoonInterface />;
}

export default function RouteContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    window.scrollTo(0, 0);
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 300));
    Promise.all([document.fonts.ready, minDelay]).then(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {isLoading ? (
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
