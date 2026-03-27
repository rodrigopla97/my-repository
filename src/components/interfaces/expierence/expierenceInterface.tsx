import { useTheme } from "../../../context/themeContext";
import FooterAllIcons from "../footerAllIconsInterface";

export default function ExperienceInterface() {
  const { textColor } = useTheme();

  return (
    <div
      className={`flex flex-col w-full items-center mt-4 ${textColor}`}
    >
      <div className="items-start">

        <p className="mb-2">
          Vivo en la <strong>Ciudad Autónoma de Buenos Aires</strong>, soy desarrollador <strong>frontend</strong>, recibido como <strong>Técnico en Computación</strong> y actualmente estudiante de <strong>Ingeniería en Sistemas</strong> (UTN).

        </p>
        <p>
          Me formé como Desarrollador Fullstack con Node.js en EducaciónIT, y desde 2022 me desempeño como <strong>Desarrollador Frontend</strong> en <strong>Leafnoise</strong>
        </p>

        <h3 className="text-lg font-semibold mt-6">🛠️ Tecnologías</h3>
        <FooterAllIcons />
        <h3 className="text-lg font-semibold my-6">🚀 Experiencia</h3>
        <p>
          Participo en el mantenimiento de plataformas de distintos proyectos, desarrollo de <strong>bugfixes</strong> y diseño e implementación de <strong>features</strong>, donde tengo la oportunidad de formar parte de diversos proyectos junto a mi equipo de trabajo.
        </p>

        <p>
          En algunos casos, asisto a reuniones que incluyen interacción directa con clientes y otros equipos, en las cuales también colaboro en la definición de la estructura backend.
        </p>

        <p>
          Esto me permitió ser parte de la creación de proyectos desde cero que me motivó a crear este portfolio para compartir mi experiencia y seguir creciendo como desarrollador.
        </p>

        <h3 className="text-lg font-semibold my-6">🎯 Objetivo</h3>

        <p>Estar en constante crecimiento y desarrollo, tanto personal como laboral.</p>
        <p>Adquirir nuevas experiencias en las que pueda aportar mis conocimientos y seguir aprendiendo.</p>
      </div>
    </div >
  );
}