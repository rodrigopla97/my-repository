import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';

export default function HeaderMenuInterface() {
  const { textColor, isDarkMode } = useTheme();
  const { pathname } = useLocation()

  return (
    <div className="hidden sm:flex sm:justify-center sm:items-center">
      <div className={`flex items-center justify-center ${textColor}`}>
        <NavLink
          to="/"
          className={`text-lg hover:font-bold ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}  px-2 sm:px-4 py-1 rounded flex items-center ${pathname === '/' ?  `font-bold ${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"} `: "hover:text-xl"}`}
        >
          <span className="ml-2">Home</span>
        </NavLink>
        <NavLink
          to="/about"
          className={`text-lg px-2 sm:px-4 py-1 rounded flex items-center hover:font-bold ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}  ${pathname === '/about' ?  `font-bold ${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"} `: "hover:text-xl"}`}
        >
          <span className="ml-2">About</span>
        </NavLink>
        <NavLink
          to="/contact"
          className={`text-lg px-2 sm:px-4 py-1 rounded flex items-center hover:font-bold ${!isDarkMode ? "hover:text-cvButtonPrimary" : " hover:text-cvButtonSecondary"}  ${pathname === '/contact' ?  `font-bold ${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"} `: "hover:text-xl"}`}
        >
          <span className="ml-2">Contact</span>
        </NavLink>
      </div>
    </div>
  );
}
