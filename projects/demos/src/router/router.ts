import { createRouter, createWebHistory } from "vue-router";

import { ROUTES } from "./routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...ROUTES,
    {
      path: "/:pathMatch(.*)*",
      component: () => import("./route-404.vue"),
    },
  ],
});
