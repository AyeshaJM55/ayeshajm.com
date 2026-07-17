import { defineTheme } from "../defineTheme";
import { defaultLight } from "./default-light";

/** Dark scheme — overrides surfaces, text, borders, semantic backgrounds, and
 *  elevation. Brand / accent / neutral ramps are inherited unchanged. */
export const defaultDark = defineTheme({
  name: "default-dark",
  label: "Default · Dark",
  scheme: "dark",
  extends: defaultLight,
  color: {
    semantic: {
      success: { fg: "142 60% 70%", bg: "142 40% 12%", border: "142 40% 25%" },
      warning: { fg: "45 90% 70%", bg: "38 50% 12%", border: "38 50% 28%" },
      danger: { fg: "0 80% 75%", bg: "0 50% 14%", border: "0 50% 30%" },
      info: { fg: "213 90% 75%", bg: "217 50% 14%", border: "217 50% 30%" },
    },
    surface: {
      app: "222 30% 7%",
      surface: "222 24% 11%",
      "surface-muted": "222 20% 15%",
      overlay: "222 47% 4%",
      "border-default": "217 19% 22%",
      "border-subtle": "217 19% 16%",
      "border-strong": "217 15% 32%",
    },
    text: {
      default: "210 20% 98%",
      muted: "217 12% 65%",
      subtle: "217 10% 52%",
      disabled: "217 10% 38%",
      "on-brand": "0 0% 100%",
    },
  },
  shadow: {
    "1": "0 1px 2px hsl(0 0% 0% / 0.4)",
    "2": "0 2px 10px hsl(0 0% 0% / 0.45)",
    "3": "0 10px 28px hsl(0 0% 0% / 0.5)",
    "4": "0 24px 56px hsl(0 0% 0% / 0.6)",
    inner: "inset 0 1px 2px hsl(0 0% 0% / 0.5)",
  },
});
