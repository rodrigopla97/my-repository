import { ReactNode } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: 'right' | 'bottom';
}

export default function TooltipInterface({ text, children, position = 'right' }: TooltipProps) {
  const positionClass = position === 'bottom'
    ? 'top-full left-1/2 -translate-x-1/2 mt-2'
    : 'left-full top-1/2 -translate-y-1/2 ml-2';

  return (
    <div className="relative group/tooltip inline-flex">
      {children}
      <span className={`absolute ${positionClass} px-2 py-1 text-xs rounded whitespace-nowrap pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 bg-neutral-800 text-neutral-200 border border-neutral-700`}>
        {text}
      </span>
    </div>
  );
}
