import { useTheme } from '../../context/themeContext';
import { useActions } from '../../context/actionsContext';

interface CurriculumInterfaceProps {
  download?: boolean;
}

export default function CurriculumInterface({ download }: CurriculumInterfaceProps) {
  const { isDarkMode } = useTheme();
  const { handleSetIsCurriculumOpen } = useActions();

  const buttonText = download ? "Descargar" : "Ver en otra pestaña";

  return (
    <a
      href="/CV - Rodrigo Placeres.pdf"
      target="_blank"
      download={download ? "" : undefined}
      onClick={() => handleSetIsCurriculumOpen(false)}
      className={`font-medium text-lg py-2 px-4 transition-all duration-300 w-auto border-2 border-transparent ${download ? "rounded-b-lg" : "rounded-t-lg"} ${isDarkMode ? "hover:border-cvButtonPrimary hover:bg-cvButtonPrimary" : "hover:border-cvButtonSecondary hover:bg-cvButtonSecondary"}  hover:bg-opacity-50 transition-all duration-300 mx-0`}
    >
      {buttonText}
    </a>
  );
}
