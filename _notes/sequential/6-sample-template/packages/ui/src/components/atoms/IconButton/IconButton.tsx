import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn";

export const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors duration-base outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-app disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-brand-500 text-brand-foreground hover:bg-brand-600",
        soft: "bg-surface-muted text-fg hover:bg-brand-50 hover:text-brand-600",
        ghost: "text-fg-muted hover:bg-surface-muted hover:text-fg",
        outline: "border border-border-strong text-fg hover:border-brand-500",
      },
      size: { sm: "size-8", md: "size-10", lg: "size-12" },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Required for accessibility — icon-only controls need a name. */
  label: string;
  icon: ReactNode;
}

/** Square, icon-only button. `label` is announced to assistive tech. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, variant, size, label, icon, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      aria-label={label}
      title={label}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...rest}
    >
      {icon}
    </button>
  );
});
