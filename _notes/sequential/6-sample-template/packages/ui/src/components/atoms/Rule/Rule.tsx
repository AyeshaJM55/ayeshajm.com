import { cn } from "../../../utils/cn";

export interface RuleProps {
  width?: "sm" | "md" | "full";
  className?: string;
}

const W = { sm: "w-6", md: "w-10", full: "w-full" } as const;

/** Short accent rule used under eyebrows/headings. */
export function Rule({ width = "md", className }: RuleProps) {
  return <span role="separator" className={cn("block h-0.5 rounded-full bg-brand-500", W[width], className)} />;
}
