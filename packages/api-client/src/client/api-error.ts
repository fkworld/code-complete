/* eslint-disable ts/no-explicit-any */

import type { ApiResponseWrapper } from "./api-client-types";

export type ApiErrorType = "network" | "biz" | "unknown";

interface ApiErrorOptions {
  errorResponse: ApiResponseWrapper<any>;
}

export class ApiError extends Error {
  constructor(message: string, options: ApiErrorOptions) {
    super(message);
    this.options = options;
  }

  private options: ApiErrorOptions;

  get errorResponse() {
    return this.options.errorResponse;
  }
}

export function getIsApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getIsApiNetworkError(error: unknown): error is ApiError {
  return error instanceof ApiError && error.errorResponse.errorType === "network";
}

export function getIsApiBizError(error: unknown): error is ApiError {
  return error instanceof ApiError && error.errorResponse.errorType === "biz";
}
