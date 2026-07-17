import { defineTheme } from "../defineTheme";
import { ramp } from "../colors";
import { defaultDark } from "./default-dark";

/** "amber" brand on the dark scheme — gold ramp + warm near-black surfaces. */
export const amberDark = defineTheme({
  name: "amber-dark",
  label: "Amber · Dark",
  scheme: "dark",
  brand: "amber",
  extends: defaultDark,
  color: {
    brand: ramp(
      ["43 80% 96%", "43 78% 90%", "43 72% 80%", "43 64% 71%", "41 56% 64%", "43 49% 56%", "40 54% 40%", "38 59% 33%", "36 60% 26%", "34 60% 20%"],
      "0 0% 4%",
    ),
    surface: {
      app: "0 0% 4%",
      surface: "0 0% 7%",
      "surface-muted": "0 0% 10%",
      "border-default": "40 12% 18%",
      "border-subtle": "40 12% 13%",
      "border-strong": "40 12% 28%",
    },
  },
  typography: { fontDisplay: '"Cormorant Garamond", Georgia, serif' },
});
