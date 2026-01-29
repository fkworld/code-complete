import { describe, expect, it } from "vitest";

import { tryGet, tryGetAsync } from "./try-get";

describe(tryGet.name, () => {
  it("should return the result of the function", () => {
    expect(tryGet(() => 1)).toBe(1);
  });

  it("should return undefined if the function throws", () => {
    expect(
      tryGet(() => {
        throw new Error("测试抛出错误");
      }),
    ).toBeUndefined();
  });
});

describe(tryGetAsync.name, () => {
  it("should return the result of the function", async () => {
    await expect(tryGetAsync(() => Promise.resolve(1))).resolves.toBe(1);
  });

  it("should return undefined if the function throws", async () => {
    await expect(tryGetAsync(() => Promise.reject(new Error("oops")))).resolves.toBeUndefined();
  });
});
