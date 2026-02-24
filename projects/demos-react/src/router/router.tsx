import { createBrowserRouter, Navigate } from "react-router";

import { ROUTES } from "@/generated/routes";
import { LayoutMain } from "@/layout/layout-main/layout-main";

import { Route404 } from "./route-404";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/home" />,
    },
    {
      path: "/",
      Component: LayoutMain,
      children: [
        ...ROUTES,
        {
          path: "/*",
          Component: Route404,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
