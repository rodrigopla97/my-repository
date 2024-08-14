import { useState, useEffect } from 'react';
import desk from '../../images/avatar-float.png';
import bgAvatarDesk from '../../images/bg-avatar.png';
import { useTheme } from '../../context/themeContext';
import BackgroundImageInterface from '../../components/interfaces/main/backgroundImageInterface';

const texts = [
  'Rodrigo Placeres',
  'Desarrollador Front-End'
];

export default function MainPage() {
  const { isDarkMode, textColor } = useTheme();
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    function handleType() {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setCurrentText(isDeleting
        ? fullText.substring(0, currentText.length - 1)
        : fullText.substring(0, currentText.length + 1));

      setTypingSpeed(isDeleting ? 25 : 50);

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed]);

  return (
    <div className={`flex flex-col justify-center min-h-screen w-screen ${textColor}`}>
      <BackgroundImageInterface />
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-center md:justify-between mt-[15vh] mb-[5vh] h-full">
        <div className={`${textColor} max-md:text-lg md:text-2xl lg:text-5xl space-y-4 font-bold md:w-1/2 pl-[5vh] content-center md:pb-[10vh] z-20 items-center`}>
          <h1 className="text-left font-orbitron">Hola! Soy</h1>
          <div className="typewriter">
            <h2 className={`font-orbitron ${isDeleting ? 'deleting' : 'typing'}`}>
              <span>{currentText || '\u00A0'}</span>
            </h2>
          </div>
          <a href='/CV - Rodrigo Placeres.pdf' target='_blank' download className={`w-fit hidden md:block font-medium md:text-lg lg:text-xl py-2 my-4 px-4 ${isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary"} ${textColor} rounded-lg border-2 border-transparent hover:bg-opacity-80 transition-all duration-300 mx-auto md:mx-0`}>Descargar CV</a>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center mt-5 md:mt-0 z-10" style={{ backgroundImage: `url(${bgAvatarDesk})`, backgroundSize: '80%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
          <img src={desk} alt="Logo" className={`max-[820px]:h-[50vh] mt-10 md:mt-0 min-[1024]:h-[70vh] w-auto animate-float ${isDarkMode ? "drop-shadow-red" : "drop-shadow-white"}`} />
        </div>
        <a href='/CV - Rodrigo Placeres.pdf' target='_blank' className={`block md:hidden font-medium md:text-lg lg:text-xl  py-2 my-4 px-4 ${isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary"}  ${textColor} rounded-lg border-2 border-transparent hover:bg-opacity-50 transition-all duration-300 mx-auto md:mx-0 z-10`} >Descargar CV</a>
      </div>
    </div>
  );
}
