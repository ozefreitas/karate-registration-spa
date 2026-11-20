import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeModeProvider } from "./theme/ThemeModeProvider";
import "@fontsource/poppins/400.css"; // normal
import "@fontsource/poppins/700.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/300-italic.css";
import "@fontsource/inter/400-italic.css";
import "@fontsource/inter/500-italic.css";
import "@fontsource/inter/600-italic.css";
import "@fontsource/inter/700-italic.css";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalAuthProvider, useAuth } from "./access/GlobalAuthProvider.tsx";
import "./openapi/config";

document.title = import.meta.env.VITE_DISPLAY_BUTTON_SIGLA
  ? `FightTech Platform - ${import.meta.env.VITE_DISPLAY_BUTTON_SIGLA}`
  : "FightTech";

const queryClient = new QueryClient();

const Root = () => {
  const { isAuthLoading } = useAuth();

  useEffect(() => {
    if (isAuthLoading) return;

    const splash = document.getElementById("splash-screen");

    if (splash) {
      splash.classList.add("fade-out");

      const timeoutId = window.setTimeout(() => {
        splash.remove();
        document.body.classList.remove("splash-active");
      }, 500);

      return () => window.clearTimeout(timeoutId);
    }
  }, [isAuthLoading]);

  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeModeProvider>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalAuthProvider>
            <Root />
          </GlobalAuthProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeModeProvider>
  </StrictMode>,
);
