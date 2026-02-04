/* eslint-disable ts/no-explicit-any */

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Get, Paths, Split } from "type-fest";

import type { ReplaceNumberToNumberStringDeep } from "../utils/replace-number-to-number-string";
import type { ApiError, ApiErrorType } from "./api-error";

export interface ApiClientOptions {
  request: (requestOptions: ApiRequestOptions) => Promise<any>;
  rewriteUrl?: (url: string) => string;
  baseUrl?: string;
}

export interface ApiRequestOptions {
  baseUrl?: string;
  url?: string;
  method?: string;
  headers?: Record<string, any>;
  paramsPath?: Record<string, any>;
  paramsQuery?: Record<string, any>;
  paramsBody?: Record<string, any>;
  /**
   * 是否处理 401 错误
   * - 常规处理方式：出现 401 错误时，需要调用 refreshToken 刷新一次 token 后重试
   *
   * @default true
   */
  handle401?: boolean;
  /**
   * 是否处理网络错误
   *
   * @default false
   */
  handleNetworkError?: boolean;
  /**
   * 处理网络错误回调
   */
  onNetworkError?: (params: { error: ApiError }) => void;
  /**
   * 是否处理业务错误
   *
   * @default false
   */
  handleBizError?: boolean;
  /**
   * 处理业务错误回调
   */
  onBizError?: (params: { error: ApiError }) => void;
  /**
   * 覆盖 axios 配置
   * - 用 Pick 选择部分配置，避免覆盖过多配置造成管理困难
   */
  axiosOptions?: Pick<AxiosRequestConfig, "responseType">;
}

export interface ApiRequestOptionsWithKey<ApiDefines, Key extends ApiKeys<ApiDefines>> {
  paramsPath?: ApiParamsPath<ApiDefines, Key>;
  paramsQuery?: ApiParamsQuery<ApiDefines, Key>;
  paramsBody?: ReplaceNumberToNumberStringDeep<ApiParamsBody<ApiDefines, Key>>;
}

/**
 * 根据接口类型生成 api keys 类型
 */
export type ApiKeys<ApiDefines> = {
  [Path in keyof ApiDefines]: {
    [Method in keyof ApiDefines[Path]]: `${Path & string} ${Method & string}`;
  }[keyof ApiDefines[Path]];
}[keyof ApiDefines];

/**
 * 获取某个接口的 path 参数类型
 */
export type ApiParamsPath<ApiDefines, Key extends ApiKeys<ApiDefines>> = Get<
  ApiDefines,
  [...Split<Key, " ">, "parameters", "path"]
>;

/**
 * 获取某个接口的 query 参数类型
 */
export type ApiParamsQuery<ApiDefines, Key extends ApiKeys<ApiDefines>> = Get<
  ApiDefines,
  [...Split<Key, " ">, "parameters", "query"]
>;

/**
 * 获取某个接口的 body 参数类型
 */
export type ApiParamsBody<ApiDefines, Key extends ApiKeys<ApiDefines>> = Get<
  ApiDefines,
  [...Split<Key, " ">, "parameters", "body", "body"]
>;

/**
 * - 如果是 get/head 方法，则返回 ApiParamsQuery<ApiDefines, Key>
 * - 如果是其他方法，则返回 ApiParamsBody<ApiDefines, Key>
 */
export type ApiParamsQueryOrBody<ApiDefines, Key extends ApiKeys<ApiDefines>> = Split<Key, " ">[1] extends
  | "get"
  | "head"
  ? ApiParamsQuery<ApiDefines, Key>
  : ApiParamsBody<ApiDefines, Key>;

/**
 * 获取某个接口的返回值类型
 */
export type ApiResponse<ApiDefines, Key extends ApiKeys<ApiDefines>> = Get<
  ApiDefines,
  [...Split<Key, " ">, "responses", "200", "schema"]
>;

export type ApiResponseWrapper<T> = {
  success: boolean;
  errorType: ApiErrorType | undefined;
} & Partial<AxiosResponse<T>>;

/**
 * 安全的获取接口里的类型
 *
 * - 注意：maxRecursionDepth = 5
 *
 * @example
 * ```ts
 * type Res = GetByPath<ApiResponse<PetStoreApiDefines, "/pet/{petId} get">, "category.name">;
 * ```
 */
export type GetByPath<T, Path extends Paths<T, { maxRecursionDepth: 5 }>> = NonNullable<
  Get<
    T,
    // @ts-expect-error Path 类型异常
    Path
  >
>;
