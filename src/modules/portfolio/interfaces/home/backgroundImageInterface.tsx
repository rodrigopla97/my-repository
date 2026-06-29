import bgImageDark from "@app/images/bg-desk-black.png";
import bgImagelight from "@app/images/bg-desk-gray.png";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect, useState } from "react";

export default function BackgroundImageInterface() {
  const [isMobile, setIsMobile] = useState(false);
  const { getPortfolioState, setPortfolioState } = usePortfolioProvider();
  const { isDarkMode } = getPortfolioState;
  const [backgroundView, setBackgroundView] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    function handleScroll() {
      setBackgroundView(window.scrollY === 0);
    }
    setPortfolioState((state) => ({ ...state, isCurriculumOpen: false }));
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    handleScroll();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setPortfolioState]);

  useEffect(() => {
    if (!backgroundView) {
      const timeout = setTimeout(() => setHidden(true), 5000);
      return () => clearTimeout(timeout);
    } else {
      setHidden(false);
    }
  }, [backgroundView]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${hidden ? "hidden" : "block"} ${!backgroundView ? "pointer-events-none" : ""}`}
      style={{
        opacity: backgroundView ? 1 : 0,
        backgroundImage: `url(${isDarkMode ? bgImageDark : bgImagelight})`,
        backgroundSize: "cover",
        backgroundPosition: isMobile ? "left" : "center",
        borderLeft: isDarkMode ? "0.3rem solid black" : "0.3rem solid #BABABA"
      }}
    ></div>
  );
}
