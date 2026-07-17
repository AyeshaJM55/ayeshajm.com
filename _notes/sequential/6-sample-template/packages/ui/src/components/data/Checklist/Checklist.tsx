import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface ChecklistProps {
  items: ReactNode[];
  columns?: 1 | 2;
  className?: string;
}

/** Benefit / feature list with a small brand indicator per row. */
export function Checklist({ items, columns = 1, className }: ChecklistProps) {
  return (
    <ul role="list" className={cn("grid gap-3", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-sm border border-brand-500"
          >
            <span className="size-1.5 rounded-full bg-brand-500" />
          </span>
          <span className="text-body-md text-fg">{item}</span>
        </li>
      ))}
    </ul>
  );
}
