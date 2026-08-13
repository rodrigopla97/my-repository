import desk from "@app/images/avatar-float.png";
import bgAvatarDesk from "@app/images/bg-avatar.png";
import { useTranslations } from "@app/modules/portfolio/hooks/useTranslations";
import BackgroundImageInterface from "@app/modules/portfolio/interfaces/home/backgroundImageInterface";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect, useState } from "react";

export default function HomeInterface() {
  const { getPortfolioState } = usePortfolioProvider();
  const { isDarkMode, textColor } = getPortfolioState;
  const translations = useTranslations();
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50);
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  useEffect(() => {
    if (translations.typewriterTexts.length > 0) {
      setCurrentText("");
      setIsDeleting(false);
      setLoopNum(0);
    }
  }, [translations.typewriterTexts]);

  useEffect(() => {
    function handleType() {
      const i = loopNum % translations.typewriterTexts.length;
      const fullText = translations.typewriterTexts[i];

      setCurrentText(
        isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1)
      );

      setTypingSpeed(isDeleting ? 25 : 50);

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopNum, typingSpeed, translations.typewriterTexts]);

  return (
    <div className={`flex flex-col justify-center h-screen w-screen ${textColor}`}>
      <BackgroundImageInterface />
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-center md:justify-between my-[15vh] md:mb-[5vh] h-full">
        <div
          className={`${textColor} max-md:text-lg md:text-2xl lg:text-5xl space-y-4 font-bold md:w-1/2 pl-[5vh] content-center md:pb-[10vh] z-10 items-center my-auto md:my-0`}
        >
          <h1 className="text-left font-orbitron">{translations.greeting}</h1>
          <div className="typewriter">
            <h2 className={`font-orbitron ${isDeleting ? "deleting" : "typing"}`}>
              <span>{currentText || " "}</span>
            </h2>
          </div>
        </div>

        <div
          className="w-full md:w-1/2 flex justify-center items-center mt-5 md:mt-0 z-10"
          style={{
            backgroundImage: `url(${bgAvatarDesk})`,
            backgroundSize: "80%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        >
          {!avatarLoaded && (
            <div className="max-[820px]:h-[50vh] md:h-[70vh] aspect-square animate-pulse rounded-full bg-current opacity-5" />
          )}
          <img
            src={desk}
            alt="Logo"
            className={`max-[820px]:h-[50vh] mt-0 md:h-[70vh] w-auto animate-float ${isDarkMode ? "drop-shadow-red" : "drop-shadow-white"} ${avatarLoaded ? "block" : "hidden"}`}
            onLoad={() => setAvatarLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
