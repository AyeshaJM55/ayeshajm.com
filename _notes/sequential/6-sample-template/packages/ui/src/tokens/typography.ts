/** Typography tokens — font families + the semantic size scale. */

export const TYPE_SIZE_KEYS = [
  "display-2",
  "display-1",
  "heading",
  "body-lg",
  "body-md",
  "body-sm",
  "label",
] as const;

export type TypeSizeKey = (typeof TYPE_SIZE_KEYS)[number];

export interface TypographyTokens {
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  size: Record<TypeSizeKey, string>;
}

export const defaultTypography: TypographyTokens = {
  fontDisplay: '"Inter", system-ui, sans-serif',
  fontBody: '"Inter", system-ui, sans-serif',
  fontMono: 'ui-monospace, "JetBrains Mono", monospace',
  size: {
    "display-2": "clamp(2.5rem, 5vw, 4rem)",
    "display-1": "clamp(2rem, 4vw, 2.75rem)",
    heading: "1.5rem",
    "body-lg": "1.125rem",
    "body-md": "1rem",
    "body-sm": "0.875rem",
    label: "0.6875rem",
  },
};
