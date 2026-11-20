import {
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createAppTheme from "./index";
import { ThemeModeContext, type ColorMode } from "./ThemeModeContext";

export function ThemeModeProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [mode, setMode] = useState<ColorMode>(() =>
    localStorage.getItem("color-mode") === "dark" ? "dark" : "light",
  );

  const contextValue = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        const nextMode = mode === "light" ? "dark" : "light";
        localStorage.setItem("color-mode", nextMode);
        setMode(nextMode);
      },
    }),
    [mode],
  );
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
