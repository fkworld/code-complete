import { assert, describe, expect, it } from "vitest";

import { treeFlat } from "./tree-flat";
import { LIST_IDS, TREE } from "./tree-shared-test";

describe(treeFlat.name, () => {
  it("should not change the original tree", () => {
    const originalTreeString = JSON.stringify(TREE);
    treeFlat(TREE, {});
    const newTreeString = JSON.stringify(TREE);
    expect(newTreeString).toBe(originalTreeString);
  });

  it("should return flat tree", () => {
    const result = treeFlat(TREE, {}).map((v) => v.id);
    assert.sameMembers(result, LIST_IDS);
  });
});
