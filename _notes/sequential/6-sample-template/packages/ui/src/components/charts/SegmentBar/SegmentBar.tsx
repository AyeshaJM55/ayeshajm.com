import { useInView } from "../../../hooks/useInView";
import { cn } from "../../../utils/cn";

export type SegmentTone = "brand" | "accent" | "neutral" | "muted";

export interface BarSegment {
  label: string;
  value: number;
  tone?: SegmentTone;
}

export interface SegmentBarProps {
  segments: BarSegment[];
  /** Defaults to the sum of segment values. */
  total?: number;
  showLegend?: boolean;
  className?: string;
}

const FILL: Record<SegmentTone, string> = {
  brand: "fill-brand-500",
  accent: "fill-accent-500",
  neutral: "fill-neutral-400",
  muted: "fill-brand-200",
};
const DOT: Record<SegmentTone, string> = {
  brand: "bg-brand-500",
  accent: "bg-accent-500",
  neutral: "bg-neutral-400",
  muted: "bg-brand-200",
};

const TRACK = 300;
const H = 26;

/** Animated, segmented proportion bar (SMIL width grow) with a legend. */
export function SegmentBar({ segments, total, showLegend = true, className }: SegmentBarProps) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const sum = (total ?? segments.reduce((s, x) => s + x.value, 0)) || 1;

  const segs: Array<BarSegment & { tone: SegmentTone; x: number; w: number }> = [];
  let cursor = 0;
  for (const s of segments) {
    const w = (s.value / sum) * TRACK;
    segs.push({ ...s, tone: s.tone ?? "brand", x: cursor, w });
    cursor += w + 2;
  }

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <svg width="100%" viewBox={`0 0 ${TRACK} ${H}`} height={H} className="max-w-full" role="img" aria-label="Proportional distribution">
        <rect x="0" y="0" width={TRACK} height={H} rx="4" className="fill-surface-muted" />
        {inView &&
          segs.map((s, i) => (
            <rect key={s.label} x={s.x} y="0" width="0" height={H} rx="3" className={FILL[s.tone]}>
              <animate attributeName="width" from="0" to={s.w} dur="0.7s" begin={`${0.12 * i}s`} fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.16 1 0.3 1" />
            </rect>
          ))}
      </svg>
      {showLegend && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {segs.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-body-sm">
              <span className={cn("size-2 shrink-0 rounded-sm", DOT[s.tone])} />
              <span className="text-fg-muted">{s.label}</span>
              <span className="ml-auto font-medium text-fg">{s.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
