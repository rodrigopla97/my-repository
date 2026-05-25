import { useState } from 'react';
import { usePortfolio } from '../../../containers/states/portfolioProvider';
import useRoutes from '../../../containers/hooks/useRoutes';

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

export default function MyWebsInterface() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, isDarkMode } = getPortfolioState;
  const { openExternal } = useRoutes();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState<Record<string, boolean>>(
    Object.fromEntries(SITES.map(function (s) { return [s.url, true]; }))
  );

  const accentBg = isDarkMode ? 'bg-cvButtonSecondary' : 'bg-cvButtonPrimary';
  const accentText = isDarkMode ? 'text-cvButtonSecondary' : 'text-cvButtonPrimary';
  const accentBorder = isDarkMode ? 'border-cvButtonSecondary' : 'border-cvButtonPrimary';

  function handleOpenPreview(url: string) {
    setIsLoading(true);
    setPreviewUrl(url);
  }

  function handleClosePreview() {
    setPreviewUrl(null);
    setIsLoading(false);
  }

  function handleLoad() {
    setIsLoading(false);
  }

  const fillers = new Array((3 - (SITES.length % 3)) % 3).fill(null);

  return (
    <div className={`flex flex-col gap-6 w-screen md:w-[75vw] px-10 md:mx-auto py-[5vh] ${textColor}`}>
      <span className={`text-base uppercase tracking-widest self-start flex items-center gap-1.5 ${textColor}`}>
        🌐 Mis webs
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SITES.map((site) => {
          return (
            <div
              key={site.label}
              className={`flex flex-col gap-4 p-6 rounded-xl border ${isDarkMode ? 'border-cvButtonSecondary/30' : 'border-cvButtonPrimary/30'}`}
            >
              <div className="w-full h-40 rounded-lg overflow-hidden relative">
                {imgLoading[site.url] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-6 h-6 border-2 border-t-transparent rounded-full animate-spin ${isDarkMode ? 'border-cvButtonSecondary' : 'border-cvButtonPrimary'}`} />
                  </div>
                )}
                <img
                  src={`https://s0.wordpress.com/mshots/v1/${encodeURIComponent(site.url)}?w=600&h=400`}
                  alt={site.label}
                  className="w-full h-full object-cover object-top"
                  style={{ opacity: imgLoading[site.url] ? 0 : 1, transition: 'opacity 0.3s ease' }}
                  onLoad={() => setImgLoading((prev) => ({ ...prev, [site.url]: false }))}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-base">{site.label}</span>
                <p className="text-sm opacity-60">{site.description}</p>
              </div>
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => openExternal(site.url)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold border transition-opacity hover:opacity-70 ${accentBorder} ${accentText}`}
                >
                  <i className="material-symbols-outlined text-sm">open_in_new</i>
                  Visitar
                </button>
                <button
                  onClick={() => handleOpenPreview(site.url)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-80 ${accentBg}`}
                >
                  <i className="material-symbols-outlined text-sm">preview</i>
                  Ver preview
                </button>
              </div>
            </div>
          );
        })}
        {fillers.map((_, i) => {
          return (
            <div
              key={`coming-soon-${i}`}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-dashed opacity-40 min-h-72 ${isDarkMode ? 'border-cvButtonSecondary' : 'border-cvButtonPrimary'}`}
            >
              <span className="text-3xl">🚧</span>
              <span className={`text-sm uppercase tracking-widest text-center ${accentText}`}>Proyecto en proceso</span>
              <p className="text-xs opacity-60 text-center">Algo nuevo se viene pronto.</p>
            </div>
          );
        })}
      </div>

      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">
          <div className={`relative w-full max-w-6xl h-[85vh] rounded-xl overflow-hidden border ${isDarkMode ? 'border-cvButtonSecondary/40' : 'border-cvButtonPrimary/40'}`}>
            <button
              onClick={handleClosePreview}
              className={`absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full text-white transition-opacity hover:opacity-80 ${accentBg}`}
            >
              <i className="material-symbols-outlined text-sm">close</i>
            </button>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${isDarkMode ? 'border-cvButtonSecondary' : 'border-cvButtonPrimary'}`} />
              </div>
            )}
            <iframe
              key={previewUrl}
              src={previewUrl}
              title="web preview"
              onLoad={handleLoad}
              className="w-full h-full"
              style={{
                border: 'none',
                opacity: isLoading ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
