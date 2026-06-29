import { parseBold } from "@app/modules/portfolio/helpers/parseBold";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import React from "react";

export default function ExperienceInterface() {
  const { getPortfolioState } = usePortfolioProvider();
  const { textColor, aboutSections } = getPortfolioState;

  return (
    <div className={`flex flex-col w-full items-center mt-4 ${textColor}`}>
      <div className="flex flex-col gap-2 w-full">
        {(aboutSections.data?.sections ?? []).map((section, i) => (
          <React.Fragment key={i}>
            {!section.hideTitle && (
              <h3 className="text-base uppercase tracking-widest flex items-center gap-1.5 mt-2">
                {section.title}
              </h3>
            )}
            {section.items.map((text, j) => (
              <p key={j} className="text-sm">
                {parseBold(text)}
              </p>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
