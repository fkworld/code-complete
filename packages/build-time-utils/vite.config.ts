import { defineConfig } from "vitest/config";

import { getVitestConfig } from "./src/get-vitest-config";

export default defineConfig({
  test: getVitestConfig(),
});
