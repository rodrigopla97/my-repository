import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { JobExperience } from '../../../entities/entities';

const JobExperienceCard: React.FC<{ job: JobExperience }> = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{job.company}</h3>
        <button onClick={toggleExpand} className="focus:outline-none">
          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
        </button>
      </div>
      <div className="mt-2">
        <h4 className={`text-md font-semibold ${isExpanded && "hidden"}`}>
          { job.roles[0].title} ({job.roles[job.roles.length - 1].date.split("-")[0]} - {job.roles[0].date.split("-")[1] || "Actualidad"})
        </h4>
        {isExpanded && (
          <div>
            {job.roles.map((role, index) => (
              <div key={index}>
                <h4 className="text-md font-semibold mt-4">{role.title} ({role.date})</h4>
                <ul className="list-disc list-inside mt-2">
                  {role.tasks.map((task, index) => (
                    <li key={index} className="text-sm text-gray-700">{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobExperienceCard;
