import { usePortfolio } from '../../../containers/states/portfolioProvider';

export default function ComingSoonInterface() {
  const { getPortfolioState } = usePortfolio();
  const { textColor } = getPortfolioState;

  return (
    <div className={`flex flex-col items-center justify-center w-screen min-h-screen gap-6 ${textColor} px-6`}>
      <span className="text-5xl">🛠️</span>
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Sección en construcción
      </h2>
      <p className="text-center max-w-md opacity-70">
        Próximamente habrá contenido nuevo por acá.
      </p>
    </div>
  );
}
