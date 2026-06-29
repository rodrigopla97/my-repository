import { useState, useContext, useEffect } from 'react';
import { PortfolioContext } from '@app/modules/portfolio/states/portfolioContext';
import type { PortfolioContextType, PortfolioStateType, ProviderProps } from '@app/modules/portfolio/entities/entities';
import { INITIAL_STATE, BASE_TABS } from '@app/modules/portfolio/constants/constants';
import { getTabs } from '@app/modules/portfolio/services/tabsService';

export default function PortfolioProvider({ children }: ProviderProps) {
  const [getPortfolioState, setPortfolioState] = useState<PortfolioStateType>(() => ({
    ...INITIAL_STATE.PORTFOLIO,
    isDarkMode: JSON.parse(localStorage.getItem('isDarkMode') ?? 'true'),
  }));

  useEffect(() => {
    async function getTabsData() {
      try {
        const res = await getTabs();
        const apiTabs = [...res.data].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
        const merged = [
          ...BASE_TABS,
          ...apiTabs.filter(t => !BASE_TABS.some(b => b.path === t.path)),
        ];
        setPortfolioState(state => ({ ...state, tabsLoading: false, tabdataItems: merged }));
      } catch {
        setPortfolioState(state => ({ ...state, tabsLoading: false, tabdataItems: BASE_TABS }));
      }
    }
    getTabsData();
  }, []);

  useEffect(() => {
    const { isDarkMode } = getPortfolioState;
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
    setPortfolioState((state) => ({
      ...state,
      textColor: isDarkMode ? "text-grayPrimary" : "text-black",
      borderColor: isDarkMode ? "border-grayPrimary" : "border-black",
      bgColor: isDarkMode ? "bg-black" : "bg-grayPrimary",
    }));
  }, [getPortfolioState.isDarkMode, getPortfolioState]);

  return (
    <PortfolioContext.Provider value={{ getPortfolioState, setPortfolioState }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext) as PortfolioContextType;
}
