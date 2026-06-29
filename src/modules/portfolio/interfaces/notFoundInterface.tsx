import useRouter from "@app/modules/main/hooks/useRouter";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect, useState } from "react";

export default function NotFoundInterface() {
  const { getPortfolioState } = usePortfolioProvider();
  const { textColor, isDarkMode } = getPortfolioState;
  const { navigate } = useRouter();
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
      <span className="text-6xl">âš ï¸</span>
      <h1 className="text-3xl font-bold">Algo salió mal</h1>
      <p className="text-center opacity-70 max-w-sm">
        Ocurrió un error o la página que buscás no existe. Serás redirigido al inicio en{" "}
        {seconds} segundos.
      </p>
      <button
        type="button"
        onClick={() => navigate("/")}
        className={`mt-4 px-6 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-80 ${isDarkMode ? "bg-cvButtonSecondary" : "bg-cvButtonPrimary"}`}
      >
        Volver al inicio
      </button>
    </div>
  );
}
