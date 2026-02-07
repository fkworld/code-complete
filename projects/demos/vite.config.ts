import path from "node:path";

import { defineConfig, mergeConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";

import { getHtmlInjectBuildResult, getViteConfig } from "../../packages/build-time-utils/src/main";

export default defineConfig(async (...args) => {
  return mergeConfig(
    getViteConfig(...args),
    defineConfig({
      plugins: [
        createHtmlPlugin({
          inject: {
            tags: [
              {
                tag: "script",
                injectTo: "head",
                children: await getHtmlInjectBuildResult({
                  injectFilename: path.resolve(import.meta.dirname, "./src/main-inject.ts"),
                }),
              },
            ],
          },
        }),
      ],
      server: {
        open: "/home",
        proxy: {
          "/pet/": "https://petstore.swagger.io/v2/",
        },
      },
    }),
  );
});
