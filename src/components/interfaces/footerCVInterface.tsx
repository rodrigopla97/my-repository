import React, { useEffect, useRef } from 'react';
import CurriculumInterface from './curriculumInterface';
import { usePortfolio } from '../../containers/states/portfolioProvider';

export default function FooterCVInterface() {
  const { getPortfolioState, setPortfolioState } = usePortfolio();
  const { isDarkMode, isMenuOpen, isCurriculumOpen } = getPortfolioState;
  const setCurriculumOpen = (isOpen: boolean) => setPortfolioState(prevState => ({ ...prevState, isCurriculumOpen: isOpen }));

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurriculumOpen(false);
  }, [isMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setCurriculumOpen(false);
      }
    }

    function handleScroll() {
      setCurriculumOpen(false);
    }

    if (isCurriculumOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCurriculumOpen]);

  return (
    <React.Fragment>
      {!isMenuOpen && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="relative" ref={modalRef}>
            <button
              onClick={() => setCurriculumOpen(!isCurriculumOpen)}
              className={`group flex items-center gap-2 border rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ${isDarkMode ? "text-cvButtonSecondary border-cvButtonSecondary hover:bg-cvButtonPrimary/30" : "text-cvButtonPrimary border-cvButtonPrimary hover:bg-cvButtonSecondary/30"}`}
            >
              <i className="material-symbols-outlined text-sm leading-none">description</i>
              <span>Curriculum</span>
              <i className={`material-symbols-outlined text-sm leading-none transition-transform duration-200 ${isCurriculumOpen ? "rotate-180" : ""}`}>expand_more</i>
            </button>

            {isCurriculumOpen && (
              <div className={`absolute mb-3 md:mb-0 bottom-full right-0 md:bottom-full md:right-full flex flex-col overflow-hidden rounded-xl border backdrop-blur-sm shadow-xl w-max ${isDarkMode ? "bg-neutral-900/90 border-cvButtonSecondary/30" : "bg-grayPrimary/80 border-cvButtonPrimary/20"}`}>
                <CurriculumInterface download={false} />
                <div className={`h-px mx-3 ${isDarkMode ? "bg-cvButtonSecondary/20" : "bg-cvButtonPrimary/20"}`} />
                <CurriculumInterface download={true} />
              </div>
            )}
          </div>
        </div>
      )}
    </ React.Fragment>
  );
}
