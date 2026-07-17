import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "../../../utils/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

/** Checkbox with an inline label. Tinted with the brand accent color. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, id, className, disabled, ...rest },
  ref,
) {
  const autoId = useId();
  const fid = id ?? autoId;
  return (
    <label htmlFor={fid} className={cn("inline-flex cursor-pointer items-center gap-2 text-body-md text-fg", disabled && "cursor-not-allowed opacity-50", className)}>
      <input
        ref={ref}
        id={fid}
        type="checkbox"
        disabled={disabled}
        className="size-4 rounded-sm border-border-strong accent-brand-500 focus-visible:ring-2 focus-visible:ring-brand-500"
        {...rest}
      />
      {label}
    </label>
  );
});
