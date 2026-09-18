import { EVOLUTION_VERSIONS } from "@app/modules/portfolio/constants/constants";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useState } from "react";

type EvolutionOption = {
  key: string;
  label: string;
  description: string;
  src: string;
};

export default function EvolutionInterface() {
  const { getPortfolioState } = usePortfolioProvider();
  const { isDarkMode, textColor } = getPortfolioState;
  const accentColor = isDarkMode ? "text-cvButtonSecondary" : "text-cvButtonPrimary";

  const options: EvolutionOption[] = EVOLUTION_VERSIONS.map((version) => ({
    key: version.tag,
    label: version.label,
    description: version.description,
    src: `/v${version.major}/`
  }));

  const [selected, setSelected] = useState(options[0]);

  return (
    <div className={`flex flex-col gap-8 w-screen md:w-[75vw] px-10 md:mx-auto py-[10vh] ${textColor}`}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Evolución</h1>
        <p className="opacity-70">
          Este portfolio se sigue actualizando todo el tiempo. Elegí una versión para verla tal cual era.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setSelected(option)}
            className={`flex flex-col gap-1 text-left border rounded-xl px-5 py-3 transition-colors ${
              selected.key === option.key
                ? `border-current ${accentColor}`
                : "border-grayPrimary/20 hover:border-grayPrimary/50"
            }`}
          >
            <span className="text-xs uppercase tracking-widest opacity-60">{option.label}</span>
            <span className="text-sm font-medium">{option.description}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <a href={selected.src} target="_blank" rel="noopener noreferrer" className={`text-sm ${accentColor}`}>
            Abrir en pantalla completa →
          </a>
        </div>
        <iframe
          key={selected.key}
          src={selected.src}
          title={selected.label}
          className="w-full h-[70vh] rounded-xl border border-grayPrimary/20"
        />
      </div>
    </div>
  );
}
