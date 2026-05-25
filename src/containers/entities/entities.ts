import { ReactNode, Dispatch, SetStateAction } from "react";
import type { TechnologyKey } from '../../icons/iconMap';

export interface JobRole {
  title: string;
  date: string;
  tasks: string[];
  currentWork?: boolean;
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

export type AboutSectionsContextType = {
  loading: boolean;
  data: AboutContentType | null;
};

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
  aboutSections: AboutSectionsContextType;
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

export type ProfileType = {
  name: string;
  role: string;
  email: string;
  formEndpoint?: string;
  github?: { url?: string; label?: string };
  linkedin?: { url?: string; label?: string };
};

export type TechnologyItem = {
  key: TechnologyKey;
  label: string;
};

export type TechnologiesSectionType = {
  items: TechnologyItem[];
  animated?: boolean;
};

export type TechnologiesContextType = {
  loading: boolean;
  data: TechnologiesSectionType | null;
};

export type AboutContentType = {
  sections: SectionType[];
};

export type SectionType = {
  title: string;
  items: string[];
  tags?: TechnologiesSectionType;
  hideTitle?: boolean;
};
