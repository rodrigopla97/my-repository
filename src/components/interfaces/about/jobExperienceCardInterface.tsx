import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../context/themeContext';
import { useAbout } from '../../../context/aboutContext';

export default function JobExperienceCardInterface() {
  const { jobExperiencesContext } = useAbout();
  const { isDarkMode, textColor } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [animKey, setAnimKey] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(() => window.innerWidth >= 768);
  const stepIndexRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    if (isDesktop || openIndex !== null) return;
    const timer = setInterval(() => {
      setCarouselIndex(i => (i + 1) % jobExperiencesContext.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isDesktop, openIndex, jobExperiencesContext.length]);

  useEffect(() => {
    if (!isDesktop || isPaused) return;
    const steps = jobExperiencesContext.flatMap((exp, ci) =>
      exp.roles.map((_, ri) => ({ ci, ri }))
    );
    const timer = setInterval(() => {
      stepIndexRef.current = (stepIndexRef.current + 1) % steps.length;
      setOpenIndex(steps[stepIndexRef.current].ci);
      setSelectedRoleIndex(steps[stepIndexRef.current].ri);
      setAnimKey(k => k + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [isDesktop, isPaused, jobExperiencesContext]);

  function handleToggle(index: number) {
    setOpenIndex(isDesktop ? index : index === openIndex ? null : index);
    setSelectedRoleIndex(0);
    setAnimKey(k => k + 1);
    setIsPaused(false);
    const steps = jobExperiencesContext.flatMap((exp, ci) => exp.roles.map((_, ri) => ({ ci, ri })));
    const found = steps.findIndex(s => s.ci === index && s.ri === 0);
    if (found !== -1) stepIndexRef.current = found;
  }

  function handleSelectRole(roleIdx: number) {
    setSelectedRoleIndex(roleIdx);
    setAnimKey(k => k + 1);
    setIsPaused(false);
    const steps = jobExperiencesContext.flatMap((exp, ci) => exp.roles.map((_, ri) => ({ ci, ri })));
    const found = steps.findIndex(s => s.ci === openIndex && s.ri === roleIdx);
    if (found !== -1) stepIndexRef.current = found;
  }

  const accentColor = !isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary";
  const accentBg = !isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary";
  const accentBorder = !isDarkMode ? "border-cvButtonPrimary" : "border-cvButtonSecondary";

  const detailContent = (index: number) => {
    const experience = jobExperiencesContext[index];
    const role = experience.roles[selectedRoleIndex] ?? experience.roles[0];
    return (
      <div key={animKey} className={`h-[32vh] flex flex-col rounded-lg border ${accentBorder} border-opacity-20 p-5 animate-fadeIn gap-3 relative`}>
        <button
          onClick={() => setIsPaused(p => !p)}
          className={`absolute top-3 right-3 hidden md:flex items-center justify-center transition-opacity duration-200 opacity-30 hover:opacity-80 ${accentColor}`}
          title={isPaused ? "Reanudar" : "Pausar"}
        >
          <i className="material-symbols-outlined">{isPaused ? "play_arrow" : "pause"}</i>
        </button>

        {experience.roles.length > 1 && (
          <div className="flex gap-2 flex-wrap flex-shrink-0">
            {experience.roles.map((r, roleIdx) => (
              <button
                key={roleIdx}
                onClick={() => handleSelectRole(roleIdx)}
                className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all duration-200 border ${roleIdx === selectedRoleIndex
                  ? `${accentColor} ${accentBorder}`
                  : `opacity-40 border-transparent ${textColor} hover:opacity-70`
                  }`}
              >
                {r.date}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-6 flex-1 overflow-hidden">

          <div className="flex flex-col gap-2 justify-center flex-shrink-0 w-2/5">
            <span className={`text-xs uppercase tracking-widest ${accentColor}`}>{role.date}</span>
            <h4 className={`text-base font-semibold ${textColor}`}>{experience.company}</h4>
            <span className={`text-xs uppercase tracking-widest ${accentColor}`}>{role.title}</span>
          </div>

          <ul className="flex flex-col gap-1.5 overflow-y-auto pr-1 flex-1 justify-center">
            {role.tasks.map((task, taskIdx) => (
              <li key={taskIdx} className={`flex items-start gap-2 text-xs ${textColor}`}>
                <span className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 ${accentBg}`} />
                {task}
              </li>
            ))}
          </ul>

        </div>
      </div>
    );
  };

  const carouselContent = (
    <div className={`h-[32vh] flex flex-col justify-between rounded-lg border ${accentBorder} border-opacity-20 p-5`}>
      <div className="flex-1 flex flex-col justify-center gap-3 animate-fadeIn" key={carouselIndex}>
        <span className={`text-xs uppercase tracking-widest ${accentColor}`}>
          {jobExperiencesContext[carouselIndex].roles[0].date}
        </span>
        <h4 className={`text-base font-semibold ${textColor}`}>
          {jobExperiencesContext[carouselIndex].company}
        </h4>
        <span className={`text-xs uppercase tracking-widest ${accentColor}`}>
          {jobExperiencesContext[carouselIndex].roles[0].title}
        </span>
        <ul className="flex flex-col gap-1 mt-1">
          {jobExperiencesContext[carouselIndex].roles[0].tasks.slice(0, 2).map((task, i) => (
            <li key={i} className={`flex items-start gap-2 text-xs ${textColor}`}>
              <span className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 ${accentBg}`} />
              {task}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-2">
          {jobExperiencesContext.map((_, i) => (
            <button
              key={i}
              onClick={() => setCarouselIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === carouselIndex ? accentBg : `bg-current opacity-20`}`}
            />
          ))}
        </div>
        <button
          onClick={() => handleToggle(carouselIndex)}
          className={`text-xs uppercase tracking-widest ${accentColor} flex items-center gap-1`}
        >
          Ver detalle
          <i className="material-symbols-outlined text-sm">arrow_forward</i>
        </button>
      </div>
    </div>
  );

  return (
    <React.Fragment>

      <span className={`text-base uppercase tracking-widest self-start flex items-center gap-1.5 ${textColor}`}>
        💼 Trayectoria profesional
      </span>

      <div className="flex flex-col md:flex-row w-full gap-6">

        <div className="flex flex-col md:w-5/12">
          {jobExperiencesContext.map((experience, index) => {
            const isOpen = openIndex === index;
            const isLast = index === jobExperiencesContext.length - 1;

            return (
              <div key={index} className="flex gap-4">

                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleToggle(index)}
                    className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 transition-all duration-200 border-2 ${isOpen ? `${accentBg} ${accentBorder}` : `bg-transparent ${accentBorder} opacity-40 hover:opacity-100`}`}
                  />
                  {!isLast && <div className={`w-px flex-1 mt-1 ${isOpen ? `${accentBg} opacity-30` : "bg-current opacity-10"}`} />}
                </div>

                <div className="flex flex-col pb-6 flex-1">
                  <button
                    onClick={() => handleToggle(index)}
                    className="flex items-center justify-between gap-2 group mb-1"
                  >
                    <span className={`text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${isOpen ? accentColor : textColor}`}>
                      {experience.company}
                      {experience.roles.some(r => r.date.toLowerCase().includes('actualidad')) && (
                        <span title="Trabajo actual">🟢</span>
                      )}
                    </span>
                    <i className={`material-symbols-outlined text-sm transition-transform duration-200 opacity-40 md:hidden ${isOpen ? "rotate-180" : ""} ${accentColor}`}>
                      expand_more
                    </i>
                  </button>

                  <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[32vh] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                    {detailContent(index)}
                  </div>
                </div>

              </div>
            );
          })}

          <div className={`md:hidden transition-all duration-300 overflow-hidden ${openIndex === null ? "max-h-[32vh] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
            {carouselContent}
          </div>
        </div>

        <div className="hidden md:flex md:w-7/12 flex-col">
          {detailContent(openIndex ?? 0)}
        </div>

      </div>

    </React.Fragment>
  );
}
