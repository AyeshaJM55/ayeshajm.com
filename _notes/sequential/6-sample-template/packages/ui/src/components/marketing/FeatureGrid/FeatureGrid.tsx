import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface Feature {
  icon?: ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const COLS = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;

/** Responsive grid of icon/title/description feature cards. */
export function FeatureGrid({ features, columns = 3, className }: FeatureGridProps) {
  return (
    <div className={cn("grid gap-5", COLS[columns], className)}>
      {features.map((f) => (
        <div key={f.title} className="group rounded-lg border border-border bg-surface p-6 transition-transform duration-base hover:-translate-y-1">
          {f.icon && <div className="mb-4 text-brand-500">{f.icon}</div>}
          <h3 className="font-display text-heading text-fg">{f.title}</h3>
          <p className="mt-2 text-body-sm leading-relaxed text-fg-muted">{f.description}</p>
        </div>
      ))}
    </div>
  );
}
