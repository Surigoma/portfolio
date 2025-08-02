import type { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router";
import Profile from "./page/profile/profile";
import MainFrame from "./MainFrame";
import Works from "./page/works/works";

type RouteWithTitle = {
  title: string;
  children?: RouteWithTitle[] | undefined;
} & RouteObject;

export const routeBase: RouteWithTitle[] = [
  {
    path: "/",
    Component: MainFrame,
    title: "Top",
    children: [
      { path: "/", Component: Profile, title: "pages.profile" },
      { path: "/works", Component: Works, title: "pages.works" },
    ],
  },
];

export const routes = createBrowserRouter(routeBase);
