import { useEffect } from "react";
import { useTheme } from "../../context/themeContext";
import { useActions } from "../../context/actionsContext";
import useRoutes from "../../hooks/useRoutes";

export function SidenavMenuInterface() {
  const { bgColor, textColor, isDarkMode } = useTheme();
  const { isMenuOpen, handleSetIsMenuOpen, tabdataItems } = useActions();
  const { navigate, pathname } = useRoutes();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  function handleNavigate(path: string) {
    handleSetIsMenuOpen(false);
    if (pathname !== path) navigate(path);
  }

  return (
    <div className="inline sm:hidden">
      <button
        className={`${textColor} focus:outline-none w-20 h-[10vh] flex items-center justify-center`}
        onClick={() => handleSetIsMenuOpen(true)}
      >
        <span className="material-icons">menu</span>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${isMenuOpen ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => handleSetIsMenuOpen(false)}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-full z-50 ${bgColor} shadow-lg flex flex-col transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="ml-[0.2rem] mt-[0.2rem] w-20 h-[10vh] flex items-center justify-center">
          <button className={`${textColor} focus:outline-none`} onClick={() => handleSetIsMenuOpen(false)}>
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center">
          <ul className="text-center pb-20 space-y-4">
            {tabdataItems.map((tab, index) => {
              const isActive = pathname === tab.path;
              return (
                <li key={index} onClick={() => handleNavigate(tab.path)}>
                  <span className={`cursor-pointer inline-block px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest transition-all duration-200 ${isActive
                    ? `${!isDarkMode ? "text-cvButtonPrimary bg-cvButtonPrimary/15 ring-1 ring-cvButtonPrimary/30" : "text-cvButtonSecondary bg-cvButtonSecondary/15 ring-1 ring-cvButtonSecondary/30"}`
                    : `${textColor} ${!isDarkMode ? "hover:text-cvButtonPrimary hover:bg-cvButtonPrimary/10" : "hover:text-cvButtonSecondary hover:bg-cvButtonSecondary/10"}`
                  }`}>
                    {tab.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </div>
  );
}
