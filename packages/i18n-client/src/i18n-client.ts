import { createValueChain } from "@fkworld/utils";

export type I18nLanguage = "zh" | "en";

export function createI18nClient<TKey extends string>(options: {
  messages: Record<TKey, Partial<Record<I18nLanguage, string>>>;
  language: I18nLanguage;
  isDebugMode: boolean;
}): {
  t: (key: TKey, params?: Record<string, string>) => string;
} {
  const { messages, language, isDebugMode } = options;

  /**
   * 返回 key 对应的语言 value
   * - 优先级：当前语言 value > key
   * - debug 模式：同时返回 value 和 key
   */
  function t(key: TKey, params?: Record<string, string>) {
    const finalValue = createValueChain()
      .do(() => {
        if (isDebugMode) {
          return [messages[key]?.zh || key, messages[key]?.en || key];
        }

        return [messages[key]?.[language] || key];
      })
      .do((v) => v.map((value) => (params ? value.replace(/\{(\w+)\}/g, (_, k) => params?.[k] || k) : value)))
      .do((v) => v.join(" / "))
      .value();

    return finalValue;
  }

  return { t };
}
