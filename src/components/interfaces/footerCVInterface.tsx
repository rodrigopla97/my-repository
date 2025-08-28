import React, { useEffect, useRef } from 'react';
import CurriculumInterface from './curriculumInterface';
import { useTheme } from '../../context/themeContext';
import { useTabData } from '../../context/tabdataContext';

export default function FooterCVInterface() {
  const { borderColor, bgColor, textColor, isDarkMode } = useTheme();
  const { isMenuOpen, isCurriculumOpen, handleSetIsCurriculumOpen } = useTabData();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleSetIsCurriculumOpen(false);
  }, [isMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleSetIsCurriculumOpen(false);
      }
    }

    function handleScroll() {
      handleSetIsCurriculumOpen(false);
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
    <>
      {!isMenuOpen && (
        <div className="fixed bottom-20 md:bottom-8 right-8 z-50">
          <div className="relative" ref={modalRef}>
            <button
              onClick={() => handleSetIsCurriculumOpen(!isCurriculumOpen)}
              className={`border-2  ${bgColor} ${isDarkMode ? "text-cvButtonSecondary border-cvButtonSecondary hover:bg-cvButtonPrimary" : "text-cvButtonPrimary border-cvButtonPrimary hover:bg-cvButtonSecondary"} ${textColor} rounded-full p-3 shadow-lg bg-opacity-80 hover:bg-opacity-50  transition-all duration-300`}
            >
              Curriculum 📁
            </button>

            {isCurriculumOpen && (
              <div

                className={`absolute mb-8 md:mb-0 bottom-1/2 right-1/2 md:bottom-full md:right-full flex flex-col ${bgColor} shadow-lg rounded-lg border-2 ${borderColor} w-max border-opacity-50`}
              >
                <CurriculumInterface download={false} />
                <CurriculumInterface download={true} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
