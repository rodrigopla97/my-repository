import { usePortfolio } from '../../containers/states/portfolioProvider';
import useRoutes from '../../containers/hooks/useRoutes';

export default function HeaderMenuInterface() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, isDarkMode, tabdataItems } = getPortfolioState;
  const { pathname, navigate } = useRoutes();

  function handleNavigate(path: string) {
    if (pathname === path) window.location.reload();
    else navigate(path);
  }

  return (
    <div className="hidden sm:flex sm:justify-center sm:items-center">
      <div className="flex items-center gap-1">
        {tabdataItems.map((tab, index) => (
          <span
            key={index}
            onClick={() => handleNavigate(tab.path)}
            className={`cursor-pointer relative w-24 text-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${
              pathname === tab.path
                ? `${!isDarkMode ? "text-cvButtonPrimary bg-cvButtonPrimary/15 ring-1 ring-cvButtonPrimary/30" : "text-cvButtonSecondary bg-cvButtonSecondary/15 ring-1 ring-cvButtonSecondary/30"}`
                : `${textColor} ${!isDarkMode ? "hover:text-cvButtonPrimary hover:bg-cvButtonPrimary/10" : "hover:text-cvButtonSecondary hover:bg-cvButtonSecondary/10"}`
            }`}
          >
            {tab.name}
          </span>
        ))}
      </div>
    </div>
  );
}
