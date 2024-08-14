import { useEffect, useState } from 'react';
import bgImageDark from '../../../images/bg-desk-black.png';
import bgImagelight from '../../../images/bg-desk-gray.png';
import { useTheme } from '../../../context/themeContext';

export default function BackgroundImageInterface() {
  const [isMobile, setIsMobile] = useState(false);
  const { isDarkMode } = useTheme();
  const [backgroundView, setBackgroundView] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [scroll, setScroll] = useState(window.scrollY);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setIsMobile(width < 1024);
    }

    function handleScroll() {
      setScroll(window.scrollY);
      setBackgroundView(scroll === 0);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [width, scroll]);

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
      className={`fixed top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out z-0 ${
        hidden ? 'hidden' : 'block'
      }`}
      style={{
        opacity: backgroundView ? 1 : 0,
        backgroundImage: `url(${isDarkMode ? bgImageDark : bgImagelight})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'left' : 'center',
        borderLeft: isDarkMode ? '0.3rem solid black' : '0.3rem solid #BABABA',
      }}
    >
    </div>
  );
}
