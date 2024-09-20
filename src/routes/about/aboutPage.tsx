import WorkExpierenceInterface from '../../components/interfaces/about/workExpierenceInterface';
import { AboutProvider } from '../../context/aboutContext';
import ExperienceInterface from '../../components/interfaces/expierence/expierenceInterface';

export default function AboutPage() {

    return (
        <AboutProvider>
            <ExperienceInterface />
            <WorkExpierenceInterface/>
        </AboutProvider>
    );
}
