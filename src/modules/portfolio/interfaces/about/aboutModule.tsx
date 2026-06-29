import LoadingInterface from "@app/modules/main/interfaces/loadingInterface";
import { ABOUT_CONTENT } from "@app/modules/portfolio/constants/constants";
import ExperienceInterface from "@app/modules/portfolio/interfaces/about/expierenceInterface";
import JobExperienceCardInterface from "@app/modules/portfolio/interfaces/about/jobExperienceCardInterface";
import { getAboutContent } from "@app/modules/portfolio/services/services";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect } from "react";

export default function AboutModule() {
  const { getPortfolioState, setPortfolioState } = usePortfolioProvider();
  const { aboutSections } = getPortfolioState;

  useEffect(() => {
    if (aboutSections.data) return;
    async function fetchAbout() {
      setPortfolioState((state) => ({
        ...state,
        aboutSections: { ...state.aboutSections, loading: true }
      }));
      try {
        const res = await getAboutContent();
        setPortfolioState((state) => ({
          ...state,
          aboutSections: { loading: false, data: res.data }
        }));
      } catch (err) {
        console.error(err);
        const fallback = {
          ...ABOUT_CONTENT,
          sections: ABOUT_CONTENT.sections.filter((s) => !s.tags)
        };
        setPortfolioState((state) => ({
          ...state,
          aboutSections: { loading: false, data: fallback }
        }));
      }
    }
    fetchAbout();
  }, [aboutSections.data, setPortfolioState]);

  return (
    <>
      {aboutSections.loading ? (
        <LoadingInterface />
      ) : (
        <div className="flex flex-col justify-center items-center gap-8 w-screen md:w-[75vw] h-full px-10 md:mt-auto md:mx-auto py-[10vh]">
          <ExperienceInterface />
          <JobExperienceCardInterface />
        </div>
      )}
    </>
  );
}
