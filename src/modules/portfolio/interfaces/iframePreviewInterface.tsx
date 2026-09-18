import useRouter from "@app/modules/main/hooks/useRouter";
import { useTranslations } from "@app/modules/portfolio/hooks/useTranslations";
import SpinnerInterface from "@app/modules/portfolio/interfaces/spinnerInterface";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect, useRef, useState } from "react";

const LOAD_TIMEOUT_MS = 6000;

interface IframePreviewProps {
  previewUrl: string | null;
  previewLoading: boolean;
  setPreviewLoading: (v: boolean) => void;
  closePreview: () => void;
  label?: string;
  blocked?: boolean;
}

export default function IframePreviewInterface({
  previewUrl,
  previewLoading,
  setPreviewLoading,
  closePreview,
  label,
  blocked
}: IframePreviewProps) {
  const { getPortfolioState } = usePortfolioProvider();
  const { isDarkMode, bgColor } = getPortfolioState;
  const { openExternal } = useRouter();
  const translations = useTranslations();
  const [timedOut, setTimedOut] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTimedOut(false);
    if (!previewUrl || blocked) return;
    timeoutRef.current = setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [previewUrl, blocked]);

  function handleIframeLoad() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPreviewLoading(false);
  }

  const accentText = !isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary";
  const accentBorder = !isDarkMode ? "border-cvButtonPrimary" : "border-cvButtonSecondary";
  const accentBg = !isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary";
  const isBlocked = blocked || timedOut;

  if (!previewUrl) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col">
      <div
        className={`relative w-full flex flex-col overflow-hidden flex-1`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center gap-3 px-4 py-3 flex-shrink-0 ${bgColor}`}>
          <div
            className={`flex-1 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs truncate ${isDarkMode ? "bg-white/10 text-neutral-400" : "bg-black/10 text-neutral-600"}`}
          >
            <i className="material-symbols-outlined text-sm flex-shrink-0">lock</i>
            <span className="truncate">{previewUrl}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {label && (
              <span
                className={`text-xs font-medium hidden md:block ${isDarkMode ? "text-neutral-400" : "text-neutral-500"}`}
              >
                {label}
              </span>
            )}
            <button
              type="button"
              onClick={() => openExternal(previewUrl)}
              className={`flex items-center gap-1 text-xs border px-2.5 py-1 rounded-full transition-opacity hover:opacity-70 ${accentText} ${accentBorder}`}
            >
              <i className="material-symbols-outlined text-sm">open_in_new</i>
              Abrir
            </button>
            <button
              type="button"
              onClick={closePreview}
              className={`flex items-center justify-center w-7 h-7 rounded-full transition-opacity hover:opacity-70 ${accentBg} text-white`}
            >
              <i className="material-symbols-outlined text-sm">close</i>
            </button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          {isBlocked ? (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center ${isDarkMode ? "bg-neutral-950" : "bg-neutral-100"}`}
            >
              <i className={`material-symbols-outlined text-5xl ${accentText}`}>block</i>
              <h3 className="text-lg font-semibold">{translations.previewBlockedTitle}</h3>
              <p className="max-w-sm opacity-70">{translations.previewBlockedDesc}</p>
              <button
                type="button"
                onClick={() => openExternal(previewUrl)}
                className={`flex items-center gap-1 text-sm border px-3 py-1.5 rounded-full transition-opacity hover:opacity-70 ${accentText} ${accentBorder}`}
              >
                <i className="material-symbols-outlined text-sm">open_in_new</i>
                {translations.visit}
              </button>
            </div>
          ) : (
            <>
              {previewLoading && (
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 ${isDarkMode ? "bg-neutral-950" : "bg-neutral-100"}`}
                >
                  <SpinnerInterface className="w-12 h-12 border-4" />
                  <span
                    className={`text-xs uppercase tracking-widest opacity-50 ${isDarkMode ? "text-neutral-300" : "text-neutral-600"}`}
                  >
                    Cargando...
                  </span>
                </div>
              )}
              <iframe
                key={previewUrl}
                src={previewUrl}
                title="web preview"
                onLoad={handleIframeLoad}
                className="w-full h-full"
                style={{
                  border: "none",
                  opacity: previewLoading ? 0 : 1,
                  transition: "opacity 0.3s ease"
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
