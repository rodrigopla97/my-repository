import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useModal } from '@app/modules/portfolio/hooks/useModal';
import { usePortfolio } from '@app/modules/portfolio/states/portfolioProvider';

export default function ModalInterface() {
  const { modalState, modal } = useModal();
  const { getPortfolioState, setPortfolioState } = usePortfolio();
  const { isDarkMode, textColor, bgColor } = getPortfolioState;
  const { open, title, content, footerActions } = modalState;
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!new URLSearchParams(location.search).has("modal") && open) {
      setPortfolioState(s => ({ ...s, modal: { ...s.modal, open: false } }));
    }
  }, [location.search, setPortfolioState, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 md:flex md:items-center md:justify-center md:bg-black/70 md:backdrop-blur-sm"
      onClick={modal.close}
    >
      <div
        className={`flex flex-col h-full w-full md:h-auto md:max-h-[75vh] md:max-w-xl md:rounded-xl md:overflow-hidden md:border md:shadow-2xl ${bgColor} ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile header */}
        <div className={`flex md:hidden items-center gap-1 px-4 py-5 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
          <button type="button" onClick={modal.close} className={`flex-shrink-0 flex items-center transition-opacity hover:opacity-60 ${textColor}`}>
            <i className="material-symbols-outlined text-2xl">chevron_left</i>
          </button>
          <h2 className={`text-sm font-semibold uppercase tracking-widest ${textColor}`}>{title}</h2>
        </div>
        {/* Desktop header */}
        <div className={`hidden md:relative md:flex md:items-center md:justify-center px-4 py-5 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
          <h2 className={`text-sm font-semibold uppercase tracking-widest ${textColor}`}>{title}</h2>
          <button
            type="button"
            onClick={modal.close}
            className={`absolute right-4 flex items-center justify-center transition-opacity hover:opacity-60 ${textColor}`}
          >
            <i className="material-symbols-outlined text-xl">close</i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {content}
        </div>

        {footerActions && (
          <div className={`flex items-center justify-end gap-3 px-5 py-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
            <button
              type="button"
              onClick={modal.close}
              className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-full transition-opacity hover:opacity-70 ${textColor} ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}
            >
              {footerActions.closeText ?? 'Cerrar'}
            </button>
            {footerActions.extraButtons}
          </div>
        )}
      </div>
    </div>
  );
}
