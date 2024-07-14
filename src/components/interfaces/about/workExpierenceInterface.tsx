import { useTheme } from "../../../context/themeContext";
import workerAvatar from '../../../images/avatar-work.png';
import JobExperienceCardInterface from "./jobExperienceCardInterface";

export default function WorkExpierenceInterface() {
  const {textColor, isDarkMode} = useTheme()
  return (
    <>
      <div className={`pt-20 pb-[5vh] px-8 lg:px-20 ${textColor} lg:h-screen`}>
        <h2 className="text-xl font-bold mb-4 text-center">Experiencia Laboral</h2>
        <div className="flex flex-col md:flex-row mb-6 h-full place-content-center place-items-center">
          <img
            src={workerAvatar}
            alt="worker"
            className={`mr-4 w-full md:w-auto h-[50vh] lg:h-[75vh] object-contain self-center ${isDarkMode ? "drop-shadow-red" : "drop-shadow-white"}`}
          />
          <JobExperienceCardInterface />
        </div>
      </div>
    </>
  );
};

