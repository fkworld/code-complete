import { describe, expect, it } from "vitest";

import { createI18nClient } from "./i18n-client";

const I18N_MESSAGES = {
  没有配置任何语言: {},
  配置中文但内容为空: { zh: "" },
  仅配置中文: { zh: "中文" },
  仅配置英文: { en: "English" },
  都配置: { zh: "中文", en: "English" },
  带参数: { zh: "中文 {hello}", en: "English {hello}" },
} satisfies Record<string, { zh?: string; en?: string }>;

describe(createI18nClient.name, () => {
  it("normal mode", () => {
    const { t } = createI18nClient<keyof typeof I18N_MESSAGES>({
      messages: I18N_MESSAGES,
      language: "zh",
      isDebugMode: false,
    });

    expect(t("仅配置中文")).toBe("中文");
    expect(t("都配置")).toBe("中文");
    expect(t("没有配置任何语言")).toBe("没有配置任何语言");
    expect(t("配置中文但内容为空")).toBe("配置中文但内容为空");
    expect(t("仅配置英文")).toBe("仅配置英文");
    expect(t("带参数")).toBe("中文 {hello}");
    expect(t("带参数", { hello: "你好" })).toBe("中文 你好");
    expect(t("带参数", { wrongKey: "wrongKey" })).toBe("中文 hello");
    // @ts-expect-error 测试传入不存在的 key
    expect(t("wrong key")).toBe("wrong key");
  });

  it("debug mode", () => {
    const { t } = createI18nClient<keyof typeof I18N_MESSAGES>({
      messages: I18N_MESSAGES,
      language: "zh",
      isDebugMode: true,
    });

    expect(t("没有配置任何语言")).toBe("没有配置任何语言 / 没有配置任何语言");
    expect(t("配置中文但内容为空")).toBe("配置中文但内容为空 / 配置中文但内容为空");
    expect(t("仅配置中文")).toBe("中文 / 仅配置中文");
    expect(t("仅配置英文")).toBe("仅配置英文 / English");
    expect(t("都配置")).toBe("中文 / English");
    expect(t("带参数")).toBe("中文 {hello} / English {hello}");
    expect(t("带参数", { hello: "你好" })).toBe("中文 你好 / English 你好");
    expect(t("带参数", { wrongKey: "wrongKey" })).toBe("中文 hello / English hello");
  });
});
