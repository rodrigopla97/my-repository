import { usePortfolio } from "../../../containers/states/portfolioProvider";
import FooterAllIcons from "../footerAllIconsInterface";

export default function ExperienceInterface() {
  const { getPortfolioState } = usePortfolio();
  const { textColor } = getPortfolioState;

  return (
    <div className={`flex flex-col w-full items-center mt-4 ${textColor}`}>
      <div className="flex flex-col gap-2 w-full">

        <p className="text-sm">
          Vivo en la <strong>Ciudad Autónoma de Buenos Aires</strong>, soy desarrollador <strong>frontend</strong>, recibido como <strong>Técnico en Computación</strong> y actualmente estudiante de <strong>Tecnicatura universitaria en Programación</strong> (UTN).
        </p>
        <p className="text-sm">
          Me formé como Desarrollador Fullstack con Node.js en EducaciónIT, y desde 2022 me desempeño como <strong>Desarrollador Frontend</strong> en <strong>Leafnoise</strong>.
        </p>

        <h3 className="text-base uppercase tracking-widest mt-4 flex items-center gap-1.5">
          🛠️ Tecnologías
        </h3>
        <FooterAllIcons />
        <h3 className="text-base uppercase tracking-widest mt-2 flex items-center gap-1.5">
          🚀 Experiencia
        </h3>
        <p className="text-sm">
          Participo en el mantenimiento de plataformas de distintos proyectos, desarrollo de <strong>bugfixes</strong> y diseño e implementación de <strong>features</strong>, donde tengo la oportunidad de formar parte de diversos proyectos junto a mi equipo de trabajo.
        </p>
        <p className="text-sm">
          En algunos casos, asisto a reuniones que incluyen interacción directa con clientes y otros equipos, en las cuales también colaboro en la definición de la estructura backend.
        </p>
        <p className="text-sm">
          Esto me permitió ser parte de la creación de proyectos desde cero que me motivó a crear este portfolio para compartir mi experiencia y seguir creciendo como desarrollador.
        </p>

        <h3 className="text-base uppercase tracking-widest mt-2 flex items-center gap-1.5">
          🎯 Objetivo
        </h3>
        <p className="text-sm">Estar en constante crecimiento y desarrollo, tanto personal como laboral.</p>
        <p className="text-sm">Adquirir nuevas experiencias en las que pueda aportar mis conocimientos y seguir aprendiendo.</p>

      </div>
    </div>
  );
}