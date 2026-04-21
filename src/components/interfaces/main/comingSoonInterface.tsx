import { usePortfolio } from '../../../containers/states/portfolioProvider';
import { TRANSLATIONS } from '../../../containers/constants/constants';

export default function ComingSoonInterface() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, language } = getPortfolioState;
  const { comingSoon } = TRANSLATIONS[language];

  return (
    <div className={`flex flex-col items-center justify-center w-screen min-h-screen gap-6 ${textColor} px-6`}>
      <span className="text-5xl">🛠️</span>
      <h2 className="text-2xl md:text-3xl font-bold text-center">{comingSoon.title}</h2>
      <p className={`text-center max-w-md opacity-70`}>{comingSoon.description}</p>
      {/* <div className={`mt-2 px-5 py-1 rounded-full text-sm font-semibold border ${isDarkMode ? 'border-cvButtonSecondary text-cvButtonSecondary' : 'border-cvButtonPrimary text-cvButtonPrimary'}`}>
        Próximamente
      </div> */}
    </div>
  );
}
