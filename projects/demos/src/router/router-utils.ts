import type { Routes, RoutesParams } from "@/generated/routes";

import { useRoute } from "vue-router";

import { router } from "./router";

// TODO 等待增加路由跳转锁

export async function navigateToPush<T extends Routes>(
  route: T,
  params?: T extends keyof RoutesParams ? RoutesParams[T] : never,
) {
  await router.push({
    path: route,
    query: params,
  });
}

export async function navigateToReplace<T extends Routes>(
  route: T,
  params?: T extends keyof RoutesParams ? RoutesParams[T] : never,
) {
  await router.replace({
    path: route,
    query: params,
  });
}

export function navigateBack(delta = -1) {
  router.go(delta);
}

export function getRouteParams<T extends keyof RoutesParams>(_route: T): RoutesParams[T] {
  const route = useRoute();
  return route?.query as RoutesParams[T];
}
