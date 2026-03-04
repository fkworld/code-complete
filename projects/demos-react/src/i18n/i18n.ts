import { createI18nClient } from "@fkworld/i18n-client";

import { I18N_MESSAGES } from "./i18n-messages";

export const { t } = createI18nClient({
  messages: I18N_MESSAGES,
  language: "zh",
  isDebugMode: false,
});
