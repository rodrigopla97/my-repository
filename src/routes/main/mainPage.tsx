import React, { useState, useEffect } from 'react';
import desk from '../../images/programmer-desk.png';

const texts = [
  'Desarrollador FrontEnd',
  'Técnico en computación',
];

export default function MainPage() {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setCurrentText(isDeleting
        ? fullText.substring(0, currentText.length - 1)
        : fullText.substring(0, currentText.length + 1));

      setTypingSpeed(isDeleting ? 100 : 150);

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
    <div className="flex flex-col justify-center min-h-screen bg-gray-100">
      <div className="flex flex-row justify-between items-center w-full container mx-auto">
        <div className="text-bluePrimary my-auto text-6xl space-y-4">
          <h1>Rodrigo Placeres</h1>
          <div className="typewriter">
            <h2 className={isDeleting ? 'deleting' : 'typing'}>
              <span className="bg-green-500">{currentText}</span>
            </h2>
          </div>
        </div>
        <img src={desk} alt="Logo" className="h-screen ml-auto fixed right-0" />
      </div>
    </div>
  );
}
