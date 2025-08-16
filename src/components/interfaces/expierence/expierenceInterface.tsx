import { useTheme } from "../../../context/themeContext";

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
          Inicié reparando PCs 🛠️ y me especialicé en desarrollo web. Me formé como Fullstack
          con Node.js en EducaciónIT, aunque hoy mi enfoque es <strong>frontend</strong>.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">🛠️ Tecnologías</h3>
        <p className="mb-4">HTML · CSS · JavaScript · React · Angular · Tailwind CSS</p>

        <h3 className="text-lg font-semibold mb-2">🚀 Experiencia</h3>
        <p className="mb-4">
          Participé en proyectos con <strong>React</strong> y <strong>Angular</strong>, creando
          interfaces dinámicas y resolviendo problemas en frontend.
        </p>

        <h3 className="text-lg font-semibold mb-2">🎯 Objetivo</h3>
        <p>Seguir creciendo como desarrollador y aportar valor en cada proyecto.</p>
      </div>
    </div>
  );
}