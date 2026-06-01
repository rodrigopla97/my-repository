import { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../../../containers/states/portfolioProvider';
import useRoutes from '../../../containers/hooks/useRoutes';
import FooterAllIcons from '../footerAllIconsInterface';
import { ABOUT_CONTENT, CERTIFICATIONS, PROJECT_SITES } from '../../../containers/constants/constants';
import { useModal } from '../../../containers/hooks/useModal';
import { useIframePreview } from '../../../containers/hooks/useIframePreview';
import IframePreviewInterface from '../iframePreviewInterface';
import type { CertificationItem } from '../../../containers/entities/entities';

const SITES = PROJECT_SITES;
const techSection = ABOUT_CONTENT.sections.find(s => s.tags);

export default function HomeSummaryInterface() {
  const { getPortfolioState } = usePortfolio();
  const { textColor, isDarkMode } = getPortfolioState;
  const { navigate, openExternal } = useRoutes();
  const { modal } = useModal();
  const { previewUrl, previewLoading, setPreviewLoading, openPreview, closePreview } = useIframePreview();
  const [infoUrl, setInfoUrl] = useState<string | null>(null);
  const [menuKey, setMenuKey] = useState<string | null>(null);
  const [imgLoading, setImgLoading] = useState<Record<string, boolean>>(
    Object.fromEntries(SITES.map(s => [s.url, true]))
  );
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);
  const [startIdx, setStartIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [withTransition, setWithTransition] = useState(false);
  const [slideTarget, setSlideTarget] = useState<'left' | 'right' | 'base'>('base');
  const isAnimating = useRef(false);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragStartX = useRef(0);
  const dragAccumRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number>(0);

  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  useEffect(() => {
    if (!menuKey) return;
    const close = () => setMenuKey(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [menuKey]);

  const visible = isDesktop ? 3 : 1;
  const totalSlots = visible + 2;
  const innerSites = Array.from({ length: totalSlots }, (_, i) =>
    SITES[(startIdx - 1 + i + SITES.length) % SITES.length]
  );
  const basePercent = -(100 / totalSlots);
  const targetPercent =
    slideTarget === 'left' ? basePercent * 2 :
      slideTarget === 'right' ? 0 :
        basePercent;

  const accentColor = !isDarkMode ? 'text-cvButtonPrimary' : 'text-cvButtonSecondary';
  const accentBg = !isDarkMode ? 'bg-cvButtonPrimary' : 'bg-cvButtonSecondary';
  const accentBgFaint = !isDarkMode ? 'bg-cvButtonPrimary/30' : 'bg-cvButtonSecondary/30';
  const accentBorder = !isDarkMode ? 'border-cvButtonPrimary' : 'border-cvButtonSecondary';
  const accentBorderFaint = !isDarkMode ? 'border-cvButtonPrimary/30' : 'border-cvButtonSecondary/30';

  const canScroll = SITES.length > visible;

  function advance(direction: 'left' | 'right') {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setDragX(0);
    setWithTransition(true);
    setSlideTarget(direction);
    setTimeout(() => {
      setWithTransition(false);
      setSlideTarget('base');
      setStartIdx(prev =>
        direction === 'left'
          ? (prev + 1) % SITES.length
          : (prev - 1 + SITES.length) % SITES.length
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
    }
    dragAccumRef.current += delta;
    dragStartX.current = e.clientX;
    if (dragAccumRef.current <= -slotWidth) {
      dragAccumRef.current += slotWidth;
      setStartIdx(prev => (prev + 1) % SITES.length);
    } else if (dragAccumRef.current >= slotWidth) {
      dragAccumRef.current -= slotWidth;
      setStartIdx(prev => (prev - 1 + SITES.length) % SITES.length);
    }
    setDragX(dragAccumRef.current);
  }

  function onPointerUp(_e: React.PointerEvent) {
    if (!isDragging.current) return;
    isDragging.current = false;
    const accum = dragAccumRef.current;
    const slotWidth = (containerRef.current?.offsetWidth ?? 300) / visible;
    dragAccumRef.current = 0;
    if (Math.abs(accum) >= 50) {
      const dir = accum < 0 ? 'left' : 'right';
      setWithTransition(true);
      setDragX(dir === 'left' ? -slotWidth : slotWidth);
      setTimeout(() => {
        setWithTransition(false);
        setDragX(0);
        setStartIdx(prev => dir === 'left'
          ? (prev + 1) % SITES.length
          : (prev - 1 + SITES.length) % SITES.length
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
      cert.imageUrl
        ? <img src={cert.imageUrl} alt={cert.title} className="w-full h-auto" />
        : <div className="flex flex-col items-center justify-center gap-3 py-20">
          <i className={`material-symbols-outlined text-5xl opacity-20 ${accentColor}`}>image_search</i>
          <span className={`text-sm opacity-40 italic ${textColor}`}>Imagen del certificado próximamente</span>
        </div>
    );
  }

  function renderCard(site: typeof SITES[0], cardKey: string) {
    return (
      <div className={`group/card relative rounded-xl border overflow-hidden h-44 ${accentBorderFaint}`}>
        {imgLoading[site.url] && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin ${!isDarkMode ? 'border-cvButtonPrimary' : 'border-cvButtonSecondary'}`} />
          </div>
        )}
        <img
          src={`https://s0.wordpress.com/mshots/v1/${encodeURIComponent(site.url)}?w=600&h=400`}
          alt={site.label}
          className="w-full h-full object-cover object-top"
          style={{ opacity: imgLoading[site.url] ? 0 : 1, transition: 'opacity 0.3s ease' }}
          draggable={false}
          onLoad={() => setImgLoading(prev => ({ ...prev, [site.url]: false }))}
          onError={() => setImgLoading(prev => ({ ...prev, [site.url]: false }))}
        />
        <span className="absolute bottom-3 left-0 text-sm font-semibold text-white px-3 py-1 rounded-r-full bg-black/60 backdrop-blur-sm pointer-events-none">{site.label}</span>

        {infoUrl === site.url ? (
          <div
            className="absolute inset-0 flex flex-col backdrop-blur-sm bg-black/80 animate-fadeIn"
            onPointerDown={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-3 pt-3 pb-2 flex-shrink-0">
              <button
                onClick={() => setInfoUrl(null)}
                className="flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <i className="material-symbols-outlined text-base">arrow_back</i>
              </button>
              <span className="text-white text-xs font-semibold uppercase tracking-wide truncate">{site.label}</span>
            </div>
            <p className="text-white text-sm leading-relaxed px-3 pb-3 overflow-y-auto">{site.description}</p>
          </div>
        ) : (
          <>
          <button
            className="absolute top-2 right-2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            onPointerDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); setMenuKey(prev => prev === cardKey ? null : cardKey); }}
          >
            <i className="material-symbols-outlined text-base">more_vert</i>
          </button>
          {menuKey === cardKey && (
            <div
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <div
                className="flex flex-col w-40 rounded-xl overflow-hidden bg-black/80 backdrop-blur-sm border border-white/10 animate-fadeIn pointer-events-auto"
                onPointerDown={e => e.stopPropagation()}
                onClick={e => e.stopPropagation()}
              >
                {[
                  { icon: 'preview', label: 'Previsualizar', action: () => { openPreview(site.url); setMenuKey(null); } },
                  { icon: 'info', label: 'Info', action: () => { setInfoUrl(site.url); setMenuKey(null); } },
                  { icon: 'open_in_new', label: 'Visitar', action: () => { openExternal(site.url); setMenuKey(null); } },
                ].map(item => (
                  <button
                    key={item.icon}
                    onClick={item.action}
                    className={`flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors text-white/70 hover:text-white ${!isDarkMode ? 'hover:bg-cvButtonPrimary/20' : 'hover:bg-cvButtonSecondary/20'}`}
                  >
                    <i className="material-symbols-outlined text-base flex-shrink-0">{item.icon}</i>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-12 w-screen md:w-[75vw] px-10 md:mx-auto py-[8vh] ${textColor}`}>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-base uppercase tracking-widest">🌐 Proyectos</span>
          <button
            onClick={() => navigate('/projects')}
            className={`hidden md:flex items-center gap-1 text-xs uppercase tracking-widest transition-opacity hover:opacity-70 ${accentColor}`}
          >
            Ver todos
            <i className="material-symbols-outlined text-sm">arrow_forward</i>
          </button>
        </div>

        {!canScroll ? (
          <div className={`grid gap-4 justify-center ${SITES.length === 1 ? 'grid-cols-1 max-w-xs mx-auto w-full' : 'grid-cols-1 md:grid-cols-2 md:max-w-2xl md:mx-auto w-full'}`}>
            {SITES.map((site, i) => (
              <div key={`${site.url}-${i}`}>{renderCard(site, `${i}`)}</div>
            ))}
          </div>
        ) : (
          <>
            <div className="relative flex items-center gap-2">
              <button
                onClick={() => advance('right')}
                className={`hidden md:flex flex-shrink-0 items-center justify-center w-9 h-9 rounded-full border backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:opacity-90 opacity-50 ${accentColor} ${accentBorder} ${!isDarkMode ? 'bg-cvButtonPrimary/10' : 'bg-cvButtonSecondary/10'}`}
              >
                <i className="material-symbols-outlined text-sm">chevron_left</i>
              </button>

              <div
                ref={containerRef}
                className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                style={{ touchAction: 'pan-y' }}
              >
                <div
                  className="flex"
                  style={{
                    width: `${(totalSlots / visible) * 100}%`,
                    transform: `translateX(calc(${targetPercent}% + ${dragX}px))`,
                    transition: withTransition ? 'transform 0.4s ease' : 'none',
                  }}
                >
                  {innerSites.map((site, i) => (
                    <div key={`${site.url}-${i}`} style={{ width: `${100 / totalSlots}%` }} className="px-1">
                      {renderCard(site, `slot-${i}`)}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => advance('left')}
                className={`hidden md:flex flex-shrink-0 items-center justify-center w-9 h-9 rounded-full border backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:opacity-90 opacity-50 ${accentColor} ${accentBorder} ${!isDarkMode ? 'bg-cvButtonPrimary/10' : 'bg-cvButtonSecondary/10'}`}
              >
                <i className="material-symbols-outlined text-sm">chevron_right</i>
              </button>
            </div>

            <div className="flex flex-col items-center gap-3 md:hidden">
              <div className="flex justify-center gap-2">
                {SITES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (isAnimating.current || i === startIdx) return;
                      advance(i > startIdx ? 'left' : 'right');
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === startIdx ? accentBg : accentBgFaint}`}
                  />
                ))}
              </div>
              <button
                onClick={() => navigate('/projects')}
                className={`flex items-center gap-1 text-xs uppercase tracking-widest transition-opacity hover:opacity-70 ${accentColor}`}
              >
                Ver todos
                <i className="material-symbols-outlined text-sm">arrow_forward</i>
              </button>
            </div>
          </>
        )}
      </div>

      {techSection?.tags && (
        <div className="flex flex-col gap-4">
          <span className="text-base uppercase tracking-widest">🛠️ Tecnologías</span>
          <FooterAllIcons isPaused={false} items={techSection.tags.items} />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <span className="text-base uppercase tracking-widest">🎓 Certificaciones</span>
        <div className="flex flex-col gap-3">
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={i}
              onClick={() => openCertModal(cert)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-opacity cursor-pointer hover:opacity-70 ${accentBorderFaint}`}
            >
              <div className="flex flex-col gap-0.5">
                <span className={`text-xs uppercase tracking-widest ${accentColor}`}>{cert.institution}</span>
                <span className="text-sm font-medium">{cert.title}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {cert.inProgress && (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="block w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                    <span className={`text-xs font-bold ${textColor}`}>En curso</span>
                  </div>
                )}
                <i className={`material-symbols-outlined text-base opacity-40 ${accentColor}`}>{cert.imageUrl ? 'image_search' : 'image'}</i>
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
        label={SITES.find(s => s.url === previewUrl)?.label}
      />

    </div>
  );
}
