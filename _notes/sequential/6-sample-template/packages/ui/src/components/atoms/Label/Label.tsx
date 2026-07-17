import type { LabelHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

/** Form field label. */
export function Label({ className, required, children, ...rest }: LabelProps) {
  return (
    <label className={cn("block font-body text-body-sm font-medium text-fg", className)} {...rest}>
      {children}
      {required && (
        <span className="ml-0.5 text-danger" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
