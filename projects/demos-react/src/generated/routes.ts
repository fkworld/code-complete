// {
//   "genBy": "scripts/gen-routes.ts",
//   "genTime": "2026-02-24 16:47:36 北京时间"
// }

import { lazy } from "react";
import type { NonIndexRouteObject } from "react-router";

/** 路由路径 */
export type RoutePathAll = 
  | "/home"
  | "/debug/debug-route-params";
/** 路由参数定义 */
export type RouteSearchParamsAll = {
  "/debug/debug-route-params": {
  /**
     * string 类型的参数
     */
    argString: string;
  /** number 类型的参数 */
    argNumber: number;
  /** boolean 类型的参数 */
    argBoolean: boolean;
  };
  };

/** 路由表 */
export const ROUTES = [
  {
  path: "/home",
  Component: lazy(() => import("../pages/home/index"))
  },
  {
  path: "/debug/debug-route-params",
  Component: lazy(() => import("../pages/debug/debug-route-params/index"))
  },
  ] as const satisfies Array<Pick<NonIndexRouteObject, "path" | "Component">>;
