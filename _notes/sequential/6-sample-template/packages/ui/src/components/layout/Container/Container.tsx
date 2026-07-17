import type { HTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "md" | "lg" | "xl";
}

const SIZE = { md: "max-w-3xl", lg: "max-w-5xl", xl: "max-w-7xl" } as const;

/** Centered max-width content wrapper with responsive gutters. */
export function Container({ size = "xl", className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 md:px-8", SIZE[size], className)} {...rest}>
      {children}
    </div>
  );
}
