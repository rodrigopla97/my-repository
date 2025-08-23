import bye from '../../images/bye.png';
import { useTheme } from '../../context/themeContext';
import LinkedInIcon from '../../icons/linkedinIconInterface';
import GitHubIcon from '../../icons/githubIconInterface';

export default function FooterInterface() {
  const { textColor, isDarkMode, bgColor } = useTheme();

  return (
    <div className={`relative flex flex-col md:flex-row w-screen h-screen border-t border-dashed border-[white] ${textColor} font-semibold overflow-y-hidden py-[10vh] md:py-[5vh] px-[5vh] md:px-8 justify-center md:justify-normal`}>

      <div className="hidden md:flex flex-col justify-center items-center md:w-1/4">
        <img src={bye} alt="bye" className="h-auto" />
      </div>

      <div className="md:hidden absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0 flex justify-center items-center">
        <img
          src={bye}
          alt="Logo"
          className={`w-auto h-[80%] object-contain ${isDarkMode ? "drop-shadow-red" : "drop-shadow-white"}`}
        />
      </div>


      {/* <div className="hidden md:flex flex-col justify-center items-center md:w-1/4">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
        <span>Mensaje de despedida 🫶</span>

      </div> */}

      <div className="flex flex-col text-center justify-center w-full md:w-3/4 z-10">
        <div>
          <h2>Sección footer</h2>
          <p>En construcción 🏗️</p>
        </div>
        <div className="flex flex-row items-center justify-center w-full mt-8 ">

          <a
            href="https://github.com/rodrigopla97"
            target="_blank"
            rel="noopener noreferrer"
            title="https://github.com/rodrigopla97"
            className={`flex flex-row items-center md:w-[25%] place-content-center hover:cursor-pointer hover:font-bold ${isDarkMode ? "hover:text-cvButtonSecondary" : "hover:text-cvButtonPrimary"}`}
          >

            <GitHubIcon />
            <div className="hidden md:flex items-center">
              <span>GitHub</span>
              <i className="material-icons-outlined text-base ml-2">open_in_new</i>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/rodrigo-placeres/"
            target="_blank"
            rel="noopener noreferrer"
            title="https://www.linkedin.com/in/rodrigo-placeres/"
            className={`flex flex-row items-center md:w-[25%] hover:cursor-pointer place-content-center ${isDarkMode ? "hover:text-cvButtonSecondary" : "hover:text-cvButtonPrimary"}`}
          >
            <LinkedInIcon />
            <div className="hidden md:flex items-center">
              <span>LinkedIn</span>
              <i className="material-icons-outlined text-base ml-2">open_in_new</i>
            </div>
          </a>
        </div>
        <div className={`mt-8`}>
          <p>Rodrigo Placeres {new Date().getFullYear()} 😎</p>
        </div>
      </div>
    </div>
  );
}
