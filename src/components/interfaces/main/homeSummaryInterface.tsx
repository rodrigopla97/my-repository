import { useState } from 'react';
import type { CertificationItem } from '../../../containers/entities/entities';
import { usePortfolio } from '../../../containers/states/portfolioProvider';
import useRoutes from '../../../containers/hooks/useRoutes';
import FooterAllIcons from '../footerAllIconsInterface';
import { ABOUT_CONTENT, CERTIFICATIONS } from '../../../containers/constants/constants';

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

const techSection = ABOUT_CONTENT.sections.find(s => s.tags);

export default function HomeSummaryInterface() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, isDarkMode } = getPortfolioState;
  const { navigate, openExternal } = useRoutes();
  const [imgLoading, setImgLoading] = useState<Record<string, boolean>>(
    Object.fromEntries(SITES.map(s => [s.url, true]))
  );
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  const accentColor = !isDarkMode ? 'text-cvButtonPrimary' : 'text-cvButtonSecondary';
  const accentBorder = !isDarkMode ? 'border-cvButtonPrimary' : 'border-cvButtonSecondary';
  const accentBorderFaint = !isDarkMode ? 'border-cvButtonPrimary/30' : 'border-cvButtonSecondary/30';

  return (
    <div className={`flex flex-col gap-12 w-screen md:w-[75vw] px-10 md:mx-auto py-[8vh] ${textColor}`}>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="text-base uppercase tracking-widest">🌐 Proyectos</span>
          <button
            onClick={() => navigate('/projects')}
            className={`text-xs uppercase tracking-widest flex items-center gap-1 ${accentColor} transition-opacity hover:opacity-70`}
          >
            Ver todos
            <i className="material-symbols-outlined text-sm">arrow_forward</i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SITES.map(site => (
            <div
              key={site.label}
              className={`group flex flex-col gap-3 p-4 rounded-xl border ${accentBorderFaint}`}
            >
              <div className="w-full h-36 rounded-lg overflow-hidden relative">
                {imgLoading[site.url] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${!isDarkMode ? 'border-cvButtonPrimary' : 'border-cvButtonSecondary'}`} />
                  </div>
                )}
                <img
                  src={`https://s0.wordpress.com/mshots/v1/${encodeURIComponent(site.url)}?w=600&h=400`}
                  alt={site.label}
                  className="w-full h-full object-cover object-top"
                  style={{ opacity: imgLoading[site.url] ? 0 : 1, transition: 'opacity 0.3s ease' }}
                  onLoad={() => setImgLoading(prev => ({ ...prev, [site.url]: false }))}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => { setPreviewUrl(site.url); setPreviewLoading(true); }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ${!isDarkMode ? 'bg-cvButtonPrimary' : 'bg-cvButtonSecondary'}`}
                  >
                    <i className="material-symbols-outlined text-sm">preview</i>
                    Ver preview
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{site.label}</span>
                <button
                  onClick={() => openExternal(site.url)}
                  className={`flex items-center gap-1 text-xs border px-2.5 py-1 rounded-full transition-opacity hover:opacity-70 ${accentColor} ${accentBorder}`}
                >
                  <i className="material-symbols-outlined text-sm">open_in_new</i>
                  Visitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {techSection?.tags && (
        <div className="flex flex-col gap-4">
          <span className="text-base uppercase tracking-widest">🛠️ Tecnologías</span>
          <FooterAllIcons isPaused={false} items={techSection.tags.items} />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <span className="text-base uppercase tracking-widest">🎓 Certificaciones</span>
        <div className="flex flex-col gap-3">
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={i}
              onClick={() => cert.imageUrl && setSelectedCert(cert)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-opacity ${accentBorderFaint} ${cert.imageUrl ? 'cursor-pointer hover:opacity-70' : ''}`}
            >
              <div className="flex flex-col gap-0.5">
                <span className={`text-xs uppercase tracking-widest ${accentColor}`}>{cert.institution}</span>
                <span className="text-sm font-medium">{cert.title}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {cert.inProgress && (
                  <span className={`text-xs px-2 py-0.5 rounded border ${accentColor} ${accentBorder} opacity-70`}>En curso</span>
                )}
                {cert.imageUrl && (
                  <i className={`material-symbols-outlined text-base opacity-40 ${accentColor}`}>image_search</i>
                )}
                <span className="text-xs opacity-50">{cert.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {previewUrl && (() => {
        const site = SITES.find(s => s.url === previewUrl);
        return (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm md:p-8"
            onClick={() => { setPreviewUrl(null); setPreviewLoading(false); }}
          >
            <div
              className={`relative w-full max-w-6xl flex flex-col overflow-hidden md:rounded-xl border ${accentBorderFaint} shadow-2xl h-[100dvh] md:h-[85vh]`}
              onClick={e => e.stopPropagation()}
            >
              <div className={`flex items-center gap-3 px-4 py-3 flex-shrink-0 ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
                <div className={`flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs truncate ${isDarkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-white text-neutral-500'}`}>
                  <i className="material-symbols-outlined text-sm flex-shrink-0">lock</i>
                  <span className="truncate">{previewUrl}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {site && <span className={`text-xs font-medium hidden md:block ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{site.label}</span>}
                  <button
                    onClick={() => openExternal(previewUrl)}
                    className={`flex items-center gap-1 text-xs border px-2.5 py-1 rounded-full transition-opacity hover:opacity-70 ${accentColor} ${accentBorder}`}
                  >
                    <i className="material-symbols-outlined text-sm">open_in_new</i>
                    Abrir
                  </button>
                  <button
                    onClick={() => { setPreviewUrl(null); setPreviewLoading(false); }}
                    className={`flex items-center justify-center w-7 h-7 rounded-full transition-opacity hover:opacity-70 ${!isDarkMode ? 'bg-cvButtonPrimary' : 'bg-cvButtonSecondary'} text-white`}
                  >
                    <i className="material-symbols-outlined text-sm">close</i>
                  </button>
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden">
                {previewLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className={`w-8 h-8 border-2 border-t-transparent rounded-full animate-spin ${!isDarkMode ? 'border-cvButtonPrimary' : 'border-cvButtonSecondary'}`} />
                  </div>
                )}
                <iframe
                  key={previewUrl}
                  src={previewUrl}
                  title="web preview"
                  onLoad={() => setPreviewLoading(false)}
                  className="w-full h-full"
                  style={{ border: 'none', opacity: previewLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}
                />
              </div>
            </div>
          </div>
        );
      })()}

      {selectedCert?.imageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className={`relative max-w-2xl w-full rounded-xl overflow-hidden border ${!isDarkMode ? 'border-cvButtonPrimary/40' : 'border-cvButtonSecondary/40'}`}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className={`absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full text-white transition-opacity hover:opacity-80 ${!isDarkMode ? 'bg-cvButtonPrimary' : 'bg-cvButtonSecondary'}`}
            >
              <i className="material-symbols-outlined text-sm">close</i>
            </button>
            <img
              src={selectedCert.imageUrl}
              alt={selectedCert.title}
              className="w-full h-auto"
            />
            <div className={`px-5 py-4 flex flex-col gap-0.5 ${!isDarkMode ? 'bg-white' : 'bg-neutral-900'}`}>
              <span className={`text-xs uppercase tracking-widest ${accentColor}`}>{selectedCert.institution}</span>
              <span className={`text-sm font-medium ${textColor}`}>{selectedCert.title} — {selectedCert.year}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
