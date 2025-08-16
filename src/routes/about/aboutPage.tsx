import { AboutProvider } from '../../context/aboutContext';
import ExperienceInterface from '../../components/interfaces/expierence/expierenceInterface';
import JobExperienceCardInterface from '../../components/interfaces/about/jobExperienceCardInterface';

export default function AboutPage() {
    return (
        <AboutProvider>
            <div className="flex md:flex-row flex-col justify-center items-center gap-8 w-screen md:h-screen h-auto px-10">
                <ExperienceInterface />
                <JobExperienceCardInterface />
            </div>
        </AboutProvider>
    );
}

