import { cn } from "../../../utils/cn";

export interface Stat {
  value: string;
  label: string;
}

export interface StatStripProps {
  stats: Stat[];
  className?: string;
}

/** Row of headline statistics, divided on larger screens. */
export function StatStrip({ stats, className }: StatStripProps) {
  return (
    <dl className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4", className)}>
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-1 bg-surface px-4 py-8 text-center">
          <dt className="order-2 font-mono text-label uppercase text-fg-muted">{s.label}</dt>
          <dd className="order-1 font-display text-display-1 text-brand-600">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
