import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function HomeSkeleton() {
  return (
    <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-8 gap-12 animate-pulse">
      <div className="flex flex-col gap-5 w-full md:w-1/2 pl-[5vh]">
        <div className="h-10 w-3/4 rounded bg-current opacity-10" />
        <div className="h-8 w-1/2 rounded bg-current opacity-10" />
        <div className="h-5 w-2/3 rounded bg-current opacity-10" />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="h-56 w-56 rounded-full bg-current opacity-5" />
      </div>
    </div>
  );
}

function AboutSkeleton() {
  return (
    <div className="flex-1 flex flex-col gap-6 w-full md:w-[75vw] mx-auto px-10 py-8 overflow-y-auto animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="h-5 w-24 rounded bg-current opacity-10" />
        <div className="h-4 w-full rounded bg-current opacity-10" />
        <div className="h-4 w-5/6 rounded bg-current opacity-10" />
        <div className="h-4 w-4/6 rounded bg-current opacity-10" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-5 w-48 rounded bg-current opacity-10" />
        <div className="h-4 w-full rounded bg-current opacity-10" />
        <div className="h-4 w-3/4 rounded bg-current opacity-10" />
        <div className="h-4 w-4/5 rounded bg-current opacity-10" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-5 w-36 rounded bg-current opacity-10" />
        <div className="h-4 w-full rounded bg-current opacity-10" />
        <div className="h-4 w-2/3 rounded bg-current opacity-10" />
      </div>
      <div className="flex gap-3 mt-2">
        <div className="h-28 w-full rounded-xl bg-current opacity-10" />
        <div className="h-28 w-full rounded-xl bg-current opacity-10" />
        <div className="h-28 w-full rounded-xl bg-current opacity-10" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-8 w-20 rounded-full bg-current opacity-10" />
        ))}
      </div>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="flex-1 flex flex-col gap-6 w-full md:w-3/4 mx-auto px-10 py-8 animate-pulse">
      <div className="h-5 w-40 rounded bg-current opacity-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 rounded-xl bg-current opacity-10" />
        ))}
      </div>
    </div>
  );
}

function GenericSkeleton() {
  return (
    <div className="flex-1 flex flex-col justify-center gap-6 w-full max-w-xl mx-auto px-10 animate-pulse">
      <div className="h-6 w-48 rounded bg-current opacity-10" />
      <div className="h-4 w-full rounded bg-current opacity-10" />
      <div className="h-4 w-5/6 rounded bg-current opacity-10" />
      <div className="h-4 w-4/6 rounded bg-current opacity-10" />
    </div>
  );
}

export default function SyncOverlayInterface() {
  const { getPortfolioState, setPortfolioState } = usePortfolioProvider();
  const { isSyncing, tabsLoading, aboutSections, textColor, bgColor } = getPortfolioState;
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.overflow = isSyncing ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSyncing]);

  useEffect(() => {
    if (!isSyncing) return;
    if (!tabsLoading && !aboutSections.loading) {
      setPortfolioState((s) => ({ ...s, isSyncing: false }));
    }
  }, [isSyncing, tabsLoading, aboutSections.loading, setPortfolioState]);

  if (!isSyncing) return null;

  function renderSkeleton() {
    if (pathname === "/") return <HomeSkeleton />;
    if (pathname === "/about") return <AboutSkeleton />;
    if (pathname === "/projects") return <ProjectsSkeleton />;
    return <GenericSkeleton />;
  }

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col ${bgColor} ${textColor}`}>
      <div className="flex items-center justify-center gap-2 px-6 h-[10vh] opacity-60">
        <i className="material-symbols-outlined text-lg leading-none animate-spin">sync</i>
        <span className="text-sm uppercase tracking-widest font-semibold">Sincronizando...</span>
      </div>
      {renderSkeleton()}
    </div>
  );
}
