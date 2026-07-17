import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: string;
  /** A word/phrase inside `title` to wrap in a brand glow. */
  highlight?: string;
  subtitle?: ReactNode;
  align?: "start" | "center";
  className?: string;
}

function split(title: string, highlight?: string) {
  if (!highlight) return [{ text: title, glow: false }];
  const idx = title.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return [{ text: title, glow: false }];
  const parts: { text: string; glow: boolean }[] = [];
  const before = title.slice(0, idx);
  const match = title.slice(idx, idx + highlight.length);
  const after = title.slice(idx + highlight.length);
  if (before) parts.push({ text: before, glow: false });
  parts.push({ text: match, glow: true });
  if (after) parts.push({ text: after, glow: false });
  return parts;
}

/**
 * Section header: optional eyebrow with a diamond accent, a display title with
 * an optional glowing highlighted phrase, and an optional subtitle.
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  const parts = split(title, highlight);
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <div className={cn("flex items-center gap-2", centered && "justify-center")}>
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-brand-500" />
          <span className="font-body text-label font-medium uppercase tracking-widest text-fg-muted">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="font-display text-display-1 font-semibold capitalize text-fg">
        {parts.map((p, i) =>
          p.glow ? (
            <span key={i} className="relative inline-block text-brand-500">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/40 blur-3xl"
              />
              {p.text}
            </span>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
      </h2>

      {subtitle && <p className="max-w-2xl text-body-lg text-fg-muted">{subtitle}</p>}
    </div>
  );
}
