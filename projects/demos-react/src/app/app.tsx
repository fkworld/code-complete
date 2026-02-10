import type { FC } from "react";

import { StrictMode } from "react";
import { RouterProvider } from "react-router";

import { router } from "@/router/router";

export const App: FC = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};
