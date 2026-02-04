/* eslint-disable ts/no-explicit-any */
import type {
  ApiClientOptions,
  ApiKeys,
  ApiParamsQueryOrBody,
  ApiRequestOptions,
  ApiRequestOptionsWithKey,
  ApiResponse,
  ApiResponseWrapper,
} from "./api-client-types";

import { createValueChain } from "@fkworld/utils";
import { isEmpty, template } from "lodash-es";

import { getIsApiError } from "./api-error";

export class ApiClient<ApiDefines extends object> {
  private clientOptions: ApiClientOptions;

  constructor(clientOptions: ApiClientOptions) {
    this.clientOptions = clientOptions;
  }

  async request<Key extends ApiKeys<ApiDefines>>(
    apiKey: Key,
    fastParams: ApiParamsQueryOrBody<ApiDefines, Key>,
    requestOptions?: ApiRequestOptions & ApiRequestOptionsWithKey<ApiDefines, Key>,
  ): Promise<ApiResponseWrapper<ApiResponse<ApiDefines, Key>>> {
    const [sourceUrl, method] = apiKey.split(" ");

    const url = createValueChain()
      .do(() => sourceUrl)
      .do((v) => this.clientOptions.rewriteUrl?.(v) ?? v)
      .do((v) => {
        return isEmpty(requestOptions?.paramsPath)
          ? v
          : template(v, { interpolate: /\{(\w+)\}/g })(requestOptions?.paramsPath);
      })
      .value();

    const isFastParamsQuery = ["get", "head"].includes(method);

    const res = await this.clientOptions.request?.({
      ...requestOptions,
      baseUrl: this.clientOptions.baseUrl,
      url,
      method,
      headers: {
        ...requestOptions?.headers,
      },
      paramsPath: {
        ...requestOptions?.paramsPath,
      },
      paramsQuery: {
        ...((isFastParamsQuery ? fastParams : {}) as any),
        ...requestOptions?.paramsQuery,
      },
      paramsBody: {
        ...((!isFastParamsQuery ? fastParams : {}) as any),
        ...requestOptions?.paramsBody,
      },
    });

    return res;
  }

  async safeRequest<Key extends ApiKeys<ApiDefines>>(
    apiKey: Key,
    fastParams: ApiParamsQueryOrBody<ApiDefines, Key>,
    requestOptions?: ApiRequestOptions & ApiRequestOptionsWithKey<ApiDefines, Key>,
  ): Promise<ApiResponseWrapper<ApiResponse<ApiDefines, Key>>> {
    try {
      return await this.request(apiKey, fastParams, requestOptions);
    } catch (error) {
      if (getIsApiError(error)) {
        return error.errorResponse;
      } else {
        return {
          success: false,
          errorType: "unknown",
        };
      }
    }
  }
}
