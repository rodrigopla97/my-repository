import { useState } from 'react';
import { usePortfolio } from '../../containers/states/portfolioProvider';
import useRoutes from '../../containers/hooks/useRoutes';
import lightLogo from '../../images/black-logo.png';
import darkLogo from '../../images/gray-logo.png';
import { PROFILE } from '../../containers/constants/constants';
import { useModal } from '../../containers/hooks/useModal';
import ContactMeInterface from './contact/contactMeInterface';
import TooltipInterface from './tooltipInterface';

function ContactSubmitButton() {
  const { getPortfolioState } = usePortfolio();
  const { contactFormValid, isDarkMode } = getPortfolioState;
  return (
    <button
      form="contact-form"
      type="submit"
      disabled={!contactFormValid}
      className={`group flex items-center gap-2 border rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${contactFormValid ? 'hover:scale-105 active:scale-95' : 'opacity-30 cursor-not-allowed'} ${isDarkMode ? 'text-cvButtonSecondary border-cvButtonSecondary' : 'text-cvButtonPrimary border-cvButtonPrimary'}`}
    >
      Enviar
    </button>
  );
}

export default function FooterInterface() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, isDarkMode, tabdataItems } = getPortfolioState;
  const { navigate, pathname, openExternal } = useRoutes();
  const { modal } = useModal();
  const [copySuccess, setCopySuccess] = useState(false);
  const accentColor = !isDarkMode ? 'text-cvButtonPrimary' : 'text-cvButtonSecondary';

  function handleCopyEmail() {
    navigator.clipboard.writeText(PROFILE.email)
      .then(() => { setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); });
  }

  function openContactModal() {
    modal.open(
      'Enviar un mensaje',
      <ContactMeInterface />,
      {
        footerActions: {
          closeText: 'Cancelar',
          extraButtons: <ContactSubmitButton />,
        },
      }
    );
  }

  return (
    <div className={`flex flex-col w-screen h-screen md:h-auto md:border-t ${textColor} md:justify-center font-semibold overflow-visible py-[10vh] md:py-[5vh] px-[5vh] md:px-8 bg-opacity-20 gap-10 ${isDarkMode ? "bg-black md:border-black" : "bg-white md:border-white"}`}>

      <div className="flex flex-col md:flex-row justify-center md:justify-normal gap-5 md:gap-10">
        <div className='flex md:flex-col w-full md:w-1/4 items-center justify-between'>
          <div>
            <h2 className='font-bold text-xl'>{PROFILE.name}</h2>
            <span className='font-light'>{PROFILE.role}</span>
          </div>
          <img src={isDarkMode ? darkLogo : lightLogo} alt="bye" className='max-h-[16vh] cursor-pointer' onClick={() => navigate("/")} />
        </div>

        <div className='flex flex-col md:w-1/4 items-center uppercase self-stretch'>
          <div className='flex flex-col gap-4 w-full items-start h-full'>
            <span className='uppercase'>Navegación</span>

            <div className='flex flex-col gap-3 normal-case font-normal'>
              {tabdataItems.map((tab, index) => {
                const isActive = pathname === tab.path;
                return (
                  <span
                    key={index}
                    className={`flex items-center gap-2 cursor-pointer py-1 text-sm transition select-none ${isActive
                      ? `${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"}`
                      : `opacity-80 ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`
                      }`}
                    onClick={() => navigate(tab.path)}
                  >
                    <i className={`material-symbols-outlined text-sm ${accentColor}`}>{tab.icon}</i>
                    {tab.name}
                    <span className="w-2 flex items-center justify-center">
                      {isActive && <span className={`block w-1.5 h-1.5 rounded-full animate-pulse ${!isDarkMode ? 'bg-cvButtonPrimary' : 'bg-cvButtonSecondary'}`} />}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className='flex flex-col md:w-1/2 gap-4 uppercase'>
          <span>Contacto</span>
          <div className='flex flex-col md:flex-row gap-8 normal-case font-normal'>
            <div className='flex flex-col gap-1 md:w-1/2 justify-between'>
              <TooltipInterface text={copySuccess ? '¡Copiado!' : 'Copiar al portapapeles'} position="bottom">
                <span className={`flex items-center gap-2 cursor-pointer py-1 text-sm transition select-none opacity-80 ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`} onClick={handleCopyEmail}>
                  <i className={`material-symbols-outlined text-sm flex-shrink-0 ${accentColor}`}>mail</i>
                  {PROFILE.email}
                  <i className={`material-symbols-outlined text-sm flex-shrink-0 transition-colors ${copySuccess ? 'text-green-500' : 'opacity-40'}`}>
                    {copySuccess ? 'check' : 'content_copy'}
                  </i>
                </span>
              </TooltipInterface>
              <TooltipInterface text="Ir a GitHub" position="bottom">
                <span className={`flex items-center gap-2 cursor-pointer py-1 text-sm transition select-none opacity-80 ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`} onClick={() => openExternal(PROFILE.github.url)}>
                  <i className={`material-symbols-outlined text-sm flex-shrink-0 ${accentColor}`}>code</i>
                  {PROFILE.github.label}
                </span>
              </TooltipInterface>
              <TooltipInterface text="Ir a LinkedIn" position="bottom">
                <span className={`flex items-center gap-2 cursor-pointer py-1 text-sm transition select-none opacity-80 ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`} onClick={() => openExternal(PROFILE.linkedin.url)}>
                  <i className={`material-symbols-outlined text-sm flex-shrink-0 ${accentColor}`}>work</i>
                  {PROFILE.linkedin.label}
                </span>
              </TooltipInterface>
            </div>
            <div className='flex flex-col gap-4 md:w-1/2 justify-center'>
              <p className='text-sm opacity-70'>
                Si tenés un proyecto en mente, una propuesta o alguna duda, no dudes en escribirme.
              </p>
              <button
                onClick={openContactModal}
                className={`self-start flex items-center gap-2 text-sm normal-case font-normal transition-all hover:opacity-70 ${accentColor}`}
              >
                <i className="material-symbols-outlined text-sm">send</i>
                Enviar mensaje
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full text-center text-xs font-light">
        © {new Date().getFullYear()} {PROFILE.name}
      </div>
    </div>
  );
}