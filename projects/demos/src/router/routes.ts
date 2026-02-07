import type { RouteRecordSingleView } from "vue-router";

/* eslint perfectionist/sort-objects: "error" */
/** 更严格的路由配置
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
  "/home": {
    component: () => import("@/views/home/index"),
  },
};
