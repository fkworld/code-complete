import type { RouteRecordRaw } from "vue-router";

export const ROUTES: Array<RouteRecordRaw> = [
  {
    path: "/home",
    component: () => import("@/views/home/index"),
  },
  {
    path: "/debug/debug-mqtt",
    component: () => import("@/views/debug/debug-mqtt/index"),
  },
  {
    path: "/debug/debug-api",
    component: () => import("@/views/debug/debug-api/index"),
  },
];
