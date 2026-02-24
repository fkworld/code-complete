import type { createBrowserRouter } from "react-router";

import { defaultParseSearch, defaultStringifySearch } from "@tanstack/react-router";

export function createRouterUtils<TRoutePathAll, TRouteSearchParamsAll>(options: {
  onGetRouter: () => ReturnType<typeof createBrowserRouter>;
}) {
  const { onGetRouter } = options;

  async function navigateTo<T extends TRoutePathAll>(
    route: T,
    searchParams?: T extends keyof TRouteSearchParamsAll ? TRouteSearchParamsAll[T] : never,
  ) {
    const path = `${route}${searchParams ? defaultStringifySearch(searchParams) : ""}`;

    await onGetRouter().navigate(path, {
      replace: false,
      viewTransition: true,
    });
  }

  async function navigateBack(delta = -1) {
    await onGetRouter().navigate(delta);
  }

  function getRoutePath<TRoutePath extends TRoutePathAll>(route: TRoutePath): TRoutePath {
    return route;
  }

  function getRouteSearchParams<TRoutePath extends keyof TRouteSearchParamsAll>(
    _route: TRoutePath,
  ): Partial<TRouteSearchParamsAll[TRoutePath]> {
    return defaultParseSearch(window.location.search);
  }

  return { navigateTo, navigateBack, getRoutePath, getRouteSearchParams };
}
