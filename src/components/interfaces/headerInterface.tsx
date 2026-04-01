import HeaderMenuInterface from './headerMenuInterface';
import { SidenavMenuInterface } from './sidenavMenuInterface';
import lightLogo from '../../images/black-logo.png';
import darkLogo from '../../images/gray-logo.png';
import { usePortfolio } from '../../containers/states/portfolioProvider';
import { Link } from 'react-router-dom';

export default function HeaderInterface() {
  const { getPortfolioState, setPortfolioState } = usePortfolio();
  const { isDarkMode, bgColor, textColor } = getPortfolioState;

  return (
    <div className={`max-h-[10vh] flex justify-between items-center pr-4 md:pl-4 fixed w-full ${textColor} z-20 ${bgColor} md:backdrop-blur-md md:bg-opacity-60`}>
      <SidenavMenuInterface />
      <div className="flex items-center justify-center w-20 h-[10vh]">
        <Link to="/">
          <img src={isDarkMode ? darkLogo : lightLogo} alt="Logo" />
        </Link>
      </div>
      <HeaderMenuInterface />
      <div className="flex items-center justify-center w-20 h-[10vh]">
        <button
          onClick={() => setPortfolioState(prevState => ({ ...prevState, isDarkMode: !prevState.isDarkMode }))}
          className={`relative flex items-center justify-between rounded-full p-1 border transition-all duration-300 hover:scale-105 active:scale-95 w-14 h-7 ${isDarkMode ? "border-cvButtonSecondary/40 bg-cvButtonSecondary/10" : "border-cvButtonPrimary/30 bg-cvButtonPrimary/10"}`}
        >
          <span className={`absolute w-5 h-5 rounded-full transition-all duration-300 shadow-sm ${isDarkMode ? "translate-x-7 bg-cvButtonSecondary/60" : "translate-x-0 bg-cvButtonPrimary/60"}`} />
          <span className="z-10 w-5 h-5 flex items-center justify-center">
            <i className={`material-symbols-outlined text-base transition-all duration-200 ${!isDarkMode ? "text-white" : "text-white/30"}`} >light_mode</i>
          </span>
          <span className="z-10 w-5 h-5 flex items-center justify-center">
            <i className={`material-symbols-outlined text-base transition-all duration-200 ml-1 ${isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonPrimary/40"}`} >dark_mode</i>
          </span>
        </button>
      </div>
    </div>
  );
};

