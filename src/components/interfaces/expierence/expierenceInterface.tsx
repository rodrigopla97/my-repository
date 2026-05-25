import React, { useState, useEffect } from "react";
import { usePortfolio } from "../../../containers/states/portfolioProvider";
import FooterAllIcons from "../footerAllIconsInterface";
import { parseBold } from "../../../utils/parseBold";

export default function ExperienceInterface() {
  const { getPortfolioState } = usePortfolio();
  const { isDarkMode, textColor, aboutSections } = getPortfolioState;
  const accentColor = !isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary";
  const accentBorder = !isDarkMode ? "border-cvButtonPrimary" : "border-cvButtonSecondary";
  const [isIconsPaused, setIsIconsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <div className={`flex flex-col w-full items-center mt-4 ${textColor}`}>
      <div className="flex flex-col gap-2 w-full">

        {(aboutSections.data?.sections ?? []).map((section, i) => (
          <React.Fragment key={i}>
            <>
              <div className="flex items-center gap-2 mt-2">
                {!section.hideTitle && (
                  <h3 className="text-base uppercase tracking-widest flex items-center gap-1.5">
                    {section.title}
                  </h3>
                )}
                {section.tags?.animated && section.tags.items.length > (isDesktop ? 5 : 3) && (
                  <button
                    onClick={() => setIsIconsPaused(p => !p)}
                    className={`transition-opacity duration-200 opacity-30 hover:opacity-80 ${textColor}`}
                    title={isIconsPaused ? "Reanudar" : "Pausar"}
                  >
                    <i className="material-symbols-outlined text-base">{isIconsPaused ? "play_arrow" : "pause"}</i>
                  </button>
                )}
              </div>
              {section.items.length > 0 && section.items.map((text, j) => (
                <p key={j} className="text-sm">{parseBold(text)}</p>
              ))}
              {section.tags && (
                section.tags.animated
                  ? <FooterAllIcons isPaused={isIconsPaused} items={section.tags.items} />
                  : <div className="flex flex-wrap gap-2 mt-1">
                      {section.tags.items.map(t => (
                        <span key={t.key} className={`text-xs px-3 py-1 rounded border font-medium tracking-wide uppercase ${accentColor} ${accentBorder} ${!isDarkMode ? "bg-cvButtonPrimary/30" : "bg-cvButtonSecondary/30"}`}>
                          {t.label}
                        </span>
                      ))}
                    </div>
              )}
            </>
          </React.Fragment>
        ))}

      </div>
    </div>
  );
}
