import useRouter from "@app/modules/main/hooks/useRouter";
import { useTranslations } from "@app/modules/portfolio/hooks/useTranslations";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect, useState } from "react";

export default function NotFoundInterface() {
  const { getPortfolioState } = usePortfolioProvider();
  const { textColor, isDarkMode } = getPortfolioState;
  const { navigate } = useRouter();
  const translations = useTranslations();
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds === 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  return (
    <div
      className={`flex flex-col items-center justify-center w-screen h-screen gap-6 ${textColor}`}
    >
      <span className="text-6xl">⚠️</span>
      <h1 className="text-3xl font-bold">{translations.errorTitle}</h1>
      <p className="text-center opacity-70 max-w-sm">{translations.errorDescription(seconds)}</p>
      <button
        type="button"
        onClick={() => navigate("/")}
        className={`mt-4 px-6 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-80 ${isDarkMode ? "bg-cvButtonSecondary" : "bg-cvButtonPrimary"}`}
      >
        {translations.errorButton}
      </button>
    </div>
  );
}
