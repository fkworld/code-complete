import type { I18nLanguage } from "@fkworld/i18n-client";

export const I18N_MESSAGES = {
  "Hello World": {
    zh: "你好，世界",
  },
} satisfies Record<string, Partial<Record<I18nLanguage, string>>>;
