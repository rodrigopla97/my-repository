import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/themeContext';
import { useAbout } from '../../../context/aboutContext';

export default function JobExperienceCardInterface() {
  const { jobExperiencesContext, toggleAboutIndex, indexCarrousel } = useAbout();
  const { isDarkMode, textColor } = useTheme();

  const [isVisible, setIsVisible] = useState(true);
  const [displayedCarouselIndex, setDisplayedCarouselIndex] = useState(indexCarrousel);
  const [displayedRoleIndex, setDisplayedRoleIndex] = useState(0);

  function runTransition(update: () => void) {
    setIsVisible(false);
    setTimeout(() => {
      update();
      setIsVisible(true);
    }, 250);
  }

  useEffect(() => {
    runTransition(() => {
      setDisplayedCarouselIndex(indexCarrousel);
      setDisplayedRoleIndex(0);
    });
  }, [indexCarrousel]);

  function handleRoleChange(idx: number) {
    if (idx === displayedRoleIndex) return;
    runTransition(() => setDisplayedRoleIndex(idx));
  }

  return (
    <React.Fragment>

      <h3 className={`text-lg font-semibold self-start ${textColor}`}>👷🏻 Trayectoria profesional:</h3>

      <div className='flex flex-col md:flex-row w-full'>
        <div className='flex flex-col w-auto md:w-[25vw] md:items-center justify-center'>
          <div className="flex justify-center gap-3 my-6 flex-wrap md:px-10">
            {jobExperiencesContext.map((experience, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg border transition-colors duration-300 ${index === indexCarrousel
                  ? `text-white border-cvButtonPrimary ${!isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary"}`
                  : `bg-transparent ${textColor} border-gray-400 ${!isDarkMode ? "hover:border-cvButtonPrimary" : "hover:border-cvButtonSecondary"}`}`}
                onClick={() => toggleAboutIndex(index)}
              >
                {experience.company}
              </button>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap">
            {jobExperiencesContext[displayedCarouselIndex]?.roles.map((role, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded-md transition-colors duration-300
                ${idx === displayedRoleIndex
                    ? `underline font-bold ${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"}`
                    : `hover:underline ${textColor} ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`}`}
                onClick={() => handleRoleChange(idx)}
              >
                {role.date}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center mx-auto md:px-4 items-start h-[60vh] md:h-[35vh] md:w-[50vw] md:items-center">
          {jobExperiencesContext[displayedCarouselIndex]?.roles[displayedRoleIndex] && (
            <div
              className={`flex flex-col ${textColor} transition-all duration-250 place-items-center md:place-items-start
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <h5 className="text-md font-semibold mb-2">
                {jobExperiencesContext[displayedCarouselIndex].roles[displayedRoleIndex].title}
              </h5>
              <ul className="list-[circle] ml-6 md:ml-0 overflow-y-scroll">
                {jobExperiencesContext[displayedCarouselIndex].roles[displayedRoleIndex].tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className={`${textColor}`}>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
