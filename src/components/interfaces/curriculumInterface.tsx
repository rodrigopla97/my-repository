import { usePortfolio } from '../../containers/states/portfolioProvider';
import { TRANSLATIONS } from '../../containers/constants/constants';
import { CurriculumInterfacePropsType } from '../../containers/entities/entities';

export default function CurriculumInterface({ download }: CurriculumInterfacePropsType) {
  const { getPortfolioState, setPortfolioState } = usePortfolio();
  const { isDarkMode, language } = getPortfolioState;
  const { curriculum } = TRANSLATIONS[language];
  const setCurriculumOpen = (isOpen: boolean) => setPortfolioState(prevState => ({ ...prevState, isCurriculumOpen: isOpen }));

  const buttonText = download ? curriculum.download : curriculum.view;
  const icon = download ? "download" : "open_in_new";

  return (
    <a
      href="/CV - Rodrigo Placeres.pdf"
      target="_blank"
      download={download ? "" : undefined}
      onClick={() => setCurriculumOpen(false)}
      className={`group flex items-center gap-3 px-5 py-3 text-sm font-medium tracking-wide transition-all duration-150 ${isDarkMode ? "text-cvButtonSecondary hover:bg-cvButtonPrimary/30" : "text-cvButtonPrimary hover:bg-cvButtonSecondary/30"}`}
    >
      <i className="material-symbols-outlined text-base leading-none">{icon}</i>
      <span className="group-hover:underline underline-offset-2">{buttonText}</span>
    </a>
  );
}
