import "./index.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { routes } from "./routes.ts";
import "./i18n/config";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const root = document.getElementById("root");

const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(root!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={routes}></RouterProvider>
    </ThemeProvider>
  </StrictMode>
);
