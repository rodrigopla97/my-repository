import React from 'react';
import JobExperienceCard from '../../components/interfaces/curriculum/jobExperienceCardInterface';
import { JobExperience } from '../../entities/entities';

export const jobExperiences: JobExperience[] = [
  {
    company: "Leafnoise",
    roles: [
      {
        title: "Frontend",
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


const Curriculum: React.FC = () => {
  return (
    <div className="container mx-auto py-[10vh]">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Currículum Vitae</h1>
        
        {/* Información Personal */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Información Personal</h2>
        </div>
        
        {/* Experiencia Laboral */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Experiencia Laboral</h2>
          {jobExperiences.map((job, index) => (
            <JobExperienceCard key={index} job={job} />
          ))}
        </div>
        
        {/* Educación */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Educación</h2>
        </div>
        
        {/* Habilidades */}
        <div>
          <h2 className="text-xl font-bold mb-2">Habilidades</h2>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
