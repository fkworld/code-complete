import antfu, { stylistic } from "@antfu/eslint-config";

const stylisticConfig = (
  await stylistic({
    quotes: "double",
    semi: true,
    overrides: {
      "style/max-len": ["error", { code: 120, ignoreUrls: true }],
    },
  })
)[0];

export default antfu({
  stylistic: false,
  formatters: {
    // ! vue 文件中的 css 部分使用 prettier 进行格式化
    css: "prettier",
    prettierOptions: {
      singleQuote: false,
    },
  },
  ignores: ["**/node_modules/**/*", "**/dist/**/*", "**/generated/**/*"],
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
  // ! 仅对 vue 文件使用 antfu 的 stylistic 规则进行格式化
  plugins: {
    ...stylisticConfig.plugins,
  },
  vue: {
    overrides: {
      // ! 仅对 vue 文件使用 antfu 的 stylistic 规则进行格式化
      ...stylisticConfig.rules,
      // 强制属性单行
      "vue/max-attributes-per-line": ["error", { singleline: 1, multiline: 1 }],
      // 强制属性排序
      "vue/attributes-order": ["error", { alphabetical: true }],
    },
  },
});
