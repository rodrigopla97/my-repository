import ContentTextInterface from '../../components/interfaces/main/contentTextInterface';
import WorkExpierenceInterface from '../../components/interfaces/about/workExpierenceInterface';
import { AboutProvider } from '../../context/aboutContext';

export default function AboutPage() {

    return (
        <AboutProvider>
            <ContentTextInterface />
            <WorkExpierenceInterface/>
        </AboutProvider>
    );
}
