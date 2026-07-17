import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { MediaFrame } from "../../surfaces/MediaFrame/MediaFrame";

export interface SpotlightProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
  mediaSrc?: string;
  mediaSide?: "left" | "right";
  className?: string;
}

/** Two-column feature spotlight (copy + media), media side configurable. */
export function Spotlight({ eyebrow, title, body, actions, mediaSrc, mediaSide = "right", className }: SpotlightProps) {
  const left = mediaSide === "left";
  return (
    <div className={cn("grid items-center gap-10 lg:grid-cols-2", className)}>
      <div className={cn("flex flex-col gap-4", left ? "lg:order-2" : "lg:order-1")}>
        {eyebrow && <div className="font-mono text-label uppercase text-brand-600">{eyebrow}</div>}
        <h2 className="font-display text-display-1 font-semibold text-fg">{title}</h2>
        {body && <div className="text-body-md leading-relaxed text-fg-muted">{body}</div>}
        {actions && <div className="mt-2 flex flex-wrap gap-3">{actions}</div>}
      </div>
      <div className={cn(left ? "lg:order-1" : "lg:order-2")}>
        <MediaFrame src={mediaSrc} ratio="video" />
      </div>
    </div>
  );
}
