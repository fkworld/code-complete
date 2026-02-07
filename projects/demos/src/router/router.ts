import { createRouter, createWebHistory } from "vue-router";

import { Route404 } from "./route-404";
import { ROUTES } from "./routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...ROUTES,
    {
      path: "/:pathMatch(.*)*",
      component: Route404,
    },
  ],
});
