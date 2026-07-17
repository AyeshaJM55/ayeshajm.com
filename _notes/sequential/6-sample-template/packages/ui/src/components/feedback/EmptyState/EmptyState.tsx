import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

/** Friendly empty / zero-data state. */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border p-10 text-center", className)}>
      {icon && <div className="text-fg-subtle">{icon}</div>}
      <div className="font-display text-heading text-fg">{title}</div>
      {description && <p className="max-w-sm text-body-sm text-fg-muted">{description}</p>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
