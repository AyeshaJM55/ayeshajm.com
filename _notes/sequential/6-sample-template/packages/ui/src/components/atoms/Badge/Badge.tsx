import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn";

export const badgeVariants = cva("inline-flex items-center gap-1 rounded-full font-medium", {
  variants: {
    tone: { brand: "", neutral: "", success: "", warning: "", danger: "", info: "" },
    variant: { solid: "", soft: "", outline: "border" },
    size: { sm: "text-label px-2 py-0.5", md: "text-body-sm px-2.5 py-1" },
  },
  compoundVariants: [
    { variant: "solid", tone: "brand", class: "bg-brand-500 text-brand-foreground" },
    { variant: "solid", tone: "neutral", class: "bg-neutral-700 text-neutral-0" },
    { variant: "solid", tone: "success", class: "bg-success text-fg-on-brand" },
    { variant: "solid", tone: "warning", class: "bg-warning text-fg-on-brand" },
    { variant: "solid", tone: "danger", class: "bg-danger text-fg-on-brand" },
    { variant: "solid", tone: "info", class: "bg-info text-fg-on-brand" },
    { variant: "soft", tone: "brand", class: "bg-brand-50 text-brand-700" },
    { variant: "soft", tone: "neutral", class: "bg-surface-muted text-fg-muted" },
    { variant: "soft", tone: "success", class: "bg-success-bg text-success-fg" },
    { variant: "soft", tone: "warning", class: "bg-warning-bg text-warning-fg" },
    { variant: "soft", tone: "danger", class: "bg-danger-bg text-danger-fg" },
    { variant: "soft", tone: "info", class: "bg-info-bg text-info-fg" },
    { variant: "outline", tone: "brand", class: "border-brand-500 text-brand-600" },
    { variant: "outline", tone: "neutral", class: "border-border-strong text-fg-muted" },
    { variant: "outline", tone: "success", class: "border-success-border text-success-fg" },
    { variant: "outline", tone: "warning", class: "border-warning-border text-warning-fg" },
    { variant: "outline", tone: "danger", class: "border-danger-border text-danger-fg" },
    { variant: "outline", tone: "info", class: "border-info-border text-info-fg" },
  ],
  defaultVariants: { tone: "brand", variant: "soft", size: "md" },
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children?: ReactNode;
}

/** Compact status/label chip. tone × variant × size. */
export function Badge({ className, tone, variant, size, children, ...rest }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone, variant, size }), className)} {...rest}>
      {children}
    </span>
  );
}
