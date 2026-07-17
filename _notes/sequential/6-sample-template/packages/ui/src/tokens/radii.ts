/** Border-radius tokens. */

export const RADIUS_KEYS = ["none", "sm", "md", "lg", "xl", "full"] as const;
export type RadiusKey = (typeof RADIUS_KEYS)[number];
export type RadiusTokens = Record<RadiusKey, string>;

export const defaultRadii: RadiusTokens = {
  none: "0",
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.875rem",
  xl: "1.25rem",
  full: "9999px",
};
