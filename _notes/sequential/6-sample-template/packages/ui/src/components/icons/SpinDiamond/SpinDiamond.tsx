import { cn } from "../../../utils/cn";

export interface SpinDiamondProps {
  size?: number;
  className?: string;
}

/** Slowly rotating diamond with a pulsing core — "hold / commitment" motif. */
export function SpinDiamond({ size = 44, className }: SpinDiamondProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={cn(className)} aria-hidden="true">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="16s" repeatCount="indefinite" />
        <rect x="13" y="13" width="22" height="22" rx="3" className="stroke-brand-500" strokeWidth="1.6" fill="none" transform="rotate(45 24 24)">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.5s" repeatCount="indefinite" />
        </rect>
      </g>
      <circle cx="24" cy="24" r="2.5" className="fill-brand-400">
        <animate attributeName="r" values="2;3.6;2" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
