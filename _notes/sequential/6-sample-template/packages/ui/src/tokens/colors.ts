/** Color token contracts and types. Pure data — no React. Values are HSL
 *  channel strings ("222 84% 56%") matching styles/globals.css. */

export const RAMP_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export const NEUTRAL_STEPS = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000] as const;

export type Ramp = Record<(typeof RAMP_STEPS)[number], string> & { foreground: string };
export type NeutralRamp = Record<(typeof NEUTRAL_STEPS)[number], string>;

export interface SemanticColor {
  DEFAULT: string;
  fg: string;
  bg: string;
  border: string;
}
export type Semantic = Record<"success" | "warning" | "danger" | "info", SemanticColor>;

export interface SurfaceColors {
  app: string;
  surface: string;
  "surface-muted": string;
  overlay: string;
  "border-default": string;
  "border-subtle": string;
  "border-strong": string;
}

export interface TextColors {
  default: string;
  muted: string;
  subtle: string;
  disabled: string;
  "on-brand": string;
}

export interface ColorTokens {
  brand: Ramp;
  accent: Ramp;
  neutral: NeutralRamp;
  semantic: Semantic;
  surface: SurfaceColors;
  text: TextColors;
}

/** Build a 50–900 ramp plus a foreground from ordered channel strings. */
export function ramp(steps: string[], foreground: string): Ramp {
  const out = {} as Ramp;
  RAMP_STEPS.forEach((step, i) => {
    out[step] = steps[i];
  });
  out.foreground = foreground;
  return out;
}

export const COLOR_REQUIRED = {
  ramps: ["brand", "accent"] as const,
  surface: ["app", "surface", "surface-muted", "overlay", "border-default", "border-subtle", "border-strong"] as const,
  text: ["default", "muted", "subtle", "disabled", "on-brand"] as const,
  semantic: ["success", "warning", "danger", "info"] as const,
};
