import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGraduationCap, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../images/logo-rod.png'; 

const Header: React.FC = () => {
  return (
    <div className="h-[5vh] flex justify-between items-center px-4 py-2 fixed w-full border-b-2 border-bluePrimary text-bluePrimary bg-gray-100 z-10">
      <div className="flex items-center">
      <img src={logo} alt="Logo" className="h-20 mr-2" />
        {/* <span className="text-xl font-bold py-2">RodPLA</span> */}
      </div>
      <div className="flex space-x-2 sm:space-x-4">
        <Link to="/" className="text-bluePrimary text-lg hover:bg-gray-700 hover:text-white px-2 sm:px-4 py-1 rounded flex items-center">
          <FontAwesomeIcon icon={faHome} size="lg" />
          <span className="ml-2 hidden sm:inline">Home</span>
        </Link>
        <Link to="/curriculum" className="text-bluePrimary text-lg hover:bg-gray-700 hover:text-white px-2 sm:px-4 py-1 rounded flex items-center">
          <FontAwesomeIcon icon={faGraduationCap} size="lg" />
          <span className="ml-2 hidden sm:inline">Curriculum</span>
        </Link>
        <Link to="/contact" className="text-bluePrimary text-lg hover:bg-gray-700 hover:text-white px-2 sm:px-4 py-1 rounded flex items-center">
          <FontAwesomeIcon icon={faCog} size="lg" />
          <span className="ml-2 hidden sm:inline">Contacto</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
