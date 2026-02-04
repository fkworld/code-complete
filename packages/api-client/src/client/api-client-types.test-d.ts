import type { ApiPetStoreDefines } from "../generated/apis/api-defines";
import type {
  ApiKeys,
  ApiParamsBody,
  ApiParamsPath,
  ApiParamsQuery,
  ApiParamsQueryOrBody,
  ApiResponse,
  GetByPath,
} from "./api-client-types";

import { describe, expectTypeOf, it } from "vitest";

describe("ApiKeys", () => {
  it("should return all api keys", () => {
    type Keys = ApiKeys<ApiPetStoreDefines>;
    expectTypeOf<Keys>().toEqualTypeOf<
      | "/pet/{petId}/uploadImage post"
      | "/pet put"
      | "/pet post"
      | "/pet/findByStatus get"
      | "/pet/findByTags get"
      | "/pet/{petId} get"
      | "/pet/{petId} post"
      | "/pet/{petId} delete"
      | "/store/inventory get"
      | "/store/order post"
      | "/store/order/{orderId} get"
      | "/store/order/{orderId} delete"
      | "/user/createWithList post"
      | "/user/{username} get"
      | "/user/{username} put"
      | "/user/{username} delete"
      | "/user/login get"
      | "/user/logout get"
      | "/user/createWithArray post"
      | "/user post"
    >();
  });
});

describe("ApiParamsPath", () => {
  it("should return api params path", () => {
    type ParamsPath = ApiParamsPath<ApiPetStoreDefines, "/pet/{petId} get">;
    expectTypeOf<ParamsPath>().toEqualTypeOf<{ petId: number }>();
  });
});

describe("ApiParamsQuery", () => {
  it("should return api params query", () => {
    type ParamsQuery = ApiParamsQuery<ApiPetStoreDefines, "/pet/findByStatus get">;
    expectTypeOf<ParamsQuery>().toEqualTypeOf<{ status: ("available" | "pending" | "sold")[] }>();

    type ParamsQueryOrBody = ApiParamsQueryOrBody<ApiPetStoreDefines, "/pet/findByStatus get">;
    expectTypeOf<ParamsQueryOrBody>().toEqualTypeOf<{ status: ("available" | "pending" | "sold")[] }>();
  });
});

describe("ApiParamsBody", () => {
  it("should return api params body", () => {
    type ParamsBody = ApiParamsBody<ApiPetStoreDefines, "/store/order post">;
    expectTypeOf<ParamsBody>().toEqualTypeOf<{
      id?: number;
      petId?: number;
      quantity?: number;
      shipDate?: string;
      status?: "placed" | "approved" | "delivered";
      complete?: boolean;
    }>();

    type ParamsQueryOrBody = ApiParamsQueryOrBody<ApiPetStoreDefines, "/store/order post">;
    expectTypeOf<ParamsQueryOrBody>().toEqualTypeOf<{
      id?: number;
      petId?: number;
      quantity?: number;
      shipDate?: string;
      status?: "placed" | "approved" | "delivered";
      complete?: boolean;
    }>();
  });
});

describe("ApiResponse", () => {
  it("should return api response", () => {
    type Response = ApiResponse<ApiPetStoreDefines, "/store/order/{orderId} get">;
    expectTypeOf<Response>().toEqualTypeOf<{
      id?: number;
      petId?: number;
      quantity?: number;
      shipDate?: string;
      status?: "placed" | "approved" | "delivered";
      complete?: boolean;
    }>();
  });
});

describe("GetByPath", () => {
  it("should return type", () => {
    type Res = GetByPath<ApiResponse<ApiPetStoreDefines, "/pet/{petId} get">, "category.name">;
    expectTypeOf<Res>().toEqualTypeOf<string>();
  });
});
