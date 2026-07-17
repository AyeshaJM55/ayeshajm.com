export * from "./colors";
export * from "./typography";
export * from "./spacing";
export * from "./radii";
export * from "./shadows";
export * from "./motion";
export * from "./zIndex";
export * from "./breakpoints";
export * from "./defineTheme";

import type { Theme } from "./defineTheme";
import { defaultLight } from "./themes/default-light";
import { defaultDark } from "./themes/default-dark";
import { amberLight } from "./themes/amber-light";
import { amberDark } from "./themes/amber-dark";

export { defaultLight, defaultDark, amberLight, amberDark };

/** Every theme shipped with the template. */
export const ALL_THEMES: Theme[] = [defaultLight, defaultDark, amberLight, amberDark];

/** Brand id → its light/dark themes (used by the catalog switcher). */
export const BRANDS: Record<string, { label: string; light: Theme; dark: Theme }> = {
  default: { label: "Default", light: defaultLight, dark: defaultDark },
  amber: { label: "Amber", light: amberLight, dark: amberDark },
};

export const DEFAULT_THEME = defaultLight.name;
