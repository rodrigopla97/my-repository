import type {
  CertificationItem,
  JobExperience,
  ProjectSiteItem
} from "@app/modules/portfolio/entities/entities";

type Translations = {
  // Hero
  greeting: string;
  role: string;
  typewriterTexts: string[];
  // Section titles
  sectionProjects: string;
  sectionTechnologies: string;
  sectionCertifications: string;
  sectionExperience: string;
  sectionMyWebs: string;
  // UI labels
  seeAll: string;
  seeDetail: string;
  inProgress: string;
  certImageSoon: string;
  pause: string;
  resume: string;
  back: string;
  comingSoon: string;
  comingSoonDesc: string;
  soonLabel: string;
  // Footer / Contact
  navLabel: string;
  contactLabel: string;
  contactCta: string;
  contactSend: string;
  contactSendModal: string;
  contactCancel: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  contactEmailInvalid: string;
  contactSuccessMsg: string;
  contactErrorMsg: string;
  copyTooltip: string;
  copiedTooltip: string;
  goGithub: string;
  goLinkedin: string;
  currentJob: string;
  singlePeriod: string;
  // Projects card / CV panel
  preview: string;
  download: string;
  info: string;
  visit: string;
  // Tab names by path
  tabNames: Record<string, string>;
  // Data
  certifications: CertificationItem[];
  projectSites: ProjectSiteItem[];
  jobExperiences: JobExperience[];
};

