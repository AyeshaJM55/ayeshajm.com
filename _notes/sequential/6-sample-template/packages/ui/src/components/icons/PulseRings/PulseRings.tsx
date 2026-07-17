import { cn } from "../../../utils/cn";

export interface PulseRingsProps {
  size?: number;
  className?: string;
}

/** Concentric rings rippling outward — "continuous / automatic" motif. */
export function PulseRings({ size = 44, className }: PulseRingsProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={cn(className)} aria-hidden="true">
      <circle cx="24" cy="24" r="3" className="fill-brand-500" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="24" cy="24" r="6" className="stroke-brand-500" strokeWidth="1.5" fill="none" opacity="0">
          <animate attributeName="r" values="6;20" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0" dur="3s" begin={`${i}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}
