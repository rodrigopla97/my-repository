import { useTheme } from '../../context/themeContext';
import React from 'react';

interface CurriculumInterfaceProps {
  download?: boolean;
}

export default function CurriculumInterface({ download }: CurriculumInterfaceProps) {
  const { isDarkMode, textColor } = useTheme();

  const buttonText = download ? "Descargar CV ⬇️" : "Ver CV 👀";

  return (
    <a
      href="/CV - Rodrigo Placeres.pdf"
      target="_blank"
      download={download ? "" : undefined}
      className={`font-medium text-lg py-2 px-4 rounded-lg transition-all duration-300 ${textColor} ${isDarkMode ? "bg-cvButtonSecondary" : "text-cvButtonPrimary"} hover:underline hover:bg-opacity-50 md:w-fit md:my-4 md:mx-auto md:md:mx-0 md:text-lg lg:text-xl md:border-2 md:border-transparent md:hover:bg-opacity-80 md:${isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary"}`}
    >
      {buttonText}
    </a>
  );
}