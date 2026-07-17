import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface MetricCardProps {
  label: string;
  value: ReactNode;
  delta?: { value: string; direction: "up" | "down" };
  icon?: ReactNode;
  className?: string;
}

/** Single KPI cell — label, big value, optional trend + icon. */
export function MetricCard({ label, value, delta, icon, className }: MetricCardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-surface p-5", className)}>
      <div className="flex items-center justify-between">
        <span className="text-body-sm text-fg-muted">{label}</span>
        {icon && <span className="text-brand-500">{icon}</span>}
      </div>
      <div className="mt-2 font-display text-display-1 text-fg">{value}</div>
      {delta && (
        <div className={cn("mt-1 inline-flex items-center gap-1 text-body-sm", delta.direction === "up" ? "text-success-fg" : "text-danger-fg")}>
          <span aria-hidden="true">{delta.direction === "up" ? "▲" : "▼"}</span>
          {delta.value}
        </div>
      )}
    </div>
  );
}
