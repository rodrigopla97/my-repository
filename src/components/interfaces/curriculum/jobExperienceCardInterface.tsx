import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { JobExperience, JobRole } from '../../../entities/entities';

export default function JobExperienceCard({ job }: { job: JobExperience }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRolePeriod = (role: JobRole) => {
    const startDate = role.date.split('-')[0];
    const endDate = role.date.split('-')[1] || 'Actualidad';
    return `${startDate} - ${endDate}`;
  };

  return (
    <div className="bg-bluePrimary p-4 rounded shadow-md mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{job.company}</h3>
        <button onClick={() => setIsExpanded(!isExpanded)} className="focus:outline-none">
          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
        </button>
      </div>
      <div className="mt-2">
        <h4 className={`text-md font-semibold ${isExpanded ? 'hidden' : ''}`}>
          {job.roles[0].title} ({getRolePeriod(job.roles[0])})
        </h4>
        {isExpanded && (
          <div>
            {job.roles.map((role, index) => (
              <div key={index} className="mt-4">
                <h4 className="text-md font-semibold">
                  {role.title} ({getRolePeriod(role)})
                </h4>
                <ul className="list-disc list-inside mt-2">
                  {role.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="text-sm text-grayPrimary">
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
