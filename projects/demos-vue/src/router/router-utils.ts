import type { Routes, RoutesParams } from "@/generated/routes";

import { isPlainObject } from "lodash-es";
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

/**
 * - 注意：此函数不具备响应性，只允许在进页面
 */
export function getRouteParams<T extends keyof RoutesParams>(_route: T): RoutesParams[T] {
  const route = useRoute();

  // 简单校验
  // 如果要复杂做的话，需要使用 zod 校验工具
  if (!isPlainObject(route.query)) {
    console.error("[Router] Route params is not a plain object:", route.query);
    return {};
  }

  return route?.query;
}
