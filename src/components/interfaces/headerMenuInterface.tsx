import { NavLink } from 'react-router-dom';
import CurriculumIcon from '../../icons/curriculumIconInterface';
import { useState } from 'react';

export default function HeaderMenuInterface() {
    const [isCurriculumHovered, setIsCurriculumHovered] = useState(false);

    return (
        <>
            <div className="hidden sm:flex sm:justify-center sm:items-center ">
                <div className="flex items-center justify-center">
                    <NavLink
                        to="/"
                        className="text-bluePrimary text-lg hover:bg-gray-700 hover:text-white px-2 sm:px-4 py-1 rounded flex items-center"
                    >
                        <span className="material-icons">home</span>
                        <span className="ml-2">Home</span>
                    </NavLink>
                    <NavLink
                        to="/curriculum"
                        className="text-bluePrimary text-lg px-2 sm:px-4 py-1 rounded flex items-center transition-colors duration-300 hover:bg-gray-700 hover:text-white"
                        onMouseEnter={() => setIsCurriculumHovered(true)}
                        onMouseLeave={() => setIsCurriculumHovered(false)}
                    >
                        <CurriculumIcon isHovered={isCurriculumHovered} />
                        <span className="ml-2">Curriculum</span>
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="text-bluePrimary text-lg hover:bg-gray-700 hover:text-white px-2 sm:px-4 py-1 rounded flex items-center"
                    >
                        <span className="material-icons mr-2">contact_phone</span>Contact
                    </NavLink>
                </div>
                <div className="flex items-center justify-center inline sm:hidden">
                    <NavLink
                        to="/"
                        className="text-bluePrimary text-lg hover:bg-gray-700 hover:text-white px-2 sm:px-4 py-1 rounded flex items-center"
                    >
                        <span className="material-icons mr-2">home</span>Home
                    </NavLink>
                    <NavLink
                        to="/curriculum"
                        className="text-bluePrimary text-lg px-2 sm:px-4 py-1 rounded flex items-center transition-colors duration-300 hover:bg-gray-700 hover:text-white"
                        onMouseEnter={() => setIsCurriculumHovered(true)}
                        onMouseLeave={() => setIsCurriculumHovered(false)}
                    >
                        <CurriculumIcon isHovered={isCurriculumHovered} />
                        <span className="ml-2">Curriculum</span>
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="text-bluePrimary text-lg hover:bg-gray-700 hover:text-white px-2 sm:px-4 py-1 rounded flex items-center"
                    >
                        <span className="material-icons">contact_page</span>
                        <span className="ml-2">Contacto</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
}
