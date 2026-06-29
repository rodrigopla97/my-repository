import { PROFILE } from "@app/modules/portfolio/constants/constants";
import { useModal } from "@app/modules/portfolio/hooks/useModal";
import { useNotification } from "@app/modules/portfolio/hooks/useNotification";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

export default function ContactMeInterface() {
  const { getPortfolioState, setPortfolioState } = usePortfolioProvider();
  const { modal } = useModal();
  const { notification } = useNotification();
  const { borderColor, textColor, isDarkMode } = getPortfolioState;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.message.trim() !== "" &&
    captchaToken !== null;

  useEffect(() => {
    setPortfolioState((s) => ({ ...s, contactFormValid: isFormValid }));
    return () => {
      setPortfolioState((s) => ({ ...s, contactFormValid: false }));
    };
  }, [isFormValid, setPortfolioState]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email:
          value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "El correo no es válido." : ""
      }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    const formBody = new FormData();
    formBody.append("name", formData.name);
    formBody.append("email", formData.email);
    formBody.append("message", formData.message);

    setPortfolioState((s) => ({ ...s, contactFormSubmitting: true }));
    try {
      await fetch(PROFILE.formEndpoint, { method: "POST", body: formBody });
      modal.close();
      notification.success("¡Mensaje enviado! Te responderé a la brevedad.");
      setFormData({ name: "", email: "", message: "" });
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      notification.error("Hubo un error al enviar el mensaje. Intentá de nuevo.");
    } finally {
      setPortfolioState((s) => ({ ...s, contactFormSubmitting: false }));
    }
  }

  const focusRing = isDarkMode ? "focus:border-cvButtonSecondary" : "focus:border-cvButtonPrimary";
  const labelFloat = `absolute left-0 text-sm pointer-events-none transition-all duration-200 top-4 peer-focus:top-0 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs ${textColor} ${isDarkMode ? "peer-focus:text-cvButtonSecondary peer-[&:not(:placeholder-shown)]:text-cvButtonSecondary" : "peer-focus:text-cvButtonPrimary peer-[&:not(:placeholder-shown)]:text-cvButtonPrimary"}`;
  const inputClass = `w-full bg-transparent border-b ${borderColor} ${focusRing} ${textColor} pt-5 pb-1 text-sm focus:outline-none transition-colors placeholder-transparent peer`;

  return (
    <div className={`flex flex-col w-full px-6 py-6 relative ${textColor}`}>
      <form id="contact-form" className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
          <label className={labelFloat}>
            Nombre <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <div className="relative">
            <input
              type="text"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              className={`${inputClass} ${errors.email ? "border-red-600" : ""}`}
            />
            <label className={labelFloat}>
              Correo <span className="text-red-500">*</span>
            </label>
          </div>
          <span className="text-red-600 text-xs h-4 block">{errors.email}</span>
        </div>
        <div className="relative">
          <textarea
            name="message"
            placeholder=" "
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
          <label className={labelFloat}>
            Mensaje <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            theme={isDarkMode ? "dark" : "light"}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />
        </div>
      </form>
    </div>
  );
}
