import { createBrowserRouter } from "react-router";

import { LayoutMain } from "@/layout/layout-main/layout-main";

import { ROUTES } from "./routes";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: LayoutMain,
      children: Object.entries(ROUTES).map(([path, route]) => {
        return {
          path,
          Component: route.Component,
        };
      }),
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
