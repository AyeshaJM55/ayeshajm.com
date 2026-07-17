import { useInView } from "../../../hooks/useInView";
import { cn } from "../../../utils/cn";

export interface MilestonePoint {
  label: string;
  value: number;
}

export interface MilestonePathProps {
  points: MilestonePoint[];
  unit?: string;
  className?: string;
}

const VB_W = 520;
const VB_H = 210;
const XM = 46;
const YT = 40;
const YB = 150;

/** A rising line that draws itself with a travelling pulse + pulsing nodes. */
export function MilestonePath({ points, unit = "", className }: MilestonePathProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const n = points.length;
  const span = VB_W - XM * 2;
  const min = Math.min(...points.map((p) => p.value));
  const max = Math.max(...points.map((p) => p.value));
  const range = max - min || 1;

  const pts: Array<MilestonePoint & { x: number; y: number }> = [];
  for (let i = 0; i < n; i++) {
    const p = points[i];
    const x = XM + (n === 1 ? 0 : (span * i) / (n - 1));
    const y = YB - ((p.value - min) / range) * (YB - YT);
    pts.push({ ...p, x, y });
  }
  const parts: string[] = [];
  for (let i = 0; i < pts.length; i++) parts.push(`${i === 0 ? "M" : "L"} ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`);
  const d = parts.join(" ");

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <svg width="100%" viewBox={`0 0 ${VB_W} ${VB_H}`} role="img" aria-label="Milestone progression">
        <line x1={XM} y1={YB} x2={VB_W - XM} y2={YB} className="stroke-border" strokeWidth="1" strokeDasharray="2 5" />
        <path d={d} fill="none" className="stroke-brand-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1}>
          {inView && <animate attributeName="stroke-dashoffset" from={1} to={0} dur="1.6s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.5 0 0.2 1" />}
        </path>
        {inView && (
          <circle r="4.5" className="fill-brand-400">
            <animateMotion dur="1.6s" fill="freeze" path={d} />
          </circle>
        )}
        {pts.map((p, i) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="5.5" className="fill-app stroke-brand-500" strokeWidth="2">
              {inView && <animate attributeName="r" values="5.5;8;5.5" dur="2.4s" begin={`${0.2 * i + 0.6}s`} repeatCount="indefinite" />}
            </circle>
            <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-brand-600" fontFamily="var(--font-display)" fontSize={15}>
              {p.value}
              {unit}
            </text>
            <text x={p.x} y={YB + 18} textAnchor="middle" className="fill-fg-muted" fontFamily="var(--font-mono)" fontSize={10}>
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
