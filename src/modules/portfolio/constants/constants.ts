import type {
  ActionsTabdataItem,
  TechnologyItem
} from "@app/modules/portfolio/entities/entities";

export const TECH_TAGS: TechnologyItem[] = [
  { key: "html", label: "HTML" },
  { key: "css", label: "CSS" },
  { key: "javascript", label: "JavaScript" },
  { key: "angular", label: "Angular" },
  { key: "react", label: "React" },
  { key: "typescript", label: "Typescript" },
  { key: "tailwind", label: "Tailwind" },
  { key: "git", label: "GIT" },
  { key: "mongodb", label: "MongoDB" }
];

export const PROFILE = {
  name: "Rodrigo Placeres",
  email: "rodrigoplaceres19@gmail.com",
  github: { url: "https://github.com/rodrigopla97", label: "github.com/rodrigopla97" },
  linkedin: {
    url: "https://www.linkedin.com/in/rodrigo-placeres/",
    label: "linkedin.com/in/rodrigo-placeres"
  },
  formEndpoint: "https://formsubmit.co/ajax/rodrigoplaceres19@gmail.com"
};

export const BASE_TABS: ActionsTabdataItem[] = [
  { path: "/", name: "Inicio", icon: "home" },
  { path: "/about", name: "Sobre mí", icon: "description" }
];

export const TAB_DATA_ITEMS = BASE_TABS;

export const INITIAL_STATE = {
  PORTFOLIO_PAGE: {
    isDarkMode: true,
    language: "es" as const,
    textColor: "text-grayPrimary",
    bgColor: "bg-black",
    borderColor: "border-grayPrimary",
    isMenuOpen: false,
    isCurriculumOpen: false,
    indexCarrousel: 0,
    experienceSelectedContex: 0,
    tabsLoading: true,
    tabsSyncKey: 0,
    isSyncing: false,
    tabdataItems: BASE_TABS,
    aboutSyncKey: 0,
    aboutSections: {
      loading: false,
      data: null
    },
    modal: { open: false },
    notification: { open: false, message: "", type: "info" as const },
    contactFormValid: false,
    contactFormSubmitting: false
  }
};
