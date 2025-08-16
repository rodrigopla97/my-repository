import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../../../context/themeContext';
import { useAbout } from '../../../context/aboutContext';

export default function JobExperienceCardInterface() {
  const { jobExperiencesContext, toggleAboutIndex, indexCarrousel } = useAbout();
  const { textColor } = useTheme();
  const [animate, setAnimate] = useState(false);
  const [direction, setDirection] = useState('right');

  const previousExperience = useCallback(() => {
    setDirection('left');
    setAnimate(true);
    setTimeout(() => {
      toggleAboutIndex(indexCarrousel === 0 ? jobExperiencesContext.length - 1 : indexCarrousel - 1);
    }, 500);
  }, [indexCarrousel, jobExperiencesContext.length, toggleAboutIndex]);

  const nextExperience = useCallback(() => {
    setDirection('right');
    setAnimate(true);
    setTimeout(() => {
      toggleAboutIndex(indexCarrousel === jobExperiencesContext.length - 1 ? 0 : indexCarrousel + 1);
    }, 500);
  }, [indexCarrousel, jobExperiencesContext.length, toggleAboutIndex]);

  useEffect(() => {
    if (animate) {
      const resetAnimate = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(resetAnimate);
    }
  }, [animate]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextExperience();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [indexCarrousel, nextExperience]);

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div className="relative flex w-[80%] justify-center mx-auto px-4">
          {jobExperiencesContext.map((experience, index) => (
            <div
              key={index}
              className={`flex flex-col ${index !== indexCarrousel && 'hidden'} ${textColor} duration-500 ${animate
                ? direction === 'right'
                  ? 'translate-x-20 opacity-0'
                  : '-translate-x-20 opacity-0'
                : 'translate-x-0 opacity-100'
                }`}
            >
              <h4 className="card-title text-lg font-bold" >
                {experience.company}
              </h4>
              {experience.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="mb-2">
                  <h5 className="text-md font-semibold">
                    {role.title} ({role.date})
                  </h5>
                  <ul className="list-[circle] ml-6">
                    {role.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className={`${textColor}`}>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        <button
          className={`absolute top-1/2 left-0 z-[1] flex items-center justify-start w-[15%] p-0 ${textColor} opacity-50 transition-opacity hover:opacity-100`}
          onClick={previousExperience}
        >
          <i className="material-symbols-outlined text-[3rem]">
            keyboard_arrow_left
          </i>
        </button>
        <button
          className={`absolute top-1/2 right-0 z-[1] flex items-center justify-end w-[15%] p-0 ${textColor} opacity-50 transition-opacity hover:opacity-100`}
          onClick={nextExperience}
        >
          <i className="material-symbols-outlined text-[3rem]">
            keyboard_arrow_right
          </i>
        </button>
      </div>
    </>
  );
}
