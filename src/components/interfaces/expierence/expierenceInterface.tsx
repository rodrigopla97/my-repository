import { useEffect, useState } from "react";
import { useTheme } from "../../../context/themeContext";

export default function ExperienceInterface() {

  const { textColor } = useTheme();
  const [myAge, setMyAge] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const bornDate = new Date(1997, 0, 22);

    const hasBirthdayPassed = currentDate.getMonth() > bornDate.getMonth() ||
      (currentDate.getMonth() === bornDate.getMonth() && currentDate.getDate() >= bornDate.getDate());

    const becauseWasMyBirth = hasBirthdayPassed ? 0 : -1;

    setMyAge(currentDate.getUTCFullYear() - bornDate.getUTCFullYear() + becauseWasMyBirth);
  }, []);

  return (
    <div className={`flex flex-col md:flex-row justify-center items-center w-full min-h-screen p-10 py-[10vh] ${textColor}`}>
      <div className="w-full md:w-1/3 lg:p-20 p-4">
        {/* Información Personal */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Información Básica</h2>
          <ul>
            <li>Edad: {myAge} años</li>
            <li>Ubicación: Buenos Aires</li>
            <li>Estudios: Técnico En Computación</li>
          </ul>
        </div>

        {/* Hobbies e Intereses */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Hobbies e Intereses</h2>
          <ul className="list-disc list-inside">
            <li>Fútbol</li>
            <li>Música</li>
            <li>Cine</li>
          </ul>
        </div>
      </div>

      {/* Descripción Personal */}
      <div className="w-full md:w-2/3 lg:p-20 p-4">
        <h2 className="text-xl font-bold mb-2">Descripción Personal</h2>
        <p className="mb-2">
          Vivo en la Ciudad Autónoma de Buenos Aires, Argentina. Graduado como Técnico en Computación en la E.T. 29 Reconquista de Buenos Aires, y actualmente estudio Ingeniería en Sistemas de Información en UTN.
        </p>
        <p className="mb-2">
          Comencé mi carrera como técnico en reparación de PCs, adquiriendo habilidades en diagnóstico y solución de problemas de hardware y software. Con el tiempo, me especialicé en desarrollo web, realizando la carrera de Fullstack con Node.js en EducaciónIT, aunque mi enfoque principal actualmente es el frontend. Tengo experiencia con HTML, CSS, JavaScript, React, Angular y Tailwind CSS.
        </p>
        <p className="mb-2">
          Participé en varios proyectos, como la creación de aplicaciones con React y desarrollo de resolución de problemas en Angular.
        </p>
        <p className="">
          Mi objetivo es seguir creciendo profesionalmente y seguir aprendiendo.
        </p>
      </div>
    </div>


  );
}
