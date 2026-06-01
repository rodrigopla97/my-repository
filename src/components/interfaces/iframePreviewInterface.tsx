import { usePortfolio } from '../../containers/states/portfolioProvider';
import useRoutes from '../../containers/hooks/useRoutes';

interface IframePreviewProps {
  previewUrl: string | null;
  previewLoading: boolean;
  setPreviewLoading: (v: boolean) => void;
  closePreview: () => void;
  label?: string;
}

export default function IframePreviewInterface({ previewUrl, previewLoading, setPreviewLoading, closePreview, label }: IframePreviewProps) {
  const { getPortfolioState } = usePortfolio();
  const { isDarkMode, bgColor } = getPortfolioState;
  const { openExternal } = useRoutes();

  const accentText = !isDarkMode ? 'text-cvButtonPrimary' : 'text-cvButtonSecondary';
  const accentBorder = !isDarkMode ? 'border-cvButtonPrimary' : 'border-cvButtonSecondary';
  const accentBg = !isDarkMode ? 'bg-cvButtonPrimary' : 'bg-cvButtonSecondary';

  if (!previewUrl) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col">
      <div
        className={`relative w-full flex flex-col overflow-hidden flex-1`}
        onClick={e => e.stopPropagation()}
      >
        <div className={`flex items-center gap-3 px-4 py-3 flex-shrink-0 ${bgColor}`}>
          <div className={`flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs truncate ${isDarkMode ? 'bg-white/10 text-neutral-400' : 'bg-black/10 text-neutral-600'}`}>
            <i className="material-symbols-outlined text-sm flex-shrink-0">lock</i>
            <span className="truncate">{previewUrl}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {label && <span className={`text-xs font-medium hidden md:block ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{label}</span>}
            <button
              onClick={() => openExternal(previewUrl)}
              className={`flex items-center gap-1 text-xs border px-2.5 py-1 rounded-full transition-opacity hover:opacity-70 ${accentText} ${accentBorder}`}
            >
              <i className="material-symbols-outlined text-sm">open_in_new</i>
              Abrir
            </button>
            <button
              onClick={closePreview}
              className={`flex items-center justify-center w-7 h-7 rounded-full transition-opacity hover:opacity-70 ${accentBg} text-white`}
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
}
