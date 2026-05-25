import { ReactNode } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

export default function TooltipInterface({ text, children }: TooltipProps) {
  return (
    <div className="relative group inline-flex">
      {children}
      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-neutral-800 text-neutral-200 border border-neutral-700">
        {text}
      </span>
    </div>
  );
}
