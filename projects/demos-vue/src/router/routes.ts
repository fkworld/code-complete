import type { RouteRecordSingleView } from "vue-router";

/* eslint perfectionist/sort-objects: "error" */
/**
 * 更严格的路由配置
 * - 扁平化
 * - 按 path 排序（通过 eslint 实现）
 * - 只允许写 component 和 meta 字段
 */
export const ROUTES: Record<string, Pick<RouteRecordSingleView, "component" | "meta">> = {
  "/debug/debug-api": {
    component: () => import("@/views/debug/debug-api/index"),
  },
  "/debug/debug-mqtt": {
    component: () => import("@/views/debug/debug-mqtt/index"),
  },
  "/debug/debug-route-params": {
    component: () => import("@/views/debug/debug-route-params/index"),
    meta: {
      pageParams: {
        argA: "参数 A 的说明",
        argB: "参数 B 的说明",
        argC: "参数 C 的说明",
      },
    },
  },
  "/home": {
    component: () => import("@/views/home/index"),
  },
};
