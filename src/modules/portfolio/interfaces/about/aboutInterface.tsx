import { ABOUT_CONTENT } from "@app/modules/portfolio/constants/constants";
import type { AboutContentType } from "@app/modules/portfolio/entities/entities";
import ExperienceInterface from "@app/modules/portfolio/interfaces/about/expierenceInterface";
import JobExperienceCardInterface from "@app/modules/portfolio/interfaces/about/jobExperienceCardInterface";
import LoadingInterface from "@app/modules/portfolio/interfaces/loadingInterface";
import { getAboutContent } from "@app/modules/portfolio/services/services";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect } from "react";

export default function AboutInterface() {
  const { getPortfolioState, setPortfolioState } = usePortfolioProvider();
  const { aboutSections, language } = getPortfolioState;

  useEffect(() => {
    async function fetchAbout() {
      setPortfolioState((state) => ({
        ...state,
        aboutSections: { ...state.aboutSections, loading: true }
      }));
      let data: AboutContentType | null = null;
      try {
        const res = await getAboutContent(language);
        data = res.data;
      } catch (err) {
        console.error(err);
        data = {
          ...ABOUT_CONTENT,
          sections: ABOUT_CONTENT.sections.filter((s) => !s.tags)
        };
      } finally {
        setPortfolioState((state) => ({ ...state, aboutSections: { loading: false, data } }));
      }
    }
    fetchAbout();
  }, [language, setPortfolioState]);

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
