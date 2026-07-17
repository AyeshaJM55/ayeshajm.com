/**
 * defineTheme — assemble a theme from token values (optionally extending a base
 * theme so a brand overrides values only), validate that every required token
 * key is present, and expose the values as a CSS-variable map.
 *
 * The catalog/runtime styling lives in styles/globals.css; these objects are the
 * typed contract + the validation gate (validateTheme) the skill requires.
 */

import {
  ColorTokens,
  COLOR_REQUIRED,
  NEUTRAL_STEPS,
  Ramp,
  RAMP_STEPS,
  SurfaceColors,
  TextColors,
} from "./colors";
import { TypographyTokens, TYPE_SIZE_KEYS, defaultTypography } from "./typography";
import { SpacingScale, defaultSpacing } from "./spacing";
import { RadiusTokens, RADIUS_KEYS, defaultRadii } from "./radii";
import { ShadowTokens, SHADOW_KEYS, defaultShadows } from "./shadows";
import { MotionTokens, defaultMotion } from "./motion";
import { ZTokens, Z_KEYS, defaultZ } from "./zIndex";
import { Breakpoints, BREAKPOINT_KEYS, defaultBreakpoints } from "./breakpoints";

export type ColorScheme = "light" | "dark";

export interface Theme {
  name: string;
  label: string;
  scheme: ColorScheme;
  brand: string;
  extends: string | null;
  color: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingScale;
  radius: RadiusTokens;
  shadow: ShadowTokens;
  motion: MotionTokens;
  z: ZTokens;
  breakpoints: Breakpoints;
}

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

export interface ThemeInput {
  name: string;
  label: string;
  scheme: ColorScheme;
  brand?: string;
  extends?: Theme | null;
  color: DeepPartial<ColorTokens>;
  typography?: DeepPartial<TypographyTokens>;
  spacing?: SpacingScale;
  radius?: RadiusTokens;
  shadow?: Partial<ShadowTokens>;
  motion?: MotionTokens;
  z?: ZTokens;
  breakpoints?: Breakpoints;
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepMerge<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (override === undefined) return base;
  if (!isObject(base) || !isObject(override)) return (override as unknown as T) ?? base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const key of Object.keys(override)) {
    const o = (override as Record<string, unknown>)[key];
    const b = (base as Record<string, unknown>)[key];
    out[key] = isObject(b) && isObject(o) ? deepMerge(b, o as DeepPartial<typeof b>) : o;
  }
  return out as T;
}

export function validateTheme(theme: Theme): { ok: boolean; missing: string[] } {
  const missing: string[] = [];
  const c = theme.color;

  const checkRamp = (r: Ramp | undefined, name: string) => {
    if (!r) return missing.push(`color.${name}`);
    RAMP_STEPS.forEach((s) => !r[s] && missing.push(`color.${name}.${s}`));
    if (!r.foreground) missing.push(`color.${name}.foreground`);
  };
  checkRamp(c?.brand, "brand");
  checkRamp(c?.accent, "accent");

  if (!c?.neutral) missing.push("color.neutral");
  else NEUTRAL_STEPS.forEach((s) => !c.neutral[s] && missing.push(`color.neutral.${s}`));

  COLOR_REQUIRED.semantic.forEach((k) => {
    const sc = c?.semantic?.[k];
    if (!sc) return missing.push(`color.semantic.${k}`);
    (["DEFAULT", "fg", "bg", "border"] as const).forEach((f) => !sc[f] && missing.push(`color.semantic.${k}.${f}`));
  });
  COLOR_REQUIRED.surface.forEach((k) => !c?.surface?.[k as keyof SurfaceColors] && missing.push(`color.surface.${k}`));
  COLOR_REQUIRED.text.forEach((k) => !c?.text?.[k as keyof TextColors] && missing.push(`color.text.${k}`));

  if (!theme.typography?.fontDisplay) missing.push("typography.fontDisplay");
  if (!theme.typography?.fontBody) missing.push("typography.fontBody");
  if (!theme.typography?.fontMono) missing.push("typography.fontMono");
  TYPE_SIZE_KEYS.forEach((k) => !theme.typography?.size?.[k] && missing.push(`typography.size.${k}`));

  RADIUS_KEYS.forEach((k) => !theme.radius?.[k] && missing.push(`radius.${k}`));
  SHADOW_KEYS.forEach((k) => !theme.shadow?.[k] && missing.push(`shadow.${k}`));
  (["fast", "base", "slow", "easeStandard", "easeEntrance", "easeExit"] as const).forEach(
    (k) => !theme.motion?.[k] && missing.push(`motion.${k}`),
  );
  Z_KEYS.forEach((k) => theme.z?.[k] === undefined && missing.push(`z.${k}`));
  BREAKPOINT_KEYS.forEach((k) => !theme.breakpoints?.[k] && missing.push(`breakpoints.${k}`));
  if (!theme.spacing || Object.keys(theme.spacing).length === 0) missing.push("spacing");

  return { ok: missing.length === 0, missing };
}

export function defineTheme(input: ThemeInput): Theme {
  const base = input.extends ?? null;
  const theme: Theme = {
    name: input.name,
    label: input.label,
    scheme: input.scheme,
    brand: input.brand ?? base?.brand ?? "default",
    extends: base ? base.name : null,
    color: deepMerge((base?.color ?? {}) as ColorTokens, input.color),
    typography: deepMerge(base?.typography ?? defaultTypography, input.typography),
    spacing: input.spacing ?? base?.spacing ?? defaultSpacing,
    radius: input.radius ?? base?.radius ?? defaultRadii,
    shadow: deepMerge(base?.shadow ?? defaultShadows, input.shadow),
    motion: input.motion ?? base?.motion ?? defaultMotion,
    z: input.z ?? base?.z ?? defaultZ,
    breakpoints: input.breakpoints ?? base?.breakpoints ?? defaultBreakpoints,
  };

  const { ok, missing } = validateTheme(theme);
  if (!ok) throw new Error(`Theme "${theme.name}" is missing required tokens: ${missing.join(", ")}`);
  return theme;
}

/** Flatten a theme into a `--token: value` map (proves the variable mechanism). */
export function themeCssVars(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {};
  const ramp = (name: string, r: Ramp) => {
    RAMP_STEPS.forEach((s) => (vars[`--color-${name}-${s}`] = r[s]));
    vars[`--color-${name}-foreground`] = r.foreground;
  };
  ramp("brand", theme.color.brand);
  ramp("accent", theme.color.accent);
  NEUTRAL_STEPS.forEach((s) => (vars[`--color-neutral-${s}`] = theme.color.neutral[s]));
  (Object.keys(theme.color.surface) as (keyof SurfaceColors)[]).forEach((k) => {
    const key = k === "app" || k === "surface" || k === "surface-muted" || k === "overlay" ? `bg-${k}` : k;
    vars[`--color-${key}`] = theme.color.surface[k];
  });
  (Object.keys(theme.color.text) as (keyof TextColors)[]).forEach((k) => (vars[`--color-fg-${k}`] = theme.color.text[k]));
  RADIUS_KEYS.forEach((k) => (vars[`--radius-${k}`] = theme.radius[k]));
  SHADOW_KEYS.forEach((k) => (vars[`--shadow-${k}`] = theme.shadow[k]));
  return vars;
}
