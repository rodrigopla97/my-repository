import { useState, useEffect } from 'react';
import JavascriptIcon from '../../icons/javascriptIcon';
import ReactIcon from '../../icons/reactIcon';
import AngularIcon from '../../icons/angularIcon';
import TailwindIcon from '../../icons/tailwindIcon';
import HtmltIcon from '../../icons/htmlIcon';
import CssIcon from '../../icons/cssIcon';
import GitIcon from '../../icons/gitIcon';
import TypescriptIcon from '../../icons/typescriptIcon';

export default function FooterAllIcons() {
  const icons = [
    { component: <HtmltIcon key="html" />, label: "HTML" },
    { component: <CssIcon key="css" />, label: "CSS" },
    { component: <JavascriptIcon key="js" />, label: "JavaScript" },
    { component: <AngularIcon key="angular" />, label: "Angular" },
    { component: <ReactIcon key="react" />, label: "React" },
    { component: <TypescriptIcon key="typescript" />, label: "Typescript" },
    { component: <TailwindIcon key="tailwind" />, label: "Tailwind" },
    { component: <GitIcon key="git" />, label: "GIT" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth < 640 ? 3 : 5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1 >= icons.length ? 0 : prevIndex + 1);
        setFade(true);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, [icons.length]);

  const visibleIcons = icons.slice(currentIndex, currentIndex + itemsToShow);
  const displayedIcons = [...visibleIcons];

  if (displayedIcons.length < itemsToShow) {
    displayedIcons.push(...icons.slice(0, itemsToShow - displayedIcons.length));
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`grid gap-8 ${itemsToShow === 5 ? "grid-cols-5" : "grid-cols-3"
          }`}
      >
        {displayedIcons.map((icon, index) => {
          return (
            <div
              key={icon.label}
              className={`flex flex-col items-center
                ${(index === 0 || index === displayedIcons.length - 1)
                  ? `blur-sm ${fade ? "opacity-80 scale-60 z-30" : "transition-transform duration-500 scale-90"}`
                  : `${!fade && "-translate-x-20 transition-transform duration-500"}`
                }`}
            >
              <div className="w-20 h-20 flex items-center justify-center">
                {icon.component}
              </div>
              <p className="mt-2 text-sm font-semibold">{icon.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
