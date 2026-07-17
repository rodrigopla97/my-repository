import { useIframePreview } from "@app/modules/main/hooks/useIframePreview";
import useRouter from "@app/modules/main/hooks/useRouter";
import { TECH_TAGS } from "@app/modules/portfolio/constants/constants";
import type { CertificationItem } from "@app/modules/portfolio/entities/entities";
import { useTranslations } from "@app/modules/portfolio/hooks/useTranslations";
import { useModal } from "@app/modules/portfolio/hooks/useModal";
import FooterAllIcons from "@app/modules/portfolio/interfaces/footerAllIconsInterface";
import ProjectCardInterface from "@app/modules/portfolio/interfaces/home/projectCardInterface";
import IframePreviewInterface from "@app/modules/portfolio/interfaces/iframePreviewInterface";
import { usePortfolioProvider } from "@app/modules/portfolio/states/portfolioProvider";
import { useEffect, useRef, useState } from "react";

export default function HomeSummaryInterface() {
  const { getPortfolioState } = usePortfolioProvider();
  const { textColor, isDarkMode } = getPortfolioState;
  const translations = useTranslations();
  const SITES = translations.projectSites;
  const { navigate } = useRouter();
  const { modal } = useModal();
  const { previewUrl, previewLoading, setPreviewLoading, openPreview, closePreview } =
    useIframePreview();
  const [infoUrl, setInfoUrl] = useState<string | null>(null);
  const [menuKey, setMenuKey] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState<Record<string, boolean>>(
    Object.fromEntries(SITES.map((s) => [s.url, true]))
  );
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);
  const [isIconsPaused, setIsIconsPaused] = useState(false);
  const [startIdx, setStartIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [withTransition, setWithTransition] = useState(false);
  const [slideTarget, setSlideTarget] = useState<"left" | "right" | "base">("base");
  const isAnimating = useRef(false);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragAccumRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number>(0);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function handleTouchEnd(e: TouchEvent) {
      if (hasDragged.current) e.preventDefault();
    }
    el.addEventListener("touchend", handleTouchEnd, { passive: false });
    return () => el.removeEventListener("touchend", handleTouchEnd);
  }, []);

  useEffect(() => {
    if (!menuKey) return;
    const close = () => setMenuKey(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuKey]);

  const visible = isDesktop ? 3 : 1;
  const totalSlots = visible + 2;
  const innerSites = Array.from(
    { length: totalSlots },
    (_, i) => SITES[(startIdx - 1 + i + SITES.length) % SITES.length]
  );
  const basePercent = -(100 / totalSlots);
  const targetPercent =
    slideTarget === "left" ? basePercent * 2 : slideTarget === "right" ? 0 : basePercent;

  const accentColor = !isDarkMode ? "text-cvButtonPrimary" : "text-cvButtonSecondary";
  const accentBg = !isDarkMode ? "bg-cvButtonPrimary" : "bg-cvButtonSecondary";
  const accentBgFaint = !isDarkMode ? "bg-cvButtonPrimary/30" : "bg-cvButtonSecondary/30";
  const accentBorder = !isDarkMode ? "border-cvButtonPrimary" : "border-cvButtonSecondary";
  const accentBorderFaint = !isDarkMode
    ? "border-cvButtonPrimary/30"
    : "border-cvButtonSecondary/30";

  const canScroll = SITES.length > visible;

  function advance(direction: "left" | "right") {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setDragX(0);
    setWithTransition(true);
    setSlideTarget(direction);
    setTimeout(() => {
      setWithTransition(false);
      setSlideTarget("base");
      setStartIdx((prev) =>
        direction === "left" ? (prev + 1) % SITES.length : (prev - 1 + SITES.length) % SITES.length
      );
      isAnimating.current = false;
    }, 400);
  }

  function onPointerDown(e: React.PointerEvent) {
    if (!canScroll || isAnimating.current) return;
    dragStartX.current = e.clientX;
    dragAccumRef.current = 0;
    isDragging.current = true;
    hasDragged.current = false;
    pointerIdRef.current = e.pointerId;
    setWithTransition(false);
    setDragX(0);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging.current || e.buttons === 0) return;
    const slotWidth = (containerRef.current?.offsetWidth ?? 300) / visible;
    const delta = e.clientX - dragStartX.current;
    if (!hasDragged.current && Math.abs(delta) > 8) {
      hasDragged.current = true;
      e.currentTarget.setPointerCapture(pointerIdRef.current);
      setMenuKey(null);
      setInfoUrl(null);
    }
    dragAccumRef.current += delta;
    dragStartX.current = e.clientX;
    if (dragAccumRef.current <= -slotWidth) {
      dragAccumRef.current += slotWidth;
      setStartIdx((prev) => (prev + 1) % SITES.length);
    } else if (dragAccumRef.current >= slotWidth) {
      dragAccumRef.current -= slotWidth;
      setStartIdx((prev) => (prev - 1 + SITES.length) % SITES.length);
    }
    setDragX(dragAccumRef.current);
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (hasDragged.current) e.preventDefault();
    const accum = dragAccumRef.current;
    const slotWidth = (containerRef.current?.offsetWidth ?? 300) / visible;
    dragAccumRef.current = 0;
    if (Math.abs(accum) >= 50) {
      const dir = accum < 0 ? "left" : "right";
      setWithTransition(true);
      setDragX(dir === "left" ? -slotWidth : slotWidth);
      setTimeout(() => {
        setWithTransition(false);
        setDragX(0);
        setStartIdx((prev) =>
          dir === "left" ? (prev + 1) % SITES.length : (prev - 1 + SITES.length) % SITES.length
        );
      }, 350);
    } else {
      setWithTransition(true);
      setDragX(0);
      setTimeout(() => setWithTransition(false), 300);
    }
  }

  function openCertModal(cert: CertificationItem) {
    modal.open(
      cert.title,
      cert.imageUrl ? (
        <img src={cert.imageUrl} alt={cert.title} className="w-full h-auto" />
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <i className={`material-symbols-outlined text-5xl opacity-20 ${accentColor}`}>
            image_search
          </i>
          <span className={`text-sm opacity-40 italic ${textColor}`}>
            {translations.certImageSoon}
          </span>
        </div>
      )
    );
  }

  function renderCard(site: (typeof SITES)[0], cardKey: string) {
    return (
      <ProjectCardInterface
        site={site}
        cardKey={cardKey}
        imgLoading={imgLoading[site.url]}
        onImgLoad={() => setImgLoading((prev) => ({ ...prev, [site.url]: false }))}
        onImgError={() => setImgLoading((prev) => ({ ...prev, [site.url]: false }))}
        infoUrl={infoUrl}
        setInfoUrl={setInfoUrl}
        menuKey={menuKey}
        setMenuKey={setMenuKey}
        onPreview={openPreview}
      />
    );
  }

  return (
    <div
      className={`flex flex-col gap-12 w-screen md:w-[75vw] px-10 md:mx-auto py-[8vh] ${textColor}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-base uppercase tracking-widest">{translations.sectionProjects}</span>
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className={`hidden md:flex items-center gap-1 text-xs uppercase tracking-widest transition-opacity hover:opacity-70 ${accentColor}`}
          >
            {translations.seeAll}
            <i className="material-symbols-outlined text-xl">chevron_right</i>
          </button>
        </div>

        {!canScroll ? (
          <div
            className={`grid gap-4 justify-center ${SITES.length === 1 ? "grid-cols-1 max-w-xs mx-auto w-full" : SITES.length === 3 ? "grid-cols-1 md:grid-cols-3 w-full" : "grid-cols-1 md:grid-cols-2 md:max-w-2xl md:mx-auto w-full"}`}
          >
            {SITES.map((site, i) => (
              <div key={`${site.url}-${i}`}>{renderCard(site, `${i}`)}</div>
            ))}
          </div>
        ) : (
          <>
            <div className="relative flex items-center gap-2">
              <button
                type="button"
                onClick={() => advance("right")}
                className={`flex flex-shrink-0 items-center justify-center w-9 h-9 rounded-full border backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:opacity-90 opacity-50 ${accentColor} ${accentBorder} ${!isDarkMode ? "bg-cvButtonPrimary/10" : "bg-cvButtonSecondary/10"}`}
              >
                <i className="material-symbols-outlined text-xl">chevron_left</i>
              </button>

              <div
                ref={containerRef}
                className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                style={{ touchAction: "pan-y" }}
              >
                <div
                  className="flex"
                  style={{
                    width: `${(totalSlots / visible) * 100}%`,
                    transform: `translateX(calc(${targetPercent}% + ${dragX}px))`,
                    transition: withTransition ? "transform 0.4s ease" : "none"
                  }}
                >
                  {innerSites.map((site, i) => (
                    <div
                      key={`${site.url}-${i}`}
                      style={{ width: `${100 / totalSlots}%` }}
                      className="px-1"
                    >
                      {renderCard(site, `slot-${i}`)}
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => advance("left")}
                className={`flex flex-shrink-0 items-center justify-center w-9 h-9 rounded-full border backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:opacity-90 opacity-50 ${accentColor} ${accentBorder} ${!isDarkMode ? "bg-cvButtonPrimary/10" : "bg-cvButtonSecondary/10"}`}
              >
                <i className="material-symbols-outlined text-xl">chevron_right</i>
              </button>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center gap-2">
                {SITES.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => {
                      if (isAnimating.current || i === startIdx) return;
                      advance(i > startIdx ? "left" : "right");
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === startIdx ? accentBg : accentBgFaint}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className={`flex md:hidden items-center gap-1 text-xs uppercase tracking-widest transition-opacity hover:opacity-70 ${accentColor}`}
              >
                {translations.seeAll}
                <i className="material-symbols-outlined text-xl">chevron_right</i>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-base uppercase tracking-widest">{translations.sectionTechnologies}</span>
          {TECH_TAGS.length > (isDesktop ? 5 : 3) && (
            <button
              type="button"
              onClick={() => setIsIconsPaused((p) => !p)}
              className={`transition-opacity duration-200 opacity-30 hover:opacity-80 ${textColor}`}
              title={isIconsPaused ? translations.resume : translations.pause}
            >
              <i className="material-symbols-outlined text-base">
                {isIconsPaused ? "play_arrow" : "pause"}
              </i>
            </button>
          )}
        </div>
        <FooterAllIcons isPaused={isIconsPaused} items={TECH_TAGS} />
      </div>

      <div className="flex flex-col gap-4">
        <span className="text-base uppercase tracking-widest">{translations.sectionCertifications}</span>
        <div className="flex flex-col gap-3">
          {translations.certifications.map((cert, i) => (
            <div
              key={i}
              onClick={() => openCertModal(cert)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-opacity cursor-pointer hover:opacity-70 ${accentBorderFaint}`}
            >
              <div className="flex flex-col gap-0.5">
                <span className={`text-xs uppercase tracking-widest ${accentColor}`}>
                  {cert.institution}
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium">{cert.title}</span>
                  {cert.inProgress && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                      <span className="text-xs opacity-50">{translations.inProgress}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <i className={`material-symbols-outlined text-base opacity-40 ${accentColor}`}>
                  {cert.imageUrl ? "image_search" : "image"}
                </i>
                <span className="text-xs opacity-50">{cert.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <IframePreviewInterface
        previewUrl={previewUrl}
        previewLoading={previewLoading}
        setPreviewLoading={setPreviewLoading}
        closePreview={closePreview}
        label={SITES.find((s) => s.url === previewUrl)?.label}
      />
    </div>
  );
}
