import { useEffect } from 'react';
import ExperienceInterface from '../../components/interfaces/expierence/expierenceInterface';
import JobExperienceCardInterface from '../../components/interfaces/about/jobExperienceCardInterface';
import LoadingInterface from '../../components/interfaces/loadingInterface';
import { usePortfolio } from '../../containers/states/portfolioProvider';
import { getAboutContent } from '../../services/aboutService';
import { ABOUT_CONTENT } from '../../containers/constants/constants';

export default function AboutPage() {
    const { getPortfolioState, setPortfolioState } = usePortfolio();
    const { aboutSections } = getPortfolioState;

    async function fetchAbout() {
        setPortfolioState(state => ({ ...state, aboutSections: { ...state.aboutSections, loading: true } }));
        try {
            const res = await getAboutContent();
            const hasTechnologies = res.data.sections.some(s => s.tags);
            setPortfolioState(state => ({
                ...state,
                aboutSections: {
                    loading: false,
                    data: {
                        ...res.data,
                        sections: hasTechnologies
                            ? res.data.sections
                            : [...res.data.sections, ...ABOUT_CONTENT.sections.filter(s => s.tags)],
                    },
                },
            }));
        } catch (err) {
            console.error(err);
            setPortfolioState(state => ({
                ...state,
                aboutSections: { loading: false, data: ABOUT_CONTENT },
            }));
        }
    }

    function onInitAboutPage() {
        fetchAbout();
    }

    useEffect(onInitAboutPage, []);


    return (
        <>{aboutSections.loading ?
            <LoadingInterface />
            :
            <div className="flex flex-col justify-center items-center gap-8 w-screen md:w-[75vw] h-full px-10 md:mt-auto md:mx-auto py-[10vh]">
                <ExperienceInterface />
                <JobExperienceCardInterface />
            </div>
        }
        </>
    );
}
