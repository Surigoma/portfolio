import CssBaseline from "@mui/material/CssBaseline";
import "./index.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { routes } from "./routes.ts";
import "./i18n/config";
import { muiLocales, type SupportedLocale } from "./i18n/config";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const root = document.getElementById("root");

// Entry-point components are intentionally kept beside createRoot.
// eslint-disable-next-line react-refresh/only-export-components
function Main() {
  const { i18n } = useTranslation();
  const locale = (i18n.resolvedLanguage ?? "ja") as SupportedLocale;
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const darkTheme = createTheme(
    {
      colorSchemes: {
        dark: true,
      },
    },
    muiLocales[locale] ?? muiLocales.ja
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={routes}></RouterProvider>
    </ThemeProvider>
  );
}

createRoot(root!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
