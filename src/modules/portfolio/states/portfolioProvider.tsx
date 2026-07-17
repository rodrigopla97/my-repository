import type { ChildrenType } from "@app/modules/main/entities/entities";
import { BASE_TABS, INITIAL_STATE } from "@app/modules/portfolio/constants/constants";
import type {
  PortfolioContextType,
  PortfolioStateType
} from "@app/modules/portfolio/entities/entities";
import { getTabs } from "@app/modules/portfolio/services/services";
import { PortfolioContext } from "@app/modules/portfolio/states/portfolioContext";
import { useContext, useEffect, useState } from "react";

export default function PortfolioProvider({ children }: ChildrenType) {
  const [getPortfolioState, setPortfolioState] = useState<PortfolioStateType>(() => ({
    ...INITIAL_STATE.PORTFOLIO_PAGE,
    isDarkMode: JSON.parse(localStorage.getItem("isDarkMode") ?? "true"),
    language: (localStorage.getItem("language") as "es" | "en") ?? "es"
  }));

  useEffect(() => {
    async function getTabsData() {
      let tabdataItems = BASE_TABS;
      try {
        const res = await getTabs();
        const apiTabs = [...res.data].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
        tabdataItems = [
          ...BASE_TABS,
          ...apiTabs.filter((t) => !BASE_TABS.some((b) => b.path === t.path))
        ];
      } catch {
        // tabdataItems remains BASE_TABS
      } finally {
        setPortfolioState((state) => ({ ...state, tabsLoading: false, tabdataItems }));
      }
    }
    getTabsData();
  }, []);

  useEffect(() => {
    const { isDarkMode } = getPortfolioState;
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
    setPortfolioState((state) => ({
      ...state,
      textColor: isDarkMode ? "text-grayPrimary" : "text-black",
      borderColor: isDarkMode ? "border-grayPrimary" : "border-black",
      bgColor: isDarkMode ? "bg-black" : "bg-grayPrimary"
    }));
  }, [getPortfolioState.isDarkMode, getPortfolioState]);

  useEffect(() => {
    localStorage.setItem("language", getPortfolioState.language);
  }, [getPortfolioState.language]);

  return (
    <PortfolioContext.Provider value={{ getPortfolioState, setPortfolioState }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioProvider() {
  return useContext(PortfolioContext) as PortfolioContextType;
}
