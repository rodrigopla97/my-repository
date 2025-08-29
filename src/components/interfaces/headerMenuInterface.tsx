import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';
import { useActions } from '../../context/actionsContext';

export default function HeaderMenuInterface() {
  const { textColor, isDarkMode } = useTheme();
  const { tabdataItems } = useActions()
  const { pathname } = useLocation()

  return (
    <div className="hidden sm:flex sm:justify-center sm:items-center">
      <div className={`flex items-center justify-center ${textColor}`}>
        {tabdataItems.map((tab, index) => (
          <NavLink
            key={index}
            to={tab.path}

            onClick={(e) => {
              if (pathname === tab.path) {
                e.preventDefault();
                window.location.reload();
              }
            }}
            className={`text-lg px-2 sm:px-4 py-1 rounded flex items-center ${pathname === tab.path ? `font-bold ${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"}` : "hover:text-xl"} transition duration-300`}
          >
            <span className="nav-text">
              {tab.name}
              <span className={`underline-nav scale-x-0 transition-transform duration-300 origin-left ${!isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary"} ${pathname === tab.path && 'scale-x-100'}`}></span>
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
