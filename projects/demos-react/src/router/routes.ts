import type { NonIndexRouteObject } from "react-router";

import { lazy } from "react";

/* eslint perfectionist/sort-objects: "error" */
/**
 * 更严格的路由配置
 * - 扁平化
 * - 按 path 排序（通过 eslint 实现）
 * - 只允许写 Component 和 meta 字段
 */
export const ROUTES: Record<
  string,
  Pick<NonIndexRouteObject, "Component"> & {
    meta?: {
      pageParams?: Record<string, string>;
    };
  }
> = {
  "/debug/debug-route-params": {
    Component: lazy(() => import("@/pages/debug/debug-route-params/index")),
    meta: {
      pageParams: {
        argA: "参数 A 的说明",
        argB: "参数 B 的说明",
        argC: "参数 C 的说明",
      },
    },
  },
  "/home": {
    Component: lazy(() => import("@/pages/home/index")),
  },
};
