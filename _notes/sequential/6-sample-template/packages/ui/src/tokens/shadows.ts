/** Elevation tokens (1–4 + inner). */

export const SHADOW_KEYS = ["1", "2", "3", "4", "inner"] as const;
export type ShadowKey = (typeof SHADOW_KEYS)[number];
export type ShadowTokens = Record<ShadowKey, string>;

export const defaultShadows: ShadowTokens = {
  "1": "0 1px 2px hsl(220 20% 20% / 0.08)",
  "2": "0 2px 8px hsl(220 20% 20% / 0.10)",
  "3": "0 8px 24px hsl(220 20% 20% / 0.14)",
  "4": "0 20px 48px hsl(220 20% 20% / 0.22)",
  inner: "inset 0 1px 2px hsl(220 20% 20% / 0.10)",
};
