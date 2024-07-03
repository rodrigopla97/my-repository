import React, { useState } from 'react';
import { JobExperience, JobRole } from '../../../entities/entities';
import { useTheme } from '../../../context/themeContext';

const jobExperiences: JobExperience[] = [
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

export default function JobExperienceCardInterface() {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const { bgColor, textColor, borderColor } = useTheme();

  function getRolePeriod (roles: JobRole[]) {    
    const startDate = roles[roles.length - 1].date.split('-')[0];
    const endDate = roles[0].date.split('-')[1] || 'Actualidad';
    
    return `${startDate} - ${endDate}`;
  };

  function toggleExpansion(index: number) {
    const currentIndex = expandedIndexes.indexOf(index);
    if (currentIndex === -1) {
      setExpandedIndexes([...expandedIndexes, index]);
    } else {
      setExpandedIndexes(expandedIndexes.filter(idx => idx !== index));
    }
  };
    

  return (
    <div className="flex-grow p-4 h-[75vh] overflow-y-auto place-content-center	">
      {jobExperiences.map((experience, index) => (
        <div key={index} className={`${bgColor} p-4 rounded border ${borderColor} shadow-md mb-4`} >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{experience.company}</h3>
            <button onClick={() => toggleExpansion(index)} className="focus:outline-none">
              <i className={`material-icons-outlined ${expandedIndexes.includes(index) ? '-rotate-90' : 'rotate-90'}`}>keyboard_arrow_right</i>
            </button>
          </div>
          <h4 className={`text-md font-semibold ${expandedIndexes.includes(index) && 'hidden'}`}>
            {getRolePeriod(experience.roles)}
          </h4>
          {expandedIndexes.includes(index) && (
            <div className="mt-2">
              {experience.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="mt-4">
                  <h4 className="text-md font-semibold">
                    {role.title} ({role.date})
                  </h4>
                  <ul className="list-disc list-inside mt-2">
                    {role.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className={`text-sm ${textColor}`}>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
