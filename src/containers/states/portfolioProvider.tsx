import { useState, useContext, useEffect } from 'react';
import { PortfolioContext } from './portfolioContext';
import { PortfolioContextType, PortfolioStateType, ProviderProps } from '../entities/entities';
import { INITIAL_STATE, TAB_DATA_ITEMS } from '../constants/constants';
import { getTabs } from '../../services/tabsService';

export default function PortfolioProvider({ children }: ProviderProps) {
  const [getPortfolioState, setPortfolioState] = useState<PortfolioStateType>(() => ({
    ...INITIAL_STATE.PORTFOLIO,
    isDarkMode: JSON.parse(localStorage.getItem('isDarkMode') ?? 'true'),
  }));

  function onInitPortfolioPage() {
    getTabsData();
  }

  async function getTabsData() {
    try {
      const res = await getTabs();
      const sorted = [...res.data].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
      setPortfolioState(state => ({ ...state, tabsLoading: false, tabdataItems: sorted }));
    } catch {
      setPortfolioState(state => ({ ...state, tabsLoading: false, tabdataItems: TAB_DATA_ITEMS }));
    }
  }

  useEffect(onInitPortfolioPage, []);

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
  }, [getPortfolioState.isDarkMode]);

  return (
    <PortfolioContext.Provider value={{ getPortfolioState, setPortfolioState }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext) as PortfolioContextType;
}
