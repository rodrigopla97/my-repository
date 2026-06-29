import { useAccentColors } from "@app/modules/portfolio/hooks/useAccentColors";

interface SpinnerProps {
  className?: string;
}

export default function SpinnerInterface({ className = "" }: SpinnerProps) {
  const { isDarkMode } = useAccentColors();
  const spinClass = isDarkMode
    ? "border-white/20 border-t-cvButtonSecondary"
    : "border-black/10 border-t-cvButtonPrimary";

  return <div className={`rounded-full animate-spin border-2 w-6 h-6 ${spinClass} ${className}`} />;
}
