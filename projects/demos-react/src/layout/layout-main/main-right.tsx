import type { FC } from "react";
import { Suspense } from "react";

import { Outlet } from "react-router";

export const MainRight: FC = () => {
  return (
    <main className="mt-14 ml-64 min-h-screen p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};
