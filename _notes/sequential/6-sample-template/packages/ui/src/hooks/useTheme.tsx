import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Theme + brand provider. Flips `data-theme` / `data-brand` on <html>, persists
 * the choice, and seeds from `prefers-color-scheme`. The only place that knows
 * theme/brand exist — components never branch on them.
 */

export type ColorScheme = "light" | "dark";

interface ThemeContextValue {
  scheme: ColorScheme;
  brand: string;
  setScheme: (scheme: ColorScheme) => void;
  setBrand: (brand: string) => void;
  toggleScheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  defaultScheme?: ColorScheme;
  defaultBrand?: string;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultScheme,
  defaultBrand = "default",
  storageKey = "tpl-theme",
}: ThemeProviderProps) {
  const [scheme, setSchemeState] = useState<ColorScheme>(() => {
    if (typeof window === "undefined") return defaultScheme ?? "light";
    const saved = window.localStorage.getItem(`${storageKey}-scheme`) as ColorScheme | null;
    if (saved === "light" || saved === "dark") return saved;
    if (defaultScheme) return defaultScheme;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [brand, setBrandState] = useState<string>(() => {
    if (typeof window === "undefined") return defaultBrand;
    return window.localStorage.getItem(`${storageKey}-brand`) ?? defaultBrand;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", scheme);
    if (brand && brand !== "default") root.setAttribute("data-brand", brand);
    else root.removeAttribute("data-brand");
  }, [scheme, brand]);

  const persist = (key: string, value: string) => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* storage unavailable — ignore */
    }
  };

  const setScheme = useCallback(
    (next: ColorScheme) => {
      setSchemeState(next);
      persist(`${storageKey}-scheme`, next);
    },
    [storageKey],
  );

  const setBrand = useCallback(
    (next: string) => {
      setBrandState(next);
      persist(`${storageKey}-brand`, next);
    },
    [storageKey],
  );

  const toggleScheme = useCallback(
    () => setScheme(scheme === "dark" ? "light" : "dark"),
    [scheme, setScheme],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ scheme, brand, setScheme, setBrand, toggleScheme }),
    [scheme, brand, setScheme, setBrand, toggleScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
