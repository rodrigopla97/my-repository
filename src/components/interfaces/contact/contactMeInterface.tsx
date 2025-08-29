import { useTheme } from "../../../context/themeContext";
import { useState } from "react";

export default function ContactMeInterface() {
  const { borderColor, textColor, isDarkMode } = useTheme();
  const [copySuccess, setCopySuccess] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const mail = "rodrigoplaceres19@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(mail)
      .then(() => setCopySuccess(true))
      .catch(() => setCopySuccess(false));

    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formBody = new FormData();
    formBody.append("name", formData.name);
    formBody.append("email", formData.email);
    formBody.append("message", formData.message);

    try {
      await fetch("https://formsubmit.co/ajax/rodrigoplaceres19@gmail.com", {
        method: "POST",
        body: formBody,
      });

      setFormSuccess(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setFormSuccess(false)
      }, 2000);
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full py-[10vh] md:w-1/2 ml-auto my-auto p-6 relative">

      {/* "notificacion" */}
      {(formSuccess || copySuccess) && (
        <div
          className={`absolute top-[10vh] right-[5vw] p-3 rounded-lg shadow-lg z-50 border-2 text-white ${isDarkMode
            ? "border-cvButtonSecondary bg-cvButtonSecondary"
            : "border-cvButtonPrimary bg-cvButtonPrimary"
            }`}
        >
          {formSuccess ? "¡Gracias por tu mensaje!" : "¡Copiado al portapapeles!"}
        </div>
      )}

      <div className={`w-[80vw] md:w-[40vw] p-6 border ${borderColor} rounded-lg shadow-md z-10`}>
        <h2 className="text-xl font-semibold mb-4">Envíame un mensaje</h2>
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

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleChange}
            className={`p-2 border rounded-md w-full bg-transparent ${borderColor} ${textColor} ${isDarkMode ? "placeholder-grayPrimary" : "placeholder-black"} placeholder-opacity-70`}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            value={formData.email}
            onChange={handleChange}
            className={`p-2 border rounded-md w-full bg-transparent ${borderColor} ${textColor} ${isDarkMode ? "placeholder-grayPrimary" : "placeholder-black"} placeholder-opacity-70`}
            required
          />
          <textarea
            name="message"
            placeholder="Escribe tu mensaje..."
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={`p-2 border rounded-md w-full bg-transparent resize-none overflow-y-auto ${borderColor} ${textColor} ${isDarkMode ? "placeholder-grayPrimary" : "placeholder-black"} placeholder-opacity-70`}
            required
          />
          <button
            type="submit"
            className={`p-2 rounded-lg font-semibold ${isDarkMode
              ? "bg-cvButtonSecondary text-white"
              : "bg-cvButtonPrimary text-white"
              } hover:opacity-80`}
          >
            Enviar correo
          </button>
        </form>
      </div>
    </div>
  );
}
