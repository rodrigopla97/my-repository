import { useState } from "react";
import useRoutes from "../../containers/hooks/useRoutes";
import { usePortfolio } from "../../containers/states/portfolioProvider";

const SITES = [
  {
    label: 'Proyecto Final Coder',
    description: 'Descripción genérica del proyecto. Próximamente más detalles.',
    url: 'https://rodrigopla97.github.io/proyecto-final-coder-rodrigo-placeres/',
  },
  {
    label: 'Pixel Pancheria',
    description: 'Descripción genérica del proyecto. Próximamente más detalles.',
    url: 'https://pixelpancheria.netlify.app/',
  },
];

export default function ProjectsPage() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, isDarkMode, tabdataItems } = getPortfolioState;
  const { openExternal, navigate } = useRoutes();

  const isInNav = tabdataItems.some(t => t.path === '/projects');
  const [imgLoading, setImgLoading] = useState<Record<string, boolean>>(
    Object.fromEntries(SITES.map(s => [s.url, true]))
  );

  const accentText = isDarkMode ? 'text-cvButtonSecondary' : 'text-cvButtonPrimary';
  const accentBorder = isDarkMode ? 'border-cvButtonSecondary' : 'border-cvButtonPrimary';
  const accentBorderFaint = isDarkMode ? 'border-cvButtonSecondary/30' : 'border-cvButtonPrimary/30';

  const fillers = new Array((3 - (SITES.length % 3)) % 3).fill(null);

  return (
    <div className={`flex flex-col gap-8 w-screen md:w-3/4 px-10 md:mx-auto py-[10vh] min-h-screen ${textColor}`}>
      {!isInNav && (
        <button
          onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}
          className={`self-start flex items-center gap-1 text-xs uppercase tracking-widest transition-opacity hover:opacity-70 ${accentText}`}
        >
          <i className="material-symbols-outlined text-sm">arrow_back</i>
          Volver
        </button>
      )}
      <span className="text-base uppercase tracking-widest self-start">🌐 Mis webs</span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SITES.map(site => (
          <div key={site.label} className={`flex flex-col gap-4 p-4 rounded-xl border ${accentBorderFaint}`}>
            <div className="w-full h-40 rounded-lg overflow-hidden relative">
              {imgLoading[site.url] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${isDarkMode ? 'border-cvButtonSecondary' : 'border-cvButtonPrimary'}`} />
                </div>
              )}
              <img
                src={`https://s0.wordpress.com/mshots/v1/${encodeURIComponent(site.url)}?w=600&h=400`}
                alt={site.label}
                className="w-full h-full object-cover object-top"
                style={{ opacity: imgLoading[site.url] ? 0 : 1, transition: 'opacity 0.3s ease' }}
                onLoad={() => setImgLoading(prev => ({ ...prev, [site.url]: false }))}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sm">{site.label}</span>
              <p className="text-xs opacity-50">{site.description}</p>
            </div>
            <button
              onClick={() => openExternal(site.url)}
              className={`self-start flex items-center gap-1 text-xs border px-2.5 py-1 rounded-full transition-opacity hover:opacity-70 ${accentText} ${accentBorder}`}
            >
              <i className="material-symbols-outlined text-sm">open_in_new</i>
              Visitar
            </button>
          </div>
        ))}

        {fillers.map((_, i) => (
          <div
            key={`coming-soon-${i}`}
            className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl border border-dashed opacity-30 min-h-64 ${accentBorder}`}
          >
            <span className="text-3xl">🚧</span>
            <span className={`text-xs uppercase tracking-widest text-center ${accentText}`}>Próximamente</span>
          </div>
        ))}
      </div>
    </div>
  );
}
