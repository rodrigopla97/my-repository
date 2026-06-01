import { useState } from "react";
import useRoutes from "../../containers/hooks/useRoutes";
import { usePortfolio } from "../../containers/states/portfolioProvider";
import { useModal } from "../../containers/hooks/useModal";
import { useIframePreview } from "../../containers/hooks/useIframePreview";
import IframePreviewInterface from "../../components/interfaces/iframePreviewInterface";
import TooltipInterface from "../../components/interfaces/tooltipInterface";
import { PROJECT_SITES } from "../../containers/constants/constants";

const SITES = PROJECT_SITES;

export default function ProjectsPage() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, isDarkMode, tabdataItems } = getPortfolioState;
  const { openExternal, navigate } = useRoutes();
  const { modal } = useModal();
  const { previewUrl, previewLoading, setPreviewLoading, openPreview, closePreview } = useIframePreview();
  const [imgLoading, setImgLoading] = useState<Record<string, boolean>>(
    Object.fromEntries(SITES.map(s => [s.url, true]))
  );

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
        {SITES.map(site => (
          <div key={site.url} className={`group/card relative rounded-xl border overflow-hidden h-44 ${accentBorderFaint}`}>
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

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4">
              <TooltipInterface text="Ver preview" position="bottom">
                <button
                  onClick={() => openPreview(site.url)}
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/30 text-white transition-all hover:scale-110 hover:bg-white/20"
                >
                  <i className="material-symbols-outlined text-xl">preview</i>
                </button>
              </TooltipInterface>
              <TooltipInterface text="Info" position="bottom">
                <button
                  onClick={() => modal.open(site.label, (
                    <p className={`px-6 py-8 text-sm leading-relaxed ${textColor}`}>{site.description}</p>
                  ))}
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/30 text-white transition-all hover:scale-110 hover:bg-white/20"
                >
                  <i className="material-symbols-outlined text-xl">info</i>
                </button>
              </TooltipInterface>
              <TooltipInterface text="Visitar" position="bottom">
                <button
                  onClick={() => openExternal(site.url)}
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/30 text-white transition-all hover:scale-110 hover:bg-white/20"
                >
                  <i className="material-symbols-outlined text-xl">open_in_new</i>
                </button>
              </TooltipInterface>
            </div>
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
