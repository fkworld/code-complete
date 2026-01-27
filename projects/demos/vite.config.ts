import { defineConfig, mergeConfig } from "vite";

import { getViteConfig } from "../../packages/build-time-utils/src/get-vite-config";

export default defineConfig((...args) => {
  return mergeConfig(
    getViteConfig(...args),
    defineConfig({
      server: {
        open: "/home",
      },
    }),
  );
});
