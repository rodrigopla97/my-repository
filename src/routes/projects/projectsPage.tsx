import { useState, useEffect } from "react";
import useRoutes from "../../containers/hooks/useRoutes";
import { usePortfolio } from "../../containers/states/portfolioProvider";
import { useIframePreview } from "../../containers/hooks/useIframePreview";
import IframePreviewInterface from "../../components/interfaces/iframePreviewInterface";
import ProjectCardInterface from "../../components/interfaces/main/projectCardInterface";
import { PROJECT_SITES } from "../../containers/constants/constants";

const SITES = PROJECT_SITES;

export default function ProjectsPage() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, isDarkMode, tabdataItems } = getPortfolioState;
  const { navigate } = useRoutes();
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

  return (
    <div className={`flex flex-col gap-8 w-screen md:w-3/4 px-10 md:mx-auto py-[10vh] min-h-screen ${textColor}`}>
      {!isInNav && (
        <button
          onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}
          className={`self-start flex items-center gap-1 text-xs uppercase tracking-widest transition-opacity hover:opacity-70 ${accentText}`}
        >
          <i className="material-symbols-outlined text-xl">chevron_left</i>
          Volver
        </button>
      )}
      <span className="text-base uppercase tracking-widest self-start">🌐 Mis webs</span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SITES.map((site, siteIdx) => (
          <ProjectCardInterface
            key={`${site.url}-${siteIdx}`}
            site={site}
            cardKey={`${siteIdx}`}
            imgLoading={imgLoading[site.url]}
            onImgLoad={() => setImgLoading(prev => ({ ...prev, [site.url]: false }))}
            onImgError={() => setImgLoading(prev => ({ ...prev, [site.url]: false }))}
            infoUrl={infoUrl}
            setInfoUrl={setInfoUrl}
            menuKey={menuKey}
            setMenuKey={setMenuKey}
            onPreview={openPreview}
          />
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
