import { Link } from 'react-router-dom';
import logo from '../images/logo-rod.png';
import CurriculumIcon from '../icons/curriculumIconInterface';
import { useState } from 'react';

export default function HeaderInterface() {
  const [isCurriculumHovered, setIsCurriculumHovered] = useState(false);

  return (
    <div className="max-h-[10vh] flex justify-between items-center px-4 fixed w-full border-b-2 border-bluePrimary text-bluePrimary bg-gray-100 z-10">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-20 mr-2" />
      </div>
      <div className="flex space-x-2 sm:space-x-4">
        <Link
          to="/"
          className="text-bluePrimary text-lg hover:bg-gray-700 hover:text-white px-2 sm:px-4 py-1 rounded flex items-center"
        >
          <span className="material-icons">home</span>
          <span className="ml-2 hidden sm:inline">Home</span>
        </Link>
        <Link
          to="/curriculum"
          className="text-bluePrimary text-lg px-2 sm:px-4 py-1 rounded flex items-center transition-colors duration-300 hover:bg-gray-700 hover:text-white"
          onMouseEnter={() => setIsCurriculumHovered(true)}
          onMouseLeave={() => setIsCurriculumHovered(false)}
        >
          <CurriculumIcon isHovered={isCurriculumHovered} />
          <span className="ml-2 hidden sm:inline">Curriculum</span>
        </Link>
        <Link
          to="/contact"
          className="text-bluePrimary text-lg hover:bg-gray-700 hover:text-white px-2 sm:px-4 py-1 rounded flex items-center"
        >
          <span className="material-icons">contact_page</span>
          <span className="ml-2 hidden sm:inline">Contacto</span>
        </Link>
      </div>
    </div>
  );
}

