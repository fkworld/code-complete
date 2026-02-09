import type { Routes, RoutesParams } from "@/generated/routes";

import { defaultParseSearch, defaultStringifySearch } from "@tanstack/react-router";
import { isEmpty } from "lodash-es";

import { router } from "./router";

export async function navigateTo<T extends Routes>(
  route: T,
  params?: T extends keyof RoutesParams ? RoutesParams[T] : never,
) {
  const path = `${route}${isEmpty(params) ? "" : defaultStringifySearch(params)}`;

  await router.navigate(path, {
    replace: false,
    viewTransition: true,
  });
}

export function navigateBack(delta = -1) {
  router.navigate(delta);
}

/**
 * - 注意：此函数不具备响应性，只允许在进页面
 */
export function getRouteParams<T extends keyof RoutesParams>(_route: T): Partial<RoutesParams[T]> {
  return defaultParseSearch(window.location.search);
}
