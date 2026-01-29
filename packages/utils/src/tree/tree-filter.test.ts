import { describe, expect, it } from "vitest";

import { treeFilter } from "./tree-filter";
import { TREE } from "./tree-shared-test";

describe(treeFilter.name, () => {
  it("should not change the original tree", () => {
    const originalTreeString = JSON.stringify(TREE);
    treeFilter(TREE, () => true, {});
    const newTreeString = JSON.stringify(TREE);
    expect(newTreeString).toBe(originalTreeString);
  });

  it("should filter tree", () => {
    const result = treeFilter(TREE, (v) => !v.id.includes("2"), {});
    expect(result).toEqual([
      {
        id: "1",
        parentId: "",
        children: [
          {
            id: "1-1",
            parentId: "1",
            children: [{ id: "1-1-1", parentId: "1-1", children: [] }],
          },
        ],
      },
    ]);
  });
});
