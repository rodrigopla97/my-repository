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
  const [operationFailed, setOperationFailed] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showChallenge, setShowChallenge] = useState(false);
  const [challenge, setChallenge] = useState<{ question: string; answer: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (showChallenge) {
      setChallenge(generateChallenge());
      setUserAnswer("");
      setAnswerCorrect(null);
    }
  }, [showChallenge]);

  useEffect(() => {
    if (!userAnswer || !challenge) { setAnswerCorrect(null); return; }
    setAnswerCorrect(parseInt(userAnswer) === challenge.answer);
  }, [userAnswer, challenge]);

  function handleCopyEmail() {
    navigator.clipboard.writeText("rodrigoplaceres19@gmail.com")
      .then(() => { setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!showChallenge || !answerCorrect) {
      setOperationFailed(true);
      setTimeout(() => setOperationFailed(false), 2000);
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
  const accentBorder = isDarkMode ? "border-cvButtonSecondary" : "border-cvButtonPrimary";
  const focusRing = isDarkMode ? "focus:border-cvButtonSecondary" : "focus:border-cvButtonPrimary";
  const inputClass = `w-full bg-transparent border-b ${borderColor} ${focusRing} ${textColor} py-3 text-sm focus:outline-none transition-colors ${isDarkMode ? "placeholder-grayPrimary" : "placeholder-black"} placeholder-opacity-50`;

  return (
    <div className={`flex flex-col justify-center items-center w-full min-h-screen px-6 md:px-0 relative ${textColor}`}>

      {/* Toast */}
      {(formSuccess || operationFailed) && (
        <div className={`fixed top-[10vh] right-6 px-4 py-2 rounded text-sm text-white z-50 ${isDarkMode ? "bg-cvButtonSecondary" : "bg-cvButtonPrimary"}`}>
          {formSuccess && "¡Mensaje enviado!"}
          {operationFailed && "Completá la verificación"}
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
            <i className={`material-icons-outlined text-base flex-shrink-0 ${accentColor}`}>mail</i>
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
            <i className={`material-icons-outlined text-base flex-shrink-0 ${accentColor}`}>code</i>
            <span>github.com/rodrigopla97</span>
          </span>
          <span onClick={() => openExternal('https://www.linkedin.com/in/rodrigo-placeres/')} className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <i className={`material-icons-outlined text-base flex-shrink-0 ${accentColor}`}>work</i>
            <span>linkedin.com/in/rodrigo-placeres</span>
          </span>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} className={inputClass} required />
          <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} className={inputClass} required />
          <textarea name="message" placeholder="Mensaje" rows={3} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} required />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Verificación */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
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

              <div className="flex items-center gap-2 min-w-[140px]">
                {showChallenge && challenge && (
                  <>
                    <span className="text-sm font-mono opacity-60">{challenge.question}</span>
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className={`w-14 bg-transparent border-b text-center text-sm py-1 focus:outline-none transition-colors
                        ${answerCorrect === true ? "border-green-500" : answerCorrect === false && userAnswer ? "border-red-400" : borderColor}
                        ${textColor} appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                    <div className="w-5 flex items-center justify-center">
                      {answerCorrect === true && <span className="text-green-500 text-sm">✓</span>}
                      {answerCorrect === false && userAnswer && (
                        <button type="button" onClick={() => { setChallenge(generateChallenge()); setUserAnswer(""); setAnswerCorrect(null); }} className="text-red-400 text-sm hover:text-red-500 transition-colors">↺</button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-opacity hover:opacity-70 ${accentColor}`}>
              Enviar
              <span className={`text-lg border-b ${accentBorder}`}>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
