import { cn } from "../../../../utils/cn";
import { Eyebrow } from "../../../atoms/Eyebrow/Eyebrow";
import { Heading } from "../../../atoms/Heading/Heading";
import { MilestonePath, type MilestonePoint } from "../../../charts/MilestonePath/MilestonePath";

export interface MilestonePanelProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  points: MilestonePoint[];
  unit?: string;
  footnote?: string;
  className?: string;
}

/** Milestone-reward section built on the animated MilestonePath chart. */
export function MilestonePanel({ eyebrow, title, description, points, unit, footnote, className }: MilestonePanelProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-surface p-6 md:p-8", className)}>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-2">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && <Heading level={3} size="heading">{title}</Heading>}
        </div>
        {description && <p className="max-w-sm text-body-sm leading-relaxed text-fg-muted">{description}</p>}
      </div>
      <MilestonePath points={points} unit={unit} />
      {footnote && <p className="mt-6 border-t border-border pt-4 text-body-sm text-fg-muted">{footnote}</p>}
    </div>
  );
}
