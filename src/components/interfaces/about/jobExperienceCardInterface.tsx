import { useState, useEffect } from 'react';
// import { JobRole } from '../../../entities/entities';
import { useTheme } from '../../../context/themeContext';
import { useAbout } from '../../../context/aboutContext';

export default function JobExperienceCardInterface() {
  const { jobExperiencesContext, toggleAboutIndex, indexCarrousel } = useAbout();
  const { textColor, isDarkMode } = useTheme();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [indexCarrousel]);

  // function getRolePeriod(roles: JobRole[]) {
  //   const startDate = roles[roles.length - 1].date.split('-')[0];
  //   const endDate = roles[0].date.split('-')[1] || 'Actualidad';
  //   return `${startDate} - ${endDate}`;
  // }

  return (
    <div className="flex flex-col lg:flex-row items-center lg:w-2/3 mx-auto">
      <div className="lg:ml-8 p-4 lg:p-8 flex-1 relative">
        <div className={`card-container z-[30] ${isDarkMode ? 'border-grayPrimary' : 'border-black'} ${animate && 'transition-all duration-500 transform scale-105'} `}>
          {jobExperiencesContext.map((experience, index) => (
            <div key={index} className={`role-container ${index !== indexCarrousel && 'hidden'}`}>
              <h4 className="card-title text-lg font-bold">
                {experience.company}
              </h4>
              {experience.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="mb-2">
                  <h5 className="text-md font-semibold">
                    {role.title} ({role.date})
                  </h5>
                  <ul className="list-disc ml-6">
                    {role.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className={`task ${textColor}`}>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center mb-4 absolute top-0 right-0 w-full h-full">
          <div className="flex flex-col justify-center items-end space-y-2 h-full">
            {jobExperiencesContext.map((_, index) => (
              <button
                key={index}
                className={`rounded-full h-3 w-3 focus:outline-none ${indexCarrousel === index ? 'bg-cvButtonPrimary' : 'bg-cvButtonSecondary hover:bg-gray-800'}`}
                onClick={() => toggleAboutIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
