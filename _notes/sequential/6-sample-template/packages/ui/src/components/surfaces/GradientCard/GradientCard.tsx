import type { HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface GradientCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

/** Surface with a brand-tinted gradient wash and accent border. */
export function GradientCard({ className, glow = false, children, ...rest }: GradientCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-brand-500/30 bg-gradient-to-br from-brand-50/60 to-surface",
        glow ? "shadow-e3" : "shadow-e1",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
