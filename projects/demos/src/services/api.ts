import type { ApiPetStoreDefines } from "@fkworld/api-client";

import { ApiClient, defaultApiRequest } from "@fkworld/api-client";

type AddPrefixToPaths<TPaths, TPrefix extends string> = {
  [K in keyof TPaths as K extends string ? `${TPrefix}${K}` : never]: TPaths[K];
};

export const apiPetStore = new ApiClient<AddPrefixToPaths<ApiPetStoreDefines, "/pet-store-service">>({
  request: defaultApiRequest,
  rewriteUrl: (url) => url.replace("/pet-store-service/", "/"),
  baseUrl: import.meta.env.DEV ? "/" : "https://petstore.swagger.io/v2/",
});
