import React from 'react';
import { useTheme } from '../../../context/themeContext';
import contactAvatar from '../../../images/avatar-phone.png';
import bg from '../../../images/bg-avatar3.png';

export default function ImageContactInterface() {
  const { isDarkMode } = useTheme();
  return (
    <React.Fragment>
      <div className="hidden md:flex md:w-1/2 h-full justify-center items-center pt-[10vh]"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: '60%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <img
          src={contactAvatar}
          alt="Contact"
          className={`h-[75%] w-auto object-contain ${isDarkMode ? "drop-shadow-red" : "drop-shadow-white"}`}
        />
      </div>

      <div className="md:hidden absolute inset-0 h-full w-full object-cover opacity-20 content-center pt-[10vh]" style={{ backgroundImage: `url(${bg})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <img src={contactAvatar} alt="Logo" className={`h-[80%] w-auto object-cover ${isDarkMode ? "drop-shadow-red" : "drop-shadow-white"}`} />
      </div>
    </React.Fragment>
  );
}
