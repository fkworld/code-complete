import path from "node:path";

import antfu, { react, stylistic } from "@antfu/eslint-config";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import { mapValues } from "lodash-es";

const reactRules = (await react())[1].rules!;
const stylisticRules = (await stylistic())[0].rules!;

export default antfu(
  {
    stylistic: {
      // 与 prettier 保持一致的格式化规则，这些参数可能被其他插件用到
      quotes: "double",
      semi: true,
      overrides: {
        // 关闭所有的 style 规则
        ...mapValues(stylisticRules, () => "off"),
        // 打开特定的 style 规则
        "style/jsx-self-closing-comp": "error",
      },
    },
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
    vue: false,
    react: true,
  },

  // 针对 vue 项目关闭所有 react 相关配置，，否则会导致 vue tsx 文件冲突
  {
    files: ["**/projects/demos-vue/**"],
    rules: {
      ...mapValues(reactRules, () => "off"),
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
