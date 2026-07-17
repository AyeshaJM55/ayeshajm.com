import { useInView } from "../../../hooks/useInView";
import { cn } from "../../../utils/cn";

export interface MiniBar {
  label: string;
  value: number;
}

export interface MiniBarsProps {
  data: MiniBar[];
  /** Defaults to the largest value. */
  max?: number;
  accent?: "brand" | "accent";
  unit?: string;
  className?: string;
}

const VB_W = 240;
const VB_H = 150;
const BASE = 120;
const MAX_BAR = 96;
const BAR_W = 26;

/** Animated column chart — bars grow from the baseline on scroll-in (SMIL). */
export function MiniBars({ data, max, accent = "brand", unit = "", className }: MiniBarsProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const peak = max ?? Math.max(...data.map((d) => d.value), 1);
  const slot = VB_W / data.length;
  const fill = accent === "accent" ? "fill-accent-500" : "fill-brand-500";

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <svg width="100%" viewBox={`0 0 ${VB_W} ${VB_H}`} role="img" aria-label="Comparison bars">
        <line x1="0" y1={BASE} x2={VB_W} y2={BASE} className="stroke-border" strokeWidth="1" />
        {data.map((d, i) => {
          const h = (d.value / peak) * MAX_BAR;
          const cx = slot * i + slot / 2;
          const begin = `${0.1 * i}s`;
          return (
            <g key={d.label}>
              <rect x={cx - BAR_W / 2} y={BASE} width={BAR_W} height="0" rx="3" className={fill}>
                {inView && <animate attributeName="height" from="0" to={h} dur="0.8s" begin={begin} fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.16 1 0.3 1" />}
                {inView && <animate attributeName="y" from={BASE} to={BASE - h} dur="0.8s" begin={begin} fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.16 1 0.3 1" />}
              </rect>
              <text x={cx} y={BASE + 16} textAnchor="middle" className="fill-fg-muted" fontFamily="var(--font-mono)" fontSize={10}>
                {d.label}
              </text>
              <text x={cx} y={BASE - h - 7} textAnchor="middle" className="fill-brand-600" fontFamily="var(--font-display)" fontSize={14} opacity="0">
                {d.value}
                {unit}
                {inView && <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin={`${0.1 * i + 0.5}s`} fill="freeze" />}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
