import path from "node:path";

import antfu from "@antfu/eslint-config";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";

export default antfu(
  {
    stylistic: false,
    ignores: ["**/node_modules/**/*", "**/dist/**/*", "**/generated/**/*"],
    typescript: {
      overrides: {
        // 更严格的限制 any 的使用
        "ts/no-explicit-any": "error",
        // 强制 jsx props 排序
        "perfectionist/sort-jsx-props": "error",
      },
    },
    imports: {
      overrides: {
        "perfectionist/sort-imports": [
          "error",
          {
            groups: [
              "type-import",
              ["type-parent", "type-sibling", "type-index", "type-internal"],
              "value-builtin",
              "value-external",
              "value-internal",
              ["value-parent", "value-sibling", "value-index"],
              "side-effect",
              "ts-equals-import",
              "unknown",
            ],
            order: "asc",
            type: "natural",
            // 以上参数与 antfu 完全一致；下面的是更严格的参数配置
            newlinesBetween: 1,
            newlinesInside: 0,
            internalPattern: ["^@/.+"],
          },
        ],
      },
    },
  },

  // 其他插件
  {
    settings: {
      "better-tailwindcss": {
        entryPoint: path.resolve(import.meta.dirname, "./shared/shared-tailwindcss.css"),
      },
    },
  },
  {
    ...eslintPluginBetterTailwindcss.configs.recommended,
  },
);
