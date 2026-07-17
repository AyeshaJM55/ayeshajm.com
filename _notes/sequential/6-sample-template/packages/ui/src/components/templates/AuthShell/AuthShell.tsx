import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";

export interface AuthShellProps {
  children: ReactNode;
  aside?: ReactNode;
  brand?: ReactNode;
  className?: string;
}

/** Split auth layout: a centered form column + a brand aside on large screens. */
export function AuthShell({ children, aside, brand, className }: AuthShellProps) {
  return (
    <div className={cn("grid min-h-screen bg-app lg:grid-cols-2", className)}>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {brand && <div className="mb-8 font-display text-heading font-semibold text-fg">{brand}</div>}
          {children}
        </div>
      </div>
      <aside className="hidden items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700 p-12 text-brand-foreground lg:flex">
        {aside}
      </aside>
    </div>
  );
}
