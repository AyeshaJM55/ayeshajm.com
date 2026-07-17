import { useInView } from "../../../hooks/useInView";
import { cn } from "../../../utils/cn";

const SIZE = 200;
const R = 82;
const C = 2 * Math.PI * R;

export interface RadialGaugeProps {
  /** 0–100 fill percentage. */
  value: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

/** Circular progress gauge whose arc draws on scroll-in (SMIL). */
export function RadialGauge({ value, label, sublabel, className }: RadialGaugeProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const pct = Math.max(0, Math.min(100, value));
  const gap = C - (pct / 100) * C;
  const c = SIZE / 2;
  return (
    <div ref={ref} className={cn("relative mx-auto", className)} style={{ width: SIZE, height: SIZE }}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={label ? `${label}: ${pct}%` : `${pct}%`}>
        <circle cx={c} cy={c} r={R} className="stroke-surface-muted" strokeWidth="9" fill="none" />
        <circle
          cx={c}
          cy={c}
          r={R}
          className="stroke-brand-500"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={C}
          strokeDashoffset={C}
          transform={`rotate(-90 ${c} ${c})`}
        >
          {inView && (
            <animate attributeName="stroke-dashoffset" from={C} to={gap} dur="1.4s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.16 1 0.3 1" />
          )}
        </circle>
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="font-display text-display-1 text-fg">{label ?? `${pct}%`}</div>
        {sublabel && <div className="font-mono text-label uppercase text-fg-muted">{sublabel}</div>}
      </div>
    </div>
  );
}
