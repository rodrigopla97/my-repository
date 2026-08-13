import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { translations } from "@app/modules/portfolio/translations/translations";

export function useTranslations() {
  const { getPortfolioState } = usePortfolioProvider();
  return translations[getPortfolioState.language];
}
