import path from "node:path";

import { build } from "vite";

export async function getHtmlInjectBuildResult(options: { filepath: string }): Promise<string> {
  const { filepath } = options;

  const result = await build({
    // ! 需要指定 vite root，避免与主项目 vite 配置冲突
    root: path.resolve(import.meta.dirname),
    build: {
      // 不生成文件
      write: false,
      // 不压缩
      minify: false,
      lib: {
        entry: filepath,
        formats: ["iife"],
        name: "inject",
      },
    },
  });

  if (!Array.isArray(result)) {
    throw new TypeError("Unexpected build result format");
  }

  return result[0].output[0].code;
}
