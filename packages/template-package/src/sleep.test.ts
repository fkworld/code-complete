import { describe, expect, it } from "vitest";

import { sleep } from "./sleep";

describe(sleep.name, () => {
  it("should wait for the specified milliseconds", async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();
    // 允许 5% 的误差
    expect(end - start).toBeGreaterThanOrEqual(100 - 5);
  });
});
