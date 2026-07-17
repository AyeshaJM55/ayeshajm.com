import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  size?: "display-2" | "display-1" | "heading";
  align?: "start" | "center";
  className?: string;
}

const SIZE = {
  "display-2": "text-display-2",
  "display-1": "text-display-1",
  heading: "text-heading",
} as const;

/** Display/section heading. `level` controls the tag, `size` controls scale. */
export function Heading({ children, level = 2, size = "display-1", align = "start", className }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag className={cn("font-display font-semibold text-fg", SIZE[size], align === "center" && "text-center", className)}>
      {children}
    </Tag>
  );
}
