import lightLogo from "@app/images/black-logo.png";
import darkLogo from "@app/images/gray-logo.png";
import useRouter from "@app/modules/main/hooks/useRouter";
import TooltipInterface from "@app/modules/main/interfaces/tooltipInterface";
import { PROFILE } from "@app/modules/portfolio/constants/constants";
import { useTranslations } from "@app/modules/portfolio/hooks/useTranslations";
import { useModal } from "@app/modules/portfolio/hooks/useModal";
import ContactMeInterface from "@app/modules/portfolio/interfaces/contact/contactMeInterface";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useState } from "react";

function ContactSubmitButton() {
  const { getPortfolioState } = usePortfolioProvider();
  const { contactFormValid, contactFormSubmitting, isDarkMode } = getPortfolioState;
  const translations = useTranslations();
  const isDisabled = !contactFormValid || contactFormSubmitting;
  return (
    <button
      form="contact-form"
      type="submit"
      disabled={isDisabled}
      className={`group flex items-center gap-2 border rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${isDisabled ? "opacity-30 cursor-not-allowed" : "hover:scale-105 active:scale-95"} ${isDarkMode ? "text-cvButtonSecondary border-cvButtonSecondary" : "text-cvButtonPrimary border-cvButtonPrimary"}`}
    >
      {translations.contactSend}
    </button>
  );
}

export default function FooterInterface() {
  const { getPortfolioState } = usePortfolioProvider();
  const { textColor, isDarkMode, tabdataItems, language } = getPortfolioState;
  const translations = useTranslations();
  const { navigate, pathname, openExternal } = useRouter();
  const { modal } = useModal();
  const [copySuccess, setCopySuccess] = useState(false);
  const accentColor = !isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary";

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  function openContactModal() {
    modal.open(translations.contactSendModal, <ContactMeInterface />, {
      footerActions: {
        closeText: translations.contactCancel,
        extraButtons: <ContactSubmitButton />
      }
    });
  }

  return (
    <div
      className={`flex flex-col w-screen h-screen md:h-auto md:border-t ${textColor} md:justify-center font-semibold overflow-visible py-[10vh] md:py-[5vh] px-[5vh] md:px-8 gap-10 ${isDarkMode ? "bg-black/20 md:border-black" : "bg-white/20 md:border-white"}`}
    >
      <div className="flex flex-col md:flex-row justify-center md:justify-normal gap-5 md:gap-10">
        <div className="flex md:flex-col w-full md:w-1/4 items-center justify-between">
          <div>
            <h2 className="font-bold text-xl">{PROFILE.name}</h2>
            <span className="font-light">{translations.role}</span>
          </div>
          <img
            src={isDarkMode ? darkLogo : lightLogo}
            alt="bye"
            className="max-h-[16vh] cursor-pointer"
            onClick={() => {
              if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
              else navigate("/");
            }}
          />
        </div>

        <div className="flex flex-col md:w-1/4 items-center uppercase self-stretch">
          <div className="flex flex-col gap-4 w-full items-start h-full">
            <span className="uppercase">{translations.navLabel}</span>
            <div className="flex flex-col gap-3 normal-case font-normal">
              {tabdataItems.map((tab, index) => {
                const isActive = pathname === tab.path;
                const tabName = translations.tabNames[tab.path] ?? (language === "es" ? (tab.nameEs || tab.name) : (tab.nameEn || tab.name));
                return (
                  <span
                    key={index}
                    className={`flex items-center gap-2 cursor-pointer py-1 text-sm transition select-none ${
                      isActive
                        ? `${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"}`
                        : `opacity-80 ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`
                    }`}
                    onClick={() => {
                      if (pathname === tab.path) window.scrollTo({ top: 0, behavior: "smooth" });
                      else navigate(tab.path);
                    }}
                  >
                    <i className={`material-symbols-outlined text-sm ${accentColor}`}>{tab.icon}</i>
                    {tabName}
                    <span className="w-2 flex items-center justify-center">
                      {isActive && (
                        <span
                          className={`block w-1.5 h-1.5 rounded-full animate-pulse ${!isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary"}`}
                        />
                      )}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:w-1/2 gap-4 uppercase">
          <span>{translations.contactLabel}</span>
          <div className="flex flex-col md:flex-row gap-8 normal-case font-normal">
            <div className="flex flex-col gap-1 md:w-1/2 justify-between">
              <TooltipInterface
                text={copySuccess ? translations.copiedTooltip : translations.copyTooltip}
                position="bottom"
              >
                <span
                  className={`flex items-center gap-2 cursor-pointer py-1 text-sm transition select-none opacity-80 ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`}
                  onClick={handleCopyEmail}
                >
                  <i className={`material-symbols-outlined text-sm flex-shrink-0 ${accentColor}`}>
                    mail
                  </i>
                  {PROFILE.email}
                  <i
                    className={`material-symbols-outlined text-sm flex-shrink-0 transition-colors ${copySuccess ? "text-green-500" : "opacity-40"}`}
                  >
                    {copySuccess ? "check" : "content_copy"}
                  </i>
                </span>
              </TooltipInterface>
              <TooltipInterface text={translations.goGithub} position="bottom">
                <span
                  className={`flex items-center gap-2 cursor-pointer py-1 text-sm transition select-none opacity-80 ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`}
                  onClick={() => openExternal(PROFILE.github.url)}
                >
                  <i className={`material-symbols-outlined text-sm flex-shrink-0 ${accentColor}`}>
                    code
                  </i>
                  {PROFILE.github.label}
                </span>
              </TooltipInterface>
              <TooltipInterface text={translations.goLinkedin} position="bottom">
                <span
                  className={`flex items-center gap-2 cursor-pointer py-1 text-sm transition select-none opacity-80 ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`}
                  onClick={() => openExternal(PROFILE.linkedin.url)}
                >
                  <i className={`material-symbols-outlined text-sm flex-shrink-0 ${accentColor}`}>
                    work
                  </i>
                  {PROFILE.linkedin.label}
                </span>
              </TooltipInterface>
            </div>
            <div className="flex flex-col gap-4 md:w-1/2 justify-center">
              <p className="text-sm opacity-70">{translations.contactCta}</p>
              <button
                type="button"
                onClick={openContactModal}
                className={`self-start flex items-center gap-2 text-sm normal-case font-normal transition-all hover:opacity-70 ${accentColor}`}
              >
                <i className="material-symbols-outlined text-sm">send</i>
                {translations.contactSendModal}
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
