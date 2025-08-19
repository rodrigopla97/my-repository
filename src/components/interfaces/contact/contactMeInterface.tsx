import { useTheme } from "../../../context/themeContext";
import { useState } from "react";

export default function ContactMeInterface() {
  const { borderColor, textColor, isDarkMode } = useTheme();
  const [copySuccess, setCopySuccess] = useState(false);

  const mail = "rodrigoplaceres19@gmail.com"

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(mail)
      .then(() => setCopySuccess(true))
      .catch(() => setCopySuccess(false));

    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 ml-auto my-auto p-6">
      <div className={`w-[80vw] md:w-[40vw] p-6 border ${borderColor} rounded-lg shadow-md z-10`}>
        <h2 className="text-xl font-semibold mb-4">Envíame un mensaje</h2>
        <p className="mb-4">
          Hola! Si deseás contactarme, podés enviarme un correo a la dirección que aparece a continuación.
        </p>
        <div className="flex items-center content-center mb-4">
          <a
            href={`mailto:${mail}`}
            className={`md:text-lg font-semibold underline ${textColor} hover:text-opacity-80 mr-2`}
          >
            {mail}
          </a>
          <i
            className="material-symbols-outlined cursor-pointer"
            onClick={handleCopyEmail}
            title={copySuccess ? "¡Copiado!" : "Copiar Email"}
          >
            content_copy
          </i>
        </div>
        <div className="text-sm font-bold h-2">
          <p className={`${isDarkMode ? "text-cvButtonSecondary" : "text-cvButtonPrimary"} ${!copySuccess && "hidden"}`}>
            ¡Copiado al portapapeles!
          </p>
        </div>
      </div>

    </div>
  );
}
