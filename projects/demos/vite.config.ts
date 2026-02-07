import path from "node:path";

import { defineConfig, mergeConfig } from "vite";

import { getViteConfig } from "../../packages/build-time-utils/src/main";

export default defineConfig(async (env) => {
  return mergeConfig(
    await getViteConfig(env, {
      htmlInjectFilepath: path.resolve(import.meta.dirname, "./src/main-inject.ts"),
    }),
    defineConfig({
      server: {
        open: "/home",
        proxy: {
          "/pet/": "https://petstore.swagger.io/v2/",
        },
      },
    }),
  );
});
