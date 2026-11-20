import { createContext } from "react";

export type ColorMode = "light" | "dark";

type ThemeModeContextValue = {
  mode: ColorMode;
  toggleColorMode: () => void;
};

export const ThemeModeContext =
  createContext<ThemeModeContextValue | null>(null);
