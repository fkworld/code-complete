import type { RouteRecordRaw } from "vue-router";

export const ROUTES: Array<RouteRecordRaw> = [
  {
    path: "/home",
    component: () => import("@/views/home/home.vue"),
  },
  {
    path: "/debug/debug-mqtt",
    component: () => import("@/views/debug/debug-mqtt/index.vue"),
  },
];
