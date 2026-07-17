import { cn } from "../../../utils/cn";

export interface ProgressItem {
  label: string;
  /** Optional status text shown on the right (e.g. "In progress"). */
  status?: string;
  /** Completion 0–100. */
  value: number;
}

export interface ProgressListProps {
  items: ProgressItem[];
  className?: string;
}

/** Labelled progress rows with a token-gradient bar and accessible semantics. */
export function ProgressList({ items, className }: ProgressListProps) {
  return (
    <div role="list" className={cn("flex flex-col gap-4", className)}>
      {items.map((item) => {
        const pct = Math.max(0, Math.min(100, item.value));
        return (
          <div key={item.label} role="listitem" className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-body-md text-fg">{item.label}</span>
              {item.status && <span className="text-body-sm text-fg-muted">{item.status}</span>}
            </div>
            <div className="flex items-center gap-3">
              <div
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={item.label}
                className="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-muted"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-slow"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-12 text-right font-mono text-body-sm text-fg-muted">{pct}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
