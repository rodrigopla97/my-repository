import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useTheme } from "../../context/themeContext";

export function SidenavMenuInterface() {
  const { bgColor, textColor} = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function closeDrawer() {
    setIsDrawerOpen(false);
  } 

  return (
    <div className="inline sm:hidden">
    <button
        className={` ${textColor} focus:outline-none w-20 h-20 flex items-center justify-center`}
        onClick={() => setIsDrawerOpen(true)}
      >
        <span className="material-icons">menu</span>
      </button>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className={`fixed top-0 bottom-0 left-0 w-full ${bgColor} shadow-lg flex flex-col`}>
            <div className="ml-4 w-20 h-20 flex items-center justify-center">
              <button className={`${textColor} focus:outline-none`} onClick={closeDrawer}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="px-10 flex-grow flex flex-col items-center justify-center">
              <ul className="text-center pb-20 space-y-8">
                <li className="cursor-pointer py-2" onClick={closeDrawer}>
                  <NavLink to="/" className="flex items-center">
                  <i className="material-icons-outlined">home</i>
                  <span className="ml-2">Home</span>
                  </NavLink>
                </li>
                <li className="cursor-pointer py-2" onClick={closeDrawer}>
                  <NavLink to="/about" className="flex items-center">
                  <i className="material-icons-outlined">description</i>
                  <span className="ml-2">About</span>
                  </NavLink>
                </li>
                <li className="cursor-pointer py-2" onClick={closeDrawer}>
                  <NavLink to="/contact" className="flex items-center">
                  <i className="material-icons-outlined">contact_phone</i>
                  <span className="ml-2">Contact</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
