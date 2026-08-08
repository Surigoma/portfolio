import type { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router";
import Profile from "./page/profile/profile";
import MainFrame from "./MainFrame";
import Works from "./page/works/works";
import WorkDetail from "./page/works/work-detail";

type RouteWithTitle = {
  title: string;
  hideFromNav?: boolean;
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
      {
        path: "/works/:id",
        Component: WorkDetail,
        title: "pages.works",
        hideFromNav: true,
      },
    ],
  },
];

export const routes = createBrowserRouter(routeBase);
