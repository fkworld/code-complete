import { defineConfig } from "vitest/config";

import { getVitestConfig } from "../build-time-utils/src/get-vitest-config";

export default defineConfig({
  test: getVitestConfig(),
});
