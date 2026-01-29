import { describe, expect, it } from "vitest";

import { getConditionValue } from "./get-condition-value";

describe(getConditionValue.name, () => {
  it("should return the value of the first condition that is true", () => {
    expect(
      getConditionValue([
        { condition: false, value: 1 },
        { condition: true, value: 2 },
        { condition: true, value: 3 },
      ]),
    ).toBe(2);
  });

  it("should return undefined if no condition is true", () => {
    expect(
      getConditionValue([
        { condition: false, value: 1 },
        { condition: false, value: 2 },
        { condition: false, value: 3 },
      ]),
    ).toBeUndefined();
  });
});
