import { cn } from "../../../../utils/cn";
import { Eyebrow } from "../../../atoms/Eyebrow/Eyebrow";
import { Heading } from "../../../atoms/Heading/Heading";
import { RadialGauge } from "../../../charts/RadialGauge/RadialGauge";
import { SegmentBar, type BarSegment } from "../../../charts/SegmentBar/SegmentBar";

export interface SupplyFact {
  label: string;
  value: string;
}

export interface SupplyPanelProps {
  eyebrow?: string;
  title?: string;
  gauge: { value: number; label: string; sublabel?: string };
  note?: string;
  taxTitle?: string;
  segments: BarSegment[];
  facts?: SupplyFact[];
  className?: string;
}

/** Token supply + distribution section: an animated gauge beside a split bar. */
export function SupplyPanel({ eyebrow, title, gauge, note, taxTitle, segments, facts, className }: SupplyPanelProps) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {(eyebrow || title) && (
        <header className="flex flex-col items-center gap-3 text-center">
          {eyebrow && <Eyebrow align="center">{eyebrow}</Eyebrow>}
          {title && <Heading level={2} size="display-1" align="center">{title}</Heading>}
        </header>
      )}
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-surface p-6 md:p-8">
          <RadialGauge value={gauge.value} label={gauge.label} sublabel={gauge.sublabel} />
          {note && <p className="text-center text-body-sm text-fg-muted">{note}</p>}
        </div>
        <div className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 md:p-8">
          {taxTitle && <h3 className="font-display text-heading text-fg">{taxTitle}</h3>}
          <SegmentBar segments={segments} />
          {facts && facts.length > 0 && (
            <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2">
              {facts.map((f) => (
                <div key={f.label} className="flex items-center justify-between border-b border-border py-1.5 text-body-sm">
                  <dt className="text-fg-muted">{f.label}</dt>
                  <dd className="font-medium text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
