import { useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from "../../context/themeContext";
import { useActions } from "../../context/actionsContext";

export function SidenavMenuInterface() {
  const { bgColor, textColor } = useTheme();
  const { isMenuOpen, handleSetIsMenuOpen, tabdataItems } = useActions();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <div className="inline sm:hidden">
      <button
        className={`${textColor} focus:outline-none w-20 h-[10vh] flex items-center justify-center`}
        onClick={() => handleSetIsMenuOpen(true)}
      >
        <span className="material-icons">menu</span>
      </button>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className={`fixed top-0 bottom-0 left-0 w-full ${bgColor} shadow-lg flex flex-col`}>
            <div className="ml-[0.2rem] mt-[0.2rem] w-20 h-[10vh] flex items-center justify-center">
              <button className={`${textColor} focus:outline-none`} onClick={() => handleSetIsMenuOpen(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="px-10 flex-grow flex flex-col items-center justify-center">
              <ul className="text-center pb-20 space-y-8">
                {tabdataItems.map((tab, index) => (
                  <li className="cursor-pointer py-2" key={index} onClick={() => handleSetIsMenuOpen(false)}>
                    <NavLink
                      to={tab.path}
                      onClick={(e) => {
                        if (pathname === tab.path) {
                          e.preventDefault();
                          window.location.reload();
                        }
                      }}
                      className="flex items-center">
                      <i className="material-icons-outlined">{tab.icon}</i>
                      <span className="ml-2">{tab.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
