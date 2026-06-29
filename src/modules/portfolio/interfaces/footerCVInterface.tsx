import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { usePortfolio } from '@app/modules/portfolio/states/portfolioProvider';
import { useCurriculum } from '@app/modules/portfolio/hooks/useCurriculum';
import { useIframePreview } from '@app/modules/main/hooks/useIframePreview';
import IframePreviewInterface from '@app/modules/portfolio/interfaces/iframePreviewInterface';

export default function FooterCVInterface() {
  const { getPortfolioState, setPortfolioState } = usePortfolio();
  const { isDarkMode, isMenuOpen } = getPortfolioState;
  const { isCurriculumOpen, setCurriculumOpen } = useCurriculum();
  const { previewUrl, previewLoading, setPreviewLoading, openPreview, closePreview } = useIframePreview();
  const { pathname } = useLocation();
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [nearBottom, setNearBottom] = React.useState(false);

  const isAbout = pathname === '/about';
  const accentColor = isDarkMode ? 'text-cvButtonSecondary' : 'text-cvButtonPrimary';
  const accentBorder = isDarkMode ? 'border-cvButtonSecondary' : 'border-cvButtonPrimary';
  const accentBg = isDarkMode ? 'bg-cvButtonSecondary' : 'bg-cvButtonPrimary';
  const accentBgFaint = isDarkMode ? 'bg-cvButtonSecondary/10' : 'bg-cvButtonPrimary/10';
  const accentHover = isDarkMode ? 'hover:bg-cvButtonSecondary/10' : 'hover:bg-cvButtonPrimary/10';
  const divider = isDarkMode ? 'border-cvButtonSecondary/15' : 'border-cvButtonPrimary/15';
  const panelBorder = isDarkMode ? 'border-white/10' : 'border-white/30';

  useEffect(() => {
    function handleScroll() {
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 80;
      setNearBottom(atBottom);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    setCurriculumOpen(false);
    setIsCVOpen(false);
  }, [isMenuOpen, setCurriculumOpen]);

  function close() { setCurriculumOpen(false); setIsCVOpen(false); }

  return (
    <React.Fragment>
      {!isMenuOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            onClick={close}
            className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 ${isCurriculumOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          />

          {/* Panel */}
          <div className={`
            fixed z-50 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-out
            bottom-0 left-0 right-0 min-h-[50vh] rounded-t-2xl
            md:left-auto md:right-0 md:w-1/5 md:min-h-[33vh] md:rounded-tl-2xl md:rounded-tr-none md:border-r-0 md:border-b-0
            ${isDarkMode ? 'bg-darkGray/60' : 'bg-white/50'} border ${panelBorder}
            ${isCurriculumOpen ? 'translate-y-0' : 'translate-y-full'}
          `}>

            {/* Mobile handle */}
            <div className="flex justify-center pt-3 pb-1 md:hidden">
              <div className={`w-10 h-1 rounded-full opacity-30 ${accentBg}`} />
            </div>

            <div className="flex flex-col py-2">
              {isAbout && (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      setPortfolioState(s => ({ ...s, aboutSections: { loading: false, data: null } }));
                    }}
                    className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium w-full transition-all duration-150 ${accentColor} ${accentHover}`}
                  >
                    <i className="material-symbols-outlined text-base leading-none">sync</i>
                    <span>Sincronizar contenido</span>
                  </button>
                  <div className={`mx-4 border-t ${divider}`} />
                </>
              )}

              <button
                type="button"
                onClick={() => setIsCVOpen(o => !o)}
                className={`flex items-center justify-between gap-3 px-5 py-3.5 text-sm font-medium w-full transition-all duration-150 ${accentColor} ${accentHover}`}
              >
                <div className="flex items-center gap-3">
                  <i className="material-symbols-outlined text-base leading-none">description</i>
                  <span>Curriculum</span>
                </div>
                <i className={`material-symbols-outlined text-base leading-none transition-transform duration-200 ${isCVOpen ? 'rotate-180' : ''}`}>expand_more</i>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${isCVOpen ? 'max-h-40' : 'max-h-0'}`}>
                <button
                  type="button"
                  onClick={() => { close(); openPreview('/CV - Rodrigo Placeres.pdf'); }}
                  className={`flex items-center gap-3 pl-12 pr-5 py-3 text-sm font-medium w-full transition-all duration-150 ${accentColor} ${accentHover}`}
                >
                  <i className="material-symbols-outlined text-base leading-none">visibility</i>
                  <span>Previsualizar</span>
                </button>
                <a
                  href="/CV - Rodrigo Placeres.pdf"
                  download=""
                  onClick={close}
                  className={`flex items-center gap-3 pl-12 pr-5 py-3 text-sm font-medium transition-all duration-150 ${accentColor} ${accentHover}`}
                >
                  <i className="material-symbols-outlined text-base leading-none">download</i>
                  <span>Descargar</span>
                </a>
              </div>
            </div>

          </div>

          {/* FAB */}
          <div className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${nearBottom && !isCurriculumOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`}>
            {!isCurriculumOpen && (
              <span className={`absolute inset-0 rounded-full animate-ping opacity-25 ${accentBg}`} />
            )}
            <button
              type="button"
              onClick={() => { setIsCVOpen(false); setCurriculumOpen(!isCurriculumOpen); }}
              className={`relative flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-sm shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ${accentColor} ${accentBorder} ${accentBgFaint}`}
            >
              <i className="material-symbols-outlined text-2xl transition-transform duration-200">
                {isCurriculumOpen ? 'close' : 'touch_app'}
              </i>
            </button>
          </div>
        </>
      )}
      <IframePreviewInterface
        previewUrl={previewUrl}
        previewLoading={previewLoading}
        setPreviewLoading={setPreviewLoading}
        closePreview={closePreview}
        label="Curriculum"
      />
    </React.Fragment>
  );
}
