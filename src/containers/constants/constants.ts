import { ActionsTabdataItem, JobExperience } from '../entities/entities';

export const JOB_EXPERIENCES: JobExperience[] = [
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

export const PROFILE = {
  name: "Rodrigo Placeres",
  role: "Desarrollador Frontend",
  email: "rodrigoplaceres19@gmail.com",
  github: { url: "https://github.com/rodrigopla97", label: "github.com/rodrigopla97" },
  linkedin: { url: "https://www.linkedin.com/in/rodrigo-placeres/", label: "linkedin.com/in/rodrigo-placeres" },
  formEndpoint: "https://formsubmit.co/ajax/rodrigoplaceres19@gmail.com",
};

export const TAB_DATA_ITEMS: ActionsTabdataItem[] = [
  { path: '/', name: 'Inicio', icon: 'home' },
  { path: '/about', name: 'Sobre mí', icon: 'description' },
  { path: '/contact', name: 'Contacto', icon: 'contact_phone' },
];

export const INITIAL_STATE = {
  PORTFOLIO: {
    isDarkMode: true,
    textColor: "text-grayPrimary",
    bgColor: "bg-black",
    borderColor: "border-grayPrimary",
    isMenuOpen: false,
    isCurriculumOpen: false,
    indexCarrousel: 0,
    experienceSelectedContex: 0,
    tabdataItems: TAB_DATA_ITEMS,
    jobExperiencesContext: JOB_EXPERIENCES,
  },
};
