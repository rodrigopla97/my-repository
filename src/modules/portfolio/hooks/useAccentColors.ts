import { usePortfolio } from '@app/modules/portfolio/states/portfolioProvider';

export function useAccentColors() {
  const { getPortfolioState } = usePortfolio();
  const { isDarkMode } = getPortfolioState;

  return {
    accentColor:       isDarkMode ? 'text-cvButtonSecondary'     : 'text-cvButtonPrimary',
    accentBg:          isDarkMode ? 'bg-cvButtonSecondary'        : 'bg-cvButtonPrimary',
    accentBgFaint:     isDarkMode ? 'bg-cvButtonSecondary/30'     : 'bg-cvButtonPrimary/30',
    accentBorder:      isDarkMode ? 'border-cvButtonSecondary'    : 'border-cvButtonPrimary',
    accentBorderFaint: isDarkMode ? 'border-cvButtonSecondary/30' : 'border-cvButtonPrimary/30',
    accentRing:        isDarkMode ? 'ring-cvButtonSecondary/30'   : 'ring-cvButtonPrimary/30',
    isDarkMode,
  };
}
