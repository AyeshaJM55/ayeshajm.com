import type { Config } from "tailwindcss";

/**
 * Shared Tailwind preset for the template.
 *
 * Every color/spacing/radius/type utility resolves to a CSS variable defined in
 * packages/ui/src/styles/globals.css, so a theme or brand switch is a single
 * attribute flip on <html> with no re-render. Both packages/ui and apps/catalog
 * load this preset; downstream consumers re-use it too.
 *
 * Colors are stored as HSL channels (e.g. "222 84% 56%") so Tailwind can apply
 * opacity via hsl(var(--token) / <alpha-value>).
 */

const withAlpha = (cssVar: string) => `hsl(var(${cssVar}) / <alpha-value>)`;

const ramp = (name: string) =>
  Object.fromEntries(
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((step) => [
      step,
      withAlpha(`--color-${name}-${step}`),
    ]),
  );

const neutralRamp = () =>
  Object.fromEntries(
    [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((step) => [
      step,
      withAlpha(`--color-neutral-${step}`),
    ]),
  );

const preset: Config = {
  content: [],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        // Surfaces
        app: withAlpha("--color-bg-app"),
        surface: withAlpha("--color-bg-surface"),
        "surface-muted": withAlpha("--color-bg-surface-muted"),
        overlay: withAlpha("--color-bg-overlay"),
        // Brand + accent + neutral ramps
        brand: { ...ramp("brand"), foreground: withAlpha("--color-brand-foreground") },
        accent: { ...ramp("accent"), foreground: withAlpha("--color-accent-foreground") },
        neutral: neutralRamp(),
        // Text
        fg: {
          DEFAULT: withAlpha("--color-fg-default"),
          muted: withAlpha("--color-fg-muted"),
          subtle: withAlpha("--color-fg-subtle"),
          disabled: withAlpha("--color-fg-disabled"),
          "on-brand": withAlpha("--color-fg-on-brand"),
        },
        // Borders
        border: {
          DEFAULT: withAlpha("--color-border-default"),
          subtle: withAlpha("--color-border-subtle"),
          strong: withAlpha("--color-border-strong"),
        },
        // Semantic
        success: {
          DEFAULT: withAlpha("--color-success"),
          fg: withAlpha("--color-success-fg"),
          bg: withAlpha("--color-success-bg"),
          border: withAlpha("--color-success-border"),
        },
        warning: {
          DEFAULT: withAlpha("--color-warning"),
          fg: withAlpha("--color-warning-fg"),
          bg: withAlpha("--color-warning-bg"),
          border: withAlpha("--color-warning-border"),
        },
        danger: {
          DEFAULT: withAlpha("--color-danger"),
          fg: withAlpha("--color-danger-fg"),
          bg: withAlpha("--color-danger-bg"),
          border: withAlpha("--color-danger-border"),
        },
        info: {
          DEFAULT: withAlpha("--color-info"),
          fg: withAlpha("--color-info-fg"),
          bg: withAlpha("--color-info-bg"),
          border: withAlpha("--color-info-border"),
        },
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      fontSize: {
        "display-2": ["var(--font-size-display-2)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-1": ["var(--font-size-display-1)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "heading": ["var(--font-size-heading)", { lineHeight: "1.1" }],
        "body-lg": ["var(--font-size-body-lg)", { lineHeight: "1.7" }],
        "body-md": ["var(--font-size-body-md)", { lineHeight: "1.6" }],
        "body-sm": ["var(--font-size-body-sm)", { lineHeight: "1.5" }],
        "label": ["var(--font-size-label)", { lineHeight: "1.2", letterSpacing: "0.16em" }],
      },
      borderRadius: {
        none: "0",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "9999px",
      },
      boxShadow: {
        e1: "var(--shadow-1)",
        e2: "var(--shadow-2)",
        e3: "var(--shadow-3)",
        e4: "var(--shadow-4)",
      },
      transitionDuration: {
        fast: "var(--motion-fast)",
        base: "var(--motion-base)",
        slow: "var(--motion-slow)",
      },
      keyframes: {
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        shimmer: "shimmer 1.6s linear infinite",
        "fade-up": "fade-up var(--motion-slow) var(--ease-entrance) both",
      },
    },
  },
  plugins: [],
};

export default preset;
