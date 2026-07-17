import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface SiteShellProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Marketing page shell: header + main + footer. Slots only — no content. */
export function SiteShell({ header, footer, children, className }: SiteShellProps) {
  return (
    <div className={cn("flex min-h-screen flex-col bg-app", className)}>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
    </div>
  );
}
