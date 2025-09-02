import { AboutProvider } from '../../context/aboutContext';
import ExperienceInterface from '../../components/interfaces/expierence/expierenceInterface';
import JobExperienceCardInterface from '../../components/interfaces/about/jobExperienceCardInterface';

export default function AboutPage() {
    return (
        <AboutProvider>
            <div className="flex flex-col justify-center items-center gap-8 w-screen md:w-[75vw] h-full px-10 md:mt-auto md:mx-auto py-[10vh]">
                <ExperienceInterface />
                <JobExperienceCardInterface />
            </div>
        </AboutProvider>
    );
}

