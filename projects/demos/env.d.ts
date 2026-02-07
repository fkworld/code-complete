/// <reference types="vite/client" />

import "vue-router";

export {};

declare module "vue-router" {
  interface RouteMeta {
    /**
     * 页面参数
     * - key 为参数名
     * - value 为参数说明，会写入参数注释中
     */
    pageParams?: Record<string, string>;
  }
}
