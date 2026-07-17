import { cn } from "../../../utils/cn";

export interface Step {
  title: string;
  description: string;
}

export interface StepsProps {
  steps: Step[];
  className?: string;
}

/** Numbered "how it works" steps. */
export function Steps({ steps, className }: StepsProps) {
  return (
    <ol className={cn("grid gap-6 md:grid-cols-3", className)}>
      {steps.map((s, i) => (
        <li key={s.title} className="rounded-lg border border-border bg-surface p-6">
          <span className="font-display text-display-1 text-brand-500/40">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 font-display text-heading text-fg">{s.title}</h3>
          <p className="mt-2 text-body-sm leading-relaxed text-fg-muted">{s.description}</p>
        </li>
      ))}
    </ol>
  );
}
