import { useTranslations } from "@app/modules/portfolio/hooks/useTranslations";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";

export default function ComingSoonInterface() {
  const { getPortfolioState } = usePortfolioProvider();
  const { textColor } = getPortfolioState;
  const translations = useTranslations();

  return (
    <div
      className={`flex flex-col items-center justify-center w-screen min-h-screen gap-6 ${textColor} px-6`}
    >
      <span className="text-5xl">🛠️</span>
      <h2 className="text-2xl md:text-3xl font-bold text-center">{translations.comingSoon}</h2>
      <p className="text-center max-w-md opacity-70">{translations.comingSoonDesc}</p>
    </div>
  );
}
