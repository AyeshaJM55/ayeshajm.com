import { cn } from "../../../utils/cn";

export interface OrbitDotProps {
  size?: number;
  className?: string;
}

/** A dot orbiting a ring — "staking / cycle" motif. */
export function OrbitDot({ size = 44, className }: OrbitDotProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={cn(className)} aria-hidden="true">
      <circle cx="24" cy="24" r="14" className="stroke-border-strong" strokeWidth="1.25" fill="none" />
      <circle cx="24" cy="24" r="3" className="fill-brand-300" />
      <circle r="3" className="fill-brand-500">
        <animateMotion dur="6s" repeatCount="indefinite" path="M24,10 a14,14 0 1,1 -0.01,0" />
      </circle>
    </svg>
  );
}
