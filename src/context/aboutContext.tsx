import React, { createContext, useState, useContext } from 'react';
import { AboutContextType, ProviderProps, JobExperience } from '../entities/entities';

export const AboutContext = createContext<AboutContextType | null>(null);

export const AboutProvider: React.FC<ProviderProps> = ({ children }) => {

  const [indexCarrousel, setIndexCarrousel] = useState(0);
  const [experienceSelectedContex, setExperienceSelectedContex] = useState(0);

  const jobExperiencesContext: JobExperience[] = [
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


  function toggleAboutIndex(idx: number) {
    setIndexCarrousel(idx)
  };

  function toggleJobSelected(idx: number) {
    setExperienceSelectedContex(idx)
  };

  return <AboutContext.Provider value={{ indexCarrousel, toggleAboutIndex, jobExperiencesContext, toggleJobSelected, experienceSelectedContex }}>{children}</AboutContext.Provider>;
};


export function useAbout() {
  return useContext(AboutContext) as AboutContextType;
};