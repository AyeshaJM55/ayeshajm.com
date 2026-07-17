/** Responsive breakpoints. */

export const BREAKPOINT_KEYS = ["sm", "md", "lg", "xl", "2xl"] as const;
export type BreakpointKey = (typeof BREAKPOINT_KEYS)[number];
export type Breakpoints = Record<BreakpointKey, string>;

export const defaultBreakpoints: Breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
