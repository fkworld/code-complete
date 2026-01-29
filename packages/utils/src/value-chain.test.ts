import { describe, expect, it } from "vitest";

import { createValueChain } from "./value-chain";

describe(createValueChain.name, () => {
  it("should chain operations and return the final value", () => {
    const result = createValueChain()
      .do(() => 1)
      .do((v) => v + 1)
      .do((v) => v.toString())
      .value();

    expect(result).toBe("2");
  });

  it("should handle different types correctly", () => {
    const result = createValueChain()
      .do(() => "hello")
      .do((v) => v.length)
      .do((v) => v * 2)
      .value();

    expect(result).toBe(10);
  });
});
