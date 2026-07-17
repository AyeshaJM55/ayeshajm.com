import { useId } from "react";
import { cn } from "../../../utils/cn";

export interface PlaceholderProps {
  label?: string;
  className?: string;
}

/** Animated SMIL placeholder for not-yet-supplied media (drifting hatch +
 *  breathing brand wash). Theme-aware purely through token classes. */
export function Placeholder({ label, className }: PlaceholderProps) {
  const pid = useId().replace(/:/g, "");
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("relative flex size-full min-h-24 items-center justify-center overflow-hidden border border-border bg-surface", className)}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <defs>
          <pattern id={pid} width="8" height="8" patternUnits="userSpaceOnUse">
            <line x1="-2" y1="10" x2="10" y2="-2" className="stroke-border" strokeWidth="0.6" />
            <line x1="-2" y1="2" x2="2" y2="-2" className="stroke-border" strokeWidth="0.6" />
            <animateTransform attributeName="patternTransform" type="translate" from="0 0" to="8 8" dur="3s" repeatCount="indefinite" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#${pid})`} />
        <rect width="100" height="100" className="fill-brand-500" opacity="0">
          <animate attributeName="opacity" values="0;0.06;0" dur="4s" repeatCount="indefinite" />
        </rect>
      </svg>
      {label && <span className="relative font-mono text-label uppercase text-fg-subtle">{label}</span>}
    </div>
  );
}
