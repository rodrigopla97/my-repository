import React from "react";
import { NavLink } from 'react-router-dom';
import CurriculumIcon from "../../icons/curriculumIconInterface";

export function SidenavMenuInterface() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <div className="inline sm:hidden">
      <button className="text-gray-800 hover:text-gray-900 focus:outline-none w-20" onClick={() => setIsDrawerOpen(true)}>
        <span className="material-icons">menu</span>
      </button>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black bg-opacity-25" onClick={closeDrawer}></div>
          <div className="fixed top-0 bottom-0 left-0 w-full bg-white shadow-lg flex flex-col">
            <div className="w-20 h-20 content-center mx-[5vh]">
              <button className="text-gray-800 hover:text-gray-900 focus:outline-none flex items-center" onClick={closeDrawer}>
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="px-10 flex-grow flex flex-col items-center justify-center">
              <ul className="text-center pb-20">
                <li className="cursor-pointer py-2 my-4 hover:bg-gray-100" onClick={closeDrawer}>
                  <NavLink to="/" className="flex items-center">
                    <span className="material-icons mr-2">home</span>Home
                  </NavLink>
                </li>
                <li className="cursor-pointer py-2 my-4 hover:bg-gray-100" onClick={closeDrawer}>
                  <NavLink 
                  to="/curriculum"
                  className="flex items-center">
                    
                    <span className="mr-2"><CurriculumIcon /></span>Curriculum
                  </NavLink>
                </li>
                <li className="cursor-pointer py-2 my-4 hover:bg-gray-100" onClick={closeDrawer}>
                  <NavLink to="/contact" className="flex items-center">
                    <span className="material-icons mr-2">contact_phone</span>Contact
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
