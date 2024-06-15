import React, { useState, useEffect } from 'react';
import desk from '../../images/avatar-desk.png';
import ContentTextInterface from '../../components/interfaces/main/contentTextInterface';

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
      <div className="flex flex-col justify-center min-h-screen text-gray-100">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-center md:justify-between mt-[15vh] mb-[5vh] h-full">
          <div className="text-gray-100 text-xl md:text-6xl space-y-4 font-bold md:w-1/2 pl-[5vh] content-center md:pb-[10vh]">
            <h1 className="text-left">Hola! Soy</h1>
            <div className="typewriter">
              <h2 className={` ${isDeleting ? 'deleting' : 'typing'}`}>
                <span className="bg-green-500">
                  {currentText || '\u00A0'}
                </span>
              </h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center mt-5 md:mt-0">
            <img src={desk} alt="Logo" className="md:h-[80vh] md:w-auto animate-float" />
          </div>
        </div>
      </div>
      <ContentTextInterface />
    </>
  );
}
