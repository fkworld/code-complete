import type { FC } from "react";

import { Outlet } from "react-router";

export const MainRight: FC = () => {
  return (
    <main className="mt-14 ml-64 min-h-screen p-4">
      <Outlet />
    </main>
  );
};
