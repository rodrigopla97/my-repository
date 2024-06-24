import { NavLink } from 'react-router-dom';
import CurriculumIcon from '../../icons/curriculumIconInterface';

export default function HeaderMenuInterface() {

    return (
        <>
            <div className="hidden sm:flex sm:justify-center sm:items-center ">
                <div className="flex items-center justify-center">
                    <NavLink
                        to="/"
                        className="text-grayPrimary text-lg hover:border hover:border-grayPrimary px-2 sm:px-4 py-1 rounded flex items-center"
                    >
                        <span className="material-icons">home</span>
                        <span className="ml-2">Home</span>
                    </NavLink>
                    <NavLink
                        to="/curriculum"
                        className="text-grayPrimary text-lg px-2 sm:px-4 py-1 rounded flex items-center transition-colors duration-300 hover:border hover:border-grayPrimary"
                    >
                        <CurriculumIcon />
                        <span className="ml-2">Curriculum</span>
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="text-grayPrimary text-lg px-2 sm:px-4 py-1 rounded flex items-center hover:border hover:border-grayPrimary"
                    >
                        <span className="material-icons mr-2">contact_phone</span>Contact
                    </NavLink>
                </div>
                <div className="flex items-center justify-center inline sm:hidden">
                    <NavLink
                        to="/"
                        className="text-grayPrimary text-lg hover:bg-gray-700 hover:text-grayPrimary px-2 sm:px-4 py-1 rounded flex items-center"
                    >
                        <span className="material-icons mr-2">home</span>Home
                    </NavLink>
                    <NavLink
                        to="/curriculum"
                        className="text-grayPrimary text-lg px-2 sm:px-4 py-1 rounded flex items-center transition-colors duration-300 hover:bg-gray-700 hover:text-grayPrimary"
                    >
                        <CurriculumIcon />
                        <span className="ml-2">Curriculum</span>
                    </NavLink>
                    <NavLink
                        to="/contact"
                        className="text-grayPrimary text-lg hover:bg-gray-700 hover:text-grayPrimary px-2 sm:px-4 py-1 rounded flex items-center"
                    >
                        <span className="material-icons">contact_page</span>
                        <span className="ml-2">Contacto</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
}
