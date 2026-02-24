import type { RoutePathAll, RouteSearchParamsAll } from "@/generated/routes";

import { createRouterUtils } from "@fkworld/router-utils";

import { router } from "./router";

export const { navigateTo, navigateBack, getRoutePath, getRouteSearchParams } = createRouterUtils<
  RoutePathAll,
  RouteSearchParamsAll
>({
  onGetRouter: () => router,
});
