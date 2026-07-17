import { defineTheme } from "../defineTheme";
import { ramp } from "../colors";
import { defaultLight } from "./default-light";

/** "amber" brand (the SRC gold identity) — overrides the brand ramp + display
 *  font only, proving a brand changes token VALUES, never token names. */
export const amberLight = defineTheme({
  name: "amber-light",
  label: "Amber · Light",
  scheme: "light",
  brand: "amber",
  extends: defaultLight,
  color: {
    brand: ramp(
      ["43 80% 96%", "43 78% 90%", "43 72% 80%", "43 64% 71%", "41 56% 64%", "43 49% 56%", "40 54% 40%", "38 59% 33%", "36 60% 26%", "34 60% 20%"],
      "0 0% 4%",
    ),
  },
  typography: { fontDisplay: '"Cormorant Garamond", Georgia, serif' },
});
