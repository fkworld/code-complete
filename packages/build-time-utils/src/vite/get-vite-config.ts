import type { ConfigEnv, UserConfig } from "vite";

import type { BuildVars } from "../../../../shared/shared-types";

import process from "node:process";

import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import tsconfigPaths from "vite-tsconfig-paths";

import { getHtmlInjectBuildResult } from "./get-html-inject-build-result";

export const getViteConfig = async (
  viteConfigEnv: ConfigEnv,
  customConfigEnv: {
    htmlInjectFilepath?: string;
  },
): Promise<UserConfig> => {
  const { mode } = viteConfigEnv;
  const { htmlInjectFilepath } = customConfigEnv;

  const { CI_ENV } = loadEnv(mode, process.cwd(), "") as BuildVars;

  return {
    plugins: [
      tsconfigPaths({
        // vue-ts 的 bug，参考 https://github.com/aleclarson/vite-tsconfig-paths/issues/60
        loose: true,
      }),
      legacy({
        renderLegacyChunks: false,
        renderModernChunks: true,
        modernTargets: "baseline 2022",
        modernPolyfills: true,
      }),
      !!htmlInjectFilepath &&
        createHtmlPlugin({
          inject: {
            tags: [
              {
                tag: "script",
                injectTo: "head",
                children: await getHtmlInjectBuildResult({
                  filepath: htmlInjectFilepath,
                }),
              },
            ],
          },
        }),
      vue(),
      vueJsx(),
    ],
    define: {
      __CI_ENV__: JSON.stringify(CI_ENV),
    },
    server: {
      host: true,
      port: 8901,
      strictPort: true,
      open: true,
    },
    preview: {
      port: 8901,
    },
    build: {
      assetsDir: "",
      chunkSizeWarningLimit: 1024,
    },
  };
};
