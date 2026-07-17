import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  actions?: ReactNode;
}

/** Muted section container with an optional title + actions bar. */
export function Panel({ title, actions, className, children, ...rest }: PanelProps) {
  return (
    <section className={cn("overflow-hidden rounded-lg border border-border bg-surface-muted", className)} {...rest}>
      {(title || actions) && (
        <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
          <div className="font-display text-heading text-fg">{title}</div>
          {actions}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
