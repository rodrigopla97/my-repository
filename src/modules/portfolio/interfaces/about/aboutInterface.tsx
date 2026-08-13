import { ABOUT_CONTENT } from "@app/modules/portfolio/constants/constants";
import type { AboutContentType } from "@app/modules/portfolio/entities/entities";
import ExperienceInterface from "@app/modules/portfolio/interfaces/about/expierenceInterface";
import JobExperienceCardInterface from "@app/modules/portfolio/interfaces/about/jobExperienceCardInterface";
import { getAboutContent } from "@app/modules/portfolio/services/services";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect } from "react";

export default function AboutInterface() {
  const { getPortfolioState, setPortfolioState } = usePortfolioProvider();
  const { language, aboutSyncKey } = getPortfolioState;

  useEffect(() => {
    async function fetchAbout() {
      setPortfolioState((state) => ({
        ...state,
        aboutSections: { loading: true, data: state.aboutSections.data }
      }));
      let data: AboutContentType | null = null;
      try {
        const res = await getAboutContent(language, aboutSyncKey);
        data = res.data;
      } catch (err) {
        console.error(err);
        data = {
          ...ABOUT_CONTENT,
          sections: ABOUT_CONTENT.sections.filter((s) => !s.tags)
        };
        if (language === "en") {
          setPortfolioState((state) => ({
            ...state,
            language: "es",
            notification: {
              open: true,
              message: "El contenido en inglés no está disponible",
              type: "error"
            }
          }));
          setTimeout(() => {
            setPortfolioState((state) => ({
              ...state,
              notification: { ...state.notification, open: false }
            }));
          }, 4000);
        }
      } finally {
        setPortfolioState((state) => ({ ...state, aboutSections: { loading: false, data } }));
      }
    }
    fetchAbout();
  }, [language, setPortfolioState, aboutSyncKey]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-screen md:w-[75vw] h-full px-10 md:mt-auto md:mx-auto py-[10vh]">
      <ExperienceInterface />
      <JobExperienceCardInterface />
    </div>
  );
}
