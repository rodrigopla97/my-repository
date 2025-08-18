import { useTheme } from "../../../context/themeContext";
import FooterAllIcons from "../footerAllIconsInterface";

export default function ExperienceInterface() {
  const { textColor } = useTheme();

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-[40vh] p-10 pt-[10vh] py-0 ${textColor}`}
    >
      <div className="w-full max-w-4xl">

        <p className="mb-4">
          Soy desarrollador frontend de <strong>Buenos Aires</strong>, técnico en computación
          y estudiante de <strong>Ingeniería en Sistemas</strong> (UTN).
        </p>

        <p className="mb-4">
          Inicié laboralmente reparando laptops PCs y luego me especialicé en desarrollo web. Me formé como Fullstack
          con Node.js en EducaciónIT, aunque hoy mi enfoque es como <strong>Desarrollador Frontend</strong>.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">🛠️ Tecnologías</h3>
        {/* <p className="mb-4">HTML · CSS · JavaScript · React · Angular · Typescript · Tailwind CSS</p> */}
        <FooterAllIcons />
        <h3 className="text-lg font-semibold mb-2 mt-6">🚀 Experiencia</h3>
        <p className="mb-4">
          Participé en el mantenimiento de plataformas de distintos proyectos, desarrollo de <strong> bugfix</strong> y diseño e implementación de <strong>features</strong>.
        </p>

        <h3 className="text-lg font-semibold mb-2">🎯 Objetivo</h3>
        <p>Seguir creciendo como desarrollador y aportar valor en cada proyecto.</p>
      </div>
    </div>
  );
}