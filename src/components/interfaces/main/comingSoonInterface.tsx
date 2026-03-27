import { useTheme } from '../../../context/themeContext';

export default function ComingSoonInterface() {
  const { textColor, isDarkMode } = useTheme();

  return (
    <div className={`flex flex-col items-center justify-center w-screen min-h-screen gap-6 ${textColor} px-6`}>
      <span className="text-5xl">🛠️</span>
      <h2 className="text-2xl md:text-3xl font-bold text-center">Sección en construcción</h2>
      <p className={`text-center max-w-md opacity-70`}>
        Próximamente habrá contenido nuevo por acá. Gracias por la paciencia.
      </p>
      <div className={`mt-2 px-5 py-1 rounded-full text-sm font-semibold border ${isDarkMode ? 'border-cvButtonSecondary text-cvButtonSecondary' : 'border-cvButtonPrimary text-cvButtonPrimary'}`}>
        Próximamente
      </div>
    </div>
  );
}
