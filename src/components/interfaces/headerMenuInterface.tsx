import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';
import { useActions } from '../../context/actionsContext';

export default function HeaderMenuInterface() {
  const { textColor, isDarkMode } = useTheme();
  const { tabdataItems } = useActions()
  const { pathname } = useLocation()

  return (
    <div className="hidden sm:flex sm:justify-center sm:items-center">
      <div className="flex items-center gap-1">
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
            className={`relative w-24 text-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${
              pathname === tab.path
                ? `${!isDarkMode ? "text-cvButtonPrimary bg-cvButtonPrimary/15 ring-1 ring-cvButtonPrimary/30" : "text-cvButtonSecondary bg-cvButtonSecondary/15 ring-1 ring-cvButtonSecondary/30"}`
                : `${textColor} opacity-60 hover:opacity-100 ${!isDarkMode ? "hover:text-cvButtonPrimary hover:bg-cvButtonPrimary/10" : "hover:text-cvButtonSecondary hover:bg-cvButtonSecondary/10"}`
            }`}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
