import { ReactNode } from "react";

export interface JobRole {
  title: string;
  date: string;
  tasks: string[];
}

export interface JobExperience {
  company: string;
  roles: JobRole[];
}

export type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  textColor: string;
  bgColor: string;
  borderColor: string;
};

export interface ThemeProviderProps {
  children: ReactNode;
}