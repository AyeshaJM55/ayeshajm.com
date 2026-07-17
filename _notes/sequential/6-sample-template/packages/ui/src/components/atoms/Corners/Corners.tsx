import { cn } from "../../../utils/cn";

export type CornerTone = "brand" | "fg" | "muted" | "neutral";
export type CornerSize = "sm" | "md" | "lg";

export interface CornersProps {
  /** Which corners to draw: [topLeft, topRight, bottomLeft, bottomRight]. */
  show?: [boolean, boolean, boolean, boolean];
  size?: CornerSize;
  tone?: CornerTone;
  /** `edge` aligns to the parent edges; `out` nudges the brackets just outside. */
  inset?: "edge" | "out";
  className?: string;
}

const SIZE: Record<CornerSize, string> = { sm: "size-3", md: "size-4", lg: "size-6" };

const TONE: Record<CornerTone, string> = {
  brand: "border-brand-500",
  fg: "border-fg",
  muted: "border-fg-muted",
  neutral: "border-border-strong",
};

const INSET = { edge: "", out: "-m-px" } as const;

/**
 * Decorative L-shaped corner brackets drawn inside a `relative` parent.
 * Purely ornamental (aria-hidden); colour comes from token border classes.
 */
export function Corners({
  show = [true, true, true, true],
  size = "md",
  tone = "brand",
  inset = "edge",
  className,
}: CornersProps) {
  const [tl, tr, bl, br] = show;
  const box = cn(SIZE[size], TONE[tone], INSET[inset]);
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-visible", className)}
    >
      {tl && <span className={cn("absolute left-0 top-0 border-l-2 border-t-2", box)} />}
      {tr && <span className={cn("absolute right-0 top-0 border-r-2 border-t-2", box)} />}
      {bl && <span className={cn("absolute bottom-0 left-0 border-b-2 border-l-2", box)} />}
      {br && <span className={cn("absolute bottom-0 right-0 border-b-2 border-r-2", box)} />}
    </div>
  );
}
