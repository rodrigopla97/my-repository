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
          className={`text-lg px-2 sm:px-4 py-1 rounded flex items-center ${pathname === '/' ? `font-bold ${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"}` : "hover:text-xl"} transition duration-300`}
        >
          <span className="nav-text">
            Home
            <span className={`underline-nav scale-x-0 transition-transform duration-300 origin-left ${!isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary"} ${pathname === '/' && 'scale-x-100'}`}></span>
          </span>
        </NavLink>
        <NavLink
          to="/about"
          className={`text-lg px-2 sm:px-4 py-1 rounded flex items-center ${pathname === '/about' ? `font-bold ${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"}` : "hover:text-xl"} transition duration-300`}
        >
          <span className="nav-text">
            About
            <span className={`underline-nav scale-x-0 transition-transform duration-300 origin-left ${!isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary"} ${pathname === '/about' && 'scale-x-100'}`}></span>
          </span>
        </NavLink>
        <NavLink
          to="/contact"
          className={`text-lg px-2 sm:px-4 py-1 rounded flex items-center ${pathname === '/contact' ? `font-bold ${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"}` : "hover:text-xl"} transition duration-300`}
        >
          <span className="nav-text">
            Contact
            <span className={`underline-nav scale-x-0 transition-transform duration-300 origin-left ${!isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary"} ${pathname === '/contact' && 'scale-x-100'}`}></span>
          </span>
        </NavLink>
      </div>
    </div>
  );
}
