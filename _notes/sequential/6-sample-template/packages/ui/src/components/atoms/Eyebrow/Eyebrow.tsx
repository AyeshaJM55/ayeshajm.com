import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface EyebrowProps {
  children: ReactNode;
  align?: "start" | "center";
  className?: string;
}

/** Small uppercase section label with a leading accent rule. */
export function Eyebrow({ children, align = "start", className }: EyebrowProps) {
  return (
    <div className={cn("flex items-center gap-2", align === "center" && "justify-center", className)}>
      <span className="h-px w-6 bg-brand-500" />
      <span className="font-body text-label font-medium uppercase text-fg-muted">{children}</span>
    </div>
  );
}
