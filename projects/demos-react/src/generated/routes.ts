// {
//   "genBy": "scripts/gen-routes.ts",
//   "genTime": "2026-02-09 15:35:08 北京时间"
// }

/** 路由地址类型  */
export type Routes = (typeof ROUTES_INFOS)[number]["path"];

/** 路由参数类型 */
export type RoutesParams = {
  "/debug/debug-route-params": {
    /** 参数 A 的说明 */
    argA?: string;
    /** 参数 B 的说明 */
    argB?: string;
    /** 参数 C 的说明 */
    argC?: string;
  };
};

/** 完整路由表 */
export const ROUTES_INFOS = [
  {
    path: "/debug/debug-route-params",
  },
  {
    path: "/home",
  },
] as const;
