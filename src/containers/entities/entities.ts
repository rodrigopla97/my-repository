import { ReactNode, Dispatch, SetStateAction } from "react";

export interface JobRole {
  title: string;
  date: string;
  tasks: string[];
}

export interface JobExperience {
  company: string;
  roles: JobRole[];
}

export interface ActionsTabdataItem {
  path: string;
  name: string;
  icon: string;
}

export type PortfolioStateType = {
  isDarkMode: boolean;
  textColor: string;
  bgColor: string;
  borderColor: string;
  isMenuOpen: boolean;
  isCurriculumOpen: boolean;
  indexCarrousel: number;
  experienceSelectedContex: number;
  tabdataItems: ActionsTabdataItem[];
  jobExperiencesContext: JobExperience[];
};

export type PortfolioContextType = {
  getPortfolioState: PortfolioStateType;
  setPortfolioState: Dispatch<SetStateAction<PortfolioStateType>>;
};

export interface ProviderProps {
  children: ReactNode;
}

export interface ModalJobProps {
  children?: React.ReactNode;
  onClose: () => void;
  selectedExperience: JobExperience
}

export interface CurriculumInterfacePropsType {
  download?: boolean;
}
