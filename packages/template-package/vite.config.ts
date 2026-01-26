import { defineConfig } from "vitest/config";

import { getVitestConfig } from "../../shared/compile-time-utils/get-vitest-config";

export default defineConfig({
  test: getVitestConfig(),
});
