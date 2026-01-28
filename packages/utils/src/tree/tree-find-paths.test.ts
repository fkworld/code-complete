import { describe, expect, it } from "vitest";

import { treeFindPaths } from "./tree-find-paths";
import { TREE } from "./tree-shared-test";

describe(treeFindPaths.name, () => {
  it("should not change the original tree", () => {
    const originalTreeString = JSON.stringify(TREE);
    treeFindPaths(TREE, () => true, {});
    const newTreeString = JSON.stringify(TREE);
    expect(newTreeString).toBe(originalTreeString);
  });

  it("should return the first matching tree path", () => {
    const result = treeFindPaths(TREE, (v) => v.id === "1-1-1" || v.id === "1-1-2", {});

    expect(result).toEqual([
      {
        id: "1",
        parentId: "",
        children: [
          {
            id: "1-1",
            parentId: "1",
            children: [
              { id: "1-1-1", parentId: "1-1", children: [] },
              { id: "1-1-2", parentId: "1-1", children: [] },
            ],
          },
          { id: "1-2", parentId: "1", children: [] },
        ],
      },
      {
        id: "1-1",
        parentId: "1",
        children: [
          { id: "1-1-1", parentId: "1-1", children: [] },
          { id: "1-1-2", parentId: "1-1", children: [] },
        ],
      },
      { id: "1-1-1", parentId: "1-1", children: [] },
    ]);
  });

  it("should return an empty array", () => {
    const result = treeFindPaths(TREE, (v) => v.id === "0", {});
    expect(result).toEqual([]);
  });
});
