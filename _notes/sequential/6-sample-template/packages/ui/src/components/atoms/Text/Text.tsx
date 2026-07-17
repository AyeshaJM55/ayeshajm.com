import type { HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: "lg" | "md" | "sm";
  tone?: "default" | "muted" | "subtle";
  as?: "p" | "span" | "div";
}

const SIZE = { lg: "text-body-lg", md: "text-body-md", sm: "text-body-sm" } as const;
const TONE = { default: "text-fg", muted: "text-fg-muted", subtle: "text-fg-subtle" } as const;

/** Body copy. */
export function Text({ size = "md", tone = "default", as = "p", className, children, ...rest }: TextProps) {
  const Tag = as;
  return (
    <Tag className={cn("font-body leading-relaxed", SIZE[size], TONE[tone], className)} {...rest}>
      {children}
    </Tag>
  );
}
