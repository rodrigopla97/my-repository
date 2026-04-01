import { useTheme } from "../../../context/themeContext";
import { useState, useRef } from "react";
import useRoutes from "../../../hooks/useRoutes";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

export default function ContactMeInterface() {
  const { borderColor, textColor, isDarkMode } = useTheme();
  const { openExternal } = useRoutes();
  const [formSuccess, setFormSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "", captcha: "" });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  function handleCopyEmail() {
    navigator.clipboard.writeText("rodrigoplaceres19@gmail.com")
      .then(() => { setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(prev => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors = { name: "", email: "", message: "", captcha: "" };
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido.";
    if (!formData.email.trim()) newErrors.email = "El correo es requerido.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "El correo no es válido.";
    if (!formData.message.trim()) newErrors.message = "El mensaje es requerido.";
    if (!captchaToken) newErrors.captcha = "Completá la verificación.";

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

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
        setFormSuccess(false);
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      }, 2000);
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
  }

  const accentColor = isDarkMode ? "text-cvButtonSecondary" : "text-cvButtonPrimary";
  const focusRing = isDarkMode ? "focus:border-cvButtonSecondary" : "focus:border-cvButtonPrimary";
  const errorClass = "text-red-600";
  const labelFloat = `absolute left-0 text-sm pointer-events-none transition-all duration-200 top-4 peer-focus:top-0 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs ${textColor} ${isDarkMode ? "peer-focus:text-cvButtonSecondary peer-[&:not(:placeholder-shown)]:text-cvButtonSecondary" : "peer-focus:text-cvButtonPrimary peer-[&:not(:placeholder-shown)]:text-cvButtonPrimary"}`;
  const inputClass = `w-full bg-transparent border-b ${borderColor} ${focusRing} ${textColor} pt-5 pb-1 text-sm focus:outline-none transition-colors placeholder-transparent peer`;

  return (
    <div className={`flex flex-col justify-center items-center w-full min-h-screen px-6 md:px-0 py-[10vh] relative ${textColor}`}>

      {formSuccess && (
        <div className={`fixed top-[10vh] right-6 px-4 py-2 rounded text-sm text-white z-50 ${isDarkMode ? "bg-cvButtonSecondary" : "bg-cvButtonPrimary"}`}>
          ¡Mensaje enviado!
        </div>
      )}

      <div className="w-full max-w-xl flex flex-col gap-10 md:pb-0">

        <div className="flex flex-col gap-2">
          <span className={`text-base uppercase tracking-widest flex items-center gap-1.5 ${textColor}`}>
            📬 Contacto
          </span>
          <h2 className="text-4xl font-bold">Contactate conmigo.</h2>
          <p className="text-sm">
            Si tenés un proyecto en mente, una propuesta o alguna duda, no dudes en escribirme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <i className={`material-symbols-outlined text-base flex-shrink-0 ${accentColor}`}>mail</i>
            <a href="mailto:rodrigoplaceres19@gmail.com" className="whitespace-nowrap">rodrigoplaceres19@gmail.com</a>
            <i
              className="material-symbols-outlined text-base cursor-pointer flex-shrink-0"
              onClick={handleCopyEmail}
              title={copySuccess ? "¡Copiado!" : "Copiar email"}
            >
              {copySuccess ? "check" : "content_copy"}
            </i>
          </div>
          <span onClick={() => openExternal('https://github.com/rodrigopla97')} className="flex items-center gap-2 text-sm cursor-pointer">
            <i className={`material-symbols-outlined text-base flex-shrink-0 ${accentColor}`}>code</i>
            <span>github.com/rodrigopla97</span>
          </span>
          <span onClick={() => openExternal('https://www.linkedin.com/in/rodrigo-placeres/')} className="flex items-center gap-2 text-sm cursor-pointer">
            <i className={`material-symbols-outlined text-base flex-shrink-0 ${accentColor}`}>work</i>
            <span>linkedin.com/in/rodrigo-placeres</span>
          </span>
        </div>

        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <div className="relative">
              <input type="text" name="name" placeholder=" " value={formData.name} onChange={handleChange} className={`${inputClass} ${errors.name ? "border-red-600" : ""}`} />
              <label className={labelFloat}>Nombre</label>
            </div>
            <span className={`${errorClass} text-xs h-4`}>{errors.name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="relative">
              <input type="text" name="email" placeholder=" " value={formData.email} onChange={handleChange} className={`${inputClass} ${errors.email ? "border-red-600" : ""}`} />
              <label className={labelFloat}>Correo</label>
            </div>
            <span className={`${errorClass} text-xs h-4`}>{errors.email}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="relative">
              <textarea name="message" placeholder=" " rows={3} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none ${errors.message ? "border-red-600" : ""}`} />
              <label className={labelFloat}>Mensaje</label>
            </div>
            <span className={`${errorClass} text-xs h-4`}>{errors.message}</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="mx-auto md:mx-0">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  theme={isDarkMode ? "dark" : "light"}
                  onChange={(token) => {
                    setCaptchaToken(token);
                    if (token) setErrors(prev => ({ ...prev, captcha: "" }));
                  }}
                  onExpired={() => setCaptchaToken(null)}
                />
              </div>
              <button type="submit" className={`group self-end md:self-auto flex items-center gap-2 border rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ${isDarkMode ? "text-cvButtonSecondary border-cvButtonSecondary hover:bg-cvButtonPrimary/30" : "text-cvButtonPrimary border-cvButtonPrimary hover:bg-cvButtonSecondary/30"}`}>
                <span className="group-hover:underline underline-offset-2">Enviar</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>
            <span className={`${errorClass} text-xs h-4`}>{errors.captcha}</span>
          </div>
        </form>
      </div>
    </div>
  );
}
