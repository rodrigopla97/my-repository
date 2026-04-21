import { ActionsTabdataItem, JobExperience } from '../entities/entities';
import es from './es.json';
import en from './en.json';

const JOB_EXPERIENCES_ES: JobExperience[] = [
  {
    company: "Leafnoise",
    roles: [
      {
        title: "Desarrollador Frontend",
        date: "2022-Actualidad",
        tasks: [
          "Mantenimiento de plataformas, participación en distintos proyectos. (Angular - React - TypeScript)",
          "Desarrollo de bugfix",
          "Diseño e implementación de features.",
          "Participación en la creación de la estructura de las APIs, junto con el backend",
          "Maquetación e implementación de diseño",
          "Análisis y Resolución de requerimientos en sprint (Azure - Jira)",
        ],
      },
      {
        title: "Implementador",
        date: "2021-2022",
        tasks: [
          "1 año en Implementación .NET y Administración de Base de datos:",
          "Mantenimiento de la plataforma (correcciones de bugs) C# .NET",
          "Mantenimiento de Base de Datos en SQL",
          "Análisis y Resolución de problemas informados por el cliente",
        ],
      },
    ],
  },
  {
    company: "Mother Solution",
    roles: [
      {
        title: "Técnico en reparación",
        date: "2014-2021",
        tasks: [
          "Reparación y mantenimiento de laptops (notebooks y netbooks)",
          "Desarme y ensamble.",
          "Identificación de fallas y diagnóstico",
          "Medición de componentes electrónicos.",
          "Cambio de partes y componentes smd",
          "Instalación de software",
          "Recepción y entrega de mercadería",
          "Atención de consultas",
        ],
      },
    ],
  },
  {
    company: "Estudio Guitelman",
    roles: [
      {
        title: "Soporte Técnico",
        date: "2018-2020",
        tasks: [
          "Reparación y mantenimiento de PC",
          "Resolución de fallos",
          "Diagnóstico y cambio de partes.",
          "Instalación y configuración de software",
        ],
      },
    ],
  },
  {
    company: "C.L'ectricidad - Ferro - Multiled",
    roles: [
      {
        title: "Técnico operador de pantallas led",
        date: "2017-2020",
        tasks: [
          "Instalación y conexionado de pantallas LED (videowall)",
          "Configuración de videos en software (LedStudio)",
          "Tendido de cableado (UTP)",
          "Prueba de luces en estadio",
        ],
      },
    ],
  },
];

const JOB_EXPERIENCES_EN: JobExperience[] = [
  {
    company: "Leafnoise",
    roles: [
      {
        title: "Frontend Developer",
        date: "2022-Present",
        tasks: [
          "Platform maintenance and participation in various projects. (Angular - React - TypeScript)",
          "Bug fix development",
          "Design and implementation of features.",
          "Participation in API structure creation alongside the backend team",
          "UI layout and design implementation",
          "Analysis and resolution of sprint requirements (Azure - Jira)",
        ],
      },
      {
        title: "Implementer",
        date: "2021-2022",
        tasks: [
          "1 year in .NET Implementation and Database Administration:",
          "Platform maintenance (bug fixes) C# .NET",
          "Database maintenance in SQL",
          "Analysis and resolution of client-reported issues",
        ],
      },
    ],
  },
  {
    company: "Mother Solution",
    roles: [
      {
        title: "Repair Technician",
        date: "2014-2021",
        tasks: [
          "Laptop repair and maintenance (notebooks and netbooks)",
          "Disassembly and assembly.",
          "Fault identification and diagnosis",
          "Electronic component measurement.",
          "SMD parts and component replacement",
          "Software installation",
          "Merchandise reception and delivery",
          "Customer support",
        ],
      },
    ],
  },
  {
    company: "Estudio Guitelman",
    roles: [
      {
        title: "Technical Support",
        date: "2018-2020",
        tasks: [
          "PC repair and maintenance",
          "Fault resolution",
          "Diagnosis and parts replacement.",
          "Software installation and configuration",
        ],
      },
    ],
  },
  {
    company: "C.L'ectricidad - Ferro - Multiled",
    roles: [
      {
        title: "LED Screen Operator Technician",
        date: "2017-2020",
        tasks: [
          "LED screen installation and wiring (videowall)",
          "Video configuration in software (LedStudio)",
          "Cable laying (UTP)",
          "Stadium light testing",
        ],
      },
    ],
  },
];

const TAB_DATA_ITEMS_ES: ActionsTabdataItem[] = [
  { path: '/', name: 'Inicio', icon: 'home' },
  { path: '/about', name: 'Sobre mí', icon: 'description' },
  { path: '/contact', name: 'Contacto', icon: 'contact_phone' },
];

const TAB_DATA_ITEMS_EN: ActionsTabdataItem[] = [
  { path: '/', name: 'Home', icon: 'home' },
  { path: '/about', name: 'About me', icon: 'description' },
  { path: '/contact', name: 'Contact', icon: 'contact_phone' },
];

export const TRANSLATIONS = {
  es: { ...es, jobExperiences: JOB_EXPERIENCES_ES, tabDataItems: TAB_DATA_ITEMS_ES },
  en: { ...en, jobExperiences: JOB_EXPERIENCES_EN, tabDataItems: TAB_DATA_ITEMS_EN },
};

export const PROFILE = {
  name: "Rodrigo Placeres",
  role: "Desarrollador Frontend",
  email: "rodrigoplaceres19@gmail.com",
  github: { url: "https://github.com/rodrigopla97", label: "github.com/rodrigopla97" },
  linkedin: { url: "https://www.linkedin.com/in/rodrigo-placeres/", label: "linkedin.com/in/rodrigo-placeres" },
  formEndpoint: "https://formsubmit.co/ajax/rodrigoplaceres19@gmail.com",
};

export const INITIAL_STATE = {
  PORTFOLIO: {
    isDarkMode: true,
    language: 'es' as 'es' | 'en',
    textColor: "text-grayPrimary",
    bgColor: "bg-black",
    borderColor: "border-grayPrimary",
    isMenuOpen: false,
    isCurriculumOpen: false,
    indexCarrousel: 0,
    experienceSelectedContex: 0,
    tabdataItems: TRANSLATIONS.es.tabDataItems,
    jobExperiencesContext: TRANSLATIONS.es.jobExperiences,
  },
};
