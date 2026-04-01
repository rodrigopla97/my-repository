import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../../containers/states/portfolioProvider';

export default function JobExperienceCardInterface() {
  const { getPortfolioState } = usePortfolio();
  const { isDarkMode, textColor, jobExperiencesContext } = getPortfolioState;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [animKey, setAnimKey] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(() => window.innerWidth >= 768);
  const stepIndexRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [carouselDragX, setCarouselDragX] = useState(0);
  const [carouselWithTransition, setCarouselWithTransition] = useState(false);
  const [carouselSlideTarget, setCarouselSlideTarget] = useState<'left' | 'right' | 'base'>('base');
  const carouselIsAnimating = useRef(false);
  const carouselIsDragging = useRef(false);
  const carouselDragStartX = useRef(0);
  const carouselIntervalRef = useRef<ReturnType<typeof setInterval>>();
  const carouselResumeRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

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

  function advanceCarousel(direction: 'left' | 'right') {
    if (carouselIsAnimating.current) return;
    carouselIsAnimating.current = true;
    setCarouselDragX(0);
    setCarouselWithTransition(true);
    setCarouselSlideTarget(direction);

    setTimeout(() => {
      setCarouselWithTransition(false);
      setCarouselSlideTarget('base');
      setCarouselIndex(prev =>
        direction === 'left'
          ? (prev + 1) % jobExperiencesContext.length
          : (prev - 1 + jobExperiencesContext.length) % jobExperiencesContext.length
      );
      carouselIsAnimating.current = false;
    }, 400);
  }

  function startCarouselAutoAdvance() {
    clearInterval(carouselIntervalRef.current);
    carouselIntervalRef.current = setInterval(() => advanceCarousel('left'), 2500);
  }

  function pauseCarouselAndScheduleResume() {
    clearInterval(carouselIntervalRef.current);
    clearTimeout(carouselResumeRef.current);
    carouselResumeRef.current = setTimeout(startCarouselAutoAdvance, 3000);
  }

  useEffect(() => {
    if (isDesktop || openIndex !== null) return;
    startCarouselAutoAdvance();
    return () => {
      clearInterval(carouselIntervalRef.current);
      clearTimeout(carouselResumeRef.current);
    };
  }, [isDesktop, openIndex, jobExperiencesContext.length]);

  function onCarouselPointerDown(e: React.PointerEvent) {
    if (carouselIsAnimating.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    carouselDragStartX.current = e.clientX;
    carouselIsDragging.current = true;
    setCarouselWithTransition(false);
    setCarouselDragX(0);
  }

  function onCarouselPointerMove(e: React.PointerEvent) {
    if (!carouselIsDragging.current) return;
    setCarouselDragX(e.clientX - carouselDragStartX.current);
  }

  function onCarouselPointerUp(e: React.PointerEvent) {
    if (!carouselIsDragging.current) return;
    carouselIsDragging.current = false;
    const delta = carouselDragStartX.current - e.clientX;

    if (Math.abs(delta) >= 50) {
      advanceCarousel(delta > 0 ? 'left' : 'right');
      pauseCarouselAndScheduleResume();
    } else {
      setCarouselWithTransition(true);
      setCarouselDragX(0);
      setTimeout(() => setCarouselWithTransition(false), 300);
    }
  }

  const carouselTargetPercent =
    carouselSlideTarget === 'left' ? -(200 / 3) :
      carouselSlideTarget === 'right' ? 0 :
        -(100 / 3);

  const carouselSlots = [
    jobExperiencesContext[(carouselIndex - 1 + jobExperiencesContext.length) % jobExperiencesContext.length],
    jobExperiencesContext[carouselIndex],
    jobExperiencesContext[(carouselIndex + 1) % jobExperiencesContext.length],
  ];

  function handleToggle(index: number) {
    setOpenIndex(isDesktop ? index : index === openIndex ? null : index);
    setSelectedRoleIndex(0);
    setAnimKey(k => k + 1);
    if (isDesktop) setIsPaused(true);
    const steps = jobExperiencesContext.flatMap((exp, ci) => exp.roles.map((_, ri) => ({ ci, ri })));
    const found = steps.findIndex(s => s.ci === index && s.ri === 0);
    if (found !== -1) stepIndexRef.current = found;
  }

  function handleSelectRole(roleIdx: number) {
    setSelectedRoleIndex(roleIdx);
    setAnimKey(k => k + 1);
    setIsPaused(true);
    const steps = jobExperiencesContext.flatMap((exp, ci) => exp.roles.map((_, ri) => ({ ci, ri })));
    const found = steps.findIndex(s => s.ci === openIndex && s.ri === roleIdx);
    if (found !== -1) stepIndexRef.current = found;
  }

  const accentColor = !isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary";
  const accentBg = !isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary";
  const accentBorder = !isDarkMode ? "border-cvButtonPrimary" : "border-cvButtonSecondary";
  const accentBorderFaint = !isDarkMode ? "border-cvButtonPrimary/40" : "border-cvButtonSecondary/40";
  const accentBgFaint = !isDarkMode ? "bg-cvButtonPrimary/30" : "bg-cvButtonSecondary/30";

  const detailContent = (index: number) => {
    const experience = jobExperiencesContext[index];
    const role = experience.roles[selectedRoleIndex] ?? experience.roles[0];
    return (
      <div key={animKey} className={`h-[32vh] flex flex-col md:rounded-lg md:border ${accentBorderFaint} md:p-5 animate-fadeIn gap-3 relative`}>
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

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden gap-2 md:gap-6">

          <div className="flex flex-col gap-1 flex-shrink-0 md:justify-center md:w-2/5">
            <span className={`text-xs uppercase tracking-widest ${accentColor}`}>{role.date}</span>
            <h4 className={`hidden md:block text-base font-semibold ${textColor}`}>{experience.company}</h4>
            <span className={`text-xs uppercase tracking-widest font-semibold ${textColor}`}>{role.title}</span>
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1" />
            <ul className="flex flex-col gap-1.5 overflow-y-auto pr-1">
              {role.tasks.map((task, taskIdx) => (
                <li key={taskIdx} className={`flex items-start gap-2 text-xs md:text-sm ${textColor}`}>
                  <span className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 ${accentBg}`} />
                  {task}
                </li>
              ))}
            </ul>
            <div className="flex-1" />
          </div>

        </div>
      </div>
    );
  };

  const carouselContent = (
    <div className={`h-[32vh] flex flex-col rounded-lg border ${accentBorderFaint} gap-0 overflow-hidden`}>
      <div
        className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onPointerDown={onCarouselPointerDown}
        onPointerMove={onCarouselPointerMove}
        onPointerUp={onCarouselPointerUp}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className="flex h-full"
          style={{
            width: '300%',
            transform: `translateX(calc(${carouselTargetPercent}% + ${carouselDragX}px))`,
            transition: carouselWithTransition ? 'transform 0.4s ease' : 'none',
          }}
        >
          {carouselSlots.map((experience, slotI) => (
            <div
              key={slotI}
              style={{ width: '33.333%' }}
              className="flex flex-col justify-center gap-3 p-5 pointer-events-none"
            >
              <span className={`text-xs uppercase tracking-widest ${accentColor}`}>
                {experience.roles[0].date}
              </span>
              <h4 className={`text-base font-semibold ${textColor}`}>
                {experience.company}
              </h4>
              <span className={`text-xs uppercase tracking-widest ${accentColor}`}>
                {experience.roles[0].title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between flex-shrink-0 px-5 pb-4">
        <div className="flex gap-2">
          {jobExperiencesContext.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (carouselIsAnimating.current) return;
                const direction = i > carouselIndex ? 'left' : 'right';
                setCarouselIndex(i);
                pauseCarouselAndScheduleResume();
                setCarouselWithTransition(true);
                setCarouselSlideTarget(direction);
                setTimeout(() => {
                  setCarouselWithTransition(false);
                  setCarouselSlideTarget('base');
                }, 400);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === carouselIndex ? accentBg : accentBgFaint}`}
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
                  {!isLast && <div className={`w-px flex-1 mt-1 ${isOpen ? `${accentBg} opacity-30` : accentBgFaint}`} />}
                </div>

                <div className="flex flex-col pb-6 flex-1">
                  <button
                    onClick={() => handleToggle(index)}
                    className="flex items-center gap-2 w-full mb-1"
                  >
                    <span className={`text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${isOpen ? accentColor : textColor}`}>
                      {experience.company}
                      {experience.roles.some(r => r.date.toLowerCase().includes('actualidad')) && (
                        <span title="Trabajo actual">🟢</span>
                      )}
                    </span>
                    <i className={`material-symbols-outlined text-sm transition-transform duration-200 opacity-40 md:hidden ml-auto ${isOpen ? "rotate-180" : ""} ${accentColor}`}>
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
