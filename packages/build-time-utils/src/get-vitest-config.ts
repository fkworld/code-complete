import type { InlineConfig } from "vitest/node";

export function getVitestConfig(): InlineConfig {
  return {
    environment: "jsdom",
    coverage: {
      // TODO 注意目前 vitest 不支持动态解析 v8 的来源，所以 @vitest/coverage-v8 还是需要安装在根目录下
      // TODO issue https://github.com/vitest-dev/vitest/issues/9304
      provider: "v8",
      reporter: ["text", "text-summary"],
    },
    // ! 为了保证测试的独立性，会对 mocks,globals,localStorage 进行清理
    clearMocks: true,
    unstubGlobals: true,
  };
}
