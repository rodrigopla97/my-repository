import React, { useState } from 'react';
import { useTheme } from '../../../context/themeContext';
import { useAbout } from '../../../context/aboutContext';

export default function JobExperienceCardInterface() {
  const { jobExperiencesContext } = useAbout();
  const { isDarkMode, textColor } = useTheme();
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);

  function handleToggle(index: number) {
    if (index === openIndex) {
      setOpenIndex((index + 1) % jobExperiencesContext.length);
    } else {
      setOpenIndex(index);
    }
    setSelectedRoleIndex(0);
  }

  const accentColor = !isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary";
  const accentBg = !isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary";
  const accentBorder = !isDarkMode ? "border-cvButtonPrimary" : "border-cvButtonSecondary";

  return (
    <React.Fragment>

      <span className={`text-xs uppercase tracking-widest opacity-50 self-start ${textColor}`}>Trayectoria profesional</span>

      <div className="flex flex-col w-full">
        {jobExperiencesContext.map((experience, index) => {
          const isOpen = openIndex === index;
          const isLast = index === jobExperiencesContext.length - 1;

          return (
            <div key={index} className="flex gap-4">

              {/* Línea de tiempo */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleToggle(index)}
                  className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 transition-all duration-200 border-2 ${isOpen ? `${accentBg} ${accentBorder}` : `bg-transparent ${accentBorder} opacity-40 hover:opacity-100`}`}
                />
                {!isLast && <div className={`w-px flex-1 mt-1 ${isOpen ? `${accentBg} opacity-30` : "bg-current opacity-10"}`} />}
              </div>

              {/* Contenido */}
              <div className={`flex flex-col pb-6 flex-1 ${isLast ? "" : ""}`}>

                {/* Header empresa */}
                <button
                  onClick={() => handleToggle(index)}
                  className="flex items-center justify-between gap-2 group mb-1"
                >
                  <span className={`text-sm font-semibold transition-all duration-200 ${isOpen ? accentColor : `${textColor} opacity-60 group-hover:opacity-100`}`}>
                    {experience.company}
                  </span>
                  <i className={`material-symbols-outlined text-sm transition-transform duration-200 opacity-40 ${isOpen ? "rotate-180" : ""} ${accentColor}`}>
                    expand_more
                  </i>
                </button>

                {/* Roles y tareas expandibles */}
                {isOpen && (
                  <div className="flex flex-col gap-3 mt-3 animate-fadeIn h-[32vh]">

                    {/* Selector de período fijo fuera del scroll */}
                    {experience.roles.length > 1 && (
                      <div className="flex gap-2 flex-wrap flex-shrink-0">
                        {experience.roles.map((role, roleIdx) => (
                          <button
                            key={roleIdx}
                            onClick={() => setSelectedRoleIndex(roleIdx)}
                            className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-200 border ${
                              roleIdx === selectedRoleIndex
                                ? `${accentColor} ${accentBorder}`
                                : `opacity-40 border-transparent ${textColor} hover:opacity-70`
                            }`}
                          >
                            {role.date}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Título del rol fijo */}
                    {(() => {
                      const role = experience.roles[selectedRoleIndex] ?? experience.roles[0];
                      return (
                        <>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className={`text-xs font-semibold uppercase tracking-widest ${accentColor}`}>{role.title}</span>
                            {experience.roles.length === 1 && <span className={`text-xs opacity-40 ${textColor}`}>{role.date}</span>}
                          </div>
                          <ul className="h-[25vh] overflow-y-auto pr-1 flex flex-col gap-1.5">
                            {role.tasks.map((task, taskIdx) => (
                              <li key={taskIdx} className={`flex items-start gap-2 text-sm opacity-60 ${textColor}`}>
                                <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 opacity-60 ${accentBg}`} />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </>
                      );
                    })()}

                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </React.Fragment>
  );
}
