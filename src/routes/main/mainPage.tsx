import React, { useState, useEffect } from 'react';
import desk from '../../images/programmer-desk.png';

const texts = [
  'Rodrigo Placeres',
  'Desarrollador Front-End'
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
        <div className="text-bluePrimary my-auto text-xl md:text-6xl space-y-4 z-10 mx-[8vh] md:mx-0 font-bold">
          <h1>Hola! Soy</h1>
          <div className="typewriter">
            <h2 className={` ${isDeleting ? 'deleting' : 'typing'}`}>
              <span className="bg-green-500">
                {currentText || '\u00A0'}
              </span>
            </h2>
            <div className='text-sm md:w-[60vh] pt-2'>
              <p>
                Vivo en la Ciudad Autónoma de Buenos Aires, Argentina. Graduado como Técnico en Computación en la E.T. 29 Reconquista de Buenos Aires, y actualmente estudio Ingeniería en Sistemas de Información en UTN.
              </p>

              <p>
                Comencé mi carrera como técnico en reparación de PCs, adquiriendo habilidades en diagnóstico y solución de problemas de hardware y software. Con el tiempo, me especialicé en desarrollo web, realizando la carrera de Fullstack con Node.js en EducaciónIT, aunque mi enfoque principal actualmente es el frontend. Tengo experiencia con HTML, CSS, JavaScript, React, Angular y Tailwind CSS.
              </p>
              <p>
                Participé en varios proyectos, como la creación de aplicaciones con React y desarrollo de resolución de problemas en Angular.
              </p>
              <p>
                Mi objetivo es seguir creciendo profesionalmente y seguir aprendiendo.
              </p>
            </div>
          </div>
        </div>
        <img src={desk} alt="Logo" className="w-screen md:h-screen md:w-auto ml-auto absolute right-0 md:fixed md:right-4 opacity-20 md:opacity-100" />
      </div>
    </div>
  );
}
