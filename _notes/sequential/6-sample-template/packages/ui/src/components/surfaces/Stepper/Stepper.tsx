import { cn } from "../../../utils/cn";

export interface StepperStep {
  label: string;
}

export interface StepperProps {
  steps: StepperStep[];
  current: number;
  className?: string;
}

/** Horizontal progress stepper. `current` is the active 0-based index. */
export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <ol className={cn("flex items-center gap-2", className)}>
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "active" : "todo";
        return (
          <li key={s.label} className="flex flex-1 items-center gap-2 last:flex-none">
            <span
              className={cn(
                "grid size-8 shrink-0 place-items-center rounded-full border text-body-sm font-medium",
                state === "done"
                  ? "border-brand-500 bg-brand-500 text-brand-foreground"
                  : state === "active"
                    ? "border-brand-500 text-brand-600"
                    : "border-border text-fg-subtle",
              )}
            >
              {state === "done" ? "✓" : i + 1}
            </span>
            <span className={cn("text-body-sm", state === "todo" ? "text-fg-subtle" : "text-fg")}>{s.label}</span>
            {i < steps.length - 1 && <span className={cn("ml-2 h-px flex-1", i < current ? "bg-brand-500" : "bg-border")} />}
          </li>
        );
      })}
    </ol>
  );
}
