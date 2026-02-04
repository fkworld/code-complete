/* eslint-disable ts/no-explicit-any */

import type { ApiRequestOptions, ApiResponseWrapper } from "./api-client-types";

import axios from "axios";
import { isEmpty } from "lodash-es";

import { ApiError } from "./api-error";

export const defaultApiRequestAxios = axios.create({
  adapter: "fetch",
  validateStatus: () => true,
  paramsSerializer: {
    serialize: (params) => {
      return new URLSearchParams(params).toString();
    },
  },
});

export async function defaultApiRequest(requestOptions: ApiRequestOptions): Promise<ApiResponseWrapper<any>> {
  const {
    baseUrl,
    url,
    method,
    headers,
    paramsQuery,
    paramsBody,
    axiosOptions,
    handle401 = true,
    handleNetworkError = false,
    handleBizError = false,
    onNetworkError,
    onBizError,
  } = requestOptions;

  const res = await defaultApiRequestAxios.request({
    baseURL: baseUrl,
    url,
    method,
    headers,
    data: isEmpty(paramsBody) ? undefined : paramsBody,
    params: paramsQuery,
    ...axiosOptions,
  });

  // 401 错误，一般需要刷新 token 后重试一次
  if (res.status === 401 && handle401) {
    // TODO refreshToken
    return defaultApiRequest({ ...requestOptions, handle401: false });
  }

  // 网络错误
  if (res.status !== 200) {
    const networkError = new ApiError("接口网络错误", {
      errorResponse: {
        success: false,
        errorType: "network",
        ...res,
      },
    });

    if (handleNetworkError) {
      onNetworkError?.({ error: networkError });
    }

    throw networkError;
  }

  // 业务错误
  // TODO 给的 swagger 例子没有业务错误的判定逻辑
  if (false) {
    const bizError = new ApiError("接口业务错误", {
      errorResponse: {
        success: false,
        errorType: "biz",
        ...res,
      },
    });

    if (handleBizError) {
      onBizError?.({ error: bizError });
    }

    throw bizError;
  }

  return {
    ...res,
    success: true,
    errorType: undefined,
  };
}
