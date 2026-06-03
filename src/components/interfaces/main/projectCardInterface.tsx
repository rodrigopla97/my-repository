import useRoutes from '../../../containers/hooks/useRoutes';
import { useAccentColors } from '../../../containers/hooks/useAccentColors';
import SpinnerInterface from '../spinnerInterface';
import type { ProjectSiteItem } from '../../../containers/entities/entities';

interface ProjectCardProps {
  site: ProjectSiteItem;
  cardKey: string;
  imgLoading: boolean;
  onImgLoad: () => void;
  onImgError: () => void;
  infoUrl: string | null;
  setInfoUrl: (url: string | null) => void;
  menuKey: string | null;
  setMenuKey: (key: string | null) => void;
  onPreview: (url: string) => void;
  onPointerDownCapture?: (e: React.PointerEvent) => void;
}

export default function ProjectCardInterface({
  site, cardKey, imgLoading, onImgLoad, onImgError,
  infoUrl, setInfoUrl, menuKey, setMenuKey, onPreview, onPointerDownCapture
}: ProjectCardProps) {
  const { accentBorderFaint, isDarkMode } = useAccentColors();
  const { openExternal } = useRoutes();

  return (
    <div className={`group/card relative rounded-xl border overflow-hidden h-44 ${accentBorderFaint}`} onPointerDown={onPointerDownCapture}>
      {imgLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <SpinnerInterface size={20} />
        </div>
      )}
      <img
        src={`https://s0.wordpress.com/mshots/v1/${encodeURIComponent(site.url)}?w=600&h=400`}
        alt={site.label}
        className="w-full h-full object-cover object-top"
        style={{ opacity: imgLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}
        draggable={false}
        onLoad={onImgLoad}
        onError={onImgError}
      />
      <span className="absolute bottom-3 left-0 text-sm font-semibold text-white px-3 py-1 rounded-r-full bg-black/60 backdrop-blur-sm pointer-events-none">{site.label}</span>

      {infoUrl === site.url ? (
        <div className="absolute inset-0 flex flex-col backdrop-blur-sm bg-black/80 animate-fadeIn" onPointerDown={e => e.stopPropagation()}>
          <div className="flex items-center gap-2 px-3 pt-3 pb-2 flex-shrink-0">
            <button onClick={() => setInfoUrl(null)} className="flex items-center justify-center text-white/70 hover:text-white transition-colors">
              <i className="material-symbols-outlined text-2xl">chevron_left</i>
            </button>
            <span className="text-white text-xs font-semibold uppercase tracking-wide truncate">{site.label}</span>
          </div>
          <p className="text-white text-sm leading-relaxed px-3 pb-3 overflow-y-auto">{site.description}</p>
        </div>
      ) : (
        <>
          <button
            className="absolute top-2 right-2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); setMenuKey(menuKey === cardKey ? null : cardKey); }}
          >
            <i className="material-symbols-outlined text-base">more_vert</i>
          </button>
          {menuKey === cardKey && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div
                className="flex flex-col w-40 rounded-xl overflow-hidden bg-black/80 backdrop-blur-sm border border-white/10 animate-fadeIn pointer-events-auto"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
              >
                {[
                  { icon: 'visibility', label: 'Previsualizar', action: () => { onPreview(site.url); setMenuKey(null); } },
                  { icon: 'info', label: 'Info', action: () => { setInfoUrl(site.url); setMenuKey(null); } },
                  { icon: 'open_in_new', label: 'Visitar', action: () => { openExternal(site.url); setMenuKey(null); } },
                ].map(item => (
                  <button
                    key={item.icon}
                    onClick={item.action}
                    className={`flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors text-white/70 hover:text-white ${!isDarkMode ? 'hover:bg-cvButtonPrimary/20' : 'hover:bg-cvButtonSecondary/20'}`}
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
  );
}
