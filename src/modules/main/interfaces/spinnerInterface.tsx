import { useAccentColors } from '@app/modules/portfolio/hooks/useAccentColors';

interface SpinnerProps {
  size?: number;
  borderWidth?: number;
  className?: string;
}

export default function SpinnerInterface({ size = 24, borderWidth = 2, className = '' }: SpinnerProps) {
  const { isDarkMode } = useAccentColors();
  const spinClass = isDarkMode
    ? 'border-white/20 border-t-cvButtonSecondary'
    : 'border-black/10 border-t-cvButtonPrimary';

  return (
    <div
      style={{ width: size, height: size, borderWidth }}
      className={`rounded-full animate-spin ${spinClass} ${className}`}
    />
  );
}
