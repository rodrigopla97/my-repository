import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeContextType, ThemeProviderProps } from '../entities/entities';

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  const [textColor, setTextColor] = useState("text-black");
  const [bgColor, setBgColor] = useState("bg-black");
  const [borderColor, setBorderColor] = useState("border-grayPrimary");

  function toggleTheme() {
    setIsDarkMode((prevMode: boolean) => {
      localStorage.setItem('isDarkMode', JSON.stringify(!prevMode));
      return !prevMode;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      setTextColor("text-grayPrimary");
      setBorderColor("border-grayPrimary");
      setBgColor("bg-black");
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      setTextColor("text-black");
      setBorderColor("border-black");
      setBgColor("bg-grayPrimary");
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  return <ThemeContext.Provider value={{ isDarkMode, toggleTheme, textColor, bgColor, borderColor}}>{children}</ThemeContext.Provider>;
};


export function useTheme() {
  return useContext(ThemeContext) as ThemeContextType;
};