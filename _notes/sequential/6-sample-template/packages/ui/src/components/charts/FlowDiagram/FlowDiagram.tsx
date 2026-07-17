import { useInView } from "../../../hooks/useInView";
import { cn } from "../../../utils/cn";

export type FlowTone = "brand" | "accent" | "neutral" | "muted";

export interface FlowTarget {
  label: string;
  value: string | number;
  note?: string;
  tone?: FlowTone;
}

export interface FlowDiagramProps {
  sourceLabel: string;
  sourceSub?: string;
  targets: FlowTarget[];
  className?: string;
}

const VB_W = 560;
const VB_H = 300;
const CORE_X = 96;
const CORE_Y = 150;
const BUCKET_X = 396;
const BUCKET_W = 150;
const BUCKET_H = 50;

const FILL: Record<FlowTone, string> = {
  brand: "fill-brand-500",
  accent: "fill-accent-500",
  neutral: "fill-neutral-400",
  muted: "fill-brand-200",
};

/** A source node that streams animated particles into outflow buckets (SMIL). */
export function FlowDiagram({ sourceLabel, sourceSub, targets, className }: FlowDiagramProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const n = targets.length;
  const gap = (VB_H - BUCKET_H * n) / (n + 1);

  const flows: Array<FlowTarget & { tone: FlowTone; top: number; cy: number; path: string }> = [];
  for (let i = 0; i < n; i++) {
    const t = targets[i];
    const top = gap + i * (BUCKET_H + gap);
    const cy = top + BUCKET_H / 2;
    const path = `M 142 ${CORE_Y} C 268 ${CORE_Y}, 286 ${cy}, ${BUCKET_X} ${cy}`;
    flows.push({ ...t, tone: t.tone ?? "brand", top, cy, path });
  }

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <svg width="100%" viewBox={`0 0 ${VB_W} ${VB_H}`} role="img" aria-label={`${sourceLabel} distributed to ${n} targets`}>
        {flows.map((f) => (
          <path key={`p-${f.label}`} d={f.path} fill="none" className="stroke-border" strokeWidth="1.5" />
        ))}
        {inView &&
          flows.map((f) =>
            [0, 1, 2].map((k) => (
              <circle key={`d-${f.label}-${k}`} r="3.5" className={FILL[f.tone]} opacity="0">
                <animateMotion dur="2.4s" begin={`${k * 0.8}s`} repeatCount="indefinite" path={f.path} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.4s" begin={`${k * 0.8}s`} repeatCount="indefinite" />
              </circle>
            )),
          )}
        {flows.map((f) => (
          <g key={`b-${f.label}`}>
            <rect x={BUCKET_X} y={f.top} width={BUCKET_W} height={BUCKET_H} rx="8" className="fill-surface stroke-border" strokeWidth="1" />
            <rect x={BUCKET_X} y={f.top} width="3" height={BUCKET_H} rx="1.5" className={FILL[f.tone]} />
            <text x={BUCKET_X + 16} y={f.top + 21} className="fill-fg" fontFamily="var(--font-body)" fontSize={12.5} fontWeight={500}>
              {f.label}
            </text>
            {f.note && (
              <text x={BUCKET_X + 16} y={f.top + 37} className="fill-fg-muted" fontFamily="var(--font-mono)" fontSize={9}>
                {f.note}
              </text>
            )}
            <text x={BUCKET_X + BUCKET_W - 14} y={f.top + 31} textAnchor="end" className="fill-brand-600" fontFamily="var(--font-display)" fontSize={20}>
              {f.value}
            </text>
          </g>
        ))}
        <circle cx={CORE_X} cy={CORE_Y} r="50" fill="none" className="stroke-brand-500" strokeWidth="1" opacity="0.35">
          <animate attributeName="r" values="50;58;50" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0;0.35" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx={CORE_X} cy={CORE_Y} r="44" className="fill-surface stroke-brand-500" strokeWidth="1.5" />
        <text x={CORE_X} y={CORE_Y - 2} textAnchor="middle" className="fill-brand-600" fontFamily="var(--font-display)" fontSize={26}>
          {sourceLabel}
        </text>
        {sourceSub && (
          <text x={CORE_X} y={CORE_Y + 16} textAnchor="middle" className="fill-fg-muted" fontFamily="var(--font-mono)" fontSize={8}>
            {sourceSub}
          </text>
        )}
      </svg>
    </div>
  );
}
