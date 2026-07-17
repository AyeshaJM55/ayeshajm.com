import { defineTheme } from "../defineTheme";
import { ramp } from "../colors";

/** The base theme. Every other theme extends this one. */
export const defaultLight = defineTheme({
  name: "default-light",
  label: "Default · Light",
  scheme: "light",
  brand: "default",
  extends: null,
  color: {
    brand: ramp(
      ["226 100% 97%", "226 100% 94%", "228 96% 89%", "230 94% 82%", "234 89% 74%", "239 84% 67%", "243 75% 59%", "245 58% 51%", "244 55% 41%", "242 47% 34%"],
      "0 0% 100%",
    ),
    accent: ramp(
      ["166 76% 97%", "167 85% 89%", "168 84% 78%", "171 77% 64%", "172 66% 50%", "173 80% 40%", "175 84% 32%", "175 77% 26%", "176 69% 22%", "176 61% 19%"],
      "0 0% 100%",
    ),
    neutral: {
      0: "0 0% 100%",
      50: "210 20% 98%",
      100: "220 14% 96%",
      200: "220 13% 91%",
      300: "216 12% 84%",
      400: "218 11% 65%",
      500: "220 9% 46%",
      600: "215 14% 34%",
      700: "217 19% 27%",
      800: "215 28% 17%",
      900: "221 39% 11%",
      1000: "0 0% 0%",
    },
    semantic: {
      success: { DEFAULT: "142 71% 45%", fg: "142 64% 24%", bg: "138 76% 95%", border: "142 52% 80%" },
      warning: { DEFAULT: "38 92% 50%", fg: "30 80% 30%", bg: "48 96% 92%", border: "45 90% 75%" },
      danger: { DEFAULT: "0 72% 51%", fg: "0 65% 38%", bg: "0 86% 96%", border: "0 80% 85%" },
      info: { DEFAULT: "217 91% 60%", fg: "220 70% 38%", bg: "214 95% 95%", border: "213 90% 82%" },
    },
    surface: {
      app: "210 20% 99%",
      surface: "0 0% 100%",
      "surface-muted": "220 14% 96%",
      overlay: "222 47% 11%",
      "border-default": "220 13% 88%",
      "border-subtle": "220 14% 93%",
      "border-strong": "220 13% 74%",
    },
    text: {
      default: "222 39% 11%",
      muted: "220 9% 40%",
      subtle: "220 9% 55%",
      disabled: "220 9% 72%",
      "on-brand": "0 0% 100%",
    },
  },
});
