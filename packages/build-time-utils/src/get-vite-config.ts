import type { UserConfigFnObject } from "vite";

import type { BuildVars } from "../../../shared/shared-types";

import process from "node:process";

import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export const getViteConfig: UserConfigFnObject = ({ mode }) => {
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
