import type { AnchorHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  muted?: boolean;
}

/** Styled inline anchor. */
export function Link({ className, muted, children, ...rest }: LinkProps) {
  return (
    <a
      className={cn(
        "rounded-sm underline-offset-4 outline-none transition-colors duration-fast hover:underline focus-visible:ring-2 focus-visible:ring-brand-500",
        muted ? "text-fg-muted hover:text-fg" : "text-brand-600 hover:text-brand-700",
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
