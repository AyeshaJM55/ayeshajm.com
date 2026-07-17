import { cn } from "../../../utils/cn";

export interface ProgressBarProps {
  /** 0–100. Ignored when indeterminate. */
  value?: number;
  indeterminate?: boolean;
  label?: string;
  className?: string;
}

/** Linear progress indicator (determinate or indeterminate). */
export function ProgressBar({ value = 0, indeterminate = false, label, className }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : pct}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-muted", className)}
    >
      {indeterminate ? (
        <div className="h-full w-2/5 animate-pulse rounded-full bg-brand-500" />
      ) : (
        <div className="h-full rounded-full bg-brand-500 transition-[width] duration-slow" style={{ width: `${pct}%` }} />
      )}
    </div>
  );
}
