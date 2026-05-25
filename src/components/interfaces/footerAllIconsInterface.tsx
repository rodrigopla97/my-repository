import { useState, useEffect, useRef } from 'react';
import { ICON_MAP } from '../../icons/iconMap';
import { TechnologyItem } from '../../containers/entities/entities';

interface FooterAllIconsProps {
  isPaused: boolean;
  items: TechnologyItem[];
}

export default function FooterAllIcons({ isPaused, items }: FooterAllIconsProps) {
  const icons = items.map(item => ({
    component: ICON_MAP[item.key],
    label: item.label,
  }));

  const [visible, setVisible] = useState(() => window.innerWidth < 768 ? 3 : 5);
  const [startIdx, setStartIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [withTransition, setWithTransition] = useState(false);
  const [slideTarget, setSlideTarget] = useState<'left' | 'right' | 'base'>('base');

  const isAnimating = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragAccumRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const containerRef = useRef<HTMLDivElement>(null);
  const externalPausedRef = useRef(isPaused);

  useEffect(() => {
    const handler = () => setVisible(window.innerWidth < 768 ? 3 : 5);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const canScroll = icons.length > visible;
  const totalSlots = visible + 2;
  const innerIcons = Array.from({ length: totalSlots }, (_, i) =>
    icons[(startIdx - 1 + i + icons.length) % icons.length]
  );

  const basePercent = -(100 / totalSlots);
  const targetPercent =
    slideTarget === 'left' ? basePercent * 2 :
      slideTarget === 'right' ? 0 :
        basePercent;

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
          ? (prev + 1) % icons.length
          : (prev - 1 + icons.length) % icons.length
      );
      isAnimating.current = false;
    }, 400);
  }

  function startAutoAdvance() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => advance('left'), 2000);
  }

  function pauseAndScheduleResume() {
    clearInterval(intervalRef.current);
    if (!externalPausedRef.current) startAutoAdvance();
  }

  useEffect(() => {
    externalPausedRef.current = isPaused;
    if (isPaused || !canScroll) {
      clearInterval(intervalRef.current);
    } else {
      startAutoAdvance();
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, canScroll]);

  function onPointerDown(e: React.PointerEvent) {
    if (isAnimating.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
    dragAccumRef.current = 0;
    isDragging.current = true;
    setWithTransition(false);
    setDragX(0);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    const slotWidth = (containerRef.current?.offsetWidth ?? 300) / visible;
    dragAccumRef.current += e.clientX - dragStartX.current;
    dragStartX.current = e.clientX;

    if (dragAccumRef.current <= -slotWidth) {
      dragAccumRef.current += slotWidth;
      setStartIdx(prev => (prev + 1) % icons.length);
    } else if (dragAccumRef.current >= slotWidth) {
      dragAccumRef.current -= slotWidth;
      setStartIdx(prev => (prev - 1 + icons.length) % icons.length);
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
          ? (prev + 1) % icons.length
          : (prev - 1 + icons.length) % icons.length
        );
      }, 350);
    } else {
      setWithTransition(true);
      setDragX(0);
      setTimeout(() => setWithTransition(false), 300);
    }
    pauseAndScheduleResume();
  }

  if (!canScroll) return (
    <div className="w-full flex justify-around">
      {icons.map((icon, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center">{icon.component}</div>
          <p className="mt-2 text-sm font-semibold">{icon.label}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="w-full select-none overflow-hidden">
      <div
        className="flex cursor-grab active:cursor-grabbing"
        style={{
          width: `${(totalSlots / visible) * 100}%`,
          transform: `translateX(calc(${targetPercent}% + ${dragX}px))`,
          transition: withTransition ? 'transform 0.4s ease' : 'none',
          touchAction: 'pan-y',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {innerIcons.map((icon, i) => (
          <div
            key={`${icon.label}-${i}`}
            style={{ width: `${100 / totalSlots}%` }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 flex items-center justify-center pointer-events-none">
              {icon.component}
            </div>
            <p className="mt-2 text-sm font-semibold pointer-events-none uppercase">{icon.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
