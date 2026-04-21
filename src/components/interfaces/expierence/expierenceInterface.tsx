import { usePortfolio } from "../../../containers/states/portfolioProvider";
import { TRANSLATIONS } from "../../../containers/constants/constants";
import FooterAllIcons from "../footerAllIconsInterface";

export default function ExperienceInterface() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, language } = getPortfolioState;
  const { experience } = TRANSLATIONS[language];

  return (
    <div className={`flex flex-col w-full items-center mt-4 ${textColor}`}>
      <div className="flex flex-col gap-2 w-full">

        <p className="text-sm" dangerouslySetInnerHTML={{ __html: experience.bio1 }} />
        <p className="text-sm" dangerouslySetInnerHTML={{ __html: experience.bio2 }} />

        <h3 className="text-base uppercase tracking-widest mt-4 flex items-center gap-1.5">
          {experience.techTitle}
        </h3>
        <FooterAllIcons />
        <h3 className="text-base uppercase tracking-widest mt-2 flex items-center gap-1.5">
          {experience.expTitle}
        </h3>
        <p className="text-sm" dangerouslySetInnerHTML={{ __html: experience.expParagraph1 }} />
        <p className="text-sm">{experience.expParagraph2}</p>
        <p className="text-sm">{experience.expParagraph3}</p>

        <h3 className="text-base uppercase tracking-widest mt-2 flex items-center gap-1.5">
          {experience.goalTitle}
        </h3>
        <p className="text-sm">{experience.goalParagraph1}</p>
        <p className="text-sm">{experience.goalParagraph2}</p>

      </div>
    </div>
  );
}