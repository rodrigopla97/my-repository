import { usePortfolio } from '../../containers/states/portfolioProvider';
import { TRANSLATIONS } from '../../containers/constants/constants';
import useRoutes from '../../containers/hooks/useRoutes';

export default function NotFoundInterface() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, isDarkMode, language } = getPortfolioState;
  const { notFound } = TRANSLATIONS[language];
  const { navigate } = useRoutes();

  return (
    <div className={`flex flex-col items-center justify-center w-screen h-screen gap-6 ${textColor}`}>
      <span className="text-6xl">🚧</span>
      <h1 className="text-3xl font-bold">{notFound.title}</h1>
      <p className="text-center opacity-70 max-w-sm">{notFound.description}</p>
      <button
        onClick={() => navigate('/')}
        className={`mt-4 px-6 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-80 ${isDarkMode ? 'bg-cvButtonSecondary' : 'bg-cvButtonPrimary'}`}
      >
        {notFound.back}
      </button>
    </div>
  );
}
