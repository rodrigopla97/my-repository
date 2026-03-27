import { useTheme } from '../../../context/themeContext';
import useRoutes from '../../../hooks/useRoutes';

export default function ImageContactInterface() {
  const { isDarkMode, textColor, borderColor } = useTheme();
  const { openExternal } = useRoutes();

  const accentColor = isDarkMode ? 'text-cvButtonSecondary' : 'text-cvButtonPrimary';
  const accentBorder = isDarkMode ? 'border-cvButtonSecondary' : 'border-cvButtonPrimary';

  return (
    <div className={`hidden md:flex md:w-1/2 h-full flex-col justify-center px-16 gap-8 border-r ${borderColor}`}>

      <div className="flex flex-col gap-2">
        <span className={`text-sm uppercase tracking-widest opacity-50 ${textColor}`}>Contacto</span>
        <h2 className={`text-4xl font-bold ${textColor}`}>Hablemos.</h2>
        <p className={`text-base opacity-60 max-w-xs ${textColor}`}>
          Estoy disponible para nuevos proyectos, colaboraciones o simplemente para charlar.
        </p>
      </div>

      <div className={`w-10 border-t-2 ${accentBorder}`} />

      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <i className={`material-icons-outlined text-xl ${accentColor}`}>mail</i>
          <a
            href="mailto:rodrigoplaceres19@gmail.com"
            className={`text-sm opacity-70 hover:opacity-100 transition-opacity ${textColor}`}
          >
            rodrigoplaceres19@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-4">
          <i className={`material-icons-outlined text-xl ${accentColor}`}>code</i>
          <span
            onClick={() => openExternal('https://github.com/rodrigopla97')}
            className={`text-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer ${textColor}`}
          >
            github.com/rodrigopla97
          </span>
        </div>

        <div className="flex items-center gap-4">
          <i className={`material-icons-outlined text-xl ${accentColor}`}>work</i>
          <span
            onClick={() => openExternal('https://www.linkedin.com/in/rodrigo-placeres/')}
            className={`text-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer ${textColor}`}
          >
            linkedin.com/in/rodrigo-placeres
          </span>
        </div>
      </div>

    </div>
  );
}
