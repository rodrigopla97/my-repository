import { useState, useEffect, useRef } from 'react';
import JavascriptIcon from '../../icons/javascriptIcon';
import ReactIcon from '../../icons/reactIcon';
import AngularIcon from '../../icons/angularIcon';
import TailwindIcon from '../../icons/tailwindIcon';
import HtmltIcon from '../../icons/htmlIcon';
import CssIcon from '../../icons/cssIcon';
import GitIcon from '../../icons/gitIcon';
import TypescriptIcon from '../../icons/typescriptIcon';

const ICONS = [
  { component: <HtmltIcon />, label: "HTML" },
  { component: <CssIcon />, label: "CSS" },
  { component: <JavascriptIcon />, label: "JavaScript" },
  { component: <AngularIcon />, label: "Angular" },
  { component: <ReactIcon />, label: "React" },
  { component: <TypescriptIcon />, label: "Typescript" },
  { component: <TailwindIcon />, label: "Tailwind" },
  { component: <GitIcon />, label: "GIT" },
];

export default function FooterAllIcons() {
  const [visible, setVisible] = useState(() => window.innerWidth < 768 ? 3 : 5);
  const [startIdx, setStartIdx] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [withTransition, setWithTransition] = useState(false);
  const [slideTarget, setSlideTarget] = useState<'left' | 'right' | 'base'>('base');

  const isAnimating = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const handler = () => setVisible(window.innerWidth < 768 ? 3 : 5);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const totalSlots = ICONS.length;
  const innerIcons = Array.from({ length: totalSlots }, (_, i) =>
    ICONS[(startIdx - 1 + i + ICONS.length) % ICONS.length]
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
          ? (prev + 1) % ICONS.length
          : (prev - 1 + ICONS.length) % ICONS.length
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
    startAutoAdvance();
  }

  useEffect(() => {
    startAutoAdvance();
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    if (isAnimating.current) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
    isDragging.current = true;
    setWithTransition(false);
    setDragX(0);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    setDragX(e.clientX - dragStartX.current);
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = dragStartX.current - e.clientX;

    if (Math.abs(delta) >= 50) {
      advance(delta > 0 ? 'left' : 'right');
      pauseAndScheduleResume();
    } else {
      setWithTransition(true);
      setDragX(0);
      setTimeout(() => setWithTransition(false), 300);
    }
  }

  function goLeft() {
    advance('left');
    pauseAndScheduleResume();
  }

  function goRight() {
    advance('right');
    pauseAndScheduleResume();
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full select-none">
      <div className="w-full overflow-hidden">
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
              <p className="mt-2 text-sm font-semibold pointer-events-none">{icon.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={goRight} className="opacity-50 hover:opacity-100 transition-opacity text-4xl leading-none px-3 py-1">‹</button>
        <button onClick={goLeft} className="opacity-50 hover:opacity-100 transition-opacity text-4xl leading-none px-3 py-1">›</button>
      </div>
    </div>
  );
}
