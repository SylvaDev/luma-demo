"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type TileThemeId = "warm" | "cyan";

/** Extend later with more palettes — shader lerps using blend 0–1 */
export const TILE_THEMES: TileThemeId[] = ["warm", "cyan"];

type ThemeContextValue = {
  theme: TileThemeId;
  setTheme: (id: TileThemeId) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<TileThemeId>("warm");

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "warm" ? "cyan" : "warm"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTileTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTileTheme must be used within ThemeProvider");
  }
  return ctx;
}
