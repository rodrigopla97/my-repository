import { useState, useEffect } from 'react';
import JavascriptIcon from '../../icons/javascriptIcon';
import ReactIcon from '../../icons/reactIcon';
import AngularIcon from '../../icons/angularIcon';
import TailwindIcon from '../../icons/tailwindIcon';
import HtmltIcon from '../../icons/htmlIcon';
import CssIcon from '../../icons/cssIcon';
import GitIcon from '../../icons/gitIcon';

export default function FooterAllIcons() {
  const icons = [
    { component: <HtmltIcon key="html" />, label: "HTML" },
    { component: <CssIcon key="css" />, label: "CSS" },
    { component: <JavascriptIcon key="js" />, label: "JavaScript" },
    { component: <AngularIcon key="angular" />, label: "Angular" },
    { component: <ReactIcon key="react" />, label: "React" },
    { component: <TailwindIcon key="tailwind" />, label: "Tailwind" },
    { component: <GitIcon key="git" />, label: "GIT" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const visibleIcons = icons.slice(currentIndex, currentIndex + 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1 >= icons.length ? 0 : prevIndex + 1);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [icons.length]);

  const displayedIcons = [...visibleIcons];

  if (displayedIcons.length < 5) {
    displayedIcons.push(...icons.slice(0, 5 - displayedIcons.length));
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4">Skills</h1>
      <div className={`grid grid-cols-5 gap-8 `}>
        {displayedIcons.map((icon, index) => {
          return (
            <div key={icon.label} className={`flex flex-col items-center ${index === 0 || index === 4 ? `blur-sm ${fade ? 'opacity-80 scale-60' : 'transition-transform duration-500 scale-90'}` :
              `${!fade && '-translate-x-20 transition-transform duration-500'}`}`}>
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
