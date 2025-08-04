import CssBaseline from "@mui/material/CssBaseline";
import "./index.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { routes } from "./routes.ts";
import "./i18n/config";
import { useLocale, localeConv } from "./i18n/config";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const root = document.getElementById("root");

function Main() {
  const locale = useLocale();
  const darkTheme = createTheme(
    {
      colorSchemes: {
        dark: true,
      },
    },
    [localeConv(locale.locale)]
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
