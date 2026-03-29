import { useTheme } from "../../../context/themeContext";
import { useState, useEffect } from "react";
import useRoutes from "../../../hooks/useRoutes";
import { MathChallengeOperationType } from "../../../entities/entities";

function generateChallenge(): { question: string; answer: number } {
  const ops: MathChallengeOperationType[] = ["+", "-", "×"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a: number, b: number, answer: number;

  if (op === "+") {
    a = Math.floor(Math.random() * 9) + 1;
    b = Math.floor(Math.random() * 9) + 1;
    answer = a + b;
  } else if (op === "-") {
    a = Math.floor(Math.random() * 8) + 2;
    b = Math.floor(Math.random() * (a - 1)) + 1;
    answer = a - b;
  } else {
    a = Math.floor(Math.random() * 5) + 2;
    b = Math.floor(Math.random() * 4) + 2;
    answer = a * b;
  }

  return { question: `${a} ${op} ${b} =`, answer };
}

export default function ContactMeInterface() {
  const { borderColor, textColor, isDarkMode } = useTheme();
  const { openExternal } = useRoutes();
  const [formSuccess, setFormSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "", captcha: "" });
  const [showChallenge, setShowChallenge] = useState(false);
  const [challenge, setChallenge] = useState<{ question: string; answer: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (showChallenge) {
      setChallenge(generateChallenge());
      setUserAnswer("");
      setAnswerCorrect(null);
    }
  }, [showChallenge]);

  useEffect(() => {
    if (!userAnswer || !challenge) { setAnswerCorrect(null); return; }
    const correct = parseInt(userAnswer) === challenge.answer;
    setAnswerCorrect(correct);
    if (correct) {
      setErrors(prev => ({ ...prev, captcha: "" }));
    } else {
      setIsResetting(true);
      const timeout = setTimeout(() => {
        setChallenge(generateChallenge());
        setUserAnswer("");
        setAnswerCorrect(null);
        setIsResetting(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [userAnswer, challenge]);

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
    if (!showChallenge || !answerCorrect) newErrors.captcha = "Completá la verificación.";

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
        setShowChallenge(false);
        setUserAnswer("");
        setAnswerCorrect(null);
        setChallenge(null);
      }, 2000);
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
  }

  const accentColor = isDarkMode ? "text-cvButtonSecondary" : "text-cvButtonPrimary";
  const accentBg = isDarkMode ? "bg-cvButtonSecondary" : "bg-cvButtonPrimary";
  const focusRing = isDarkMode ? "focus:border-cvButtonSecondary" : "focus:border-cvButtonPrimary";
  const errorClass = "text-red-600";
  const labelFloat = `absolute left-0 text-sm pointer-events-none transition-all duration-200 opacity-50 top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:opacity-80 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:opacity-80 ${isDarkMode ? "peer-focus:text-cvButtonSecondary peer-[&:not(:placeholder-shown)]:text-cvButtonSecondary" : "peer-focus:text-cvButtonPrimary peer-[&:not(:placeholder-shown)]:text-cvButtonPrimary"}`;
  const inputClass = `w-full bg-transparent border-b ${borderColor} ${focusRing} ${textColor} pt-5 pb-1 text-sm focus:outline-none transition-colors placeholder-transparent peer`;

  return (
    <div className={`flex flex-col justify-center items-center w-full min-h-screen px-6 md:px-0 pt-[10vh] relative ${textColor}`}>

      {/* Toast */}
      {formSuccess && (
        <div className={`fixed top-[10vh] right-6 px-4 py-2 rounded text-sm text-white z-50 ${isDarkMode ? "bg-cvButtonSecondary" : "bg-cvButtonPrimary"}`}>
          ¡Mensaje enviado!
        </div>
      )}

      <div className="w-full max-w-xl flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="text-sm uppercase tracking-widest opacity-50">Contacto</span>
          <h2 className="text-4xl font-bold">Contactate conmigo.</h2>
          <p className="text-sm opacity-60">
            Si tenés un proyecto en mente, una propuesta o alguna duda, no dudes en escribirme.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity">
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
          <span onClick={() => openExternal('https://github.com/rodrigopla97')} className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <i className={`material-symbols-outlined text-base flex-shrink-0 ${accentColor}`}>code</i>
            <span>github.com/rodrigopla97</span>
          </span>
          <span onClick={() => openExternal('https://www.linkedin.com/in/rodrigo-placeres/')} className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <i className={`material-symbols-outlined text-base flex-shrink-0 ${accentColor}`}>work</i>
            <span>linkedin.com/in/rodrigo-placeres</span>
          </span>
        </div>

        {/* Form */}
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

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Verificación */}
            <div className="flex flex-col gap-1">
            <div className="h-10 flex items-center gap-4">
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={showChallenge}
                  onClick={() => {
                    setShowChallenge(!showChallenge);
                    if (showChallenge) { setUserAnswer(""); setAnswerCorrect(null); setChallenge(null); }
                  }}
                  className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center flex-shrink-0 transition-colors ${showChallenge ? `${accentBg} border-transparent` : borderColor}`}
                >
                  {showChallenge && <span className="text-white text-[10px] font-bold leading-none">✓</span>}
                </button>
                <span className="text-sm opacity-60">No soy un robot</span>
              </div>

              <div className="flex items-center gap-2">
                {showChallenge && challenge && (
                  <>
                    <span className="text-sm font-mono opacity-60 whitespace-nowrap">{challenge.question}</span>
                    {isResetting
                      ? <i className="material-symbols-outlined text-sm animate-spin opacity-50 w-14 text-center">progress_activity</i>
                      : <input
                          type="text"
                          inputMode="numeric"
                          value={userAnswer}
                          onChange={(e) => { if (/^\d*$/.test(e.target.value)) setUserAnswer(e.target.value); }}
                          className={`w-14 bg-transparent border-b text-center text-sm py-1 focus:outline-none transition-colors
                            ${answerCorrect === true ? "border-green-500" : answerCorrect === false && userAnswer ? "border-red-600" : borderColor}
                            ${textColor}`}
                        />
                    }
                    <div className="w-5 flex items-center justify-center">
                      {answerCorrect === true && <span className="text-green-500 text-sm">✓</span>}
                      {answerCorrect === false && <span className={`text-sm ${errorClass}`}>✗</span>}
                    </div>
                  </>
                )}
              </div>
            </div>
            <span className={`${errorClass} text-xs h-4`}>{errors.captcha}</span>
            </div>

            {/* Submit */}
            <button type="submit" className={`group flex items-center gap-2 border rounded-full px-5 py-2 self-end text-xs font-semibold uppercase tracking-widest backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ${isDarkMode ? "text-cvButtonSecondary border-cvButtonSecondary hover:bg-cvButtonPrimary/30" : "text-cvButtonPrimary border-cvButtonPrimary hover:bg-cvButtonSecondary/30"}`}>
              <span className="group-hover:underline underline-offset-2">Enviar</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
