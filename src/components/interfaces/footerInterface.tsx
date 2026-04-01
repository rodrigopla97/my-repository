import { usePortfolio } from '../../containers/states/portfolioProvider';
import useRoutes from '../../containers/hooks/useRoutes';
import lightLogo from '../../images/black-logo.png';
import darkLogo from '../../images/gray-logo.png';
import { PROFILE } from '../../containers/constants/constants';

export default function FooterInterface() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, isDarkMode, tabdataItems } = getPortfolioState;
  const { navigate, pathname, openExternal } = useRoutes();

  return (
    <div className={`flex flex-col w-screen h-screen md:h-auto md:border-t ${textColor} justify-center font-semibold overflow-y-hidden py-[10vh] md:py-[5vh] px-[5vh] md:px-8 bg-opacity-20 gap-10 ${isDarkMode ? "bg-black md:border-black" : "bg-white md:border-white"}`}>

      <div className="flex flex-col md:flex-row justify-center md:justify-normal gap-10">
        <div className='flex md:flex-col w-full md:w-1/3 items-center justify-between'>
          <div>
            <h2 className='font-bold text-xl'>{PROFILE.name}</h2>
            <span className='font-light'>{PROFILE.role}</span>
          </div>
          <img src={isDarkMode ? darkLogo : lightLogo} alt="bye" className='max-h-[16vh] cursor-pointer' onClick={() => navigate("/")} />
        </div>

        <div className='flex flex-col md:w-1/3 items-center uppercase'>
          <div className='flex flex-col gap-4 w-full md:max-w-[10vw] items-start'>
            <span className='uppercase'>Navegación</span>

            <div className='flex flex-col'>
              {tabdataItems.map((tab, index) => {
                const isActive = pathname === tab.path;

                return (
                  <span
                    key={index}
                    className={`cursor-pointer py-2 transition ${isActive
                      ? `font-bold underline ${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"}`
                      : `opacity-80 ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`
                      }`}
                    onClick={() => navigate(tab.path)}
                  >
                    {tab.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className='flex flex-col md:w-1/3 items-center uppercase'>
          <div className='flex flex-col gap-4 w-full md:max-w-[10vw] items-start'>
            <span>Social</span>

            <div className='flex flex-col'>
              <span className={`group flex items-center gap-1 cursor-pointer py-2 transition opacity-80 ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`} onClick={() => openExternal(PROFILE.linkedin.url)}>
                LinkedIn
                <span className="opacity-0 group-hover:opacity-100 transition">↗</span>
              </span>
              <span className={`group flex items-center gap-1 cursor-pointer py-2 transition opacity-80 ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`} onClick={() => openExternal(PROFILE.github.url)}>
                GitHub
                <span className="opacity-0 group-hover:opacity-100 transition">↗</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center text-xs font-light">
        © {new Date().getFullYear()} {PROFILE.name}
      </div>
    </div>
  );
}