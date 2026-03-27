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

export interface ActionsTabdataItem {
  path: string;
  name: string;
  icon: string;
}

export type GithubProfile = {
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  html_url: string;
};

export interface GithubLanguage {
  name: string;
  percentage: number;
}

// export interface GithubReposWithLanguages extends GithubRepos {
//   languages?: GithubLanguage[];
// }
// GitHub Repo
export type GithubRepos = {
  name: string;
  html_url: string;
  languages_url: string;
  language: string;
  languages?: GithubLanguage[];
};

// GitHub Repo Detail
export type GithubRepoDetail = {
  name: string;
  html_url: string;
  languages_url: string;
  language: string;
};

// Context principal
export type ActionsContextType = {
  tabdataItems: ActionsTabdataItem[];
  isMenuOpen: boolean;
  handleSetIsMenuOpen: (isOpen: boolean) => void;
  isCurriculumOpen: boolean;
  handleSetIsCurriculumOpen: (isOpen: boolean) => void;

  githubUserInfo: GithubProfile | null;
  githubUserRepos: GithubRepos[];
  githubRepoInfo: GithubRepos | null;
  githubError: string | null;
};

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

export interface CurriculumInterfacePropsType {
  download?: boolean;
}

export type MathChallengeOperationType = "+" | "-" | "×";