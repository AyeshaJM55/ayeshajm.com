import { cn } from "../../../utils/cn";

export interface RiseBarsProps {
  size?: number;
  className?: string;
}

/** Bars rising and falling in sequence — "growth / yield" motif. */
export function RiseBars({ size = 44, className }: RiseBarsProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={cn(className)} aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={8 + i * 9} width="6" rx="1.5" y="34" height="6" className="fill-brand-500">
          <animate attributeName="height" values="6;26;6" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          <animate attributeName="y" values="34;14;34" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </rect>
      ))}
    </svg>
  );
}
