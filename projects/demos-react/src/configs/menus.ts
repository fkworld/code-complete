import type { Routes } from "@/generated/routes";

import { ROUTES } from "@/router/routes";

export const MENUS: Array<{ title: string; link: Routes }> = Object.keys(ROUTES).map((path) => {
  return {
    title: path,
    link: path as Routes,
  };
});
