import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/index.tsx";
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
import { GlobalAuthProvider } from "./access/GlobalAuthProvider.tsx";

document.title = import.meta.env.VITE_DISPLAY_BUTTON_SIGLA
  ? `FightTech Platform - ${import.meta.env.VITE_DISPLAY_BUTTON_SIGLA}`
  : "FightTech";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <GlobalAuthProvider>
            <App />
          </GlobalAuthProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>
);
