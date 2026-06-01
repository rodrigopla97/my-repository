import { useState, useEffect } from "react";
import useRoutes from "../../containers/hooks/useRoutes";
import { usePortfolio } from "../../containers/states/portfolioProvider";
import { useIframePreview } from "../../containers/hooks/useIframePreview";
import IframePreviewInterface from "../../components/interfaces/iframePreviewInterface";
import { PROJECT_SITES } from "../../containers/constants/constants";

const SITES = PROJECT_SITES;

export default function ProjectsPage() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, isDarkMode, tabdataItems } = getPortfolioState;
  const { openExternal, navigate } = useRoutes();
  const { previewUrl, previewLoading, setPreviewLoading, openPreview, closePreview } = useIframePreview();
  const [imgLoading, setImgLoading] = useState<Record<string, boolean>>(
    Object.fromEntries(SITES.map(s => [s.url, true]))
  );

  const [infoUrl, setInfoUrl] = useState<string | null>(null);
  const [menuKey, setMenuKey] = useState<string | null>(null);

  useEffect(() => {
    if (!menuKey) return;
    const close = () => setMenuKey(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuKey]);

  const isInNav = tabdataItems.some(t => t.path === '/projects');
  const accentText = isDarkMode ? 'text-cvButtonSecondary' : 'text-cvButtonPrimary';
  const accentBorder = isDarkMode ? 'border-cvButtonSecondary' : 'border-cvButtonPrimary';
  const accentBorderFaint = isDarkMode ? 'border-cvButtonSecondary/30' : 'border-cvButtonPrimary/30';

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
        {SITES.map((site, siteIdx) => (
          <div key={`${site.url}-${siteIdx}`} className={`group/card relative rounded-xl border overflow-hidden h-44 ${accentBorderFaint}`}>
            {imgLoading[site.url] && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${isDarkMode ? 'border-cvButtonSecondary' : 'border-cvButtonPrimary'}`} />
              </div>
            )}
            <img
              src={`https://s0.wordpress.com/mshots/v1/${encodeURIComponent(site.url)}?w=600&h=400`}
              alt={site.label}
              draggable={false}
              className="w-full h-full object-cover object-top"
              style={{ opacity: imgLoading[site.url] ? 0 : 1, transition: 'opacity 0.3s ease' }}
              onLoad={() => setImgLoading(prev => ({ ...prev, [site.url]: false }))}
              onError={() => setImgLoading(prev => ({ ...prev, [site.url]: false }))}
            />
            <span className="absolute bottom-3 left-0 text-sm font-semibold text-white px-3 py-1 rounded-r-full bg-black/60 backdrop-blur-sm pointer-events-none">{site.label}</span>

            {infoUrl === site.url ? (
              <div className="absolute inset-0 flex flex-col backdrop-blur-sm bg-black/80 animate-fadeIn">
                <div className="flex items-center gap-2 px-3 pt-3 pb-2 flex-shrink-0">
                  <button
                    onClick={() => setInfoUrl(null)}
                    className="flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  >
                    <i className="material-symbols-outlined text-base">arrow_back</i>
                  </button>
                  <span className="text-white text-xs font-semibold uppercase tracking-wide truncate">{site.label}</span>
                </div>
                <p className="text-white text-sm leading-relaxed px-3 pb-3 overflow-y-auto">{site.description}</p>
              </div>
            ) : (
              <>
                <button
                  className="absolute top-2 right-2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                  onClick={e => { e.stopPropagation(); setMenuKey(prev => prev === `${siteIdx}` ? null : `${siteIdx}`); }}
                >
                  <i className="material-symbols-outlined text-base">more_vert</i>
                </button>
                {menuKey === `${siteIdx}` && (
                  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div
                      className="flex flex-col w-40 rounded-xl overflow-hidden bg-black/80 backdrop-blur-sm border border-white/10 animate-fadeIn pointer-events-auto"
                      onClick={e => e.stopPropagation()}
                    >
                      {[
                        { icon: 'preview', label: 'Previsualizar', action: () => { openPreview(site.url); setMenuKey(null); } },
                        { icon: 'info', label: 'Info', action: () => { setInfoUrl(site.url); setMenuKey(null); } },
                        { icon: 'open_in_new', label: 'Visitar', action: () => { openExternal(site.url); setMenuKey(null); } },
                      ].map(item => (
                        <button
                          key={item.icon}
                          onClick={item.action}
                          className={`flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors text-white/70 hover:text-white ${isDarkMode ? 'hover:bg-cvButtonSecondary/20' : 'hover:bg-cvButtonPrimary/20'}`}
                        >
                          <i className="material-symbols-outlined text-base flex-shrink-0">{item.icon}</i>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        <div
          className={`flex flex-col items-center justify-center gap-2 p-6 rounded-xl border border-dashed opacity-30 min-h-44 ${accentBorder}`}
        >
          <span className="text-3xl">🚧</span>
          <span className={`text-xs uppercase tracking-widest text-center ${accentText}`}>Próximamente</span>
        </div>

      </div>

      <IframePreviewInterface
        previewUrl={previewUrl}
        previewLoading={previewLoading}
        setPreviewLoading={setPreviewLoading}
        closePreview={closePreview}
        label={SITES.find(s => s.url === previewUrl)?.label}
      />
    </div>
  );
}
