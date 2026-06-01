import { useEffect } from "react";
import { useModal } from "../../containers/hooks/useModal";
import { usePortfolio } from "../../containers/states/portfolioProvider";

export default function ModalInterface() {
  const { modalState, modal } = useModal();
  const { getPortfolioState } = usePortfolio();
  const { isDarkMode, textColor, bgColor } = getPortfolioState;
  const { open, title, content } = modalState;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] md:flex md:items-center md:justify-center md:bg-black/70 md:backdrop-blur-sm"
      onClick={modal.close}
    >
      <div
        className={`flex flex-col h-full w-full md:h-auto md:max-w-xl md:rounded-xl md:overflow-hidden md:border md:shadow-2xl ${bgColor} ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={`relative flex items-center justify-center px-4 py-5 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
          <h2 className={`text-sm font-semibold uppercase tracking-widest ${textColor}`}>
            {title}
          </h2>
          <button
            onClick={modal.close}
            className={`absolute right-4 flex items-center justify-center transition-opacity hover:opacity-60 ${textColor}`}
            aria-label="Cerrar"
          >
            <i className="material-symbols-outlined text-xl">close</i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {content}
        </div>
      </div>
    </div>
  );
}
