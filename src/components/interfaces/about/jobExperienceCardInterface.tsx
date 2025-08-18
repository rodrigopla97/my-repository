import { useState, useEffect } from 'react';
import { useTheme } from '../../../context/themeContext';
import { useAbout } from '../../../context/aboutContext';

export default function JobExperienceCardInterface() {
  const { jobExperiencesContext, toggleAboutIndex, indexCarrousel } = useAbout();
  const { isDarkMode, textColor } = useTheme();
  const [animate, setAnimate] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    setRoleIndex(0);
  }, [indexCarrousel]);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [indexCarrousel, roleIndex]);

  return (
    <div className="relative w-full overflow-hidden md:pt-[10vh]">
      <h3 className={`text-lg font-semibold my-6 ${textColor}`}>👷 Trayectoria profesional:</h3>
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {jobExperiencesContext.map((experience, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg border transition-colors duration-300 
              ${index === indexCarrousel
                ? `text-white border-cvButtonPrimary ${!isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary"}`
                : `bg-transparent ${textColor} border-gray-400 ${!isDarkMode ? "hover:border-cvButtonPrimary" : "hover:border-cvButtonSecondary"}`}`}
            onClick={() => toggleAboutIndex(index)}
          >
            {experience.company}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {jobExperiencesContext[indexCarrousel]?.roles.map((role, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded-md  transition-colors duration-300
              ${idx === roleIndex
                ? `underline font-bold ${!isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary"}`
                : ` hover:underline ${textColor} ${!isDarkMode ? "hover:text-cvButtonPrimary" : "hover:text-cvButtonSecondary"}`}`}
            onClick={() => setRoleIndex(idx)}
          >
            {role.date}
          </button>
        ))}
      </div>

      <div className="relative flex justify-center mx-auto px-4 
                min-h-[50vh] md:h-auto items-start overflow-y-auto mt-4">
        {jobExperiencesContext[indexCarrousel]?.roles[roleIndex] && (
          <div
            className={`flex flex-col ${textColor} duration-500 transition-all
              ${animate ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
            `}
          >
            <h5 className="text-md font-semibold mb-2">
              {jobExperiencesContext[indexCarrousel].roles[roleIndex].title}
            </h5>
            <ul className="list-[circle] ml-6">
              {jobExperiencesContext[indexCarrousel].roles[roleIndex].tasks.map((task, taskIndex) => (
                <li key={taskIndex} className={`${textColor}`}>
                  {task}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