export const translations: Record<"es" | "en", Translations> = {
  es: {
    greeting: "Hola! Soy",
    role: "Desarrollador Frontend",
    typewriterTexts: ["Rodrigo Placeres", "Desarrollador Front-End"],
    sectionProjects: "🌐 Proyectos",
    sectionTechnologies: "🛠️ Tecnologías",
    sectionCertifications: "🎓 Certificaciones",
    sectionExperience: "💼 Trayectoria profesional",
    sectionMyWebs: "🌐 Mis webs",
    seeAll: "Ver todos",
    seeDetail: "Ver detalle",
    inProgress: "En curso",
    certImageSoon: "Imagen del certificado próximamente",
    pause: "Pausar",
    resume: "Reanudar",
    back: "Volver",
    comingSoon: "Sección en construcción",
    comingSoonDesc: "Próximamente habrá contenido nuevo por acá.",
    soonLabel: "Próximamente",
    navLabel: "Navegación",
    contactLabel: "Contacto",
    contactCta:
      "Si tenés un proyecto en mente, una propuesta o alguna duda, no dudes en escribirme.",
    contactSend: "Enviar",
    contactSendModal: "Enviar un mensaje",
    contactCancel: "Cancelar",
    contactName: "Nombre",
    contactEmail: "Correo",
    contactMessage: "Mensaje",
    contactEmailInvalid: "El correo no es válido.",
    contactSuccessMsg: "¡Mensaje enviado! Te responderé a la brevedad.",
    contactErrorMsg: "Hubo un error al enviar el mensaje. Intentá de nuevo.",
    copyTooltip: "Copiar al portapapeles",
    copiedTooltip: "¡Copiado!",
    goGithub: "Ir a GitHub",
    goLinkedin: "Ir a LinkedIn",
    currentJob: "Trabajo actual",
    singlePeriod: "Único período",
    preview: "Previsualizar",
    download: "Descargar",
    info: "Info",
    visit: "Visitar",
    tabNames: {
      "/": "Inicio",
      "/about": "Sobre mí"
    },
    certifications: [
      {
        institution: "UTN",
        title: "Tecnicatura Universitaria en Programación",
        year: "2023",
        inProgress: true
      },
      { institution: "EducaciónIT", title: "Desarrollador Fullstack Node.js", year: "2022" },
      { institution: "CoderHouse", title: "Desarrollo Web", year: "2021" }
    ],
    projectSites: [
      {
        label: "Proyecto Final Coder",
        description:
          "Página realizada para el curso de Coder House. Con detalles a mejorar para seguir mostrando lo que voy aprendiendo.",
        url: "https://rodrigopla97.github.io/proyecto-final-coder-rodrigo-placeres/"
      },
      {
        label: "Pixel Pancheria",
        description:
          "Página productiva de un emprendimiento, en la que colaboré en el desarrollo y correcciones de errores para su despliegue.",
        url: "https://pixelpancheria.netlify.app/"
      },
      {
        label: "Circo Caeli",
        description:
          "Página productiva de una compañía de circo, desarrollada y desplegada para su presentación y difusión.",
        url: "https://circocaeli.ar/"
      },
      {
        label: "Leafnoise",
        description:
          "Participación en su desarrollo y actualización. Integración dinámica de textos en inglés y español.",
        url: "https://leafnoise.io/"
      }
    ],
    jobExperiences: [
      {
        company: "Leafnoise",
        roles: [
          {
            title: "Desarrollador Frontend",
            date: "2022-Actualidad",
            currentWork: true,
            tasks: [
              "Mantenimiento de plataformas, participación en distintos proyectos. (Angular - React - TypeScript)",
              "Desarrollo de bugfix",
              "Diseño e implementación de features.",
              "Participación en la creación de la estructura de las APIs, junto con el backend",
              "Maquetación e implementación de diseño",
              "Análisis y Resolución de requerimientos en sprint (Azure - Jira)"
            ]
          },
          {
            title: "Implementador",
            date: "2021-2022",
            tasks: [
              "1 año en Implementación .NET y Administración de Base de datos:",
              "Mantenimiento de la plataforma (correcciones de bugs) C# .NET",
              "Mantenimiento de Base de Datos en SQL",
              "Análisis y Resolución de problemas informados por el cliente"
            ]
          }
        ]
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
              "Atención de consultas"
            ]
          }
        ]
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
              "Instalación y configuración de software"
            ]
          }
        ]
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
              "Prueba de luces en estadio"
            ]
          }
        ]
      }
    ]
  },

  en: {
    greeting: "Hi! I'm",
    role: "Frontend Developer",
    typewriterTexts: ["Rodrigo Placeres", "Frontend Developer"],
    sectionProjects: "🌐 Projects",
    sectionTechnologies: "🛠️ Technologies",
    sectionCertifications: "🎓 Certifications",
    sectionExperience: "💼 Professional Journey",
    sectionMyWebs: "🌐 My Websites",
    seeAll: "See all",
    seeDetail: "See detail",
    inProgress: "In progress",
    certImageSoon: "Certificate image coming soon",
    pause: "Pause",
    resume: "Resume",
    back: "Back",
    comingSoon: "Section under construction",
    comingSoonDesc: "New content coming soon.",
    soonLabel: "Coming soon",
    navLabel: "Navigation",
    contactLabel: "Contact",
    contactCta:
      "If you have a project in mind, a proposal or any questions, feel free to reach out.",
    contactSend: "Send",
    contactSendModal: "Send a message",
    contactCancel: "Cancel",
    contactName: "Name",
    contactEmail: "Email",
    contactMessage: "Message",
    contactEmailInvalid: "Invalid email address.",
    contactSuccessMsg: "Message sent! I'll get back to you soon.",
    contactErrorMsg: "There was an error sending the message. Please try again.",
    copyTooltip: "Copy to clipboard",
    copiedTooltip: "Copied!",
    goGithub: "Go to GitHub",
    goLinkedin: "Go to LinkedIn",
    currentJob: "Current job",
    singlePeriod: "Single period",
    preview: "Preview",
    download: "Download",
    info: "Info",
    visit: "Visit",
    tabNames: {
      "/": "Home",
      "/about": "About me"
    },
    certifications: [
      {
        institution: "UTN",
        title: "University Technician in Programming",
        year: "2023",
        inProgress: true
      },
      { institution: "EducaciónIT", title: "Fullstack Node.js Developer", year: "2022" },
      { institution: "CoderHouse", title: "Web Development", year: "2021" }
    ],
    projectSites: [
      {
        label: "Proyecto Final Coder",
        description:
          "Page created for the Coder House course. With details to improve as I continue learning.",
        url: "https://rodrigopla97.github.io/proyecto-final-coder-rodrigo-placeres/"
      },
      {
        label: "Pixel Pancheria",
        description:
          "Productive page for a small business, where I collaborated in development and bug fixes for its deployment.",
        url: "https://pixelpancheria.netlify.app/"
      },
      {
        label: "Circo Caeli",
        description:
          "Productive page for a circus company, developed and deployed for its presentation and outreach.",
        url: "https://circocaeli.ar/"
      },
      {
        label: "Leafnoise",
        description:
          "Participated in its development and updates. Dynamic integration of texts in English and Spanish.",
        url: "https://leafnoise.io/"
      }
    ],
    jobExperiences: [
      {
        company: "Leafnoise",
        roles: [
          {
            title: "Frontend Developer",
            date: "2022-Present",
            currentWork: true,
            tasks: [
              "Platform maintenance, participation in various projects. (Angular - React - TypeScript)",
              "Bug fix development",
              "Design and implementation of features.",
              "Participation in API structure creation alongside the backend team",
              "Layout and design implementation",
              "Sprint requirements analysis and resolution (Azure - Jira)"
            ]
          },
          {
            title: "Implementer",
            date: "2021-2022",
            tasks: [
              "1 year in .NET Implementation and Database Administration:",
              "Platform maintenance (bug fixes) C# .NET",
              "SQL Database maintenance",
              "Analysis and resolution of client-reported issues"
            ]
          }
        ]
      },
      {
        company: "Mother Solution",
        roles: [
          {
            title: "Repair Technician",
            date: "2014-2021",
            tasks: [
              "Repair and maintenance of laptops (notebooks and netbooks)",
              "Disassembly and assembly.",
              "Fault identification and diagnosis",
              "Electronic component measurement.",
              "SMD parts and component replacement",
              "Software installation",
              "Goods reception and delivery",
              "Customer inquiry assistance"
            ]
          }
        ]
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
              "Software installation and configuration"
            ]
          }
        ]
      },
      {
        company: "C.L'ectricidad - Ferro - Multiled",
        roles: [
          {
            title: "LED Screen Operator Technician",
            date: "2017-2020",
            tasks: [
              "Installation and wiring of LED screens (videowall)",
              "Video configuration in software (LedStudio)",
              "Cable laying (UTP)",
              "Stadium light testing"
            ]
          }
        ]
      }
    ]
  }
};
