import { BASE_TABS, INITIAL_STATE } from "@app/modules/portfolio/constants/constants";
import type {
  PortfolioContextType,
  PortfolioStateType,
  ProviderProps
} from "@app/modules/portfolio/entities/entities";
import { getTabs } from "@app/modules/portfolio/services/services";
import { PortfolioContext } from "@app/modules/portfolio/states/portfolioContext";
import { useContext, useEffect, useState } from "react";

export default function PortfolioProvider({ children }: ProviderProps) {
  const [getPortfolioState, setPortfolioState] = useState<PortfolioStateType>(() => ({
    ...INITIAL_STATE.PORTFOLIO_PAGE,
    isDarkMode: JSON.parse(localStorage.getItem("isDarkMode") ?? "true")
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

  return (
    <PortfolioContext.Provider value={{ getPortfolioState, setPortfolioState }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioProvider() {
  return useContext(PortfolioContext) as PortfolioContextType;
}
