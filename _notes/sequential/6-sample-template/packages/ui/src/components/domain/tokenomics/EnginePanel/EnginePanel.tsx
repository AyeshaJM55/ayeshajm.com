import { cn } from "../../../../utils/cn";
import { Eyebrow } from "../../../atoms/Eyebrow/Eyebrow";
import { Heading } from "../../../atoms/Heading/Heading";
import { FlowDiagram, type FlowTarget } from "../../../charts/FlowDiagram/FlowDiagram";

export interface EngineFact {
  label: string;
  value: string;
}

export interface EnginePanelProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  sourceLabel: string;
  sourceSub?: string;
  targets: FlowTarget[];
  facts?: EngineFact[];
  className?: string;
}

/** Distribution-engine section: an animated particle flow + an engine spec. */
export function EnginePanel({ eyebrow, title, description, sourceLabel, sourceSub, targets, facts, className }: EnginePanelProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {(eyebrow || title || description) && (
        <header className="flex max-w-2xl flex-col gap-3">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && <Heading level={2} size="display-1">{title}</Heading>}
          {description && <p className="text-body-md leading-relaxed text-fg-muted">{description}</p>}
        </header>
      )}
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        <div className="rounded-xl border border-border bg-surface p-6 md:p-8">
          <FlowDiagram sourceLabel={sourceLabel} sourceSub={sourceSub} targets={targets} />
        </div>
        {facts && facts.length > 0 && (
          <div className="rounded-xl border border-border bg-surface p-6 md:p-8">
            <div className="mb-4 font-mono text-label uppercase text-fg-muted">Spec</div>
            <dl className="flex flex-col gap-3">
              {facts.map((f) => (
                <div key={f.label} className="flex items-center justify-between border-b border-border pb-2 text-body-sm last:border-0">
                  <dt className="text-fg-muted">{f.label}</dt>
                  <dd className="font-mono font-medium text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
