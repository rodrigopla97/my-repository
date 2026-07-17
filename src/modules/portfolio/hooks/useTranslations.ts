import { translations } from "@app/modules/portfolio/translations/translations";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";

export function useTranslations() {
  const { getPortfolioState } = usePortfolioProvider();
  return translations[getPortfolioState.language];
}
