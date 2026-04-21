import { useState, useContext, useEffect } from 'react';
import { PortfolioContext } from './portfolioContext';
import { PortfolioContextType, PortfolioStateType, ProviderProps, Language } from '../entities/entities';
import { TRANSLATIONS, INITIAL_STATE } from '../constants/constants';

export default function PortfolioProvider({ children }: ProviderProps) {
  const [getPortfolioState, setPortfolioState] = useState<PortfolioStateType>(() => ({
    ...INITIAL_STATE.PORTFOLIO,
    isDarkMode: JSON.parse(localStorage.getItem('isDarkMode') ?? 'true'),
    language: 'es' as Language,
  }));

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

  useEffect(() => {
    const { language } = getPortfolioState;
    setPortfolioState((state) => ({
      ...state,
      tabdataItems: TRANSLATIONS[language].tabDataItems,
      jobExperiencesContext: TRANSLATIONS[language].jobExperiences,
    }));
  }, [getPortfolioState.language]);

  return (
    <PortfolioContext.Provider value={{ getPortfolioState, setPortfolioState }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext) as PortfolioContextType;
}
