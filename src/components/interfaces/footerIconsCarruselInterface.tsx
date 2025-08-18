import { useState, useEffect } from 'react';
import JavascriptIcon from '../../icons/javascriptIcon';
import ReactIcon from '../../icons/reactIcon';
import AngularIcon from '../../icons/angularIcon';
import TailwindIcon from '../../icons/tailwindIcon';

export default function FooterIconsCarrousel() {
  const icons = [
    { component: <JavascriptIcon key="js" />, label: "JavaScript" },
    { component: <ReactIcon key="react" />, label: "React" },
    { component: <AngularIcon key="angular" />, label: "Angular" },
    { component: <TailwindIcon key="tailwind" />, label: "Tailwind" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % icons.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [icons.length]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className='mb-4'>Skills</h1>
      <div
        className={`w-12 h-12 flex items-center justify-center transition-transform duration-500 ease-in-out transform ${isTransitioning ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}
      >
        {icons[currentIndex].component}
      </div>
      <p className={`mt-4 text-sm font-semibold transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {icons[currentIndex].label}
      </p>
    </div>
  );
}
