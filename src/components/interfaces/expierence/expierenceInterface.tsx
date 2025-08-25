import { useTheme } from "../../../context/themeContext";
import FooterAllIcons from "../footerAllIconsInterface";

export default function ExperienceInterface() {
  const { textColor } = useTheme();

  return (
    <div
      className={`flex flex-col justify-center items-center md:w-[50vw] min-h-[40vh] md:px-10 md:py-4 ${textColor}`}
    >
      <div className="max-w-4xl mt-4 md:mt-0 ">

        <p className="mb-4">
          Vivo en la <strong>Ciudad Autónoma de Buenos Aires</strong>, soy desarrollador <strong>frontend</strong>, recibido como <strong>Técnico en Computación</strong> y actualmente estudiante de <strong>Ingeniería en Sistemas</strong> (UTN).
        </p>

        <p className="mb-4">
          Me formé como Desarrollador Fullstack con Node.js en EducaciónIT, y desde 2022 mi enfoque es como <strong>Desarrollador Frontend</strong> en <strong>Leafnoise</strong>.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">🛠️ Tecnologías</h3>
        <FooterAllIcons />
        <h3 className="text-lg font-semibold mb-2 mt-6">🚀 Experiencia</h3>
        <p className="mb-4">
          Participé en el mantenimiento de plataformas de distintos proyectos, desarrollo de <strong>bugfixs</strong> y diseño e implementación de <strong>features</strong>.
        </p>

        <h3 className="text-lg font-semibold mb-2">🎯 Objetivo</h3>
        <p>Estar en constante crecimiento y desarrollo, tanto personal como laboral.</p>
        <p>Adquirir nuevas experiencias en las que pueda aportar mis conocimientos y seguir aprendiendo.</p>
      </div>
    </div>
  );
}