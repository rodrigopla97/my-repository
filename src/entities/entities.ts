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

export type AboutContextType = {
  indexCarrousel: number;
  toggleAboutIndex: (idx: number) => void;
  toggleJobSelected: (idx: number) => void;
  jobExperiencesContext: JobExperience[];
  experienceSelectedContex: number;
};

export interface ProviderProps {
  children: ReactNode;
}


export interface ModalJobProps {
  children?: React.ReactNode;
  onClose: () => void;
  selectedExperience: JobExperience
}