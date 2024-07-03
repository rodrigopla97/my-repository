import { useTheme } from "../../../context/themeContext";

export default function ContentTextInterface() {

  const { textColor } = useTheme();
  return (
    <div className={` flex justify-center w-screen items-center h-screen ${textColor}`} >
      <div className="md:w-[80vh] py-2 overflow-y-auto px-[5vh] md:px-8 mt-20 md:mt-0 content-center font-bold">
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
  );
}
