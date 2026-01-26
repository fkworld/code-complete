import type { InlineConfig } from "vitest/node";

export function getVitestConfig(): InlineConfig {
  return {
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary"],
    },
    // ! 为了保证测试的独立性，会对 mocks,globals,localStorage 进行清理
    clearMocks: true,
    unstubGlobals: true,
  };
}
