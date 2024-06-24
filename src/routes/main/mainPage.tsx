import { useState, useEffect } from 'react';
import desk from '../../images/avatar-float.png';
import ContentTextInterface from '../../components/interfaces/main/contentTextInterface';
import bgImage from '../../images/bg-desk.png';
import bgAvatarDesk from '../../images/bg-avatar.png';

const texts = [
  'Rodrigo Placeres',
  'Desarrollador Front-End'
];

export default function MainPage() {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    const handleType = () => {
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
    <>
      <div className="flex flex-col justify-center min-h-screen w-screen text-grayPrimary" style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-center md:justify-between mt-[15vh] mb-[5vh] h-full">
          <div className="text-grayPrimary text-xl md:text-5xl space-y-4 font-bold md:w-1/2 pl-[5vh] content-center  md:pb-[10vh] z-10 items-center">
            <h1 className="text-left font-orbitron">Hola! Soy</h1>
            <div className="typewriter">
              <h2 className={`font-orbitron ${isDeleting ? 'deleting' : 'typing'}`}>
                <span className="">
                  {currentText || '\u00A0'}
                </span>
              </h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center mt-5 md:mt-0" style={{ backgroundImage: `url(${bgAvatarDesk})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <img src={desk} alt="Logo" className="h-[50vh] mt-10 md:mt-0 md:h-[70vh] md:w-auto animate-float drop-shadow-white"/>
          </div>
        </div>
      </div>
      <ContentTextInterface />
    </>
  );
}
