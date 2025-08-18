import HeaderMenuInterface from './headerMenuInterface';
import { SidenavMenuInterface } from './sidenavMenuInterface';
import lightLogo from '../../images/black-logo.png';
import darkLogo from '../../images/gray-logo.png';
import { useTheme } from '../../context/themeContext';
import { Link } from 'react-router-dom';

export default function HeaderInterface() {
  const { isDarkMode, toggleTheme, bgColor, textColor } = useTheme()

  return (
    <div className={`max-h-[10vh] flex justify-between items-center pr-2 md:pl-4 fixed w-full ${textColor} z-[31] ${bgColor} md:backdrop-blur-md md:bg-opacity-60`}>
      <SidenavMenuInterface />
      <div className="flex items-center justify-center w-20 h-[10vh]">
        <Link to="/">
          <img src={isDarkMode ? darkLogo : lightLogo} alt="Logo" />
        </Link>
      </div>
      <HeaderMenuInterface />
      <div className="flex items-center justify-center w-20 h-[10vh]">
        <label className="relative inline-block w-12 h-6">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <span
            className={`absolute cursor-pointer inset-0 rounded-full transition ${isDarkMode ? 'bg-gray-800' : 'bg-gray-300'}`}
          ></span>
          <span
            className={`absolute left-1 top-1 ${isDarkMode ? 'bg-white' : 'bg-yellow-400'} w-4 h-4 rounded-full flex items-center justify-center transition transform ${isDarkMode && 'translate-x-6'}`}
          >
            {!isDarkMode ? (
              <i className="material-icons-round text-red-400 text-sm">light_mode</i>
            ) : (
              <i className="material-icons-round text-black text-sm">dark_mode</i>
            )}
          </span>
        </label>
      </div>
    </div>
  );
};

